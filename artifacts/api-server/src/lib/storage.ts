import {
  type User,
  type InsertUser,
  type InsuranceApplication,
  type InsertInsuranceApplication,
  type ContactInquiry,
  type InsertContactInquiry,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  users,
  insuranceApplications,
  contactInquiries,
  analyticsEvents,
  platformSettings,
} from "@workspace/db";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, gte, desc, sql } from "drizzle-orm";
import pg from "pg";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByPhone(phone: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createInsuranceApplication(app: InsertInsuranceApplication): Promise<InsuranceApplication>;
  getInsuranceApplication(id: string): Promise<InsuranceApplication | undefined>;
  getAllInsuranceApplications(): Promise<InsuranceApplication[]>;
  deleteUser(id: string): Promise<boolean>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getAllContactInquiries(): Promise<ContactInquiry[]>;
  getSetting(key: string): Promise<string | undefined>;
  setSetting(key: string, value: string): Promise<void>;
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsEvents(since?: Date): Promise<AnalyticsEvent[]>;
  getSessionLog(since?: Date, limit?: number): Promise<{
    sessionId: string;
    firstSeen: Date;
    lastSeen: Date;
    durationSeconds: number;
    pages: string[];
    pageCount: number;
    countryCode: string;
    countryName: string;
    city: string;
    device: string;
    browser: string;
    source: string;
    ip: string;
    visitorId: string;
  }[]>;
  getAnalyticsSummary(since?: Date): Promise<{
    totalPageViews: number;
    uniqueSessions: number;
    uniqueVisitors: number;
    bounceRate: number;
    topPages: { page: string; count: number }[];
    topReferrers: { referrer: string; count: number }[];
    topCountries: { country: string; count: number }[];
    eventBreakdown: { eventType: string; count: number }[];
    dailyViews: { date: string; count: number }[];
    hourlyDistribution: { hour: number; count: number }[];
    deviceBreakdown: { device: string; count: number }[];
    browserBreakdown: { browser: string; count: number }[];
    avgTimeOnPage: { page: string; avgSeconds: number; samples: number }[];
  }>;
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.phone, phone));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const { id: _, ...updateData } = data;
    const [user] = await db.update(users).set(updateData).where(eq(users.id, id)).returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async createInsuranceApplication(app: InsertInsuranceApplication): Promise<InsuranceApplication> {
    const [application] = await db.insert(insuranceApplications).values(app).returning();
    return application;
  }

  async getInsuranceApplication(id: string): Promise<InsuranceApplication | undefined> {
    const [application] = await db.select().from(insuranceApplications).where(eq(insuranceApplications.id, id));
    return application;
  }

  async getAllInsuranceApplications(): Promise<InsuranceApplication[]> {
    return db.select().from(insuranceApplications);
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
  }

  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [created] = await db.insert(contactInquiries).values(inquiry).returning();
    return created;
  }

  async getAllContactInquiries(): Promise<ContactInquiry[]> {
    return db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }

  async getSetting(key: string): Promise<string | undefined> {
    const [row] = await db.select().from(platformSettings).where(eq(platformSettings.key, key));
    return row?.value;
  }

  async setSetting(key: string, value: string): Promise<void> {
    await db.insert(platformSettings).values({ key, value })
      .onConflictDoUpdate({ target: platformSettings.key, set: { value, updatedAt: sql`now()` } });
  }

  async createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [created] = await db.insert(analyticsEvents).values(event).returning();
    return created;
  }

  async getAnalyticsEvents(since?: Date): Promise<AnalyticsEvent[]> {
    if (since) {
      return db.select().from(analyticsEvents).where(gte(analyticsEvents.createdAt, since));
    }
    return db.select().from(analyticsEvents);
  }

  async getSessionLog(since?: Date, limit = 500): Promise<{
    sessionId: string;
    firstSeen: Date;
    lastSeen: Date;
    durationSeconds: number;
    pages: string[];
    pageCount: number;
    countryCode: string;
    countryName: string;
    city: string;
    device: string;
    browser: string;
    source: string;
    ip: string;
    visitorId: string;
  }[]> {
    const events = since
      ? await db.select().from(analyticsEvents).where(gte(analyticsEvents.createdAt, since)).orderBy(desc(analyticsEvents.createdAt))
      : await db.select().from(analyticsEvents).orderBy(desc(analyticsEvents.createdAt));

    const sessionMap: Record<string, {
      firstSeen: Date; lastSeen: Date; pages: string[]; countryCode: string;
      countryName: string; city: string; device: string; browser: string;
      source: string; ip: string; visitorId: string;
    }> = {};

    for (const event of events) {
      if (!event.sessionId) continue;
      const meta = (event.metadata as Record<string, unknown>) || {};
      const sid = event.sessionId;
      const ts = event.createdAt || new Date();

      if (!sessionMap[sid]) {
        sessionMap[sid] = {
          firstSeen: ts, lastSeen: ts, pages: [], countryCode: event.country || "",
          countryName: (meta.countryName as string) || "", city: (meta.city as string) || "",
          device: (meta.deviceType as string) || "desktop", browser: (meta.browser as string) || "Other",
          source: (meta.trafficSource as string) || "Direct",
          ip: typeof meta.ip === "string" ? meta.ip.split(".").slice(0, 2).join(".") + ".*.*" : "",
          visitorId: (meta.visitorId as string) || "",
        };
      }

      const s = sessionMap[sid];
      if (ts < s.firstSeen) s.firstSeen = ts;
      if (ts > s.lastSeen) s.lastSeen = ts;
      if (!s.countryCode && event.country) s.countryCode = event.country;
      if (!s.countryName && meta.countryName) s.countryName = meta.countryName as string;
      if (!s.city && meta.city) s.city = meta.city as string;
      if (!s.visitorId && meta.visitorId) s.visitorId = meta.visitorId as string;
      if (!s.ip && typeof meta.ip === "string") s.ip = meta.ip.split(".").slice(0, 2).join(".") + ".*.*";
      if (event.eventType === "page_view" && event.page && !s.pages.includes(event.page)) {
        s.pages.push(event.page);
      }
    }

    return Object.entries(sessionMap)
      .map(([sid, s]) => ({
        sessionId: sid,
        firstSeen: s.firstSeen,
        lastSeen: s.lastSeen,
        durationSeconds: Math.max(0, Math.round((s.lastSeen.getTime() - s.firstSeen.getTime()) / 1000)),
        pages: s.pages,
        pageCount: s.pages.length || 1,
        countryCode: s.countryCode,
        countryName: s.countryName,
        city: s.city,
        device: s.device,
        browser: s.browser,
        source: s.source,
        ip: s.ip,
        visitorId: s.visitorId,
      }))
      .sort((a, b) => b.firstSeen.getTime() - a.firstSeen.getTime())
      .slice(0, limit);
  }

  async getAnalyticsSummary(since?: Date): Promise<{
    totalPageViews: number;
    uniqueSessions: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgSessionDuration: number;
    topPages: { page: string; count: number; avgSeconds: number }[];
    topReferrers: { referrer: string; count: number }[];
    topCountries: { countryCode: string; countryName: string; count: number }[];
    topCities: { city: string; countryCode: string; countryName: string; count: number }[];
    eventBreakdown: { eventType: string; count: number }[];
    dailyViews: { date: string; count: number }[];
    hourlyDistribution: { hour: number; count: number }[];
    deviceBreakdown: { device: string; count: number }[];
    browserBreakdown: { browser: string; count: number }[];
    avgTimeOnPage: { page: string; avgSeconds: number; samples: number }[];
    trafficSources: { source: string; count: number; percentage: number }[];
    topClicks: { label: string; type: string; page: string; count: number }[];
    utmCampaigns: { campaign: string; source: string; medium: string; sessions: number }[];
    landingPages: { page: string; sessions: number }[];
  }> {
    const events = await this.getAnalyticsEvents(since);
    const pageViews = events.filter((e) => e.eventType === "page_view");
    const pageLeaves = events.filter((e) => e.eventType === "page_leave");
    const clickEvents = events.filter((e) => e.eventType === "click");

    const uniqueSessions = new Set(pageViews.map((e) => e.sessionId).filter(Boolean)).size;

    const visitorIds = new Set<string>();
    const pageCounts: Record<string, number> = {};
    const referrerCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};
    const eventTypeCounts: Record<string, number> = {};
    const dailyCounts: Record<string, number> = {};
    const hourlyCounts: Record<number, number> = {};
    const deviceCounts: Record<string, number> = {};
    const browserCounts: Record<string, number> = {};
    const sessionPageCount: Record<string, number> = {};
    const trafficSourceCounts: Record<string, number> = {};
    const sessionTrafficSource: Record<string, string> = {};
    const utmSessionMap: Record<string, { campaign: string; source: string; medium: string }> = {};
    const landingPageBySession: Record<string, string> = {};
    const countryNameMap: Record<string, string> = {};
    const cityCounts: Record<string, { city: string; countryCode: string; countryName: string; count: number }> = {};

    for (const event of events) {
      const meta = event.metadata as Record<string, unknown> | null;

      if (meta?.visitorId && typeof meta.visitorId === "string") {
        visitorIds.add(meta.visitorId);
      }

      eventTypeCounts[event.eventType] = (eventTypeCounts[event.eventType] || 0) + 1;

      if (event.createdAt) {
        const day = event.createdAt.toISOString().split("T")[0];
        dailyCounts[day] = (dailyCounts[day] || 0) + 1;
        const hour = event.createdAt.getHours();
        hourlyCounts[hour] = (hourlyCounts[hour] || 0) + 1;
      }

      if (event.eventType === "page_view") {
        if (event.page) pageCounts[event.page] = (pageCounts[event.page] || 0) + 1;
        if (event.referrer) referrerCounts[event.referrer] = (referrerCounts[event.referrer] || 0) + 1;
        if (event.country) {
          countryCounts[event.country] = (countryCounts[event.country] || 0) + 1;
          const cName = (meta?.countryName as string) || "";
          if (cName && !countryNameMap[event.country]) countryNameMap[event.country] = cName;
          const city = (meta?.city as string) || "";
          if (city) {
            const cityKey = `${city}::${event.country}`;
            if (!cityCounts[cityKey]) {
              cityCounts[cityKey] = { city, countryCode: event.country, countryName: cName, count: 0 };
            }
            cityCounts[cityKey].count += 1;
            if (cName && !cityCounts[cityKey].countryName) cityCounts[cityKey].countryName = cName;
          }
        }
        if (event.sessionId) {
          sessionPageCount[event.sessionId] = (sessionPageCount[event.sessionId] || 0) + 1;
          if (!landingPageBySession[event.sessionId] && event.page) {
            landingPageBySession[event.sessionId] = event.page;
          }
        }

        const deviceType = (meta?.deviceType as string) || "desktop";
        deviceCounts[deviceType] = (deviceCounts[deviceType] || 0) + 1;

        const browser = (meta?.browser as string) || "Other";
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;

        const trafficSource = (meta?.trafficSource as string) || "";
        if (trafficSource && event.sessionId && !sessionTrafficSource[event.sessionId]) {
          sessionTrafficSource[event.sessionId] = trafficSource;
          trafficSourceCounts[trafficSource] = (trafficSourceCounts[trafficSource] || 0) + 1;
        } else if (!trafficSource && event.sessionId && !sessionTrafficSource[event.sessionId]) {
          sessionTrafficSource[event.sessionId] = "Direct";
          trafficSourceCounts["Direct"] = (trafficSourceCounts["Direct"] || 0) + 1;
        }

        if (event.sessionId) {
          const campaign = (meta?.utm_campaign as string) || "";
          const utmSource = (meta?.utm_source as string) || "";
          const medium = (meta?.utm_medium as string) || "";
          if (campaign && !utmSessionMap[event.sessionId]) {
            utmSessionMap[event.sessionId] = { campaign, source: utmSource, medium };
          }
        }
      }
    }

    const timeOnPageMap: Record<string, { total: number; count: number }> = {};
    const sessionDurations: number[] = [];

    for (const event of pageLeaves) {
      const meta = event.metadata as Record<string, unknown> | null;
      const page = (meta?.page as string) || event.page || "";
      const timeOnPage = meta?.timeOnPage as number | undefined;
      if (page && typeof timeOnPage === "number" && timeOnPage > 0 && timeOnPage < 3600) {
        if (!timeOnPageMap[page]) timeOnPageMap[page] = { total: 0, count: 0 };
        timeOnPageMap[page].total += timeOnPage;
        timeOnPageMap[page].count += 1;
        sessionDurations.push(timeOnPage);
      }
    }

    const clickCounts: Record<string, { label: string; type: string; page: string; count: number }> = {};
    for (const event of clickEvents) {
      const meta = event.metadata as Record<string, unknown> | null;
      const label = (meta?.element_label as string) || "";
      const type = (meta?.element_type as string) || "element";
      const page = event.page || "";
      if (!label) continue;
      const key = `${page}::${label}`;
      if (!clickCounts[key]) clickCounts[key] = { label, type, page, count: 0 };
      clickCounts[key].count += 1;
    }

    const bounceSessions = Object.values(sessionPageCount).filter((c) => c === 1).length;
    const bounceRate = uniqueSessions > 0 ? Math.round((bounceSessions / uniqueSessions) * 100) : 0;
    const avgSessionDuration = sessionDurations.length > 0
      ? Math.round(sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length)
      : 0;

    const sortByCount = (obj: Record<string, number>) =>
      Object.entries(obj).sort(([, a], [, b]) => b - a).slice(0, 10).map(([key, count]) => ({ key, count }));

    const totalTrafficSessions = Object.values(trafficSourceCounts).reduce((a, b) => a + b, 0) || 1;
    const trafficSources = Object.entries(trafficSourceCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([source, count]) => ({ source, count, percentage: Math.round((count / totalTrafficSessions) * 100) }));

    const utmCampaignMap: Record<string, { campaign: string; source: string; medium: string; sessions: number }> = {};
    for (const { campaign, source, medium } of Object.values(utmSessionMap)) {
      const key = `${campaign}::${source}::${medium}`;
      if (!utmCampaignMap[key]) utmCampaignMap[key] = { campaign, source, medium, sessions: 0 };
      utmCampaignMap[key].sessions += 1;
    }

    const landingPageCounts: Record<string, number> = {};
    for (const page of Object.values(landingPageBySession)) {
      landingPageCounts[page] = (landingPageCounts[page] || 0) + 1;
    }

    const pageTimeMap: Record<string, { total: number; count: number }> = {};
    for (const [page, data] of Object.entries(timeOnPageMap)) {
      pageTimeMap[page] = data;
    }

    const hourlyDistribution = Array.from({ length: 24 }, (_, h) => ({ hour: h, count: hourlyCounts[h] || 0 }));

    return {
      totalPageViews: pageViews.length,
      uniqueSessions,
      uniqueVisitors: visitorIds.size,
      bounceRate,
      avgSessionDuration,
      topPages: sortByCount(pageCounts).map((e) => ({
        page: e.key,
        count: e.count,
        avgSeconds: pageTimeMap[e.key] ? Math.round(pageTimeMap[e.key].total / pageTimeMap[e.key].count) : 0,
      })),
      topReferrers: sortByCount(referrerCounts).map((e) => ({ referrer: e.key, count: e.count })),
      topCountries: sortByCount(countryCounts).map((e) => ({
        countryCode: e.key,
        countryName: countryNameMap[e.key] || "",
        count: e.count,
      })),
      topCities: Object.values(cityCounts).sort((a, b) => b.count - a.count).slice(0, 20),
      eventBreakdown: sortByCount(eventTypeCounts).map((e) => ({ eventType: e.key, count: e.count })),
      dailyViews: Object.entries(dailyCounts).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)),
      hourlyDistribution,
      deviceBreakdown: sortByCount(deviceCounts).map((e) => ({ device: e.key, count: e.count })),
      browserBreakdown: sortByCount(browserCounts).map((e) => ({ browser: e.key, count: e.count })),
      avgTimeOnPage: Object.entries(timeOnPageMap)
        .map(([page, { total, count }]) => ({ page, avgSeconds: Math.round(total / count), samples: count }))
        .sort((a, b) => b.samples - a.samples).slice(0, 10),
      trafficSources,
      topClicks: Object.values(clickCounts).sort((a, b) => b.count - a.count).slice(0, 20),
      utmCampaigns: Object.values(utmCampaignMap).sort((a, b) => b.sessions - a.sessions).slice(0, 20),
      landingPages: Object.entries(landingPageCounts)
        .sort(([, a], [, b]) => b - a).slice(0, 10)
        .map(([page, sessions]) => ({ page, sessions })),
    };
  }
}

export const storage = new DatabaseStorage();
