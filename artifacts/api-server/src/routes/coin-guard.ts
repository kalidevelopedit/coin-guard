import { Router } from "express";
import { storage } from "../lib/storage";
import {
  insertInsuranceApplicationSchema,
  insertContactInquirySchema,
  insertAnalyticsEventSchema,
  applicationSchema,
  checkStatusSchema,
} from "@workspace/db";
import { randomUUID, createHash } from "crypto";
import {
  startTelegramBot,
  sendNewSubmissionNotification,
  sendContactFormNotification,
  sendMessageToAllChats,
  getTelegramConfig,
  saveTelegramConfig,
  sendTestMessage,
  sendStatsReport,
} from "../lib/telegram";
import { recordPageView, setSendReportFunction, startSessionTracker } from "../lib/session-tracker";
import { lookupGeo } from "../lib/geoip";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

const router = Router();

router.post("/auth/apply", async (req, res) => {
  try {
    const parsed = applicationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message || "Invalid input" });
    }
    const { name, email, phone } = parsed.data;
    const existingPhone = await storage.getUserByPhone(phone);
    if (existingPhone) {
      const { password: _, plaintextPassword: _p, ...safe } = existingPhone;
      return res.status(409).json({ error: "duplicate", message: "Phone already exists", user: safe });
    }
    const existingEmail = await storage.getUserByEmail(email);
    if (existingEmail) {
      const { password: _, plaintextPassword: _p, ...safe } = existingEmail;
      return res.status(409).json({ error: "duplicate", message: "Email already exists", user: safe });
    }
    const rawIp = (req.headers["x-forwarded-for"] as string || req.headers["x-real-ip"] as string || req.socket.remoteAddress || "Unknown").split(",")[0].trim();
    const geo = await lookupGeo(rawIp).catch(() => ({ countryCode: "", countryName: "" }));
    const autoPassword = randomUUID().slice(0, 12);
    const username = email.split("@")[0] + "-" + randomUUID().slice(0, 4);
    const user = await storage.createUser({
      username, email,
      password: hashPassword(autoPassword),
      plaintextPassword: autoPassword,
      name, phone,
      country: geo.countryCode || null, taxYear: null, selectedGoals: [],
      tradingFrequency: null, tradesMemeCoins: false,
      portfolioValue: null, walletType: null,
      applicationStatus: "pending", onboardingComplete: false,
      registrationIp: rawIp !== "Unknown" ? rawIp : null,
    } as Parameters<typeof storage.createUser>[0]);
    req.session.userId = user.id;
    sendNewSubmissionNotification(user).catch(() => {});
    const { password: _, plaintextPassword: _p, ...safeUser } = user;
    return res.status(201).json(safeUser);
  } catch (error) {
    req.log.error({ error }, "Application error");
    return res.status(500).json({ error: "Application submission failed" });
  }
});

router.post("/auth/check-status", async (req, res) => {
  try {
    const parsed = checkStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message || "Invalid input" });
    }
    const user = await storage.getUserByPhone(parsed.data.phone);
    if (!user) return res.status(404).json({ error: "No application found with this phone number" });
    req.session.userId = user.id;
    const { password: _, plaintextPassword: _p, ...safeUser } = user;
    return res.json(safeUser);
  } catch {
    return res.status(500).json({ error: "Status check failed" });
  }
});

router.get("/auth/me", async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });
    const user = await storage.getUser(req.session.userId);
    if (!user) { req.session.destroy(() => {}); return res.status(401).json({ error: "User not found" }); }
    const { password: _, plaintextPassword: _p, ...safeUser } = user;
    return res.json(safeUser);
  } catch {
    return res.status(500).json({ error: "Failed to get user" });
  }
});

router.post("/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    return res.json({ message: "Logged out" });
  });
});

router.patch("/auth/user", async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });
    const beforeUser = await storage.getUser(req.session.userId);
    const user = await storage.updateUser(req.session.userId, req.body);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.onboardingComplete && beforeUser && !beforeUser.onboardingComplete) {
      sendNewSubmissionNotification(user).catch(() => {});
    }
    const { password: _, plaintextPassword: _p, ...safeUser } = user;
    return res.json(safeUser);
  } catch {
    return res.status(500).json({ error: "Update failed" });
  }
});

router.post("/insurance-applications", async (req, res) => {
  try {
    const parsed = insertInsuranceApplicationSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
    const application = await storage.createInsuranceApplication(parsed.data);
    return res.status(201).json(application);
  } catch {
    return res.status(500).json({ error: "Failed to create application" });
  }
});

router.get("/insurance-applications/:id", async (req, res) => {
  try {
    const application = await storage.getInsuranceApplication(req.params.id);
    if (!application) return res.status(404).json({ error: "Application not found" });
    return res.json(application);
  } catch {
    return res.status(500).json({ error: "Failed to fetch application" });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const parsed = insertContactInquirySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
    const inquiry = await storage.createContactInquiry(parsed.data);
    sendContactFormNotification({
      firstName: parsed.data.name.split(" ")[0] || parsed.data.name,
      lastName: parsed.data.name.split(" ").slice(1).join(" ") || "",
      email: parsed.data.email,
      subject: (parsed.data as any).type || "General",
      message: parsed.data.message,
    }).catch(() => {});
    return res.status(201).json(inquiry);
  } catch {
    return res.status(500).json({ error: "Failed to create inquiry" });
  }
});

router.delete("/admin/users/:id", async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });
    const deleted = await storage.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    return res.json({ message: "User deleted" });
  } catch {
    return res.status(500).json({ error: "Failed to delete user" });
  }
});

router.patch("/admin/users/:id/status", async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });
    const { applicationStatus } = req.body;
    if (!applicationStatus || !["approved", "pending", "rejected"].includes(applicationStatus)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const user = await storage.updateUser(req.params.id, { applicationStatus });
    if (!user) return res.status(404).json({ error: "User not found" });
    const { password, plaintextPassword, ...safeUser } = user;
    return res.json(safeUser);
  } catch {
    return res.status(500).json({ error: "Failed to update user status" });
  }
});

router.get("/admin/users", async (_req, res) => {
  try {
    return res.json(await storage.getAllUsers());
  } catch {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/admin/insurance-applications", async (_req, res) => {
  try {
    return res.json(await storage.getAllInsuranceApplications());
  } catch {
    return res.status(500).json({ error: "Failed to fetch applications" });
  }
});

router.get("/admin/contact-inquiries", async (_req, res) => {
  try {
    return res.json(await storage.getAllContactInquiries());
  } catch {
    return res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

router.get("/admin/stats", async (_req, res) => {
  try {
    const [users, apps, inquiries] = await Promise.all([
      storage.getAllUsers(),
      storage.getAllInsuranceApplications(),
      storage.getAllContactInquiries(),
    ]);
    return res.json({
      totalUsers: users.length,
      onboardedUsers: users.filter((u) => u.onboardingComplete).length,
      totalInsuranceApps: apps.length,
      pendingInsuranceApps: apps.filter((a) => a.status === "pending").length,
      totalInquiries: inquiries.length,
    });
  } catch {
    return res.status(500).json({ error: "Failed to fetch stats" });
  }
});

const BOT_PATTERNS = [
  "googlebot", "bingbot", "baiduspider", "yandexbot", "duckduckbot",
  "slurp", "sogou", "ia_archiver", "headlesschrome", "phantomjs",
  "python-requests", "go-http-client", "curl/", "wget/", "scrapy", "httrack",
  "selenium", "webdriver", "petalbot", "ahrefsbot", "semrushbot", "dotbot",
];

function isBot(ua: string): boolean {
  const lower = ua.toLowerCase();
  return BOT_PATTERNS.some((p) => lower.includes(p));
}

router.post("/analytics/track", async (req, res) => {
  try {
    const ua = req.headers["user-agent"] || "";
    if (isBot(ua)) return res.json({ ok: true, skipped: true });

    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "Unknown";

    const cfCountry = (req.headers["cf-ipcountry"] as string) || "";
    const vercelCountry = (req.headers["x-vercel-ip-country"] as string) || "";

    let countryCode = cfCountry || vercelCountry;
    let countryName = "";
    let city = "";
    let region = "";

    if (!countryCode) {
      const geo = await lookupGeo(ip);
      countryCode = geo.countryCode;
      countryName = geo.countryName;
      city = geo.city;
      region = geo.region;
    }

    const existingMeta = (req.body.metadata as Record<string, unknown>) || {};
    const parsed = insertAnalyticsEventSchema.safeParse({
      ...req.body,
      userAgent: ua,
      country: countryCode,
      metadata: {
        ...existingMeta,
        ...(countryName ? { countryName } : {}),
        ...(city ? { city } : {}),
        ...(region ? { region } : {}),
        ip: ip !== "Unknown" ? ip : undefined,
      },
    });
    if (!parsed.success) return res.status(400).json({ error: "Invalid event data" });
    await storage.createAnalyticsEvent(parsed.data);

    if (req.body.eventType === "page_view" && req.body.sessionId) {
      recordPageView({
        sessionId: req.body.sessionId,
        page: req.body.page || "/",
        ip,
        userAgent: ua,
        referrer: req.body.referrer || "direct",
      });
    }
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Failed to track event" });
  }
});

router.get("/admin/analytics", async (req, res) => {
  try {
    const days = parseInt(req.query.days as string) || 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return res.json(await storage.getAnalyticsSummary(since));
  } catch {
    return res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

router.get("/admin/analytics/sessions", async (req, res) => {
  try {
    const days = parseInt(req.query.days as string) || 30;
    const limit = Math.min(parseInt(req.query.limit as string) || 500, 1000);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return res.json(await storage.getSessionLog(since, limit));
  } catch {
    return res.status(500).json({ error: "Failed to fetch session log" });
  }
});

router.get("/admin/telegram/config", async (_req, res) => {
  try {
    return res.json(await getTelegramConfig());
  } catch {
    return res.status(500).json({ error: "Failed to fetch Telegram config" });
  }
});

router.post("/admin/telegram/config", async (req, res) => {
  try {
    const { botToken, chatId } = req.body as { botToken?: string; chatId?: string };
    if (!botToken || !chatId) {
      return res.status(400).json({ error: "botToken and chatId are required" });
    }
    await saveTelegramConfig(botToken.trim(), chatId.trim());
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Failed to save Telegram config" });
  }
});

router.post("/admin/telegram/test", async (_req, res) => {
  try {
    return res.json(await sendTestMessage());
  } catch {
    return res.status(500).json({ error: "Failed to send test message" });
  }
});

router.post("/admin/telegram/report", async (req, res) => {
  try {
    const opts = {
      includeUsers: req.body.includeUsers !== false,
      includeUserCards: req.body.includeUserCards !== false,
      includeApplications: req.body.includeApplications !== false,
      includeInquiries: req.body.includeInquiries !== false,
    };
    return res.json(await sendStatsReport(opts));
  } catch {
    return res.status(500).json({ error: "Failed to send report" });
  }
});

router.get("/solana/blockhash", async (_req, res) => {
  const rpcs = ["https://solana-rpc.publicnode.com", "https://api.mainnet-beta.solana.com"];
  for (const rpc of rpcs) {
    try {
      const response = await fetch(rpc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "getLatestBlockhash", params: [{ commitment: "confirmed" }] }),
      });
      if (!response.ok) continue;
      const data = await response.json() as { result?: { value?: { blockhash?: string; lastValidBlockHeight?: number } } };
      if (data.result?.value?.blockhash) {
        return res.json({ blockhash: data.result.value.blockhash, lastValidBlockHeight: data.result.value.lastValidBlockHeight });
      }
    } catch { continue; }
  }
  return res.status(502).json({ error: "Unable to fetch Solana blockhash" });
});

export function initCoinGuardServices() {
  startTelegramBot().catch((err) => console.error("Failed to start Telegram bot:", err));
  setSendReportFunction(sendMessageToAllChats);
  startSessionTracker();
}

export default router;
