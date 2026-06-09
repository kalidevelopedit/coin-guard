import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Link2,
  Calculator,
  Download,
  ShieldCheck,
  AlertTriangle,
  Eye,
  Wallet,
  BarChart3,
  Clock,
  Users,
  CheckCircle2,
  Zap,
  Search,
  FileCheck,
  CreditCard,
  Globe,
  FileText,
  Lock,
  RefreshCw,
  TrendingUp,
  Layers,
  HelpCircle,
  ArrowDownCircle,
  SearchCheck,
  UserCheck,
  MessageCircle,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

interface StepData {
  number: number;
  icon: typeof Link2;
  title: string;
  description: string;
  expanded: string;
  details: string[];
}

const taxSteps: StepData[] = [
  {
    number: 1,
    icon: Link2,
    title: "Connect your wallets and exchanges",
    description: "Import your entire transaction history from every platform you use. We support over 500 integrations with centralized exchanges, decentralized protocols, and hardware wallets.",
    expanded: "Use read-only API keys for automatic syncing, or upload CSV exports for platforms that don't support API access. We pull in every trade, transfer, deposit, withdrawal, staking reward, airdrop, and liquidity pool interaction. Supported platforms include Coinbase, Binance, Kraken, Gemini, MetaMask, Ledger, Trezor, Uniswap, Aave, Compound, and hundreds more. You can connect as many sources as you need and re-sync at any time to pull in new activity.",
    details: [
      "Read-only API connections for automatic syncing",
      "CSV upload for manual or unsupported platforms",
      "500+ exchanges, wallets, and DeFi protocols",
      "Multi-chain support including Ethereum, Solana, Bitcoin, and more",
      "Re-sync anytime to pull latest transactions",
    ],
  },
  {
    number: 2,
    icon: Search,
    title: "Review and categorize transactions",
    description: "Our engine automatically classifies every transaction type: trades, swaps, transfers between your own wallets, income from staking or mining, airdrops, NFT sales, and more.",
    expanded: "Misclassified transactions can lead to overpaying taxes or triggering an audit. Our smart categorization engine detects common patterns like internal transfers (which aren't taxable), identifies missing cost basis, and flags transactions that need your attention. You can review flagged items through a guided workflow that explains what each issue means and how to resolve it. The goal is a complete, accurate picture of every crypto event in the tax year.",
    details: [
      "Auto-detection of trades, swaps, staking rewards, and airdrops",
      "Internal transfer identification to avoid false taxable events",
      "Missing cost basis detection and resolution",
      "NFT minting, trading, and royalty tracking",
      "DeFi yield farming and liquidity pool support",
      "Guided review workflow for flagged items",
    ],
  },
  {
    number: 3,
    icon: Calculator,
    title: "Calculate your tax liability",
    description: "Choose your preferred cost basis method and our engine computes capital gains, losses, and ordinary income across every jurisdiction you file in.",
    expanded: "We support FIFO (First In, First Out), LIFO (Last In, First Out), HIFO (Highest In, First Out), and specific identification methods. The engine accounts for short-term versus long-term holding periods, wash sale considerations, and jurisdiction-specific rules for countries like the US, UK, Canada, Australia, Germany, and others. You'll see a clear breakdown of realized gains, unrealized gains, total income, and estimated tax owed before you export anything.",
    details: [
      "FIFO, LIFO, HIFO, and specific identification methods",
      "Short-term vs. long-term capital gains separation",
      "Multi-jurisdiction support: US, UK, Canada, Australia, Germany, and more",
      "Real-time market price data from trusted sources",
      "Estimated tax liability preview before export",
      "Wash sale rule awareness",
    ],
  },
  {
    number: 4,
    icon: FileCheck,
    title: "Export audit-ready tax reports",
    description: "Download completed tax forms and detailed transaction reports that are ready for your tax return or to hand to your accountant.",
    expanded: "For US filers, we generate IRS Form 8949 and Schedule D. For other jurisdictions, we produce the equivalent capital gains reports. Every report includes a full transaction-level audit trail so you can verify every line item. Reports are available as PDF for filing and CSV for import into tax software like TurboTax, H&R Block, or professional accounting tools. If you're audited, your CoinGuard reports provide the documentation you need.",
    details: [
      "IRS Form 8949 and Schedule D for US filers",
      "Jurisdiction-specific reports for international users",
      "PDF and CSV export formats",
      "Compatible with TurboTax, H&R Block, and professional tax software",
      "Full transaction-level audit trail",
      "Downloadable anytime from your dashboard",
    ],
  },
];

const insuranceSteps: StepData[] = [
  {
    number: 1,
    icon: CreditCard,
    title: "Choose your coverage plan",
    description: "Select a protection tier based on your portfolio size and risk profile. Plans start at $15/month with coverage up to $250,000 in digital assets.",
    expanded: "We offer three coverage tiers: Essential ($15/month, up to $50K coverage), Professional ($49/month, up to $150K), and Enterprise ($99/month, up to $250K). Each tier includes protection against exchange hacks, smart contract exploits, phishing-related theft, and private key loss. There are no lengthy applications or complex underwriting forms. You tell us your portfolio size, select your plan, and coverage begins. You can upgrade or downgrade your plan at any time.",
    details: [
      "Three coverage tiers: Essential, Professional, Enterprise",
      "Coverage from $50K up to $250K in digital assets",
      "No complex applications or underwriting delays",
      "Monthly billing with no lock-in contracts",
      "Upgrade or downgrade anytime",
    ],
  },
  {
    number: 2,
    icon: ShieldCheck,
    title: "Coverage activates immediately",
    description: "Once you subscribe, your portfolio is protected starting that day. There is no waiting period and no exclusions on major covered events.",
    expanded: "Your policy covers losses from exchange hacks (such as the type that impacted Mt. Gox and FTX users), smart contract vulnerabilities in audited protocols, SIM-swap and phishing attacks that result in unauthorized transfers, and accidental loss of private keys or seed phrases. Coverage extends to assets held on supported exchanges and in self-custody wallets. You'll receive a coverage confirmation with your policy details and a summary of what's protected.",
    details: [
      "Instant activation upon subscription",
      "Exchange hack and insolvency protection",
      "Smart contract exploit coverage for audited protocols",
      "Phishing and SIM-swap theft protection",
      "Private key and seed phrase loss coverage",
      "Self-custody and exchange-held asset coverage",
    ],
  },
  {
    number: 3,
    icon: AlertTriangle,
    title: "File a claim if an incident occurs",
    description: "Report a loss directly from your dashboard. Our guided claims process walks you through providing the necessary evidence and documentation.",
    expanded: "If you experience a covered loss, log into your CoinGuard dashboard and open a new claim. You'll describe the incident, specify the assets affected, and upload supporting evidence such as transaction hashes, exchange communications, or screenshots. Our system validates the claim details against on-chain data where possible. You'll receive immediate confirmation that your claim has been submitted along with a reference number for tracking.",
    details: [
      "File claims directly from your dashboard",
      "Guided step-by-step claims workflow",
      "Upload supporting evidence and documentation",
      "On-chain verification of reported losses",
      "Immediate submission confirmation and reference number",
      "Email notifications at every stage",
    ],
  },
  {
    number: 4,
    icon: Eye,
    title: "Track resolution and receive payout",
    description: "Monitor your claim status in real-time. Our team reviews claims promptly, and approved payouts are processed directly to your wallet or bank account.",
    expanded: "Each claim is assigned to a dedicated reviewer who evaluates the evidence, cross-references on-chain data, and communicates with you if additional information is needed. The average resolution time is 5 business days. Once approved, payouts are processed within 48 hours. You can choose to receive funds via bank transfer or stablecoin deposit to your wallet. Your dashboard shows a complete history of all claims and their outcomes.",
    details: [
      "Real-time claim status tracking",
      "Dedicated claims reviewer assigned to each case",
      "Average resolution time of 5 business days",
      "Payout within 48 hours of approval",
      "Bank transfer or stablecoin payout options",
      "Complete claim history on your dashboard",
    ],
  },
];

const recoverySteps: StepData[] = [
  {
    number: 1,
    icon: SearchCheck,
    title: "Submit your recovery case",
    description: "Tell us what happened. Whether you lost access to a wallet, sent funds to the wrong address, or fell victim to a scam, we start with a free case evaluation.",
    expanded: "Fill out a secure intake form describing the incident, including transaction details, wallet addresses, amounts involved, and any relevant communications. Our team evaluates the feasibility of recovery within 24 hours and provides you with an honest assessment. There is no cost for the initial evaluation.",
    details: [
      "Free initial case evaluation within 24 hours",
      "Secure intake form for incident details",
      "Feasibility assessment before any commitment",
      "Support for all major blockchains and exchanges",
      "No upfront payment required for eligible cases",
    ],
  },
  {
    number: 2,
    icon: Search,
    title: "Blockchain forensic investigation",
    description: "Our specialists trace your funds through the blockchain using advanced forensic tools, identifying destination wallets, intermediary addresses, and exchange endpoints.",
    expanded: "Using proprietary on-chain analysis tools, our investigators follow the money trail across multiple blockchains, through mixers and bridges, and into exchange deposit addresses. We compile a comprehensive evidence package including transaction flow diagrams, wallet clustering analysis, and exchange attribution data. This evidence forms the basis for recovery efforts and, when needed, law enforcement referrals.",
    details: [
      "Multi-chain transaction tracing and analysis",
      "Wallet clustering and identity attribution",
      "Mixer and bridge transaction de-obfuscation",
      "Exchange endpoint identification",
      "Comprehensive evidence package compilation",
      "Transaction flow visualization and documentation",
    ],
  },
  {
    number: 3,
    icon: MessageCircle,
    title: "Exchange coordination and outreach",
    description: "We work directly with exchanges and custodial platforms to freeze flagged funds, submit formal recovery requests, and coordinate the return of your assets.",
    expanded: "Our team has established relationships with compliance departments at major exchanges. When stolen or misdirected funds land at an exchange, we submit formal freeze requests with supporting evidence. We manage all communication with the exchange's compliance team, handle any additional documentation they require, and coordinate the fund return process. For cases involving law enforcement, we assist with preparing referral packages.",
    details: [
      "Direct contact with exchange compliance teams",
      "Formal fund freeze and recovery requests",
      "Evidence-backed communication with platforms",
      "Law enforcement referral preparation when needed",
      "Ongoing negotiation and follow-up",
    ],
  },
  {
    number: 4,
    icon: UserCheck,
    title: "Resolution and fund return",
    description: "Once recovered, your funds are returned to your designated wallet or account. You receive a complete case report documenting the entire investigation.",
    expanded: "Recovered funds are transferred back to your specified wallet address or bank account. You receive a detailed case closure report that includes the full investigation timeline, evidence collected, actions taken, and final resolution. Our team provides guidance on security improvements to help prevent future incidents. We maintain case records for your reference.",
    details: [
      "Funds returned to your specified wallet or account",
      "Complete case closure report and documentation",
      "Investigation timeline and evidence summary",
      "Security recommendations to prevent future incidents",
      "Case records maintained for your reference",
    ],
  },
];

function TimelineStep({ step, isLast, accent }: { step: StepData; isLast: boolean; accent: "blue" | "green" | "amber" }) {
  const accentColor = accent === "blue" ? "text-primary" : accent === "amber" ? "text-amber-500" : "text-green-600 dark:text-green-400";
  const lineColor = accent === "blue" ? "bg-primary/20" : accent === "amber" ? "bg-amber-500/20" : "bg-green-500/20";
  const numberBorder = accent === "blue" ? "border-primary/30" : accent === "amber" ? "border-amber-500/30" : "border-green-500/30";
  const numberBg = accent === "blue" ? "bg-primary/5" : accent === "amber" ? "bg-amber-500/5" : "bg-green-500/5";

  return (
    <div className="flex gap-5 md:gap-8" data-testid={`step-${accent}-${step.number}`}>
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-10 h-10 rounded-full border-2 ${numberBorder} ${numberBg} flex items-center justify-center`}>
          <span className={`text-sm font-bold ${accentColor}`}>{step.number}</span>
        </div>
        {!isLast && (
          <div className={`w-px flex-1 min-h-[40px] ${lineColor}`} />
        )}
      </div>

      <div className="pb-12">
        <div className="flex items-center gap-2.5 mb-2">
          <step.icon className={`w-5 h-5 ${accentColor}`} strokeWidth={1.8} />
          <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-3">
          {step.description}
        </p>
        <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-2xl mb-4">
          {step.expanded}
        </p>
        <ul className="space-y-1.5">
          {step.details.map((detail, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${accentColor}`} />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-how-it-works">
      <Navigation />
      <div className="pt-16">
        <section className="py-24 px-6 text-center" data-testid="section-hiw-hero">
          <div className="max-w-[800px] mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              How It Works
            </p>
            <h1 className="text-[36px] md:text-[48px] font-bold text-foreground tracking-tight mb-6 leading-tight">
              Crypto recovery, taxes, and insurance, simplified
            </h1>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
              CoinGuard handles three things: professional crypto recovery, accurate tax reporting, and comprehensive digital asset insurance.
              Use one service or all three. The process is straightforward and you can be set up in minutes.
            </p>
            <p className="text-[15px] text-muted-foreground/70 leading-relaxed max-w-xl mx-auto">
              Below, we walk through exactly how each service works from start to finish so you know what to expect before you sign up.
            </p>
          </div>
        </section>

        <section className="pb-24 px-6" data-testid="section-tax-flow">
          <div className="max-w-[800px] mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-6 h-6 text-primary" strokeWidth={1.8} />
                <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight">
                  Tax reporting
                </h2>
              </div>
              <p className="text-[16px] text-muted-foreground leading-relaxed max-w-2xl">
                From connecting your first wallet to downloading audit-ready tax forms, here is every step of the tax reporting process.
                Our platform handles the complexity of multi-exchange, multi-chain, and DeFi transactions so you don't have to.
              </p>
            </div>
            <div>
              {taxSteps.map((step, i) => (
                <TimelineStep
                  key={step.number}
                  step={step}
                  isLast={i === taxSteps.length - 1}
                  accent="blue"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-muted/30" data-testid="section-recovery-flow">
          <div className="max-w-[800px] mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <SearchCheck className="w-6 h-6 text-amber-500" strokeWidth={1.8} />
                <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight">
                  Crypto recovery
                </h2>
              </div>
              <p className="text-[16px] text-muted-foreground leading-relaxed max-w-2xl">
                Lost access to your crypto or fallen victim to a scam? Our recovery process combines blockchain forensics,
                exchange coordination, and dedicated case management to help you get your funds back.
              </p>
            </div>
            <div>
              {recoverySteps.map((step, i) => (
                <TimelineStep
                  key={step.number}
                  step={step}
                  isLast={i === recoverySteps.length - 1}
                  accent="amber"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6" data-testid="section-insurance-flow">
          <div className="max-w-[800px] mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" strokeWidth={1.8} />
                <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight">
                  Digital asset insurance
                </h2>
              </div>
              <p className="text-[16px] text-muted-foreground leading-relaxed max-w-2xl">
                Protecting your crypto shouldn't be complicated. Our insurance covers exchange hacks, smart contract exploits, theft, and key loss.
                Here's how the process works from subscription to claim resolution.
              </p>
            </div>
            <div>
              {insuranceSteps.map((step, i) => (
                <TimelineStep
                  key={step.number}
                  step={step}
                  isLast={i === insuranceSteps.length - 1}
                  accent="green"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6" data-testid="section-choose-services">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-3">
                Choose the services you need
              </h2>
              <p className="text-[16px] text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Recovery, tax reporting, and insurance are independent services. Use one, two, or all three based on your needs.
                There's no requirement to bundle, but users who do benefit from a single dashboard.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6" data-testid="card-option-recovery">
                <SearchCheck className="w-5 h-5 text-amber-500 mb-3" strokeWidth={1.8} />
                <h3 className="text-base font-bold text-foreground mb-2">Crypto recovery</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Lost funds, wrong transactions, scams, or locked wallets. Our forensics team
                  investigates and works to recover your crypto assets.
                </p>
              </Card>
              <Card className="p-6" data-testid="card-option-tax">
                <FileText className="w-5 h-5 text-primary mb-3" strokeWidth={1.8} />
                <h3 className="text-base font-bold text-foreground mb-2">Tax reporting</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Connect your wallets and exchanges, calculate capital gains, and download audit-ready
                  tax forms for your jurisdiction.
                </p>
              </Card>
              <Card className="p-6" data-testid="card-option-insurance">
                <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400 mb-3" strokeWidth={1.8} />
                <h3 className="text-base font-bold text-foreground mb-2">Insurance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Protection against hacks, exploits, and key loss.
                  Suited for holders who want peace of mind.
                </p>
              </Card>
              <Card className="p-6" data-testid="card-option-bundle">
                <Layers className="w-5 h-5 text-foreground mb-3" strokeWidth={1.8} />
                <h3 className="text-base font-bold text-foreground mb-2">Bundle</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tax reporting and insurance from one dashboard with bundle pricing
                  and priority support.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-muted/30" data-testid="section-hiw-stats">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-3">
                By the numbers
              </h2>
              <p className="text-[16px] text-muted-foreground max-w-lg mx-auto">
                Trusted by thousands of crypto investors and traders worldwide.
              </p>
            </div>
            <div className="grid sm:grid-cols-4 gap-6">
              <Card className="p-6 text-center" data-testid="card-stat-0">
                <Wallet className="w-6 h-6 text-primary mx-auto mb-3" strokeWidth={1.8} />
                <span className="text-[32px] font-bold text-foreground">500+</span>
                <p className="text-sm text-muted-foreground mt-1">Supported integrations</p>
              </Card>
              <Card className="p-6 text-center" data-testid="card-stat-1">
                <Clock className="w-6 h-6 text-primary mx-auto mb-3" strokeWidth={1.8} />
                <span className="text-[32px] font-bold text-foreground">2 min</span>
                <p className="text-sm text-muted-foreground mt-1">Average setup time</p>
              </Card>
              <Card className="p-6 text-center" data-testid="card-stat-2">
                <BarChart3 className="w-6 h-6 text-primary mx-auto mb-3" strokeWidth={1.8} />
                <span className="text-[32px] font-bold text-foreground">5 days</span>
                <p className="text-sm text-muted-foreground mt-1">Avg. claim resolution</p>
              </Card>
              <Card className="p-6 text-center" data-testid="card-stat-3">
                <Users className="w-6 h-6 text-primary mx-auto mb-3" strokeWidth={1.8} />
                <span className="text-[32px] font-bold text-foreground">10K+</span>
                <p className="text-sm text-muted-foreground mt-1">Active users</p>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-6" data-testid="section-faq">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-3">
                Common questions
              </h2>
              <p className="text-[16px] text-muted-foreground max-w-lg mx-auto">
                Answers to the most frequently asked questions about our tax and insurance services.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  q: "Do I need to connect every wallet I've ever used?",
                  a: "For the most accurate tax report, yes. Every trade, transfer, and transaction contributes to your cost basis calculations. Missing wallets can lead to inflated gains or incomplete records. However, you can start with your primary accounts and add more later.",
                },
                {
                  q: "What if my exchange isn't supported?",
                  a: "You can upload transaction history via CSV for any exchange or wallet that isn't directly integrated. We provide CSV templates and formatting guides for the most common unsupported platforms.",
                },
                {
                  q: "How do you handle DeFi and NFT transactions?",
                  a: "Our engine supports DeFi interactions including swaps, liquidity pool deposits and withdrawals, yield farming rewards, and lending/borrowing. NFT minting, purchases, sales, and royalty income are all tracked and categorized automatically.",
                },
                {
                  q: "What does insurance actually cover?",
                  a: "Our policies cover losses from exchange hacks and insolvency, smart contract exploits in audited protocols, phishing and social engineering attacks, SIM-swap theft, and accidental loss of private keys or seed phrases. Coverage applies to assets on supported exchanges and in self-custody wallets.",
                },
                {
                  q: "How long does a claim take to resolve?",
                  a: "The average claim resolution time is 5 business days. Each claim is reviewed by a dedicated specialist who evaluates the evidence and on-chain data. Approved payouts are processed within 48 hours of resolution.",
                },
                {
                  q: "Can I cancel my insurance plan anytime?",
                  a: "Yes. There are no lock-in contracts. You can cancel, upgrade, or downgrade your plan at any time from your dashboard. Coverage remains active until the end of your current billing period.",
                },
              ].map((item, i) => (
                <div key={i} className="border-b border-border pb-6" data-testid={`faq-item-${i}`}>
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.8} />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-muted/30" data-testid="section-hiw-cta">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4">
              Ready to get started?
            </h2>
            <p className="text-[16px] text-muted-foreground mb-8 leading-relaxed">
              Create your free account and connect your first wallet in under two minutes.
              No credit card required to start with tax reporting.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                data-testid="button-hiw-get-started"
                onClick={() => goTo("/apply")}
                className="bg-primary text-primary-foreground font-semibold gap-2 px-8 text-[15px] rounded-full"
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                data-testid="button-hiw-pricing"
                onClick={() => goTo("/pricing")}
                className="font-medium text-[15px] rounded-full"
              >
                View pricing
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
