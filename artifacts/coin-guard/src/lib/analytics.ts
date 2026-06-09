const SESSION_KEY = "cg_session_id";
const VISITOR_KEY = "cg_visitor_id";
const UTM_KEY = "cg_utm_params";
let pageEnterTime = Date.now();
let currentPage = "";

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(SESSION_KEY, id); }
  return id;
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(VISITOR_KEY, id); }
    return id;
  } catch { return "anonymous"; }
}

function detectDevice(): "mobile" | "tablet" | "desktop" {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return "mobile";
  return "desktop";
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera/")) return "Opera";
  if (ua.includes("Chrome/") && !ua.includes("Chromium")) return "Chrome";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Safari/") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Chromium/")) return "Chromium";
  return "Other";
}

function isLikelyBot(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  const botPatterns = [
    "googlebot", "bingbot", "baiduspider", "yandexbot", "duckduckbot",
    "slurp", "sogou", "exabot", "ia_archiver", "headlesschrome",
    "phantomjs", "selenium", "webdriver", "python-requests", "go-http-client",
    "curl/", "wget/", "scrapy", "httrack",
  ];
  if (botPatterns.some((p) => ua.includes(p))) return true;
  if (typeof navigator.webdriver !== "undefined" && navigator.webdriver) return true;
  return false;
}

const CLICK_ID_KEY = "cg_click_ids";

function captureClickIds(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const clickIdKeys = ["gclid", "fbclid", "rdt_cid", "rdt_r", "ttclid", "msclkid", "li_fat_id", "twclid"];
  const result: Record<string, string> = {};
  let hasClickId = false;
  for (const key of clickIdKeys) {
    const val = params.get(key);
    if (val) { result[key] = val; hasClickId = true; }
  }
  if (hasClickId) {
    try { sessionStorage.setItem(CLICK_ID_KEY, JSON.stringify(result)); } catch {}
    return result;
  }
  try {
    const stored = sessionStorage.getItem(CLICK_ID_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

function captureUTMParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const result: Record<string, string> = {};
  let hasUtm = false;
  for (const key of utmKeys) {
    const val = params.get(key);
    if (val) { result[key] = val; hasUtm = true; }
  }
  if (hasUtm) {
    try { sessionStorage.setItem(UTM_KEY, JSON.stringify(result)); } catch {}
    return result;
  }
  try {
    const stored = sessionStorage.getItem(UTM_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

function classifyTrafficSource(utm: Record<string, string>, clickIds: Record<string, string>): string {
  const src = (utm.utm_source || "").toLowerCase();
  const med = (utm.utm_medium || "").toLowerCase();
  const isPaid = ["cpc", "paid", "ppc", "cpm", "display", "paidsocial", "paid_social", "social", "paidsearch", "banner"].includes(med);

  // UTM-based classification (most accurate)
  if (src === "google" && isPaid) return "Google Ads";
  if ((src === "facebook" || src === "fb") && isPaid) return "Facebook Ads";
  if (src === "instagram" && isPaid) return "Instagram Ads";
  if (src === "reddit" && isPaid) return "Reddit Ads";
  if ((src === "twitter" || src === "x") && isPaid) return "Twitter Ads";
  if (src === "linkedin" && isPaid) return "LinkedIn Ads";
  if (src === "tiktok" && isPaid) return "TikTok Ads";
  if (src === "bing" && isPaid) return "Bing Ads";
  if (src && isPaid) return `${utm.utm_source} (Paid)`;
  if (src) return utm.utm_source;

  // Click ID fallback — ad platform auto-appended IDs with no UTM config
  if (clickIds.gclid) return "Google Ads";
  if (clickIds.fbclid) return "Facebook Ads";
  if (clickIds.rdt_cid || clickIds.rdt_r) return "Reddit Ads";
  if (clickIds.ttclid) return "TikTok Ads";
  if (clickIds.msclkid) return "Bing Ads";
  if (clickIds.li_fat_id) return "LinkedIn Ads";
  if (clickIds.twclid) return "Twitter Ads";

  // Referrer-based fallback
  try {
    if (!document.referrer) return "Direct";
    const hostname = new URL(document.referrer).hostname.toLowerCase();
    if (hostname === window.location.hostname) return "";
    if (hostname.includes("google.")) return "Organic Search";
    if (hostname.includes("bing.")) return "Bing Search";
    if (hostname.includes("yahoo.")) return "Yahoo Search";
    if (hostname.includes("facebook.") || hostname.includes("fb.com")) return "Facebook";
    if (hostname.includes("instagram.")) return "Instagram";
    if (hostname.includes("reddit.")) return "Reddit";
    if (hostname.includes("twitter.") || hostname.includes("t.co")) return "Twitter / X";
    if (hostname.includes("linkedin.")) return "LinkedIn";
    if (hostname.includes("youtube.")) return "YouTube";
    if (hostname.includes("tiktok.")) return "TikTok";
    return hostname;
  } catch { return "Direct"; }
}

function getReferrerDomain(): string {
  try {
    if (!document.referrer) return "direct";
    const url = new URL(document.referrer);
    if (url.hostname === window.location.hostname) return "";
    return url.hostname;
  } catch { return "direct"; }
}

let clickDebounceTimer: ReturnType<typeof setTimeout> | null = null;
let lastClickKey = "";

function initClickTracking() {
  document.addEventListener("click", (e) => {
    if (isLikelyBot()) return;
    if (window.location.pathname.includes("/admin")) return;

    const target = e.target as HTMLElement;
    if (!target) return;

    const link = target.closest("a");
    const button = target.closest("button");
    const el = (link || button || target) as HTMLElement;

    let label = (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
    if (!label) label = el.getAttribute("aria-label") || el.getAttribute("title") || "";
    if (!label || label.length < 2) return;

    const href = link?.href ? (() => { try { return new URL(link.href).pathname; } catch { return link.href.slice(0, 80); } })() : "";
    const elType = link ? "link" : button ? "button" : "element";
    const clickKey = `${elType}:${label}`;

    if (clickKey === lastClickKey && clickDebounceTimer) return;
    lastClickKey = clickKey;
    if (clickDebounceTimer) clearTimeout(clickDebounceTimer);
    clickDebounceTimer = setTimeout(() => { lastClickKey = ""; clickDebounceTimer = null; }, 800);

    trackEvent("click", { element_label: label, element_type: elType, href });
  }, { passive: true });
}

export function trackEvent(eventType: string, metadata?: Record<string, unknown>) {
  if (isLikelyBot()) return;
  const utm = captureUTMParams();
  const clickIds = captureClickIds();
  const trafficSource = classifyTrafficSource(utm, clickIds);
  const referrer = getReferrerDomain();
  const payload = {
    eventType,
    page: window.location.pathname,
    referrer: referrer || undefined,
    sessionId: getSessionId(),
    metadata: {
      ...metadata,
      visitorId: getVisitorId(),
      deviceType: detectDevice(),
      browser: detectBrowser(),
      ...(trafficSource ? { trafficSource } : {}),
      ...utm,
      ...(Object.keys(clickIds).length > 0 ? { clickIds } : {}),
    },
  };

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics/track", new Blob([JSON.stringify(payload)], { type: "application/json" }));
  } else {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
}

function trackPageLeave() {
  if (!currentPage) return;
  const timeOnPage = Math.round((Date.now() - pageEnterTime) / 1000);
  if (timeOnPage < 1) return;
  const utm = captureUTMParams();
  const clickIds = captureClickIds();
  const trafficSource = classifyTrafficSource(utm, clickIds);
  const payload = {
    eventType: "page_leave",
    page: currentPage,
    sessionId: getSessionId(),
    metadata: {
      visitorId: getVisitorId(),
      deviceType: detectDevice(),
      browser: detectBrowser(),
      timeOnPage,
      ...(trafficSource ? { trafficSource } : {}),
      ...utm,
    },
  };
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics/track", new Blob([JSON.stringify(payload)], { type: "application/json" }));
  }
}

export function trackPageView() {
  if (isLikelyBot()) return;
  pageEnterTime = Date.now();
  currentPage = window.location.pathname;
  trackEvent("page_view");
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", trackPageLeave);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      trackPageLeave();
      pageEnterTime = Date.now();
    }
  });
  initClickTracking();
}

let lastTrackedPath = "";

export function usePageTracking() {
  const path = window.location.pathname;
  if (path !== lastTrackedPath) {
    if (lastTrackedPath) trackPageLeave();
    lastTrackedPath = path;
    pageEnterTime = Date.now();
    currentPage = path;
    trackPageView();
  }
}
