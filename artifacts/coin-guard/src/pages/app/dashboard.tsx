import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { AppShell } from "@/components/app-shell";
import { WalletConnector } from "@/components/wallet-connector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import {
  Wallet,
  TrendingUp,
  Calculator,
  ShieldCheck,
  ArrowRight,
  Link2,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  FileText,
  Shield,
  Loader2,
} from "lucide-react";
import { Link } from "wouter";
import {
  BinanceLogo,
  CoinbaseLogo,
  MetaMaskLogo,
  PhantomLogo,
  TrustWalletLogo,
  ExodusLogo,
} from "@/components/crypto-logos";
import { queryClient } from "@/lib/queryClient";

const mockRecentTransactions = [
  { id: "1", type: "receive", asset: "BTC", amount: "+0.0523", value: "$2,415.00", date: "Feb 24, 2026", status: "confirmed" },
  { id: "2", type: "send", asset: "ETH", amount: "-1.250", value: "$4,312.00", date: "Feb 23, 2026", status: "confirmed" },
  { id: "3", type: "receive", asset: "SOL", amount: "+45.00", value: "$6,750.00", date: "Feb 22, 2026", status: "confirmed" },
  { id: "4", type: "send", asset: "BTC", amount: "-0.0100", value: "$461.00", date: "Feb 21, 2026", status: "confirmed" },
  { id: "5", type: "receive", asset: "ETH", amount: "+2.500", value: "$8,625.00", date: "Feb 20, 2026", status: "pending" },
];

interface DetectedWallet {
  name: string;
  detected: boolean;
  icon: typeof MetaMaskLogo;
}

function WalletDetector() {
  const [wallets, setWallets] = useState<DetectedWallet[]>([]);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const detected: DetectedWallet[] = [];
      const w = window as Record<string, unknown>;

      detected.push({
        name: "MetaMask",
        detected: !!(w.ethereum && (w.ethereum as Record<string, unknown>).isMetaMask),
        icon: MetaMaskLogo,
      });
      detected.push({
        name: "Phantom",
        detected: !!(w.solana && (w.solana as Record<string, unknown>).isPhantom),
        icon: PhantomLogo,
      });
      detected.push({
        name: "Trust Wallet",
        detected: !!(w.trustwallet || (w.ethereum && (w.ethereum as Record<string, unknown>).isTrust)),
        icon: TrustWalletLogo,
      });
      detected.push({
        name: "Exodus",
        detected: !!(w.exodus),
        icon: ExodusLogo,
      });
      detected.push({
        name: "Coinbase Wallet",
        detected: !!(w.ethereum && (w.ethereum as Record<string, unknown>).isCoinbaseWallet),
        icon: CoinbaseLogo,
      });

      setWallets(detected);
      setScanning(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (scanning) {
    return (
      <div className="flex items-center gap-3 p-4 bg-muted/30 border border-border rounded-xl" data-testid="wallet-scanning">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Scanning for installed wallets...</span>
      </div>
    );
  }

  const detectedWallets = wallets.filter((w) => w.detected);
  const undetectedWallets = wallets.filter((w) => !w.detected);

  return (
    <div className="space-y-3" data-testid="wallet-detector">
      {detectedWallets.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Detected</p>
          {detectedWallets.map((wallet) => (
            <div
              key={wallet.name}
              className="flex items-center justify-between p-3 bg-green-500/5 border border-green-500/20 rounded-xl"
              data-testid={`wallet-detected-${wallet.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div className="flex items-center gap-3">
                <wallet.icon className="w-6 h-6" />
                <span className="text-sm font-medium text-foreground">{wallet.name}</span>
              </div>
              <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 gap-1">
                <CheckCircle className="w-3 h-3" />
                Found
              </Badge>
            </div>
          ))}
        </div>
      )}
      {undetectedWallets.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Not detected</p>
          {undetectedWallets.map((wallet) => (
            <div
              key={wallet.name}
              className="flex items-center justify-between p-3 bg-muted/30 border border-border rounded-xl opacity-60"
              data-testid={`wallet-undetected-${wallet.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div className="flex items-center gap-3">
                <wallet.icon className="w-6 h-6" />
                <span className="text-sm font-medium text-foreground">{wallet.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">Not installed</span>
            </div>
          ))}
        </div>
      )}
      {detectedWallets.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-2">
          No browser wallets detected. Install a wallet extension to connect.
        </p>
      )}
    </div>
  );
}

function PendingDashboard() {
  const { user } = useAuth();
  const displayName = user?.name || user?.username || "there";
  const [walletOpen, setWalletOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="page-pending-dashboard">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2.5 justify-center mb-10">
          <Logo size="lg" />
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center mx-auto mb-5">
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="text-pending-title">
              Welcome, {displayName}
            </h1>
            <p className="text-muted-foreground" data-testid="text-pending-message">
              Your application is currently under review. Our team will verify your details and approve your account shortly. You will gain full access to the dashboard once approved.
            </p>
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3 mb-8">
            <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Application Status: Pending</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                This page will automatically update when your application is approved.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Connect Your Wallet
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              While you wait, connect your wallet so it is ready when your account is approved.
            </p>
            <WalletDetector />
            <Button
              onClick={() => setWalletOpen(true)}
              className="w-full mt-4 bg-primary text-primary-foreground rounded-xl font-semibold gap-2"
              data-testid="button-connect-wallet-pending"
            >
              <Wallet className="w-4 h-4" />
              Open Wallet Connector
            </Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-foreground mb-2 text-center">Subscription Plans</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Review the plans available once your account is approved.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-border hover:border-primary/40 transition-colors" data-testid="card-plan-tax">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-base">Tax Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-foreground">$20</span>
                  <span className="text-sm text-muted-foreground ml-1">/report</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    Full tax calculation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    Multi-country support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    PDF and CSV export
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/50 shadow-[0_0_20px_rgba(59,130,246,0.08)]" data-testid="card-plan-insurance">
              <CardHeader className="pb-3">
                <Badge className="w-fit mb-2 bg-primary/10 text-primary border-primary/20">Popular</Badge>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-base">Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-foreground">$15</span>
                  <span className="text-sm text-muted-foreground ml-1">/month</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    Asset protection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    Theft and hack coverage
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    24/7 claim support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:border-primary/40 transition-colors" data-testid="card-plan-bundle">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-base">Tax + Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-foreground">$30</span>
                  <span className="text-sm text-muted-foreground ml-1">/report + mo</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    Everything in both plans
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    Best value
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Payment will be collected via your connected wallet after your account is approved.
          </p>
        </div>
      </div>

      <WalletConnector open={walletOpen} onOpenChange={setWalletOpen} />
    </div>
  );
}

function ApprovedDashboard() {
  const { user } = useAuth();
  const displayName = user?.name || user?.username || "there";
  const [walletOpen, setWalletOpen] = useState(false);

  return (
    <AppShell>
      <div className="p-6 max-w-[1200px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="text-dashboard-title">
            Welcome back, {displayName}
          </h1>
          <p className="text-muted-foreground mt-1" data-testid="text-dashboard-subtitle">
            Here's an overview of your crypto portfolio and tax status.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card data-testid="card-portfolio-value">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Value</CardTitle>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-portfolio-value">$48,231.00</div>
              <p className="text-xs text-emerald-500 mt-1">+12.3% this month</p>
            </CardContent>
          </Card>

          <Card data-testid="card-connected-wallets">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Connected Wallets</CardTitle>
              <Wallet className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-connected-wallets">3</div>
              <p className="text-xs text-muted-foreground mt-1">2 wallets, 1 exchange</p>
            </CardContent>
          </Card>

          <Card data-testid="card-tax-liability">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Est. Tax Liability</CardTitle>
              <Calculator className="w-4 h-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-tax-liability">$3,420.00</div>
              <p className="text-xs text-muted-foreground mt-1">2025 tax year</p>
            </CardContent>
          </Card>

          <Card data-testid="card-insurance-status">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Insurance</CardTitle>
              <ShieldCheck className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-insurance-status">Active</div>
              <p className="text-xs text-muted-foreground mt-1">$15/mo plan</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2" data-testid="card-recent-transactions">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
              <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
              <Link href="/app/transactions">
                <Button variant="ghost" size="sm" data-testid="link-view-all-transactions">
                  View all
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between gap-3"
                    data-testid={`row-transaction-${tx.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                        tx.type === "receive"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-red-500/10 text-red-500"
                      }`}>
                        {tx.type === "receive" ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {tx.type === "receive" ? "Received" : "Sent"} {tx.asset}
                        </p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        tx.type === "receive" ? "text-emerald-500" : "text-foreground"
                      }`}>
                        {tx.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card data-testid="card-quick-actions">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/app/tax">
                  <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-start-tax">
                    <Calculator className="w-4 h-4" />
                    Start Tax Report
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  data-testid="button-connect-wallet"
                  onClick={() => setWalletOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  Connect Wallet
                </Button>
                <Link href="/app/insurance">
                  <Button variant="outline" className="w-full justify-start gap-2" data-testid="button-manage-insurance">
                    <ShieldCheck className="w-4 h-4" />
                    Manage Insurance
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card data-testid="card-connected-sources">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
                <CardTitle className="text-base font-semibold">Connected Sources</CardTitle>
                <Link2 className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                      <BinanceLogo className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Binance</p>
                      <p className="text-xs text-muted-foreground">Exchange</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">Synced</Badge>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                      <CoinbaseLogo className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Coinbase</p>
                      <p className="text-xs text-muted-foreground">Exchange</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">Synced</Badge>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                      <MetaMaskLogo className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">MetaMask</p>
                      <p className="text-xs text-muted-foreground">Wallet</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">Synced</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-1 text-primary gap-1.5"
                  onClick={() => setWalletOpen(true)}
                  data-testid="button-add-source"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add source
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <WalletConnector open={walletOpen} onOpenChange={setWalletOpen} />
    </AppShell>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  if (user?.applicationStatus !== "approved") {
    return <PendingDashboard />;
  }

  return <ApprovedDashboard />;
}
