import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  plaintextPassword: text("plaintext_password"),
  name: text("name"),
  phone: text("phone"),
  country: text("country"),
  taxYear: text("tax_year"),
  selectedGoals: text("selected_goals").array().default(sql`'{}'::text[]`),
  tradingFrequency: text("trading_frequency"),
  tradesMemeCoins: boolean("trades_meme_coins").default(false),
  portfolioValue: text("portfolio_value"),
  walletType: text("wallet_type"),
  applicationStatus: text("application_status").default("pending"),
  onboardingComplete: boolean("onboarding_complete").default(false),
  registrationIp: text("registration_ip"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insuranceApplications = pgTable("insurance_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  address: text("address"),
  identityVerified: boolean("identity_verified").default(false),
  selectedCoins: text("selected_coins").array().default(sql`'{}'::text[]`),
  beneficiaryName: text("beneficiary_name"),
  beneficiaryRelationship: text("beneficiary_relationship"),
  beneficiaryAllocation: integer("beneficiary_allocation"),
  termsAccepted: boolean("terms_accepted").default(false),
  signatureData: text("signature_data"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  type: text("type").default("general"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: text("event_type").notNull(),
  page: text("page"),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  country: text("country"),
  sessionId: text("session_id"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  createdAt: true,
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const applicationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Valid phone number is required"),
});

export const checkStatusSchema = z.object({
  phone: z.string().min(7, "Valid phone number is required"),
});

export const insertInsuranceApplicationSchema = createInsertSchema(insuranceApplications).omit({
  id: true,
  createdAt: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
});

export const platformSettings = pgTable("platform_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type PlatformSetting = typeof platformSettings.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertInsuranceApplication = z.infer<typeof insertInsuranceApplicationSchema>;
export type InsuranceApplication = typeof insuranceApplications.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
