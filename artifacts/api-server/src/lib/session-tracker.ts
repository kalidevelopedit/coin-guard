interface PageVisit {
  page: string;
  enteredAt: number;
  exitedAt?: number;
  duration?: number;
}

interface SessionActivity {
  sessionId: string;
  ip: string;
  userAgent: string;
  referrer: string;
  pages: PageVisit[];
  firstSeen: number;
  lastActivity: number;
  reported: boolean;
}

const activeSessions = new Map<string, SessionActivity>();
const INACTIVITY_THRESHOLD = 20 * 60 * 1000;
const CHECK_INTERVAL = 60 * 1000;

let sendReportFn: ((report: string) => Promise<void>) | null = null;
let checkTimer: ReturnType<typeof setInterval> | null = null;

export function setSendReportFunction(fn: (report: string) => Promise<void>) {
  sendReportFn = fn;
}

export function recordPageView(data: {
  sessionId: string;
  page: string;
  ip?: string;
  userAgent?: string;
  referrer?: string;
}) {
  const now = Date.now();
  let session = activeSessions.get(data.sessionId);
  if (!session) {
    session = {
      sessionId: data.sessionId,
      ip: data.ip || "Unknown",
      userAgent: data.userAgent || "Unknown",
      referrer: data.referrer || "direct",
      pages: [],
      firstSeen: now,
      lastActivity: now,
      reported: false,
    };
    activeSessions.set(data.sessionId, session);
  }
  if (session.pages.length > 0) {
    const lastPage = session.pages[session.pages.length - 1];
    if (!lastPage.exitedAt) {
      lastPage.exitedAt = now;
      lastPage.duration = now - lastPage.enteredAt;
    }
  }
  session.pages.push({ page: data.page, enteredAt: now });
  session.lastActivity = now;
  session.reported = false;
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s`;
}

async function checkInactiveSessions() {
  if (!sendReportFn) return;
  const now = Date.now();
  for (const [sessionId, session] of activeSessions) {
    const inactive = now - session.lastActivity;
    if (inactive >= INACTIVITY_THRESHOLD && !session.reported && session.pages.length >= 1) {
      const totalDuration = session.lastActivity - session.firstSeen;
      const report = [
        `<b>Visitor Activity Report</b>`,
        `<b>Session:</b> ${session.sessionId.slice(0, 8)}...`,
        `<b>IP:</b> ${session.ip}`,
        `<b>Referrer:</b> ${session.referrer}`,
        `<b>Duration:</b> ${formatDuration(totalDuration)}`,
        `<b>Pages:</b> ${session.pages.length}`,
        `<b>Journey:</b> ${session.pages.map((p) => p.page).join(" > ")}`,
      ].join("\n");
      session.reported = true;
      try { await sendReportFn(report); } catch {}
    }
    if (inactive > 60 * 60 * 1000) activeSessions.delete(sessionId);
  }
}

export function startSessionTracker() {
  if (checkTimer) return;
  checkTimer = setInterval(checkInactiveSessions, CHECK_INTERVAL);
}

export function stopSessionTracker() {
  if (checkTimer) { clearInterval(checkTimer); checkTimer = null; }
}
