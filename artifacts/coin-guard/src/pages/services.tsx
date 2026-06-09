import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Shield,
  ArrowRight,
  FileText,
  ShieldCheck,
  Link2,
  RefreshCw,
  Download,
  BarChart3,
  Lock,
  Check,
  Calculator,
  Clock,
  Globe,
  Layers,
  AlertTriangle,
  Zap,
  Eye,
  Wallet,
  TrendingUp,
  FileCheck,
  ArrowUpDown,
  Building,
  Fingerprint,
  Scale,
  Database,
  HeartHandshake,
  X,
  SearchCheck,
  KeyRound,
  Smartphone,
  Ban,
  UserX,
  HardDrive,
  Scan,
  MessageCircle,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

function RecoverySection() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  const recoveryServices = [
    {
      title: "Wrong Address Recovery",
      desc: "Sent crypto to the wrong wallet address or the wrong blockchain network? Our blockchain forensics team traces the transaction and works with exchanges and recipients to attempt full recovery of your funds.",
      icon: ArrowUpDown,
    },
    {
      title: "Crypto Scam Recovery",
      desc: "Fell victim to a fake investment platform, romance scam, impersonation scheme, or fraudulent trading bot? We conduct thorough blockchain investigations to trace stolen funds and identify where your assets were moved.",
      icon: Ban,
    },
    {
      title: "Lost Wallet Access",
      desc: "Forgotten your wallet password, lost your private key, or have a damaged wallet file? Our specialized recovery team uses advanced techniques including brute force recovery, wallet file repair, and seed phrase reconstruction.",
      icon: KeyRound,
    },
    {
      title: "Exchange Account Recovery",
      desc: "Has your exchange frozen your account due to KYC issues, suspicious activity flags, or withdrawal restrictions? We assist in navigating the recovery process and work with exchange compliance teams on your behalf.",
      icon: Building,
    },
    {
      title: "Stolen Crypto Investigation",
      desc: "Had your wallet hacked or crypto stolen through unauthorized access? Our forensic investigators trace the movement of stolen funds across the blockchain, identify destination wallets, and compile evidence for law enforcement.",
      icon: Scan,
    },
    {
      title: "Seed Phrase Recovery",
      desc: "Lost partial access to your seed phrase or have an incomplete backup? Our cryptographic specialists can assist with partial seed phrase reconstruction and wallet access recovery using proprietary tools and techniques.",
      icon: HardDrive,
    },
  ];

  const recoveryProcess = [
    { step: "1", title: "Submit your case", desc: "Fill out our recovery intake form with details about your situation, including transaction hashes, wallet addresses, and any relevant communications or screenshots." },
    { step: "2", title: "Blockchain investigation", desc: "Our forensic team analyzes on-chain data, traces fund movements across wallets and exchanges, and builds a comprehensive recovery strategy tailored to your case." },
    { step: "3", title: "Recovery execution", desc: "We execute the recovery plan, liaising with exchanges, law enforcement, and other parties as needed. You receive regular status updates throughout the process." },
    { step: "4", title: "Funds returned", desc: "Once recovery is successful, funds are returned directly to your designated wallet. We provide a full case report documenting every step taken." },
  ];

  return (
    <section id="recovery" className="py-24 px-6" data-testid="section-recovery-service">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-6">
            <SearchCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-semibold tracking-wide text-amber-600 dark:text-amber-400">Crypto Recovery</span>
          </div>
          <h2 className="text-[32px] md:text-[44px] font-bold text-foreground tracking-tight mb-5 leading-tight max-w-2xl">
            Recover your lost or stolen cryptocurrency
          </h2>
          <p className="text-[16px] md:text-[17px] text-muted-foreground leading-relaxed max-w-2xl">
            Whether you sent crypto to the wrong address, fell victim to a scam, lost access to your wallet,
            or had your funds stolen, our blockchain forensics team is here to help. We use advanced tracing
            technology and work with exchanges and law enforcement to maximize your chances of recovery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 mb-20">
          {recoveryServices.map((service, i) => (
            <div key={i} data-testid={`card-recovery-service-${i}`}>
              <div className="flex items-center gap-2.5 mb-2">
                <service.icon className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-[15px] font-semibold text-foreground">{service.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">How Recovery Works</h3>
            <div className="space-y-6">
              {recoveryProcess.map((step) => (
                <div key={step.step} className="flex items-start gap-4" data-testid={`text-recovery-step-${step.step}`}>
                  <div className="w-8 h-8 rounded-full bg-amber-600 dark:bg-amber-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-6" data-testid="card-recovery-expectations">
            <h3 className="text-[15px] font-semibold text-foreground mb-5">What to Expect</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Response within 24 hours</p>
                  <p className="text-xs text-muted-foreground mt-0.5">A recovery specialist will review your case and contact you within one business day of submission.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <MessageCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Regular progress updates</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Stay informed with detailed status reports at every stage of the investigation and recovery process.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <Scan className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Advanced blockchain forensics</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Proprietary tracing tools that follow funds across multiple chains, mixers, and exchanges.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Honest case assessment</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Not all crypto can be recovered. We provide a realistic evaluation of your case before proceeding, with transparent communication about recovery likelihood.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-2xl p-6 mb-16" data-testid="card-recovery-warning">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-[15px] font-semibold text-foreground mb-1">Important notice</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Blockchain transactions are irreversible by design. While our team has a strong track record of successful recoveries,
                outcomes depend on the specific circumstances of each case. We will always provide you with an honest assessment before
                proceeding. Beware of services that guarantee 100% recovery, as this is not realistic in every situation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            data-testid="button-recovery-get-started"
            onClick={() => goTo("/apply?service=recovery")}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold gap-2 px-8 text-[15px] rounded-full border-amber-600"
          >
            Start recovery
            <SearchCheck className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            data-testid="button-recovery-contact"
            onClick={() => goTo("/contact")}
            className="font-medium text-[15px] rounded-full"
          >
            Speak with a specialist
          </Button>
        </div>
      </div>
    </section>
  );
}

function TaxSection() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  const supportedExchanges = [
    "Coinbase", "Binance", "Kraken", "Gemini", "KuCoin", "Crypto.com",
    "Bybit", "OKX", "Bitfinex", "Bitstamp", "Gate.io", "Huobi",
  ];

  const reportTypes = [
    { name: "IRS Form 8949", desc: "Complete capital gains and losses reporting for US taxpayers" },
    { name: "Schedule D", desc: "Summary of total capital gains and losses for your 1040" },
    { name: "HMRC Capital Gains", desc: "SA108 supplementary pages for UK crypto investors" },
    { name: "ATO CGT Report", desc: "Capital gains tax report formatted for Australian requirements" },
    { name: "CRA Schedule 3", desc: "Capital gains report for Canadian Revenue Agency filing" },
    { name: "EU DAC8 Report", desc: "Cross-border reporting compliant with EU directive requirements" },
  ];

  return (
    <section id="tax-reporting" className="py-24 px-6" data-testid="section-tax-service">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-6">
            <Calculator className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold tracking-wide text-primary">Tax Reporting</span>
          </div>
          <h2 className="text-[32px] md:text-[44px] font-bold text-foreground tracking-tight mb-5 leading-tight max-w-2xl">
            Crypto tax reporting that handles the complexity for you
          </h2>
          <p className="text-[16px] md:text-[17px] text-muted-foreground leading-relaxed max-w-2xl">
            Whether you made a few trades on Coinbase or thousands of DeFi transactions across multiple chains,
            our platform automatically imports, categorizes, and calculates your tax liability with precision.
            No spreadsheets. No guesswork. Audit-ready reports in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 mb-20">
          <div data-testid="card-tax-feature-0">
            <div className="flex items-center gap-2.5 mb-2">
              <Link2 className="w-4.5 h-4.5 text-primary" />
              <h3 className="text-[15px] font-semibold text-foreground">Auto-Import Transactions</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect your wallets and exchange accounts via API or CSV upload. We pull every trade, swap,
              transfer, staking reward, airdrop, and liquidity pool transaction automatically. Supports
              over 300 exchanges and all major blockchains including Ethereum, Solana, Polygon, Avalanche,
              Arbitrum, and more.
            </p>
          </div>

          <div data-testid="card-tax-feature-1">
            <div className="flex items-center gap-2.5 mb-2">
              <Calculator className="w-4.5 h-4.5 text-primary" />
              <h3 className="text-[15px] font-semibold text-foreground">Accurate Cost Basis Calculation</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Capital gains, losses, and income computed using your choice of FIFO, LIFO, HIFO,
              or specific identification methods. Our engine handles complex scenarios like wash sales,
              cross-exchange transfers, and DeFi protocol interactions that other tools miss.
            </p>
          </div>

          <div data-testid="card-tax-feature-2">
            <div className="flex items-center gap-2.5 mb-2">
              <Globe className="w-4.5 h-4.5 text-primary" />
              <h3 className="text-[15px] font-semibold text-foreground">Multi-Jurisdiction Compliance</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Generate reports compliant with tax regulations in the US (IRS), UK (HMRC),
              Australia (ATO), Canada (CRA), Germany (BZSt), and across the EU. Our system stays
              updated with the latest regulatory changes so you don't have to.
            </p>
          </div>

          <div data-testid="card-tax-feature-3">
            <div className="flex items-center gap-2.5 mb-2">
              <RefreshCw className="w-4.5 h-4.5 text-primary" />
              <h3 className="text-[15px] font-semibold text-foreground">Real-Time Portfolio Sync</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transactions update automatically as you trade. Your tax position is always current,
              giving you visibility into unrealized gains and estimated tax liability before you even
              file. No manual data entry or re-imports required throughout the year.
            </p>
          </div>

          <div data-testid="card-tax-feature-4">
            <div className="flex items-center gap-2.5 mb-2">
              <Layers className="w-4.5 h-4.5 text-primary" />
              <h3 className="text-[15px] font-semibold text-foreground">DeFi, NFT & Staking Support</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full support for decentralized finance transactions including yield farming, liquidity
              provision, token wrapping, and governance rewards. NFT mints, sales, and royalties are
              categorized and taxed correctly. Staking income is tracked as earned.
            </p>
          </div>

          <div data-testid="card-tax-feature-5">
            <div className="flex items-center gap-2.5 mb-2">
              <TrendingUp className="w-4.5 h-4.5 text-primary" />
              <h3 className="text-[15px] font-semibold text-foreground">Tax-Loss Harvesting</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Identify unrealized losses in your portfolio that you can strategically realize to offset
              gains and reduce your tax bill. Our dashboard highlights harvesting opportunities in
              real-time so you can act before year-end deadlines.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="p-6" data-testid="card-supported-exchanges">
            <div className="flex items-center gap-2.5 mb-4">
              <Database className="w-4.5 h-4.5 text-muted-foreground" />
              <h3 className="text-[15px] font-semibold text-foreground">300+ Supported Exchanges</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Direct API integration or CSV import for every major centralized exchange. Connect in seconds.
            </p>
            <div className="flex flex-wrap gap-2">
              {supportedExchanges.map((exchange) => (
                <span
                  key={exchange}
                  className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md"
                  data-testid={`badge-exchange-${exchange.toLowerCase().replace(/\./g, "")}`}
                >
                  {exchange}
                </span>
              ))}
              <span className="text-xs font-medium text-primary px-2.5 py-1">+290 more</span>
            </div>
          </Card>

          <Card className="p-6" data-testid="card-report-types">
            <div className="flex items-center gap-2.5 mb-4">
              <FileCheck className="w-4.5 h-4.5 text-muted-foreground" />
              <h3 className="text-[15px] font-semibold text-foreground">Audit-Ready Report Formats</h3>
            </div>
            <div className="space-y-3">
              {reportTypes.map((report) => (
                <div key={report.name} className="flex items-start gap-2.5" data-testid={`text-report-${report.name.toLowerCase().replace(/\s/g, "-")}`}>
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{report.name}</span>
                    <span className="text-sm text-muted-foreground"> - {report.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            data-testid="button-tax-get-started"
            onClick={() => goTo("/apply")}
            className="bg-primary text-primary-foreground font-semibold gap-2 px-8 text-[15px] rounded-full"
          >
            Start filing
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            data-testid="button-tax-pricing"
            onClick={() => goTo("/pricing")}
            className="font-medium text-[15px] rounded-full"
          >
            View pricing
          </Button>
        </div>
      </div>
    </section>
  );
}

function InsuranceSection() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  const coverageTypes = [
    {
      title: "Exchange Hack Protection",
      desc: "If a centralized exchange you hold funds on is compromised, your insured balance is covered up to your policy limit. Covers both hot and cold wallet breaches on supported platforms.",
    },
    {
      title: "Smart Contract Failure",
      desc: "Coverage for losses resulting from bugs, exploits, or vulnerabilities in audited DeFi protocol smart contracts. Applies to lending, staking, and liquidity pool positions.",
    },
    {
      title: "Private Key Loss Recovery",
      desc: "If you lose access to your private keys through hardware failure, corruption, or accidental deletion, our recovery assistance and financial coverage helps minimize the impact.",
    },
    {
      title: "Theft & Fraud Protection",
      desc: "Protection against unauthorized access to your wallets, SIM-swap attacks, and social engineering fraud. Covers losses from verified theft incidents up to policy limits.",
    },
    {
      title: "Phishing Attack Coverage",
      desc: "If you fall victim to a sophisticated phishing attack that results in asset loss, verified claims are covered. Includes malicious approval exploits and fake dApp interactions.",
    },
    {
      title: "Protocol Exploit Protection",
      desc: "Coverage for rug pulls, governance attacks, and oracle manipulation on qualifying protocols. Our risk team continuously evaluates protocol security ratings.",
    },
  ];

  const claimSteps = [
    { step: "1", title: "Report the incident", desc: "Submit a claim through your dashboard with transaction hashes and relevant details within 72 hours." },
    { step: "2", title: "Investigation", desc: "Our claims team verifies the incident using on-chain data, exchange records, and third-party forensics." },
    { step: "3", title: "Resolution", desc: "Approved claims are paid out in USDC or fiat within 14 business days. Track status in real-time." },
  ];

  return (
    <section id="insurance" className="py-24 px-6 bg-muted/30" data-testid="section-insurance-service">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-6">
            <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-semibold tracking-wide text-green-600 dark:text-green-400">Portfolio Insurance</span>
          </div>
          <h2 className="text-[32px] md:text-[44px] font-bold text-foreground tracking-tight mb-5 leading-tight max-w-2xl">
            Comprehensive protection for your digital assets
          </h2>
          <p className="text-[16px] md:text-[17px] text-muted-foreground leading-relaxed max-w-2xl">
            Crypto markets are volatile, and security threats are constant. Our insurance plans provide
            real financial protection against hacks, theft, smart contract failures, and more. Coverage
            starts at $15/month with no waiting period and transparent claims processing.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-xl font-bold text-foreground mb-8">What's Covered</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {coverageTypes.map((coverage, i) => (
              <div key={i} data-testid={`card-insurance-coverage-${i}`}>
                <div className="flex items-center gap-2.5 mb-2">
                  <Shield className="w-4.5 h-4.5 text-green-600 dark:text-green-400" />
                  <h4 className="text-[15px] font-semibold text-foreground">{coverage.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{coverage.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">How Claims Work</h3>
            <div className="space-y-6">
              {claimSteps.map((step) => (
                <div key={step.step} className="flex items-start gap-4" data-testid={`text-claim-step-${step.step}`}>
                  <div className="w-8 h-8 rounded-full bg-green-600 dark:bg-green-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-6" data-testid="card-insurance-tiers">
            <h3 className="text-[15px] font-semibold text-foreground mb-5">Coverage Tiers</h3>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <p className="text-sm font-semibold text-foreground">Essential</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Up to $10,000 coverage</p>
                  <p className="text-xs text-muted-foreground">Exchange hacks, theft, phishing</p>
                </div>
                <p className="text-sm font-bold text-foreground whitespace-nowrap">$15/mo</p>
              </div>
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <p className="text-sm font-semibold text-foreground">Professional</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Up to $50,000 coverage</p>
                  <p className="text-xs text-muted-foreground">All Essential + smart contract, key loss</p>
                </div>
                <p className="text-sm font-bold text-foreground whitespace-nowrap">$49/mo</p>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Enterprise</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Up to $500,000 coverage</p>
                  <p className="text-xs text-muted-foreground">Full coverage + dedicated claims manager</p>
                </div>
                <p className="text-sm font-bold text-foreground whitespace-nowrap">Custom</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            data-testid="button-insurance-get-started"
            onClick={() => goTo("/apply")}
            className="bg-green-600 text-white font-semibold gap-2 px-8 text-[15px] rounded-full border-green-600"
          >
            Get covered
            <ShieldCheck className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            data-testid="button-insurance-pricing"
            onClick={() => goTo("/pricing")}
            className="font-medium text-[15px] rounded-full"
          >
            View pricing
          </Button>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const comparisons = [
    { feature: "Blockchain forensics & fund tracing", aegis: true, others: false as const },
    { feature: "Wrong address recovery assistance", aegis: true, others: false as const },
    { feature: "Crypto scam investigation", aegis: true, others: false as const },
    { feature: "Lost wallet & seed phrase recovery", aegis: true, others: false as const },
    { feature: "Exchange account recovery support", aegis: true, others: false as const },
    { feature: "Auto-import from 300+ exchanges", aegis: true, others: "partial" as const },
    { feature: "Multi-jurisdiction tax reports", aegis: true, others: false as const },
    { feature: "DeFi & NFT transaction support", aegis: true, others: "partial" as const },
    { feature: "Tax-loss harvesting tools", aegis: true, others: false as const },
    { feature: "Portfolio insurance coverage", aegis: true, others: false as const },
    { feature: "Audit-ready IRS Form 8949", aegis: true, others: true as const },
    { feature: "Transparent claims tracking", aegis: true, others: false as const },
    { feature: "Dedicated account manager", aegis: true, others: false as const },
    { feature: "24/7 priority support", aegis: true, others: false as const },
  ];

  return (
    <section className="py-24 px-6" data-testid="section-comparison">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4">
            Why choose CoinGuard?
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We're the only platform that combines crypto recovery, institutional-grade tax reporting,
            and digital asset insurance under one roof. Here's how we compare.
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] text-center border-b border-border p-4 bg-muted/30">
            <span className="text-sm font-medium text-muted-foreground text-left">Feature</span>
            <span className="text-sm font-bold text-primary">CoinGuard</span>
            <span className="text-sm font-medium text-muted-foreground">Others</span>
          </div>
          {comparisons.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] text-center p-4 border-b border-border last:border-b-0"
              data-testid={`row-comparison-${i}`}
            >
              <span className="text-sm text-foreground text-left">{row.feature}</span>
              <div className="flex justify-center">
                <Check className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex justify-center">
                {row.others === true ? (
                  <Check className="w-4 h-4 text-muted-foreground" />
                ) : row.others === "partial" ? (
                  <span className="text-xs text-muted-foreground">Partial</span>
                ) : (
                  <X className="w-4 h-4 text-muted-foreground/40" />
                )}
              </div>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}

export default function Services() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="page-services">
      <Navigation />
      <div className="pt-16">
        <section className="py-24 px-6 text-center" data-testid="section-services-hero">
          <div className="max-w-[800px] mx-auto">
            <h1 className="text-[36px] md:text-[48px] font-bold text-foreground tracking-tight mb-6 leading-tight">
              Our Services
            </h1>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Crypto recovery, tax reporting, and digital asset insurance designed for individual
              investors, active traders, and institutions. Recover what is lost, stay compliant, stay protected.
            </p>
          </div>
        </section>

        <RecoverySection />
        <TaxSection />
        <InsuranceSection />
        <ComparisonSection />

        <section className="py-24 px-6 bg-muted/30" data-testid="section-services-cta">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4">
              Ready to get started?
            </h2>
            <p className="text-[16px] text-muted-foreground mb-8 leading-relaxed">
              Join thousands of crypto investors who trust CoinGuard for asset recovery, tax compliance,
              and portfolio protection. Create your free account in under two minutes.
            </p>
            <Button
              size="lg"
              data-testid="button-services-cta"
              onClick={() => {
                window.location.href = "/apply";
              }}
              className="bg-primary text-primary-foreground font-semibold gap-2 px-8 text-[15px] rounded-full"
            >
              Create free account
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
