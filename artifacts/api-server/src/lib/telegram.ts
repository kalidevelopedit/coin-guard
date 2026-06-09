import { storage } from "./storage";
import type { User } from "@workspace/db";

let currentBotToken: string | null = null;
let apiBase = "";

function buildApiBase(token: string): string {
  return `https://api.telegram.org/bot${token}`;
}

async function loadConfig(): Promise<{ botToken: string | null; chatId: string | null }> {
  const [dbToken, dbChatId] = await Promise.all([
    storage.getSetting("telegram_bot_token"),
    storage.getSetting("telegram_chat_id"),
  ]);
  return {
    botToken: dbToken || process.env.TELEGRAM_BOT_TOKEN || null,
    chatId: dbChatId || process.env.TELEGRAM_CHAT_ID || null,
  };
}

export async function getTelegramConfig(): Promise<{
  isConfigured: boolean;
  botToken: string;
  chatId: string;
}> {
  const { botToken, chatId } = await loadConfig();
  const masked = botToken
    ? botToken.length > 8
      ? botToken.slice(0, 4) + "•".repeat(botToken.length - 8) + botToken.slice(-4)
      : "••••••••"
    : "";
  return {
    isConfigured: !!(botToken && chatId),
    botToken: masked,
    chatId: chatId || "",
  };
}

export async function saveTelegramConfig(botToken: string, chatId: string): Promise<void> {
  await Promise.all([
    storage.setSetting("telegram_bot_token", botToken),
    storage.setSetting("telegram_chat_id", chatId),
  ]);
  await restartBot(botToken, chatId);
}

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    chat: { id: number };
    text?: string;
    from?: { first_name?: string; username?: string };
  };
  callback_query?: {
    id: string;
    message?: { chat: { id: number }; message_id: number };
    data?: string;
  };
}

async function sendMessage(chatId: number | string, text: string, replyMarkup?: object): Promise<void> {
  if (!currentBotToken) return;
  try {
    await fetch(`${apiBase}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
      }),
    });
  } catch (err) {
    console.error("Telegram sendMessage error:", err);
  }
}

async function answerCallbackQuery(callbackQueryId: string, text?: string): Promise<void> {
  if (!currentBotToken) return;
  try {
    await fetch(`${apiBase}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: callbackQueryId, text: text || "" }),
    });
  } catch (err) {
    console.error("Telegram answerCallback error:", err);
  }
}

async function editMessage(chatId: number, messageId: number, text: string, replyMarkup?: object): Promise<void> {
  if (!currentBotToken) return;
  try {
    await fetch(`${apiBase}/editMessageText`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId, message_id: messageId, text, parse_mode: "HTML",
        ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
      }),
    });
  } catch (err) {
    console.error("Telegram editMessage error:", err);
  }
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const GOAL_LABELS: Record<string, string> = {
  tax:       "📋 File Crypto Taxes",
  insurance: "🛡️ Crypto Insurance",
  recovery:  "🔑 Crypto Recovery",
  both:      "📋 Crypto Taxes  +  🛡️ Insurance",
};

function formatGoals(goals: string[] | null | undefined): string {
  if (!goals || goals.length === 0) return "  — Not selected";
  return goals.map((g) => `  • ${GOAL_LABELS[g] || escapeHtml(g)}`).join("\n");
}

function formatWallet(raw: string | null | undefined): string {
  if (!raw) return "—";
  const parts = raw.split(":");
  if (parts.length >= 2) return `${escapeHtml(parts[0])} (${escapeHtml(parts[1])})`;
  return escapeHtml(raw);
}

function statusBadge(s: string | null | undefined): string {
  if (s === "approved") return "✅ Approved";
  if (s === "rejected") return "❌ Rejected";
  return "⏳ Pending";
}

function formatUserCard(user: User, index?: number): string {
  const prefix = index !== undefined ? `<b>#${index + 1}  ${escapeHtml(user.name || user.username)}</b>` : `<b>${escapeHtml(user.name || user.username)}</b>`;
  const lines = [
    prefix,
    "─".repeat(30),
    `👤  <b>Name</b>       ${escapeHtml(user.name || "—")}`,
    `📧  <b>Email</b>      ${escapeHtml(user.email)}`,
    `📱  <b>Phone</b>      ${escapeHtml(user.phone || "—")}`,
    `🌍  <b>Country</b>    ${escapeHtml(user.country || "—")}`,
    "",
    `🎯  <b>Services</b>`,
    formatGoals(user.selectedGoals),
    "",
    `💼  <b>Portfolio</b>  ${escapeHtml(user.portfolioValue || "—")}`,
    `👛  <b>Wallet</b>     ${formatWallet(user.walletType)}`,
  ];
  if (user.taxYear) lines.push(`📅  <b>Tax Year</b>   ${escapeHtml(user.taxYear)}`);
  if (user.tradingFrequency) lines.push(`📊  <b>Trading</b>    ${escapeHtml(user.tradingFrequency)}`);
  if (user.tradesMemeCoins != null) lines.push(`🐸  <b>Meme Coins</b> ${user.tradesMemeCoins ? "Yes" : "No"}`);
  lines.push("");
  lines.push(`☑️  <b>Onboarded</b>  ${user.onboardingComplete ? "Yes" : "No"}`);
  lines.push(`${statusBadge(user.applicationStatus)}`);
  return lines.join("\n");
}

const registeredChatIds = new Set<number | string>();

function initConfiguredChatId(chatId: string | null): void {
  registeredChatIds.clear();
  if (chatId) {
    const parsed = parseInt(chatId, 10);
    registeredChatIds.add(isNaN(parsed) ? chatId : parsed);
  }
}

function getChatIds(): Array<number | string> {
  return Array.from(registeredChatIds);
}

function addChatId(chatId: number): void {
  registeredChatIds.add(chatId);
}

export async function sendNewSubmissionNotification(user: User): Promise<void> {
  if (!currentBotToken) return;
  const lines = [
    `🆕  <b>New CoinGuard Submission</b>`,
    "━".repeat(30),
    `👤  <b>${escapeHtml(user.name || user.username)}</b>`,
    `📧  ${escapeHtml(user.email)}`,
    `📱  ${escapeHtml(user.phone || "—")}`,
    `🌍  ${escapeHtml(user.country || "—")}`,
    "",
    `🎯  <b>Services Requested</b>`,
    formatGoals(user.selectedGoals),
    "",
    `💼  <b>Portfolio</b>   ${escapeHtml(user.portfolioValue || "—")}`,
    `👛  <b>Wallet</b>      ${formatWallet(user.walletType)}`,
  ];
  if (user.taxYear) lines.push(`📅  <b>Tax Year</b>    ${escapeHtml(user.taxYear)}`);
  if (user.tradingFrequency) lines.push(`📊  <b>Trading</b>     ${escapeHtml(user.tradingFrequency)}`);
  if (user.tradesMemeCoins != null) lines.push(`🐸  <b>Meme Coins</b>  ${user.tradesMemeCoins ? "Yes" : "No"}`);
  lines.push("");
  lines.push(`☑️  <b>Onboarded</b>   ${user.onboardingComplete ? "Yes" : "No"}`);
  lines.push(`⏳  <b>Status</b>      Pending`);
  const text = lines.join("\n");
  for (const chatId of getChatIds()) {
    await sendMessage(chatId, text, {
      inline_keyboard: [
        [{ text: "✅ Approve", callback_data: `approve_${user.id}` }, { text: "❌ Reject", callback_data: `reject_${user.id}` }],
        [{ text: "🗑 Delete", callback_data: `delete_${user.id}` }],
      ],
    });
  }
}

async function handleCommand(chatId: number, text: string): Promise<void> {
  const cmd = text.trim().toLowerCase().replace(/@\w+$/, "").trim();
  if (cmd === "/start") {
    addChatId(chatId);
    await sendMessage(chatId, `<b>CoinGuard Bot</b>\nYou will receive notifications for new submissions.\n\n/request - View accounts\n/stats - Platform stats`);
    return;
  }
  if (cmd === "/request") {
    const users = await storage.getAllUsers();
    if (users.length === 0) { await sendMessage(chatId, "No registered accounts."); return; }
    const keyboard = users.map((u) => [{ text: `${u.name || u.username} (${u.email})`, callback_data: `view_${u.id}` }]);
    await sendMessage(chatId, `<b>Registered Accounts</b>\nTotal: <b>${users.length}</b>`, { inline_keyboard: keyboard });
    return;
  }
  if (cmd === "/stats") {
    const users = await storage.getAllUsers();
    const apps = await storage.getAllInsuranceApplications();
    const inquiries = await storage.getAllContactInquiries();
    await sendMessage(chatId, [
      `<b>CoinGuard Statistics</b>`,
      `Total Users: <b>${users.length}</b>`,
      `Onboarded: <b>${users.filter((u) => u.onboardingComplete).length}</b>`,
      `Approved: <b>${users.filter((u) => u.applicationStatus === "approved").length}</b>`,
      `Insurance Apps: <b>${apps.length}</b>`,
      `Contact Inquiries: <b>${inquiries.length}</b>`,
    ].join("\n"));
    return;
  }
}

async function handleCallbackQuery(callbackQueryId: string, chatId: number, messageId: number, data: string): Promise<void> {
  if (data.startsWith("view_")) {
    const user = await storage.getUser(data.replace("view_", ""));
    if (!user) { await answerCallbackQuery(callbackQueryId, "User not found"); return; }
    await answerCallbackQuery(callbackQueryId);
    await sendMessage(chatId, formatUserCard(user), {
      inline_keyboard: [
        [{ text: "Approve", callback_data: `approve_${user.id}` }, { text: "Reject", callback_data: `reject_${user.id}` }],
        [{ text: "Delete", callback_data: `delete_${user.id}` }],
      ],
    });
    return;
  }
  if (data.startsWith("approve_")) {
    const user = await storage.updateUser(data.replace("approve_", ""), { applicationStatus: "approved" });
    if (!user) { await answerCallbackQuery(callbackQueryId, "User not found"); return; }
    await answerCallbackQuery(callbackQueryId, "User approved!");
    await editMessage(chatId, messageId, formatUserCard(user) + "\n\n<b>Action: APPROVED</b>");
    return;
  }
  if (data.startsWith("reject_")) {
    const user = await storage.updateUser(data.replace("reject_", ""), { applicationStatus: "rejected" });
    if (!user) { await answerCallbackQuery(callbackQueryId, "User not found"); return; }
    await answerCallbackQuery(callbackQueryId, "User rejected");
    await editMessage(chatId, messageId, formatUserCard(user) + "\n\n<b>Action: REJECTED</b>");
    return;
  }
  if (data.startsWith("delete_")) {
    const userId = data.replace("delete_", "");
    const user = await storage.getUser(userId);
    const deleted = await storage.deleteUser(userId);
    if (!deleted) { await answerCallbackQuery(callbackQueryId, "User not found"); return; }
    await answerCallbackQuery(callbackQueryId, "User deleted!");
    await editMessage(chatId, messageId, `<b>User Deleted</b>\n${escapeHtml(user?.name || user?.username || "Unknown")} has been removed.`);
    return;
  }
  await answerCallbackQuery(callbackQueryId);
}

let pollingOffset = 0;
let pollingActive = false;
let pollingAbortController: AbortController | null = null;

async function pollUpdates(): Promise<void> {
  if (!currentBotToken) return;
  pollingAbortController = new AbortController();
  try {
    const response = await fetch(`${apiBase}/getUpdates?offset=${pollingOffset}&timeout=30&allowed_updates=["message","callback_query"]`, {
      signal: AbortSignal.any
        ? AbortSignal.any([pollingAbortController.signal, AbortSignal.timeout(35000)])
        : AbortSignal.timeout(35000),
    });
    if (!response.ok) return;
    const data = await response.json() as { ok: boolean; result: TelegramUpdate[] };
    if (data.ok && data.result) {
      for (const update of data.result) {
        pollingOffset = update.update_id + 1;
        if (update.message?.text && update.message.chat) {
          addChatId(update.message.chat.id);
          await handleCommand(update.message.chat.id, update.message.text);
        }
        if (update.callback_query?.message?.chat && update.callback_query.data) {
          const cq = update.callback_query;
          await handleCallbackQuery(cq.id, cq.message!.chat.id, cq.message!.message_id, cq.data!);
        }
      }
    }
  } catch (err) {
    if (err instanceof Error && err.name !== "TimeoutError" && err.name !== "AbortError") {
      console.error("Telegram polling error:", err.message);
    }
  } finally {
    pollingAbortController = null;
  }
}

async function stopBot(): Promise<void> {
  pollingActive = false;
  if (pollingAbortController) {
    pollingAbortController.abort();
  }
}

async function restartBot(botToken: string, chatId: string): Promise<void> {
  await stopBot();
  await new Promise((r) => setTimeout(r, 200));
  currentBotToken = botToken;
  apiBase = buildApiBase(botToken);
  initConfiguredChatId(chatId);
  pollingOffset = 0;
  pollingActive = true;
  try { await fetch(`${apiBase}/deleteWebhook`); } catch {}
  console.log("Telegram bot (re)started with new config");
  const loop = async () => { while (pollingActive) { await pollUpdates(); } };
  loop();
}

export async function startTelegramBot(): Promise<void> {
  const { botToken, chatId } = await loadConfig();
  if (!botToken) {
    console.log("TELEGRAM_BOT_TOKEN not set, skipping Telegram bot");
    return;
  }
  await restartBot(botToken, chatId || "");
}

export async function sendContactFormNotification(data: {
  firstName: string; lastName: string; email: string; subject: string; message: string;
}): Promise<void> {
  if (!currentBotToken) return;
  const text = [
    `📬  <b>New Contact Form</b>`,
    "━".repeat(30),
    `👤  <b>${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</b>`,
    `📧  ${escapeHtml(data.email)}`,
    `📂  <b>Type</b>     ${escapeHtml(data.subject)}`,
    "",
    `💬  <b>Message</b>`,
    `${escapeHtml(data.message)}`,
  ].join("\n");
  for (const chatId of getChatIds()) await sendMessage(chatId, text);
}

export async function sendMessageToAllChats(text: string): Promise<void> {
  if (!currentBotToken) return;
  for (const chatId of getChatIds()) await sendMessage(chatId, text);
}

export async function sendTestMessage(): Promise<{ ok: boolean; error?: string }> {
  const { botToken, chatId } = await loadConfig();
  if (!botToken || !chatId) {
    return { ok: false, error: "Bot token and chat ID must be configured first" };
  }
  try {
    const res = await fetch(`${buildApiBase(botToken)}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `<b>CoinGuard Test Message</b>\n\nYour Telegram integration is working correctly! You will now receive notifications for new sign-ups and contact form submissions.`,
        parse_mode: "HTML",
      }),
    });
    const data = await res.json() as { ok: boolean; description?: string };
    if (!data.ok) return { ok: false, error: data.description || "Telegram API error" };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

async function sendDirectMessage(botToken: string, chatId: string, text: string): Promise<boolean> {
  try {
    const res = await fetch(`${buildApiBase(botToken)}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    const data = await res.json() as { ok: boolean; description?: string };
    return data.ok;
  } catch {
    return false;
  }
}

export interface ReportOptions {
  includeUsers?: boolean;
  includeUserCards?: boolean;
  includeApplications?: boolean;
  includeInquiries?: boolean;
}

export async function sendStatsReport(opts: ReportOptions = {}): Promise<{ ok: boolean; error?: string }> {
  const {
    includeUsers = true,
    includeUserCards = true,
    includeApplications = true,
    includeInquiries = true,
  } = opts;

  const { botToken, chatId } = await loadConfig();
  if (!botToken || !chatId) {
    return { ok: false, error: "Bot token and chat ID must be configured first" };
  }
  try {
    const [users, apps, inquiries] = await Promise.all([
      storage.getAllUsers(),
      storage.getAllInsuranceApplications(),
      storage.getAllContactInquiries(),
    ]);
    const approved = users.filter((u) => u.applicationStatus === "approved").length;
    const pending = users.filter((u) => u.applicationStatus === "pending").length;
    const rejected = users.filter((u) => u.applicationStatus === "rejected").length;
    const onboarded = users.filter((u) => u.onboardingComplete).length;
    const now = new Date().toUTCString();

    // ── Header Summary ─────────────────────────────────────────
    const headerLines = [
      `📊  <b>CoinGuard Admin Report</b>`,
      `<i>${escapeHtml(now)}</i>`,
      `${"━".repeat(28)}`,
    ];
    if (includeUsers) {
      headerLines.push(
        ``,
        `👥  <b>Users</b>`,
        `  📋  Total: <b>${users.length}</b>`,
        `  ✅  Approved: <b>${approved}</b>`,
        `  ⏳  Pending: <b>${pending}</b>`,
        `  ❌  Rejected: <b>${rejected}</b>`,
        `  🎯  Onboarded: <b>${onboarded}</b>`,
      );
    }
    if (includeApplications) {
      headerLines.push(
        ``,
        `🛡️  <b>Insurance Applications</b>`,
        `  Total: <b>${apps.length}</b>`,
        `  ⏳  Pending: <b>${apps.filter((a) => a.status === "pending").length}</b>`,
        `  ✅  Approved: <b>${apps.filter((a) => a.status === "approved").length}</b>`,
      );
    }
    if (includeInquiries) {
      headerLines.push(
        ``,
        `📬  <b>Contact Inquiries</b>`,
        `  Total: <b>${inquiries.length}</b>`,
      );
    }
    await sendDirectMessage(botToken, chatId, headerLines.join("\n"));

    // ── Individual User Cards ───────────────────────────────────
    if (includeUserCards && users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        const u = users[i];
        const card = formatUserCard(u, i);
        await sendDirectMessage(botToken, chatId, card);
        if (i < users.length - 1) await new Promise((r) => setTimeout(r, 200));
      }
    }

    // ── Insurance Applications Detail ──────────────────────────
    if (includeApplications && apps.length > 0) {
      const appsHeader = [`🛡️  <b>Insurance Applications — Full Detail</b>`, `${"─".repeat(28)}`];
      await sendDirectMessage(botToken, chatId, appsHeader.join("\n"));
      for (let i = 0; i < apps.length; i++) {
        const a = apps[i];
        const lines = [
          `<b>#${i + 1}  ${escapeHtml(a.fullName)}</b>`,
          `─`.repeat(28),
          `📧  <b>Email</b>    ${escapeHtml(a.email)}`,
          `📱  <b>Phone</b>    ${escapeHtml(a.phone || "—")}`,
          `🏠  <b>Address</b>  ${escapeHtml(a.address || "—")}`,
          ``,
          `🪙  <b>Coins</b>    ${a.selectedCoins && a.selectedCoins.length > 0 ? a.selectedCoins.join(", ") : "—"}`,
          `👤  <b>Identity</b> ${a.identityVerified ? "✅ Verified" : "❌ Not verified"}`,
          `📄  <b>Terms</b>    ${a.termsAccepted ? "✅ Accepted" : "❌ Not accepted"}`,
          a.beneficiaryName ? `🤝  <b>Beneficiary</b> ${escapeHtml(a.beneficiaryName)} (${escapeHtml(a.beneficiaryRelationship || "—")})` : "",
          ``,
          `${statusBadge(a.status)}`,
          `📅  ${a.createdAt ? new Date(a.createdAt).toUTCString() : "—"}`,
        ].filter(Boolean);
        await sendDirectMessage(botToken, chatId, lines.join("\n"));
        if (i < apps.length - 1) await new Promise((r) => setTimeout(r, 200));
      }
    }

    // ── Contact Inquiries Detail ────────────────────────────────
    if (includeInquiries && inquiries.length > 0) {
      const inqHeader = [`📬  <b>Contact Inquiries — Full Detail</b>`, `${"─".repeat(28)}`];
      await sendDirectMessage(botToken, chatId, inqHeader.join("\n"));
      for (let i = 0; i < inquiries.length; i++) {
        const q = inquiries[i];
        const lines = [
          `<b>#${i + 1}  ${escapeHtml(q.name)}</b>`,
          `─`.repeat(28),
          `📧  <b>Email</b>    ${escapeHtml(q.email)}`,
          `📂  <b>Type</b>     ${escapeHtml(q.type || "general")}`,
          `📅  ${q.createdAt ? new Date(q.createdAt).toUTCString() : "—"}`,
          ``,
          `💬  <b>Message:</b>`,
          escapeHtml(q.message),
        ];
        await sendDirectMessage(botToken, chatId, lines.join("\n"));
        if (i < inquiries.length - 1) await new Promise((r) => setTimeout(r, 200));
      }
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
