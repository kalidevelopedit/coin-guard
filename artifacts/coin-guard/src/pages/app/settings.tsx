import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import {
  User,
  Shield,
  CreditCard,
  Link2,
  Bell,
  Lock,
  Check,
  ChevronRight,
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "connections", label: "Connected Accounts", icon: Link2 },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();

  return (
    <AppShell>
      <div className="p-6 max-w-[1200px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="text-settings-title">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-3">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  data-testid={`button-settings-tab-${tab.id}`}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            {activeTab === "profile" && (
              <div data-testid="settings-profile">
                <h2 className="text-lg font-bold text-foreground mb-6">Profile Information</h2>
                <div className="space-y-4 max-w-lg">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Full name</Label>
                    <Input defaultValue={user?.name || ""} className="rounded-xl h-11" data-testid="input-settings-name" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Email</Label>
                    <Input defaultValue={user?.email || ""} className="rounded-xl h-11" data-testid="input-settings-email" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Country</Label>
                    <Input defaultValue={user?.country || ""} className="rounded-xl h-11" data-testid="input-settings-country" />
                  </div>
                  <Button className="bg-primary text-primary-foreground rounded-full px-6" data-testid="button-save-profile">
                    Save changes
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div data-testid="settings-security">
                <h2 className="text-lg font-bold text-foreground mb-6">Security</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Password</p>
                        <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg" data-testid="button-change-password">Change</Button>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg" data-testid="button-setup-2fa">Set up</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div data-testid="settings-billing">
                <h2 className="text-lg font-bold text-foreground mb-6">Billing</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Current plan</p>
                    <p className="text-sm font-semibold text-foreground">Insurance - $15/month</p>
                    <p className="text-xs text-muted-foreground mt-1">Next billing: Jan 1, 2026</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Payment method</p>
                        <p className="text-xs text-muted-foreground">Visa ending in 4242</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg" data-testid="button-update-payment">Update</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "connections" && (
              <div data-testid="settings-connections">
                <h2 className="text-lg font-bold text-foreground mb-6">Connected Accounts</h2>
                <div className="space-y-3">
                  {[
                    { name: "Coinbase", status: "Connected", txns: 142 },
                    { name: "MetaMask", status: "Connected", txns: 87 },
                    { name: "Ledger Nano X", status: "Connected", txns: 23 },
                  ].map((acc) => (
                    <div key={acc.name} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-foreground">{acc.name}</p>
                        <p className="text-xs text-muted-foreground">{acc.txns} transactions synced</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-green-500">{acc.status}</span>
                        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Disconnect</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div data-testid="settings-notifications">
                <h2 className="text-lg font-bold text-foreground mb-6">Notifications</h2>
                <div className="space-y-4">
                  {[
                    { title: "Tax report ready", description: "Notify when your tax report is generated" },
                    { title: "Sync completed", description: "Notify when wallet syncing finishes" },
                    { title: "Insurance updates", description: "Claim status and billing reminders" },
                    { title: "Security alerts", description: "Login attempts and account changes" },
                  ].map((notif) => (
                    <div key={notif.title} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-foreground">{notif.title}</p>
                        <p className="text-xs text-muted-foreground">{notif.description}</p>
                      </div>
                      <button
                        className="w-10 h-5 bg-primary rounded-full relative transition-colors"
                        data-testid={`toggle-notif-${notif.title.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 transition-all" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
