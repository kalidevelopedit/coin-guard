import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  ShieldCheck,
  MessageSquare,
  Activity,
  CheckCircle,
  Clock,
  Globe,
  Target,
  Loader2,
  Eye,
  EyeOff,
  Wallet,
  XCircle,
  BarChart3,
  TrendingUp,
  MousePointer,
  Link2,
  MapPin,
  Send,
  Bot,
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  Zap,
} from "lucide-react";
import type { User, InsuranceApplication, ContactInquiry } from "@shared/schema";

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  testId,
  onClick,
}: {
  title: string;
  value: number;
  icon: typeof Users;
  description: string;
  testId: string;
  onClick?: () => void;
}) {
  return (
    <Card
      data-testid={testId}
      onClick={onClick}
      className={onClick ? "cursor-pointer hover:bg-muted/30 transition-colors" : ""}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

function UsersTable({ users }: { users: User[] }) {
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});

  const togglePassword = (userId: string) => {
    setRevealedPasswords((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const statusMutation = useMutation({
    mutationFn: async ({ userId, applicationStatus }: { userId: string; applicationStatus: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${userId}/status`, { applicationStatus });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiRequest("DELETE", `/api/admin/users/${userId}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground" data-testid="text-no-users">
        No users have signed up yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" data-testid="table-users">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Username</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Password</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Phone</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Country</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">IP Address</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Registered</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Wallet Type</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Goals</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-border hover:bg-muted/30 transition-colors"
              data-testid={`row-user-${user.id}`}
            >
              <td className="py-3 px-4 font-medium text-foreground">{user.username}</td>
              <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <span className="text-foreground font-mono text-xs">
                    {revealedPasswords[user.id] ? (user.plaintextPassword || user.password) : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
                  </span>
                  <button
                    onClick={() => togglePassword(user.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`button-toggle-password-${user.id}`}
                  >
                    {revealedPasswords[user.id] ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </td>
              <td className="py-3 px-4 text-foreground">{user.name || "-"}</td>
              <td className="py-3 px-4 text-foreground font-mono text-xs">{user.phone || <span className="text-muted-foreground">-</span>}</td>
              <td className="py-3 px-4">
                {user.country ? (
                  <Badge variant="secondary" className="gap-1">
                    <span>{COUNTRY_FLAGS[user.country] || "🌐"}</span>
                    {user.country}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{user.registrationIp || <span className="text-muted-foreground">-</span>}</td>
              <td className="py-3 px-4 text-muted-foreground text-xs whitespace-nowrap">
                {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
              </td>
              <td className="py-3 px-4">
                {user.walletType ? (
                  <Badge variant="secondary" className="gap-1">
                    <Wallet className="w-3 h-3" />
                    {user.walletType}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="py-3 px-4">
                {user.selectedGoals && user.selectedGoals.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {user.selectedGoals.map((goal) => (
                      <Badge key={goal} variant="outline" className="text-xs">
                        <Target className="w-3 h-3 mr-1" />
                        {goal}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="py-3 px-4">
                {user.applicationStatus === "approved" ? (
                  <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Approved
                  </Badge>
                ) : user.applicationStatus === "rejected" ? (
                  <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 gap-1">
                    <XCircle className="w-3 h-3" />
                    Rejected
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="w-3 h-3" />
                    Pending
                  </Badge>
                )}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1.5">
                  {user.applicationStatus !== "approved" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs gap-1 text-green-600 border-green-500/30 hover:bg-green-500/10"
                      onClick={() => statusMutation.mutate({ userId: user.id, applicationStatus: "approved" })}
                      disabled={statusMutation.isPending}
                      data-testid={`button-approve-${user.id}`}
                    >
                      <CheckCircle className="w-3 h-3" />
                      Approve
                    </Button>
                  )}
                  {user.applicationStatus !== "rejected" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs gap-1 text-red-600 border-red-500/30 hover:bg-red-500/10"
                      onClick={() => statusMutation.mutate({ userId: user.id, applicationStatus: "rejected" })}
                      disabled={statusMutation.isPending}
                      data-testid={`button-reject-${user.id}`}
                    >
                      <XCircle className="w-3 h-3" />
                      Reject
                    </Button>
                  )}
                  {user.applicationStatus !== "pending" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs gap-1"
                      onClick={() => statusMutation.mutate({ userId: user.id, applicationStatus: "pending" })}
                      disabled={statusMutation.isPending}
                      data-testid={`button-pending-${user.id}`}
                    >
                      <Clock className="w-3 h-3" />
                      Reset
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1 text-red-600 border-red-500/30 hover:bg-red-500/10"
                    onClick={() => {
                      if (confirm(`Delete user ${user.username}? This cannot be undone.`)) {
                        deleteMutation.mutate(user.id);
                      }
                    }}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${user.id}`}
                  >
                    <XCircle className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InsuranceTable({ applications }: { applications: InsuranceApplication[] }) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground" data-testid="text-no-insurance">
        No insurance applications yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" data-testid="table-insurance">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Full Name</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Phone</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Coins</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Identity</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Terms</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Created</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app.id}
              className="border-b border-border hover:bg-muted/30 transition-colors"
              data-testid={`row-insurance-${app.id}`}
            >
              <td className="py-3 px-4 font-medium text-foreground">{app.fullName}</td>
              <td className="py-3 px-4 text-muted-foreground">{app.email}</td>
              <td className="py-3 px-4 text-foreground">{app.phone || "-"}</td>
              <td className="py-3 px-4">
                {app.selectedCoins && app.selectedCoins.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {app.selectedCoins.map((coin) => (
                      <Badge key={coin} variant="outline" className="text-xs">
                        {coin}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="py-3 px-4">
                {app.identityVerified ? (
                  <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">Verified</Badge>
                ) : (
                  <Badge variant="secondary">Unverified</Badge>
                )}
              </td>
              <td className="py-3 px-4">
                {app.termsAccepted ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Clock className="w-4 h-4 text-muted-foreground" />
                )}
              </td>
              <td className="py-3 px-4">
                <Badge
                  variant={app.status === "approved" ? "default" : app.status === "pending" ? "secondary" : "destructive"}
                >
                  {app.status}
                </Badge>
              </td>
              <td className="py-3 px-4 text-muted-foreground text-xs">
                {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InquiriesTable({ inquiries }: { inquiries: ContactInquiry[] }) {
  if (inquiries.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground" data-testid="text-no-inquiries">
        No contact inquiries yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" data-testid="table-inquiries">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Message</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Created</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr
              key={inquiry.id}
              className="border-b border-border hover:bg-muted/30 transition-colors"
              data-testid={`row-inquiry-${inquiry.id}`}
            >
              <td className="py-3 px-4 font-medium text-foreground">{inquiry.name}</td>
              <td className="py-3 px-4 text-muted-foreground">{inquiry.email}</td>
              <td className="py-3 px-4">
                <Badge variant="outline">{inquiry.type}</Badge>
              </td>
              <td className="py-3 px-4 text-foreground max-w-xs truncate">{inquiry.message}</td>
              <td className="py-3 px-4 text-muted-foreground text-xs">
                {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface AnalyticsSummary {
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
}

const COUNTRY_FLAGS: Record<string, string> = {
  US: "🇺🇸", GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", DE: "🇩🇪", FR: "🇫🇷",
  JP: "🇯🇵", KR: "🇰🇷", SG: "🇸🇬", CH: "🇨🇭", NL: "🇳🇱", SE: "🇸🇪",
  NO: "🇳🇴", DK: "🇩🇰", IE: "🇮🇪", NZ: "🇳🇿", AE: "🇦🇪", IN: "🇮🇳",
  BR: "🇧🇷", ZA: "🇿🇦", NG: "🇳🇬", IT: "🇮🇹", ES: "🇪🇸", PT: "🇵🇹",
  PL: "🇵🇱", MX: "🇲🇽", AR: "🇦🇷", RU: "🇷🇺", CN: "🇨🇳", HK: "🇭🇰",
  TH: "🇹🇭", ID: "🇮🇩", MY: "🇲🇾", PH: "🇵🇭", VN: "🇻🇳", TR: "🇹🇷",
  SA: "🇸🇦", KW: "🇰🇼", QA: "🇶🇦", EG: "🇪🇬", GH: "🇬🇭", KE: "🇰🇪",
  IL: "🇮🇱", PK: "🇵🇰", BD: "🇧🇩", LK: "🇱🇰", MM: "🇲🇲", TW: "🇹🇼",
  AT: "🇦🇹", BE: "🇧🇪", FI: "🇫🇮", GR: "🇬🇷", CZ: "🇨🇿", HU: "🇭🇺",
  RO: "🇷🇴", UA: "🇺🇦", BG: "🇧🇬", HR: "🇭🇷", SK: "🇸🇰", SI: "🇸🇮",
  CO: "🇨🇴", CL: "🇨🇱", PE: "🇵🇪", VE: "🇻🇪", EC: "🇪🇨",
  MA: "🇲🇦", DZ: "🇩🇿", TN: "🇹🇳", ET: "🇪🇹", TZ: "🇹🇿",
};

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States", GB: "United Kingdom", CA: "Canada", AU: "Australia",
  DE: "Germany", FR: "France", JP: "Japan", KR: "South Korea", SG: "Singapore",
  CH: "Switzerland", NL: "Netherlands", SE: "Sweden", NO: "Norway", DK: "Denmark",
  IE: "Ireland", NZ: "New Zealand", AE: "UAE", IN: "India", BR: "Brazil",
  ZA: "South Africa", NG: "Nigeria", IT: "Italy", ES: "Spain", PT: "Portugal",
  PL: "Poland", MX: "Mexico", AR: "Argentina", RU: "Russia", CN: "China",
  HK: "Hong Kong", TH: "Thailand", ID: "Indonesia", MY: "Malaysia", PH: "Philippines",
  VN: "Vietnam", TR: "Turkey", SA: "Saudi Arabia", KW: "Kuwait", QA: "Qatar",
  EG: "Egypt", GH: "Ghana", KE: "Kenya", IL: "Israel", PK: "Pakistan",
  BD: "Bangladesh", TW: "Taiwan", AT: "Austria", BE: "Belgium", FI: "Finland",
  GR: "Greece", CZ: "Czech Republic", HU: "Hungary", RO: "Romania", UA: "Ukraine",
  CO: "Colombia", CL: "Chile", PE: "Peru", MA: "Morocco", LK: "Sri Lanka",
};

const DEVICE_COLORS: Record<string, string> = {
  desktop: "bg-blue-500",
  mobile: "bg-violet-500",
  tablet: "bg-emerald-500",
};

const BROWSER_COLORS: Record<string, string> = {
  Chrome: "bg-amber-500",
  Safari: "bg-blue-400",
  Firefox: "bg-orange-500",
  Edge: "bg-sky-500",
  Opera: "bg-red-500",
  Chromium: "bg-cyan-500",
  Other: "bg-muted-foreground/40",
};

const SOURCE_STYLE: Record<string, { bg: string; text: string; icon: string; bar: string }> = {
  "Google Ads":      { bg: "bg-blue-500/10 border-blue-500/20",   text: "text-blue-600 dark:text-blue-400",   icon: "🔵", bar: "bg-blue-500" },
  "Facebook Ads":    { bg: "bg-indigo-500/10 border-indigo-500/20", text: "text-indigo-600 dark:text-indigo-400", icon: "🟦", bar: "bg-indigo-500" },
  "Reddit Ads":      { bg: "bg-orange-500/10 border-orange-500/20", text: "text-orange-600 dark:text-orange-400", icon: "🟠", bar: "bg-orange-500" },
  "Instagram Ads":   { bg: "bg-pink-500/10 border-pink-500/20",   text: "text-pink-600 dark:text-pink-400",   icon: "🩷", bar: "bg-pink-500" },
  "Twitter Ads":     { bg: "bg-sky-500/10 border-sky-500/20",     text: "text-sky-600 dark:text-sky-400",     icon: "🐦", bar: "bg-sky-500" },
  "LinkedIn Ads":    { bg: "bg-cyan-500/10 border-cyan-500/20",   text: "text-cyan-600 dark:text-cyan-400",   icon: "💼", bar: "bg-cyan-500" },
  "TikTok Ads":      { bg: "bg-rose-500/10 border-rose-500/20",   text: "text-rose-600 dark:text-rose-400",   icon: "🎵", bar: "bg-rose-500" },
  "Organic Search":  { bg: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", icon: "🔍", bar: "bg-emerald-500" },
  "Bing Search":     { bg: "bg-teal-500/10 border-teal-500/20",   text: "text-teal-600 dark:text-teal-400",   icon: "🔎", bar: "bg-teal-500" },
  "Facebook":        { bg: "bg-indigo-400/10 border-indigo-400/20", text: "text-indigo-500 dark:text-indigo-300", icon: "📘", bar: "bg-indigo-400" },
  "Reddit":          { bg: "bg-orange-400/10 border-orange-400/20", text: "text-orange-500 dark:text-orange-300", icon: "🟧", bar: "bg-orange-400" },
  "Twitter / X":     { bg: "bg-slate-500/10 border-slate-500/20", text: "text-slate-600 dark:text-slate-400", icon: "🐦", bar: "bg-slate-500" },
  "YouTube":         { bg: "bg-red-500/10 border-red-500/20",     text: "text-red-600 dark:text-red-400",     icon: "▶️", bar: "bg-red-500" },
  "Direct":          { bg: "bg-muted border-border",               text: "text-muted-foreground",              icon: "🔗", bar: "bg-muted-foreground" },
};

function getSourceStyle(source: string) {
  return SOURCE_STYLE[source] || { bg: "bg-muted/50 border-border", text: "text-foreground", icon: "🌐", bar: "bg-primary" };
}

const AD_SOURCES = ["Google Ads", "Facebook Ads", "Reddit Ads", "Instagram Ads", "Twitter Ads", "LinkedIn Ads", "TikTok Ads"];

function formatSeconds(s: number): string {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

function MiniBar({ value, max, colorClass = "bg-primary" }: { value: number; max: number; colorClass?: string }) {
  return (
    <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all ${colorClass}`} style={{ width: `${max > 0 ? Math.min((value / max) * 100, 100) : 0}%` }} />
    </div>
  );
}

function SegmentBar({ items }: { items: { label: string; value: number; color: string }[] }) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  return (
    <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
      {items.map((item) => (
        <div key={item.label} className={`${item.color} transition-all`} style={{ width: `${(item.value / total) * 100}%` }} title={`${item.label}: ${item.value}`} />
      ))}
    </div>
  );
}

interface SessionEntry {
  sessionId: string;
  firstSeen: string;
  lastSeen: string;
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
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function DeviceIcon({ device }: { device: string }) {
  if (device === "mobile") return <Smartphone className="w-3.5 h-3.5" />;
  if (device === "tablet") return <Tablet className="w-3.5 h-3.5" />;
  return <Monitor className="w-3.5 h-3.5" />;
}


function CopyableCode({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className="flex items-center gap-2 mt-1.5 bg-muted/60 border border-border rounded-md px-3 py-2 cursor-pointer hover:bg-muted transition-colors group"
      onClick={() => { navigator.clipboard.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }); }}
      title="Click to copy"
    >
      <code className="text-xs text-foreground flex-1 break-all font-mono">{value}</code>
      <span className="text-xs text-primary flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? "✓ Copied!" : "Copy"}
      </span>
    </div>
  );
}

const LANDING_URL = window.location.origin;

const AD_PLATFORM_GUIDES = [
  {
    icon: "🔵",
    name: "Google Ads",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/5 border-blue-500/20",
    url: `${LANDING_URL}/?utm_source=google&utm_medium=cpc&utm_campaign=YOUR_CAMPAIGN`,
    steps: [
      "In Google Ads → Campaign → Ad → Final URL",
      'Set "Final URL suffix" or use the URL above',
      "Replace YOUR_CAMPAIGN with your campaign name",
    ],
    note: "Also works auto-detection: Google appends gclid= which we now recognise even without UTM params.",
  },
  {
    icon: "🟦",
    name: "Facebook / Instagram Ads",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/5 border-indigo-500/20",
    url: `${LANDING_URL}/?utm_source=facebook&utm_medium=paid&utm_campaign=YOUR_CAMPAIGN`,
    steps: [
      "In Meta Ads Manager → Ad level → Website URL field",
      "Paste the URL above instead of just your domain",
      "For Instagram ads use utm_source=instagram",
    ],
    note: "Also works auto-detection: Meta appends fbclid= which we now recognise even without UTM params.",
  },
  {
    icon: "🟠",
    name: "Reddit Ads",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/5 border-orange-500/20",
    url: `${LANDING_URL}/?utm_source=reddit&utm_medium=paid&utm_campaign=YOUR_CAMPAIGN`,
    steps: [
      "In Reddit Ads → Campaign → Ad Group → Destination URL",
      "Paste the URL above as your destination URL",
      "Replace YOUR_CAMPAIGN with your subreddit or campaign name",
    ],
    note: "Also works auto-detection: Reddit appends rdt_cid= which we now recognise even without UTM params.",
  },
];

function AdTrackingGuide() {
  const [open, setOpen] = useState(false);
  return (
    <Card className="border-amber-500/30 bg-amber-500/5">
      <CardHeader className="pb-2">
        <CardTitle
          className="text-sm font-semibold flex items-center justify-between cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <Zap className="w-4 h-4" />
            Ad Tracking Setup Guide — Add UTM params to see traffic move
          </span>
          {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </CardTitle>
        {!open && (
          <p className="text-xs text-muted-foreground mt-1">
            Your Google / Facebook / Reddit counts are 0 because your ad URLs are missing UTM parameters.
            Click to see exactly what to paste into each platform. <span className="text-primary underline cursor-pointer" onClick={() => setOpen(true)}>Fix it now →</span>
          </p>
        )}
      </CardHeader>
      {open && (
        <CardContent className="space-y-5">
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-800 dark:text-amber-300">
            <strong>Why counts show 0:</strong> Ad platforms send visitors to your site, but without UTM parameters in your ad URL, we can't tell they came from an ad — they appear as "Direct". Paste the URLs below into your ad campaigns and traffic will start appearing immediately.
            <br /><br />
            <strong>Good news:</strong> We now also auto-detect Google (gclid), Facebook (fbclid), and Reddit (rdt_cid) click IDs — so even without UTM params, new visitors will be attributed correctly going forward.
          </div>
          {AD_PLATFORM_GUIDES.map((p) => (
            <div key={p.name} className={`rounded-xl border p-4 space-y-2 ${p.bg}`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{p.icon}</span>
                <span className={`font-semibold text-sm ${p.color}`}>{p.name}</span>
              </div>
              <p className="text-xs font-medium text-muted-foreground">Paste this as your destination / final URL:</p>
              <CopyableCode value={p.url} />
              <ul className="mt-2 space-y-1">
                {p.steps.map((s, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex gap-2">
                    <span className="text-primary font-bold flex-shrink-0">{i + 1}.</span> {s}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground/70 italic mt-1">💡 {p.note}</p>
            </div>
          ))}
          <div className={`rounded-xl border p-4 space-y-2 bg-muted/30`}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">UTM Parameter Reference</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                ["utm_source", "google / facebook / reddit"],
                ["utm_medium", "cpc / paid / display / social"],
                ["utm_campaign", "Your campaign name (no spaces)"],
                ["utm_content", "Ad variation name (optional)"],
              ].map(([k, v]) => (
                <div key={k} className="bg-muted/60 rounded p-2">
                  <code className="text-primary font-mono">{k}</code>
                  <p className="text-muted-foreground mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

const EVENT_NAV_MAP: Record<string, string> = {
  user_signup: "users",
  form_submit: "inquiries",
  contact_form: "inquiries",
  insurance_application: "insurance",
  insurance_submit: "insurance",
  application_submit: "users",
};

function AnalyticsDashboard({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [days, setDays] = useState("30");
  const [analyticsTab, setAnalyticsTab] = useState("overview");
  const [visitorSearch, setVisitorSearch] = useState("");
  const [showAllSessions, setShowAllSessions] = useState(false);

  const analyticsQuery = useQuery<AnalyticsSummary>({
    queryKey: ["/api/admin/analytics", days],
    queryFn: async () => {
      const res = await fetch(`/api/admin/analytics?days=${days}`);
      if (!res.ok) throw new Error("Failed to fetch analytics");
      return res.json();
    },
    refetchInterval: 30000,
  });

  const sessionsQuery = useQuery<SessionEntry[]>({
    queryKey: ["/api/admin/analytics/sessions", days],
    queryFn: async () => {
      const res = await fetch(`/api/admin/analytics/sessions?days=${days}`);
      if (!res.ok) throw new Error("Failed to fetch sessions");
      return res.json();
    },
    enabled: analyticsTab === "visitors",
    refetchInterval: 30000,
  });

  const data = analyticsQuery.data;

  if (analyticsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (analyticsQuery.isError) {
    return (
      <div className="text-center py-16 text-muted-foreground" data-testid="text-analytics-error">
        Failed to load analytics data. Please try again.
      </div>
    );
  }

  const maxDailyCount = Math.max(...(data?.dailyViews?.map((d) => d.count) || [1]), 1);
  const maxHourlyCount = Math.max(...(data?.hourlyDistribution?.map((h) => h.count) || [1]), 1);
  const totalDevices = (data?.deviceBreakdown?.reduce((s, d) => s + d.count, 0) || 0) || 1;
  const totalBrowsers = (data?.browserBreakdown?.reduce((s, b) => s + b.count, 0) || 0) || 1;
  const trafficSources = data?.trafficSources ?? [];
  const utmCampaigns = data?.utmCampaigns ?? [];
  const topClicks = data?.topClicks ?? [];
  const landingPages = data?.landingPages ?? [];
  const topCountries = data?.topCountries ?? [];
  const topCities = data?.topCities ?? [];
  const paidSources = trafficSources.filter((s) => AD_SOURCES.includes(s.source));
  const totalPaidSessions = paidSources.reduce((s, x) => s + x.count, 0);

  const filteredSessions = (sessionsQuery.data ?? []).filter((s) => {
    if (!visitorSearch) return true;
    const q = visitorSearch.toLowerCase();
    return (
      s.ip.toLowerCase().includes(q) ||
      s.countryName.toLowerCase().includes(q) ||
      s.countryCode.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.source.toLowerCase().includes(q) ||
      s.device.toLowerCase().includes(q) ||
      s.pages.some((p) => p.toLowerCase().includes(q))
    );
  });
  const visibleSessions = showAllSessions ? filteredSessions : filteredSessions.slice(0, 50);

  const peakHour = data?.hourlyDistribution?.reduce(
    (best, h) => (h.count > best.count ? h : best),
    data.hourlyDistribution[0] || { hour: 0, count: 0 }
  );

  return (
    <div className="space-y-4" data-testid="analytics-dashboard">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-lg font-semibold text-foreground" data-testid="text-analytics-title">Analytics</h3>
          <p className="text-xs text-muted-foreground">Bot-filtered · UTM attributed · IP-geolocated · Per-visitor tracking</p>
        </div>
        <Select value={days} onValueChange={(v) => { setDays(v); setShowAllSessions(false); }}>
          <SelectTrigger className="w-[130px]" data-testid="select-analytics-range">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="14">Last 14 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Strip — always visible */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <Card data-testid="stat-page-views" className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Page Views</CardTitle>
            <MousePointer className="w-3.5 h-3.5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-foreground">{(data?.totalPageViews ?? 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-0.5">Last {days}d</p>
          </CardContent>
        </Card>
        <Card data-testid="stat-unique-visitors" className="border-l-4 border-l-violet-500">
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Visitors</CardTitle>
            <Users className="w-3.5 h-3.5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-foreground">{(data?.uniqueVisitors ?? 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-0.5">{(data?.uniqueSessions ?? 0).toLocaleString()} sessions</p>
          </CardContent>
        </Card>
        <Card data-testid="stat-bounce-rate" className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Bounce Rate</CardTitle>
            <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-foreground">{data?.bounceRate ?? 0}%</div>
            <p className="text-xs text-muted-foreground mt-0.5">Single-page sessions</p>
          </CardContent>
        </Card>
        <Card data-testid="stat-avg-duration" className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Avg Duration</CardTitle>
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-foreground">{formatSeconds(data?.avgSessionDuration ?? 0)}</div>
            <p className="text-xs text-muted-foreground mt-0.5">Time on site</p>
          </CardContent>
        </Card>
        <Card data-testid="stat-paid-sessions" className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-1 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Paid Sessions</CardTitle>
            <Zap className="w-3.5 h-3.5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-foreground">{totalPaidSessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-0.5">Google · FB · Reddit</p>
          </CardContent>
        </Card>
      </div>

      {/* 5-Tab Navigation */}
      <Tabs value={analyticsTab} onValueChange={(v) => { setAnalyticsTab(v); setShowAllSessions(false); }}>
        <TabsList className="grid w-full grid-cols-5 h-9">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="traffic" className="text-xs">Traffic</TabsTrigger>
          <TabsTrigger value="visitors" className="text-xs flex items-center gap-1">
            Visitors {sessionsQuery.data && <Badge className="ml-1 h-4 px-1 text-[10px]">{sessionsQuery.data.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="pages" className="text-xs">Pages</TabsTrigger>
          <TabsTrigger value="location" className="text-xs">Location</TabsTrigger>
        </TabsList>

        {/* ══════════════════════════════════
            TAB 1: OVERVIEW
        ══════════════════════════════════ */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Daily Chart */}
          {data && data.dailyViews.length > 0 && (
            <Card data-testid="chart-daily-views">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Daily Page Views</CardTitle>
                <span className="text-xs text-muted-foreground">hover for count</span>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-0.5 h-32">
                  {data.dailyViews.map((d) => (
                    <div key={d.date} className="flex-1 flex flex-col items-center group relative">
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {d.date.slice(5)}: {d.count}
                      </div>
                      <div
                        className="w-full bg-primary/60 rounded-t min-h-[2px] hover:bg-primary transition-colors cursor-default"
                        style={{ height: `${(d.count / maxDailyCount) * 100}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-muted-foreground">{data.dailyViews[0]?.date}</span>
                  <span className="text-xs text-muted-foreground">{data.dailyViews[data.dailyViews.length - 1]?.date}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hourly Heatmap */}
          {data && (
            <Card data-testid="chart-hourly">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Hourly Activity (UTC)</CardTitle>
                {peakHour && <span className="text-xs text-muted-foreground">peak: {String(peakHour.hour).padStart(2, "0")}:00</span>}
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-px h-20">
                  {data.hourlyDistribution.map((h) => (
                    <div key={h.hour} className="flex-1 flex flex-col items-center group relative">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {String(h.hour).padStart(2, "0")}:00 · {h.count}
                      </div>
                      <div
                        className="w-full bg-violet-500/50 rounded-t min-h-[2px] hover:bg-violet-500 transition-colors cursor-default"
                        style={{ height: `${(h.count / maxHourlyCount) * 100}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-muted-foreground">00:00</span>
                  <span className="text-xs text-muted-foreground">12:00</span>
                  <span className="text-xs text-muted-foreground">23:00</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Device + Browser */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data && (
              <Card data-testid="card-device-breakdown">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  <SegmentBar items={data.deviceBreakdown.map((d) => ({ label: d.device, value: d.count, color: DEVICE_COLORS[d.device] || "bg-muted-foreground/40" }))} />
                  <div className="space-y-2.5 mt-4">
                    {data.deviceBreakdown.map((d) => (
                      <div key={d.device} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${DEVICE_COLORS[d.device] || "bg-muted-foreground/40"}`} />
                        <span className="text-sm text-foreground capitalize flex-1">{d.device}</span>
                        <span className="text-xs text-muted-foreground w-10 text-right">{Math.round((d.count / totalDevices) * 100)}%</span>
                        <span className="text-xs font-semibold text-foreground w-8 text-right">{d.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            {data && (
              <Card data-testid="card-browser-breakdown">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Browsers</CardTitle>
                </CardHeader>
                <CardContent>
                  <SegmentBar items={data.browserBreakdown.map((b) => ({ label: b.browser, value: b.count, color: BROWSER_COLORS[b.browser] || "bg-muted-foreground/40" }))} />
                  <div className="space-y-2.5 mt-4">
                    {data.browserBreakdown.map((b) => (
                      <div key={b.browser} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${BROWSER_COLORS[b.browser] || "bg-muted-foreground/40"}`} />
                        <span className="text-sm text-foreground flex-1">{b.browser}</span>
                        <span className="text-xs text-muted-foreground w-10 text-right">{Math.round((b.count / totalBrowsers) * 100)}%</span>
                        <span className="text-xs font-semibold text-foreground w-8 text-right">{b.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Event Type Breakdown */}
          {data && data.eventBreakdown.length > 0 && (
            <Card data-testid="card-event-breakdown">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  Event Types
                  <span className="text-xs font-normal text-muted-foreground/60">— click to view details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {data.eventBreakdown.map((e) => {
                    const targetTab = EVENT_NAV_MAP[e.eventType];
                    return (
                      <div
                        key={e.eventType}
                        onClick={() => targetTab && onNavigate(targetTab)}
                        className={`bg-muted/50 rounded-lg p-3 transition-colors ${targetTab ? "cursor-pointer hover:bg-primary/10 hover:border hover:border-primary/20" : ""}`}
                      >
                        <p className="text-xs text-muted-foreground mb-1 capitalize flex items-center gap-1">
                          {e.eventType.replace(/_/g, " ")}
                          {targetTab && <span className="text-[10px] text-primary/60">→ view</span>}
                        </p>
                        <p className="text-xl font-bold text-foreground">{e.count.toLocaleString()}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ══════════════════════════════════
            TAB 2: TRAFFIC SOURCES
        ══════════════════════════════════ */}
        <TabsContent value="traffic" className="space-y-4 mt-4">
          {/* Big 3 paid source highlight cards — always shown */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" /> Paid Ad Sources
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {(["Google Ads", "Facebook Ads", "Reddit Ads"] as const).map((adSrc) => {
                const src = trafficSources.find((s) => s.source === adSrc);
                const style = getSourceStyle(adSrc);
                return (
                  <div key={adSrc} className={`rounded-xl border p-4 ${style.bg}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{style.icon}</span>
                      <span className={`text-sm font-semibold ${style.text}`}>{adSrc.replace(" Ads", "")}</span>
                    </div>
                    <div className={`text-3xl font-bold mb-1 ${style.text}`}>{src?.count ?? 0}</div>
                    <div className="text-xs text-muted-foreground">{src?.percentage ?? 0}% of sessions</div>
                    {src && <MiniBar value={src.count} max={data?.totalPageViews || 1} colorClass={style.bar} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* All other ad sources */}
          {paidSources.filter((s) => !["Google Ads", "Facebook Ads", "Reddit Ads"].includes(s.source)).length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {paidSources
                .filter((s) => !["Google Ads", "Facebook Ads", "Reddit Ads"].includes(s.source))
                .map((src) => {
                  const style = getSourceStyle(src.source);
                  return (
                    <div key={src.source} className={`rounded-lg border p-3 ${style.bg}`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-sm">{style.icon}</span>
                        <span className={`text-xs font-medium truncate ${style.text}`}>{src.source.replace(" Ads", "")}</span>
                      </div>
                      <div className={`text-xl font-bold ${style.text}`}>{src.count}</div>
                      <div className="text-xs text-muted-foreground">{src.percentage}% of sessions</div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Full source breakdown */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Globe className="w-4 h-4" /> All Traffic Sources
              </CardTitle>
              <span className="text-xs text-muted-foreground">{trafficSources.length} sources</span>
            </CardHeader>
            <CardContent>
              {trafficSources.length > 0 ? (
                <div className="space-y-3">
                  {trafficSources.map((src) => {
                    const style = getSourceStyle(src.source);
                    return (
                      <div key={src.source} className="flex items-center gap-3">
                        <span className="text-base w-5 flex-shrink-0">{style.icon}</span>
                        <span className="text-sm text-foreground w-36 flex-shrink-0 truncate font-medium">{src.source}</span>
                        <MiniBar value={src.count} max={trafficSources[0]?.count || 1} colorClass={style.bar} />
                        <span className="text-xs text-muted-foreground w-8 text-right flex-shrink-0">{src.percentage}%</span>
                        <span className="text-xs font-bold text-foreground w-10 text-right flex-shrink-0">{src.count}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-4 text-center text-sm text-muted-foreground space-y-2">
                  <Globe className="w-8 h-8 mx-auto opacity-30" />
                  <p>No traffic source data yet.</p>
                  <p className="text-xs">Append UTM params to your ad URLs to start attributing sessions:</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded block max-w-md mx-auto">?utm_source=google&utm_medium=cpc&utm_campaign=your-campaign</code>
                </div>
              )}
            </CardContent>
          </Card>

          {/* UTM Campaigns */}
          {utmCampaigns.length > 0 && (
            <Card data-testid="card-utm-campaigns">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">UTM Campaigns</CardTitle>
                <Badge variant="secondary" className="text-xs">{utmCampaigns.length}</Badge>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-muted-foreground border-b border-border">
                        <th className="text-left pb-2 font-medium">Campaign</th>
                        <th className="text-left pb-2 font-medium">Source</th>
                        <th className="text-left pb-2 font-medium">Medium</th>
                        <th className="text-right pb-2 font-medium">Sessions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {utmCampaigns.map((c, i) => (
                        <tr key={i} className="hover:bg-muted/30 transition-colors">
                          <td className="py-2 font-medium text-foreground max-w-[160px] truncate">{c.campaign || "—"}</td>
                          <td className="py-2 text-muted-foreground">{c.source || "—"}</td>
                          <td className="py-2"><Badge variant="outline" className="text-xs capitalize">{c.medium || "—"}</Badge></td>
                          <td className="py-2 text-right font-bold text-foreground">{c.sessions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Referrers */}
          {data && data.topReferrers.length > 0 && (
            <Card data-testid="card-top-referrers">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Referrer Domains</CardTitle>
                <Link2 className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {data.topReferrers.map((r) => (
                    <div key={r.referrer} className="flex items-center gap-3">
                      <span className="text-sm text-foreground truncate flex-1">{r.referrer}</span>
                      <MiniBar value={r.count} max={data.topReferrers[0]?.count || 1} colorClass="bg-sky-500" />
                      <span className="text-xs font-semibold text-foreground w-8 text-right flex-shrink-0">{r.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* UTM Setup Guide */}
          <AdTrackingGuide />
        </TabsContent>

        {/* ══════════════════════════════════
            TAB 3: VISITORS (per-session log)
        ══════════════════════════════════ */}
        <TabsContent value="visitors" className="space-y-4 mt-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Filter by IP, country, city, source, page…"
                value={visitorSearch}
                onChange={(e) => { setVisitorSearch(e.target.value); setShowAllSessions(false); }}
                className="pl-9 h-9 text-sm"
              />
            </div>
            {visitorSearch && (
              <Button variant="ghost" size="sm" onClick={() => setVisitorSearch("")} className="h-9 text-xs">
                Clear
              </Button>
            )}
            <Badge variant="secondary" className="text-xs h-7 px-2">
              {filteredSessions.length} sessions
            </Badge>
          </div>

          {sessionsQuery.isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">Loading visitor log…</span>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-12 text-sm text-muted-foreground">
              <Users className="w-8 h-8 mx-auto opacity-30 mb-2" />
              {visitorSearch ? "No sessions match your filter." : "No sessions in this period."}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                      <th className="text-left px-3 py-2 font-medium whitespace-nowrap">Time</th>
                      <th className="text-left px-3 py-2 font-medium whitespace-nowrap">IP</th>
                      <th className="text-left px-3 py-2 font-medium whitespace-nowrap">Location</th>
                      <th className="text-left px-3 py-2 font-medium whitespace-nowrap">Device</th>
                      <th className="text-left px-3 py-2 font-medium whitespace-nowrap">Source</th>
                      <th className="text-left px-3 py-2 font-medium whitespace-nowrap">Pages</th>
                      <th className="text-right px-3 py-2 font-medium whitespace-nowrap">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {visibleSessions.map((s) => {
                      const sourceStyle = getSourceStyle(s.source);
                      const countryName = s.countryName || COUNTRY_NAMES[s.countryCode] || s.countryCode;
                      return (
                        <tr key={s.sessionId} className="hover:bg-muted/20 transition-colors">
                          <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{timeAgo(s.firstSeen)}</td>
                          <td className="px-3 py-2 font-mono text-foreground whitespace-nowrap">{s.ip || "—"}</td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm leading-none">{COUNTRY_FLAGS[s.countryCode] || "🌍"}</span>
                              <span className="text-foreground font-medium">{countryName || "Unknown"}</span>
                              {s.city && <span className="text-muted-foreground">· {s.city}</span>}
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <DeviceIcon device={s.device} />
                              <span className="capitalize">{s.device}</span>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${sourceStyle.bg} ${sourceStyle.text}`}>
                              {sourceStyle.icon} {s.source}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex flex-col gap-0.5 max-w-[180px]">
                              {s.pages.slice(0, 2).map((p) => (
                                <span key={p} className="text-foreground truncate">{p || "/"}</span>
                              ))}
                              {s.pages.length > 2 && (
                                <span className="text-muted-foreground">+{s.pages.length - 2} more</span>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-2 text-right text-muted-foreground whitespace-nowrap">
                            {s.durationSeconds > 0 ? formatSeconds(s.durationSeconds) : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filteredSessions.length > 50 && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllSessions(!showAllSessions)}
                    className="text-xs h-8"
                  >
                    {showAllSessions ? (
                      <><ChevronUp className="w-3.5 h-3.5 mr-1" /> Show less</>
                    ) : (
                      <><ChevronDown className="w-3.5 h-3.5 mr-1" /> Show all {filteredSessions.length} sessions</>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* ══════════════════════════════════
            TAB 4: PAGES
        ══════════════════════════════════ */}
        <TabsContent value="pages" className="space-y-4 mt-4">
          {/* Top Pages */}
          <Card data-testid="card-top-pages">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Pages</CardTitle>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {data && data.topPages.length > 0 ? (
                <div className="space-y-3">
                  {data.topPages.map((p) => (
                    <div key={p.page} className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm text-foreground truncate max-w-[200px] font-medium">{p.page || "/"}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {p.avgSeconds > 0 && (
                            <span className="text-xs text-emerald-600 dark:text-emerald-400">{formatSeconds(p.avgSeconds)}</span>
                          )}
                          <span className="text-xs font-semibold text-foreground">{p.count.toLocaleString()} views</span>
                        </div>
                      </div>
                      <MiniBar value={p.count} max={data.topPages[0]?.count || 1} colorClass="bg-primary" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">No page data yet</p>
              )}
            </CardContent>
          </Card>

          {/* Landing Pages */}
          {landingPages.length > 0 && (
            <Card data-testid="card-landing-pages">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Landing Pages</CardTitle>
                <Link2 className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {landingPages.map((p) => (
                    <div key={p.page} className="flex items-center gap-3">
                      <span className="text-sm text-foreground truncate flex-1">{p.page || "/"}</span>
                      <MiniBar value={p.sessions} max={landingPages[0]?.sessions || 1} colorClass="bg-amber-500" />
                      <span className="text-xs font-semibold text-foreground w-20 text-right flex-shrink-0">{p.sessions} entries</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Avg Time on Page */}
          {data && data.avgTimeOnPage.length > 0 && (
            <Card data-testid="card-time-on-page">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Time on Page</CardTitle>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {data.avgTimeOnPage.map((p) => (
                    <div key={p.page} className="flex items-center gap-3">
                      <span className="text-sm text-foreground truncate flex-1">{p.page || "/"}</span>
                      <MiniBar value={p.avgSeconds} max={Math.max(...data.avgTimeOnPage.map((x) => x.avgSeconds), 1)} colorClass="bg-emerald-500" />
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 w-14 text-right flex-shrink-0">{formatSeconds(p.avgSeconds)}</span>
                      <span className="text-xs text-muted-foreground w-16 text-right flex-shrink-0">{p.samples} samples</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Click Tracking */}
          {topClicks.length > 0 && (
            <Card data-testid="card-top-clicks">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Top Clicks</CardTitle>
                <MousePointer className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-muted-foreground border-b border-border">
                        <th className="text-left pb-2 font-medium">Element</th>
                        <th className="text-left pb-2 font-medium">Type</th>
                        <th className="text-left pb-2 font-medium">Page</th>
                        <th className="text-right pb-2 font-medium">Clicks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {topClicks.slice(0, 20).map((c, i) => (
                        <tr key={i} className="hover:bg-muted/30 transition-colors">
                          <td className="py-2 max-w-[200px]"><span className="font-medium text-foreground truncate block">{c.label}</span></td>
                          <td className="py-2"><Badge variant="outline" className="text-xs capitalize">{c.type}</Badge></td>
                          <td className="py-2 text-muted-foreground text-xs truncate max-w-[120px]">{c.page || "/"}</td>
                          <td className="py-2 text-right font-bold text-foreground">{c.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ══════════════════════════════════
            TAB 5: LOCATION
        ══════════════════════════════════ */}
        <TabsContent value="location" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Countries */}
            <Card data-testid="card-top-countries">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Top Countries</CardTitle>
                <MapPin className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {topCountries.length > 0 ? (
                  <div className="space-y-3">
                    {topCountries.map((c) => {
                      const name = c.countryName || COUNTRY_NAMES[c.countryCode] || c.countryCode || "Unknown";
                      return (
                        <div key={c.countryCode} className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-foreground flex items-center gap-2">
                              <span className="text-lg leading-none">{COUNTRY_FLAGS[c.countryCode] || "🌍"}</span>
                              <span className="font-medium">{name}</span>
                            </span>
                            <span className="text-xs font-semibold text-foreground flex-shrink-0">{c.count}</span>
                          </div>
                          <MiniBar value={c.count} max={topCountries[0]?.count || 1} colorClass="bg-violet-500" />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4 text-center">No country data yet — geoIP detects on new visits.</p>
                )}
              </CardContent>
            </Card>

            {/* Top Cities */}
            <Card data-testid="card-top-cities">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Top Cities</CardTitle>
                <MapPin className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {topCities.length > 0 ? (
                  <div className="space-y-3">
                    {topCities.map((c) => {
                      const cName = c.countryName || COUNTRY_NAMES[c.countryCode] || c.countryCode;
                      return (
                        <div key={`${c.city}::${c.countryCode}`} className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-foreground flex items-center gap-1.5">
                              <span className="text-base leading-none">{COUNTRY_FLAGS[c.countryCode] || "🌍"}</span>
                              <span className="font-medium">{c.city}</span>
                              {cName && <span className="text-xs text-muted-foreground">({cName})</span>}
                            </span>
                            <span className="text-xs font-semibold text-foreground flex-shrink-0">{c.count}</span>
                          </div>
                          <MiniBar value={c.count} max={topCities[0]?.count || 1} colorClass="bg-sky-500" />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4 text-center">No city data yet — geoIP captures on new visits.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TelegramSettings() {
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [reportToggles, setReportToggles] = useState({
    includeUsers: true,
    includeApplications: true,
    includeInquiries: true,
    includeUserCards: true,
  });
  const [showReportOptions, setShowReportOptions] = useState(false);

  const configQuery = useQuery<{ isConfigured: boolean; botToken: string; chatId: string }>({
    queryKey: ["/api/admin/telegram/config"],
    refetchOnWindowFocus: false,
  });

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleSave = async () => {
    if (!botToken.trim() || !chatId.trim()) {
      showFeedback("error", "Both Bot Token and Chat ID are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await apiRequest("POST", "/api/admin/telegram/config", { botToken: botToken.trim(), chatId: chatId.trim() });
      const data = await res.json();
      if (data.ok) {
        showFeedback("success", "Telegram config saved and bot restarted!");
        setBotToken("");
        setChatId("");
        queryClient.invalidateQueries({ queryKey: ["/api/admin/telegram/config"] });
      } else {
        showFeedback("error", data.error || "Save failed");
      }
    } catch {
      showFeedback("error", "Network error, please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    try {
      const res = await apiRequest("POST", "/api/admin/telegram/test", {});
      const data = await res.json();
      if (data.ok) showFeedback("success", "Test message sent to your Telegram group!");
      else showFeedback("error", data.error || "Test failed — check your token and chat ID.");
    } catch {
      showFeedback("error", "Network error");
    } finally {
      setTesting(false);
    }
  };

  const handleReport = async () => {
    setReporting(true);
    try {
      const res = await apiRequest("POST", "/api/admin/telegram/report", reportToggles);
      const data = await res.json();
      if (data.ok) showFeedback("success", "Stats report sent to your Telegram group!");
      else showFeedback("error", data.error || "Report failed — check your config.");
    } catch {
      showFeedback("error", "Network error");
    } finally {
      setReporting(false);
    }
  };

  const config = configQuery.data;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Telegram Notifications</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Connect a Telegram bot to receive instant alerts for new sign-ups, contact form submissions, and on-demand stats reports.
        </p>
      </div>

      {config && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {config.isConfigured ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">Bot is configured and running</span>
                </div>
                <div className="text-sm text-muted-foreground pl-4">
                  <span className="font-mono">Token: {config.botToken}</span>
                </div>
                <div className="text-sm text-muted-foreground pl-4">
                  <span>Chat ID: <span className="font-mono">{config.chatId}</span></span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Not configured yet — fill in the form below.</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">How to set up your bot</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm text-foreground list-decimal list-inside">
            <li>Open Telegram and search for <span className="font-mono bg-muted px-1 rounded">@BotFather</span></li>
            <li>Send <span className="font-mono bg-muted px-1 rounded">/newbot</span> and follow the prompts — copy the <b>API token</b> you receive</li>
            <li>Add your bot to your Telegram group (or channel) as an <b>admin</b></li>
            <li>
              Get your <b>Chat ID</b>: send any message in the group, then open
              <span className="font-mono bg-muted px-1 rounded ml-1">https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</span> in your browser and look for <span className="font-mono bg-muted px-1 rounded">chat.id</span>
              (group IDs start with <span className="font-mono bg-muted px-1 rounded">-</span>)
            </li>
            <li>Paste both values below and click <b>Save & Connect</b></li>
            <li>Click <b>Send Test Message</b> to confirm it's working</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">Configure Bot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="tg-token">Bot API Token</Label>
            <div className="relative">
              <Input
                id="tg-token"
                type={showToken ? "text" : "password"}
                placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                className="pr-10 font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowToken((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tg-chatid">Chat ID</Label>
            <Input
              id="tg-chatid"
              type="text"
              placeholder="-1001234567890"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">For groups, this starts with a minus sign (e.g. -100...).</p>
          </div>

          {feedback && (
            <div className={`flex items-center gap-2 text-sm p-3 rounded-lg ${
              feedback.type === "success"
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            }`}>
              {feedback.type === "success" ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <XCircle className="w-4 h-4 flex-shrink-0" />}
              {feedback.message}
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
              {saving ? "Saving..." : "Save & Connect"}
            </Button>
            {config?.isConfigured && (
              <>
                <Button variant="outline" onClick={handleTest} disabled={testing} className="gap-2">
                  {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {testing ? "Sending..." : "Send Test Message"}
                </Button>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleReport} disabled={reporting} className="gap-2">
                      {reporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                      {reporting ? "Sending..." : "Send Stats Report"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowReportOptions((v) => !v)}
                      className="gap-1 text-xs text-muted-foreground"
                    >
                      {showReportOptions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      Options
                    </Button>
                  </div>
                  {showReportOptions && (
                    <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Report includes:</p>
                      {(
                        [
                          { key: "includeUsers", label: "Platform stats summary (users, status breakdown)" },
                          { key: "includeUserCards", label: "Full user cards (name, email, phone, goals, wallet)" },
                          { key: "includeApplications", label: "Insurance applications (all details)" },
                          { key: "includeInquiries", label: "Contact inquiries (all messages)" },
                        ] as const
                      ).map(({ key, label }) => (
                        <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={reportToggles[key]}
                            onChange={(e) => setReportToggles((prev) => ({ ...prev, [key]: e.target.checked }))}
                            className="w-4 h-4 rounded accent-primary"
                          />
                          <span className="text-sm text-foreground group-hover:text-primary transition-colors">{label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {config?.isConfigured && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Bot Commands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex gap-3 py-1.5 border-b border-border">
                <span className="font-mono text-foreground w-24 flex-shrink-0">/start</span>
                <span className="text-muted-foreground">Subscribe this chat to receive notifications</span>
              </div>
              <div className="flex gap-3 py-1.5 border-b border-border">
                <span className="font-mono text-foreground w-24 flex-shrink-0">/stats</span>
                <span className="text-muted-foreground">Get a quick platform stats summary</span>
              </div>
              <div className="flex gap-3 py-1.5">
                <span className="font-mono text-foreground w-24 flex-shrink-0">/request</span>
                <span className="text-muted-foreground">Browse all registered accounts interactively</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");

  const statsQuery = useQuery<{
    totalUsers: number;
    onboardedUsers: number;
    totalInsuranceApps: number;
    pendingInsuranceApps: number;
    totalInquiries: number;
  }>({
    queryKey: ["/api/admin/stats"],
    refetchInterval: 5000,
  });

  const usersQuery = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    refetchInterval: 5000,
  });

  const insuranceQuery = useQuery<InsuranceApplication[]>({
    queryKey: ["/api/admin/insurance-applications"],
    refetchInterval: 5000,
  });

  const inquiriesQuery = useQuery<ContactInquiry[]>({
    queryKey: ["/api/admin/contact-inquiries"],
    refetchInterval: 5000,
  });

  const stats = statsQuery.data;
  const isLoading = statsQuery.isLoading || usersQuery.isLoading;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-6 h-6 text-primary" />
            <h1 className="text-[28px] font-bold text-foreground tracking-tight" data-testid="text-admin-title">
              Admin Panel
            </h1>
          </div>
          <p className="text-muted-foreground">
            View all registered users, insurance applications, and contact inquiries. Data refreshes every 5 seconds.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                title="Total Users"
                value={stats?.totalUsers ?? 0}
                icon={Users}
                description="Click to view all users"
                testId="stat-total-users"
                onClick={() => setActiveTab("users")}
              />
              <StatCard
                title="Onboarded"
                value={stats?.onboardedUsers ?? 0}
                icon={CheckCircle}
                description="Completed onboarding"
                testId="stat-onboarded"
                onClick={() => setActiveTab("users")}
              />
              <StatCard
                title="Insurance Apps"
                value={stats?.totalInsuranceApps ?? 0}
                icon={ShieldCheck}
                description={`Click to view — ${stats?.pendingInsuranceApps ?? 0} pending`}
                testId="stat-insurance"
                onClick={() => setActiveTab("insurance")}
              />
              <StatCard
                title="Inquiries"
                value={stats?.totalInquiries ?? 0}
                icon={MessageSquare}
                description="Click to view submissions"
                testId="stat-inquiries"
                onClick={() => setActiveTab("inquiries")}
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList data-testid="tabs-admin">
                <TabsTrigger value="users" data-testid="tab-users">
                  <Users className="w-4 h-4 mr-1.5" />
                  Users ({usersQuery.data?.length ?? 0})
                </TabsTrigger>
                <TabsTrigger value="insurance" data-testid="tab-insurance">
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  Insurance ({insuranceQuery.data?.length ?? 0})
                </TabsTrigger>
                <TabsTrigger value="inquiries" data-testid="tab-inquiries">
                  <MessageSquare className="w-4 h-4 mr-1.5" />
                  Inquiries ({inquiriesQuery.data?.length ?? 0})
                </TabsTrigger>
                <TabsTrigger value="analytics" data-testid="tab-analytics">
                  <BarChart3 className="w-4 h-4 mr-1.5" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="telegram" data-testid="tab-telegram">
                  <Bot className="w-4 h-4 mr-1.5" />
                  Telegram
                </TabsTrigger>
              </TabsList>

              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Registered Users</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <UsersTable users={usersQuery.data ?? []} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insurance">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Insurance Applications</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <InsuranceTable applications={insuranceQuery.data ?? []} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inquiries">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <InquiriesTable inquiries={inquiriesQuery.data ?? []} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <AnalyticsDashboard onNavigate={setActiveTab} />
              </TabsContent>

              <TabsContent value="telegram">
                <TelegramSettings />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
