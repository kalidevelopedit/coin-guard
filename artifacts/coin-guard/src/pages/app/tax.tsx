import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Link2,
  Eye,
  DollarSign,
  BarChart3,
  Download,
  Check,
  ChevronRight,
  ArrowRight,
  Calculator,
  HelpCircle,
} from "lucide-react";

const wizardSteps = [
  { title: "Country & Tax Year", icon: Globe },
  { title: "Connected Sources", icon: Link2 },
  { title: "Review & Categorize", icon: Eye },
  { title: "Income Inputs", icon: DollarSign },
  { title: "Summary", icon: BarChart3 },
  { title: "Export", icon: Download },
];

export default function Tax() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <AppShell>
      <div className="p-6 max-w-[1200px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="text-tax-title">Tax Report</h1>
          <p className="text-sm text-muted-foreground mt-1">Generate your crypto tax report step by step</p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="space-y-1">
              {wizardSteps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  data-testid={`button-tax-step-${i}`}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                    i === activeStep
                      ? "bg-primary/10 text-primary"
                      : i < activeStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      i < activeStep
                        ? "bg-primary text-primary-foreground"
                        : i === activeStep
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < activeStep ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            {activeStep === 0 && (
              <div data-testid="tax-step-0">
                <h2 className="text-xl font-bold text-foreground mb-2">Country & Tax Year</h2>
                <p className="text-sm text-muted-foreground mb-6">Confirm your tax jurisdiction and reporting period.</p>
                <div className="space-y-4 max-w-md">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Country</p>
                    <p className="text-sm font-medium text-foreground">United States</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Tax Year</p>
                    <p className="text-sm font-medium text-foreground">2025</p>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/10 rounded-xl">
                    <HelpCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      Tax calculations follow US IRS guidelines. For other jurisdictions, we adapt to local rules.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div data-testid="tax-step-1">
                <h2 className="text-xl font-bold text-foreground mb-2">Connected Sources</h2>
                <p className="text-sm text-muted-foreground mb-6">Review your connected wallets and exchanges.</p>
                <div className="space-y-3">
                  {[
                    { name: "Coinbase", txns: 142, status: "Synced" },
                    { name: "MetaMask", txns: 87, status: "Synced" },
                    { name: "Ledger Nano X", txns: 23, status: "Synced" },
                  ].map((source) => (
                    <div key={source.name} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-foreground">{source.name}</p>
                        <p className="text-xs text-muted-foreground">{source.txns} transactions</p>
                      </div>
                      <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-md">{source.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div data-testid="tax-step-2">
                <h2 className="text-xl font-bold text-foreground mb-2">Review & Categorize</h2>
                <p className="text-sm text-muted-foreground mb-6">We've automatically categorized your transactions. Review any flagged items.</p>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Trades</p>
                      <p className="text-xs text-muted-foreground">128 transactions</p>
                    </div>
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Transfers</p>
                      <p className="text-xs text-muted-foreground">45 transactions</p>
                    </div>
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Needs Review</p>
                      <p className="text-xs text-muted-foreground">3 transactions need manual categorization</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs rounded-lg">Review</Button>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div data-testid="tax-step-3">
                <h2 className="text-xl font-bold text-foreground mb-2">Income Inputs</h2>
                <p className="text-sm text-muted-foreground mb-6">Confirm any additional crypto income like staking rewards and airdrops.</p>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">Staking Rewards</p>
                      <p className="text-sm font-semibold text-foreground">$1,240.00</p>
                    </div>
                    <p className="text-xs text-muted-foreground">12 staking reward distributions detected</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">Airdrops</p>
                      <p className="text-sm font-semibold text-foreground">$2,724.16</p>
                    </div>
                    <p className="text-xs text-muted-foreground">1 airdrop received</p>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div data-testid="tax-step-4">
                <h2 className="text-xl font-bold text-foreground mb-2">Tax Summary</h2>
                <p className="text-sm text-muted-foreground mb-6">Your estimated tax liability for 2025.</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Short-term Gains</p>
                    <p className="text-2xl font-bold text-foreground">$4,120</p>
                  </div>
                  <div className="p-5 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Long-term Gains</p>
                    <p className="text-2xl font-bold text-foreground">$12,850</p>
                  </div>
                  <div className="p-5 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Total Income</p>
                    <p className="text-2xl font-bold text-foreground">$3,964</p>
                  </div>
                  <div className="p-5 bg-primary/5 border border-primary/10 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">Estimated Tax</p>
                    <p className="text-2xl font-bold text-primary">$3,187</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-xl">
                  <HelpCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    This is an estimate based on available data. Please review with a tax professional before filing.
                  </p>
                </div>
              </div>
            )}

            {activeStep === 5 && (
              <div data-testid="tax-step-5">
                <h2 className="text-xl font-bold text-foreground mb-2">Export Your Reports</h2>
                <p className="text-sm text-muted-foreground mb-6">Download your tax reports or book a specialist review.</p>
                <div className="space-y-3">
                  <button className="w-full p-4 bg-muted/50 rounded-xl flex items-center justify-between hover:bg-muted transition-colors" data-testid="button-download-pdf">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Download className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">Tax Report (PDF)</p>
                        <p className="text-xs text-muted-foreground">IRS Form 8949 + Schedule D</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full p-4 bg-muted/50 rounded-xl flex items-center justify-between hover:bg-muted transition-colors" data-testid="button-download-csv">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Download className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">Transaction Report (CSV)</p>
                        <p className="text-xs text-muted-foreground">Complete transaction history</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full p-4 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-between hover:bg-primary/10 transition-colors" data-testid="button-book-specialist">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">Book Specialist Review</p>
                        <p className="text-xs text-muted-foreground">Get expert help with your filing</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="text-muted-foreground"
                data-testid="button-tax-back"
              >
                Back
              </Button>
              <Button
                onClick={() => setActiveStep(Math.min(wizardSteps.length - 1, activeStep + 1))}
                disabled={activeStep === wizardSteps.length - 1}
                className="bg-primary text-primary-foreground rounded-full px-6 gap-2"
                data-testid="button-tax-next"
              >
                {activeStep === wizardSteps.length - 1 ? "Complete" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
