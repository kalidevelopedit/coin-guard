import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Shield,
  ArrowRight,
  FileText,
  ShieldCheck,
  Link2,
  Download,
  BarChart3,
  Lock,
  Check,
  Calculator,
  Clock,
  ChevronRight,
  ArrowUpRight,
  Eye,
  Globe,
  Layers,
  Search,
  FileCheck,
  CreditCard,
  AlertTriangle,
  UserCheck,
  MessageCircle,
  Headphones,
  Radar,
  Bell,
  Smartphone,
  Mail,
  Activity,
  ShieldAlert,
  KeyRound,
  Fingerprint,
  TrendingUp,
  PiggyBank,
  BadgeDollarSign,
  Scan,
  SearchCheck,
  Ban,
  HardDrive,
} from "lucide-react";
import {
  CoinbaseLogo,
  BinanceLogo,
  KrakenLogo,
  GeminiLogo,
  MetaMaskLogo,
  LedgerLogo,
  TrezorLogo,
  KuCoinLogo,
  OkxLogo,
  CryptocomLogo,
  PhantomLogo,
  ExodusLogo,
  SolanaLogo,
} from "@/components/crypto-logos";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import neonLogoPath from "@assets/ChatGPT_Image_Feb_27,_2026,_08_02_14_PM_1772197338732.png";
import lockImage from "@assets/image_1772015507606.png";
import dataImage from "@assets/image_1772015482540.png";
import syncImage from "@assets/sync_3d.png";
import shieldCoverageImage from "@assets/shield_3d.png";
import sarahPhoto from "@assets/stock_images/sarah_chen_headshot.jpg";
import marcusPhoto from "@assets/stock_images/marcus_rivera_headshot.jpg";
import jamesPhoto from "@assets/stock_images/james_park_headshot.jpg";

function HeroSection() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  return (
    <section className="relative pt-20 sm:pt-24 pb-0 overflow-hidden" data-testid="section-hero">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="relative rounded-2xl sm:rounded-[32px] bg-gradient-to-br from-[#0f1729] via-[#131d36] to-[#0c1527] dark:from-[#0f1729] dark:via-[#131d36] dark:to-[#0c1527] bg-white/50 p-5 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_60%)] dark:block hidden" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.08),transparent_60%)] dark:block hidden" />

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-white/10 bg-primary/10 border border-white/10 dark:border-white/10 border-primary/20 rounded-full px-4 py-1.5 mb-8">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-white dark:text-white text-foreground">
                  Recovery + Tax + Insurance
                </span>
              </div>

              <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bold text-white dark:text-white leading-[1.1] tracking-[-0.02em] mb-6">
                Recover lost crypto.
                <br />
                File taxes. Stay protected.
              </h1>

              <p className="text-[16px] text-white/60 dark:text-white/60 leading-relaxed mb-10 max-w-md">
                The trusted platform for cryptocurrency recovery, tax reporting, and digital asset protection.
                Built for serious investors who value clarity and security.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Button
                  size="lg"
                  data-testid="button-hero-get-started"
                  onClick={() => goTo("/apply")}
                  className="bg-primary text-primary-foreground font-semibold gap-2 px-8 text-[15px] rounded-full h-12"
                >
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  data-testid="button-hero-learn-more"
                  onClick={() => goTo("/how-it-works")}
                  className="font-medium gap-2 px-6 text-[15px] rounded-full h-12 border-white/20 dark:border-white/20 text-white dark:text-white hover:bg-white/10 dark:hover:bg-white/10 bg-transparent"
                >
                  Learn more
                </Button>
              </div>
            </div>

            <div className="relative hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/5 rounded-full blur-3xl" />
                <img
                  src={neonLogoPath}
                  alt="CoinGuard"
                  className="relative z-10 w-full h-auto object-contain mix-blend-screen"
                  data-testid="img-hero-logo"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="text-center" data-testid="stat-encryption">
                <span className="text-xl font-bold text-primary">256bits</span>
                <p className="text-xs text-white/40 mt-0.5">AES Encryption</p>
              </div>
              <div className="text-center" data-testid="stat-incidents">
                <span className="text-xl font-bold text-primary">0.</span>
                <p className="text-xs text-white/40 mt-0.5">Security incidents</p>
              </div>
              <div className="text-center" data-testid="stat-certification">
                <span className="text-xl font-bold text-primary">CISA+</span>
                <p className="text-xs text-white/40 mt-0.5">Security certification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoMarquee() {
  const logos = [
    { name: "Coinbase", icon: CoinbaseLogo },
    { name: "Binance", icon: BinanceLogo },
    { name: "Kraken", icon: KrakenLogo },
    { name: "Gemini", icon: GeminiLogo },
    { name: "MetaMask", icon: MetaMaskLogo },
    { name: "Ledger", icon: LedgerLogo },
    { name: "KuCoin", icon: KuCoinLogo },
    { name: "OKX", icon: OkxLogo },
    { name: "Crypto.com", icon: CryptocomLogo },
    { name: "Phantom", icon: PhantomLogo },
  ];

  return (
    <section className="py-12 overflow-hidden" data-testid="section-logos">
      <p className="text-center text-sm font-medium text-muted-foreground mb-8">
        Used and trusted by
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex items-center gap-12 animate-marquee">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center gap-2.5 flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity"
            >
              <logo.icon className="w-6 h-6 grayscale" />
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  const features = [
    {
      title: "Built-in tax calculator",
      description:
        "Your all-in-one crypto tax tool. Automatically calculate capital gains, losses, and income across all your wallets and exchanges.",
      preview: (
        <div className="bg-card border border-border rounded-2xl p-5 mt-4">
          <p className="text-xs text-muted-foreground mb-1">Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">$48,296</span>
            <span className="text-sm text-muted-foreground">.24</span>
            <span className="text-xs text-muted-foreground ml-1">USD</span>
            <span className="text-xs font-medium text-green-500 ml-auto">+4.6%</span>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { name: "Bitcoin", ticker: "BTC", value: "$2,950.75" },
              { name: "Ethereum", ticker: "ETH", value: "$2,724.16" },
              { name: "Solana", ticker: "SOL", value: "$1,984.02" },
            ].map((coin) => (
              <div key={coin.ticker} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-primary w-6 text-center">{coin.ticker[0]}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{coin.name}</p>
                    <p className="text-xs text-muted-foreground">{coin.ticker}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">{coin.value}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Instant wallet syncing",
      description:
        "Connect your wallets and exchanges in seconds. We automatically import and categorize every transaction for accurate tax reporting.",
      preview: (
        <div className="bg-card border border-border rounded-2xl p-5 mt-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2">
                <CoinbaseLogo className="w-5 h-5" />
                <span className="text-sm font-medium text-foreground">Coinbase</span>
              </div>
              <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">Connected</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2">
                <MetaMaskLogo className="w-5 h-5" />
                <span className="text-sm font-medium text-foreground">MetaMask</span>
              </div>
              <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">Connected</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-2">
                <LedgerLogo className="w-5 h-5" />
                <span className="text-sm font-medium text-foreground">Ledger</span>
              </div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">Syncing...</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Crypto recovery",
      description:
        "Lost crypto to a scam, wrong address, or forgotten wallet? Our blockchain forensics team traces and recovers your digital assets.",
      preview: (
        <div className="bg-card border border-border rounded-2xl p-5 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <SearchCheck className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-semibold text-foreground">Recovery Services</span>
          </div>
          <div className="space-y-2">
            {["Wrong address recovery", "Scam fund tracing", "Lost wallet access", "Stolen crypto investigation"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-medium text-amber-500">Case-by-case pricing</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" data-testid="section-features" id="features">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-foreground tracking-tight mb-4">
            Why is this app for you?
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore the features that establish our application as the premier option for new and
            seasoned crypto traders who require a dependable platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-card border border-border rounded-3xl p-6 hover:border-primary/30 transition-all duration-300"
              data-testid={`card-feature-${i}`}
            >
              <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              {feature.preview}
              <button
                onClick={() => goTo("/services")}
                className="mt-4 w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors ml-auto"
                data-testid={`button-feature-arrow-${i}`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CryptoRecoverySection() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  const recoveryTypes = [
    {
      icon: Ban,
      title: "Scam & Fraud Recovery",
      description: "Our forensic investigators trace stolen funds through the blockchain, identify destination wallets, and compile evidence to support your recovery case.",
    },
    {
      icon: KeyRound,
      title: "Lost Wallet Recovery",
      description: "Forgotten passwords, lost private keys, or damaged wallet files. Our specialists use advanced recovery techniques to help you regain access to your funds.",
    },
    {
      icon: HardDrive,
      title: "Seed Phrase Reconstruction",
      description: "Partial seed phrase recovery, missing word identification, and cryptographic wallet restoration using proprietary tools.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30" data-testid="section-crypto-recovery">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
              <SearchCheck className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-semibold tracking-wide text-foreground">
                Crypto Recovery
              </span>
            </div>

            <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight leading-tight mb-4">
              Lost crypto? We help
              <br />
              you get it back.
            </h2>

            <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 max-w-md">
              Whether you sent crypto to the wrong address, fell victim to a scam,
              or lost access to your wallet, our blockchain forensics team is here
              to investigate and recover your assets.
            </p>

            <div className="space-y-6 mb-8">
              {recoveryTypes.map((item) => (
                <div key={item.title} className="flex items-start gap-4" data-testid={`benefit-recovery-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                  <item.icon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[15px] font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              onClick={() => goTo("/apply?service=recovery")}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full px-8 h-12 text-[15px]"
              data-testid="button-recovery-cta"
            >
              Start your recovery
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="relative">
            <div className="bg-card border border-border rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <SearchCheck className="w-6 h-6 text-amber-500" />
                <div>
                  <p className="text-lg font-bold text-foreground">Recovery Case #4821</p>
                  <p className="text-sm text-amber-500 font-medium">Investigation in progress</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  { label: "Case submitted", status: "Complete", color: "text-green-500" },
                  { label: "Transaction traced", status: "Complete", color: "text-green-500" },
                  { label: "Exchange contacted", status: "Complete", color: "text-green-500" },
                  { label: "Funds recovery", status: "In progress", color: "text-amber-500" },
                  { label: "Case resolution", status: "Pending", color: "text-muted-foreground" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4 p-3 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Check className={`w-4 h-4 ${item.status === "Complete" ? "text-green-500" : item.status === "In progress" ? "text-amber-500" : "text-muted-foreground/30"} flex-shrink-0`} />
                      <span className="text-sm text-foreground">{item.label}</span>
                    </div>
                    <span className={`text-xs font-medium ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img src={neonLogoPath} alt="CoinGuard" className="h-8 w-auto object-contain dark:mix-blend-screen" />
                <span className="text-xs text-muted-foreground">CoinGuard Recovery Services</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkFeatureGrid() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  const gridFeatures = [
    {
      title: "Blockchain forensics & recovery",
      description: "Advanced on-chain tracing to locate and recover lost, stolen, or misdirected cryptocurrency across all major blockchains.",
      image: lockImage,
      span: "col-span-1",
    },
    {
      title: "Automatic transaction syncing",
      description: "We pull every trade, swap, transfer, and staking reward automatically from your connected sources.",
      image: syncImage,
      span: "col-span-1",
    },
    {
      title: "Audit-ready reports",
      description: "Generate detailed, compliant tax reports ready for submission. Download as PDF or CSV.",
      image: dataImage,
      span: "col-span-1",
    },
    {
      title: "Real-time coverage engine",
      description: "Track your insurance coverage in real-time. File and monitor claims with full transparency.",
      image: shieldCoverageImage,
      span: "col-span-1",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0b1120] dark:bg-[#0b1120]" data-testid="section-grid-features">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight leading-tight max-w-md">
            Everything you
            <br />
            need for crypto
          </h2>
          <p className="text-[15px] text-white/50 max-w-md leading-relaxed">
            Our platform provides tools for all your crypto needs, from tax compliance to asset
            protection, all in one easy-to-use place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {gridFeatures.map((feature, i) => (
            <div
              key={i}
              className={`${feature.span} bg-[#111827] border border-white/5 rounded-3xl p-8 flex flex-col justify-between min-h-[280px] group hover:border-white/10 transition-all duration-300`}
              data-testid={`card-grid-feature-${i}`}
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed max-w-sm">{feature.description}</p>
              </div>
              {feature.image && (
                <div className="flex justify-end mt-6">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-32 h-32 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          <Button
            size="lg"
            onClick={() => goTo("/apply")}
            className="bg-primary text-primary-foreground font-semibold rounded-full px-8 h-12 text-[15px]"
            data-testid="button-grid-get-started"
          >
            Get started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => goTo("/services")}
            className="font-medium rounded-full px-8 h-12 text-[15px] border-white/15 text-white hover:bg-white/5 bg-transparent"
            data-testid="button-grid-browse"
          >
            Browse all features
          </Button>
        </div>
      </div>
    </section>
  );
}

function WalletSection() {
  const wallets = [
    { name: "Coinbase", icon: CoinbaseLogo, type: "Exchange" },
    { name: "Binance", icon: BinanceLogo, type: "Exchange" },
    { name: "Kraken", icon: KrakenLogo, type: "Exchange" },
    { name: "Gemini", icon: GeminiLogo, type: "Exchange" },
    { name: "KuCoin", icon: KuCoinLogo, type: "Exchange" },
    { name: "OKX", icon: OkxLogo, type: "Exchange" },
    { name: "MetaMask", icon: MetaMaskLogo, type: "Wallet" },
    { name: "Phantom", icon: PhantomLogo, type: "Wallet" },
    { name: "Exodus", icon: ExodusLogo, type: "Wallet" },
    { name: "Ledger", icon: LedgerLogo, type: "Hardware" },
    { name: "Trezor", icon: TrezorLogo, type: "Hardware" },
    { name: "Crypto.com", icon: CryptocomLogo, type: "Exchange" },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" data-testid="section-wallets">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-foreground tracking-tight mb-4">
            Connect your wallets and exchanges
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We support 500+ integrations including all major exchanges, software wallets, hardware
            wallets, and manual CSV imports.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {wallets.map((wallet) => (
            <div
              key={wallet.name}
              className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-primary/30 transition-all duration-200"
              data-testid={`card-wallet-${wallet.name.toLowerCase().replace(/\./g, "")}`}
            >
              <wallet.icon className="w-10 h-10" />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">{wallet.name}</p>
                <p className="text-xs text-muted-foreground">{wallet.type}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <div className="bg-card border border-dashed border-border rounded-2xl px-6 py-4 flex items-center gap-3">
            <Download className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Manual CSV Import</p>
              <p className="text-xs text-muted-foreground">
                Upload transaction history from any source
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const recoverySteps = [
    { icon: FileText, title: "Submit", description: "Describe your case and provide details" },
    { icon: Search, title: "Investigate", description: "Blockchain forensics & fund tracing" },
    { icon: SearchCheck, title: "Recover", description: "Recovery strategy execution" },
    { icon: Check, title: "Resolved", description: "Funds returned to your wallet" },
  ];

  const taxSteps = [
    { icon: Link2, title: "Connect", description: "Link your wallets and exchanges" },
    { icon: Search, title: "Review", description: "We categorize every transaction" },
    { icon: Calculator, title: "Calculate", description: "Instant tax liability computation" },
    { icon: FileCheck, title: "Export", description: "Download audit-ready reports" },
  ];

  const insuranceSteps = [
    { icon: CreditCard, title: "Subscribe", description: "$15/month for full coverage" },
    { icon: ShieldCheck, title: "Coverage", description: "Protection starts immediately" },
    { icon: AlertTriangle, title: "Claim", description: "File a claim in minutes" },
    { icon: Eye, title: "Track", description: "Monitor claim status in real-time" },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30" data-testid="section-how-it-works">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-foreground tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you need crypto recovery, tax reports, or insurance coverage, getting started takes just a few minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <SearchCheck className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-foreground">Recovery Flow</h3>
            </div>
            <div className="space-y-0">
              {recoverySteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4" data-testid={`step-recovery-${i}`}>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-amber-500" strokeWidth={1.8} />
                    </div>
                    {i < recoverySteps.length - 1 && (
                      <div className="w-px h-8 bg-amber-500/20" />
                    )}
                  </div>
                  <div className="pt-1 pb-4">
                    <h4 className="text-[15px] font-semibold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-8">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Crypto Tax Flow</h3>
            </div>
            <div className="space-y-0">
              {taxSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4" data-testid={`step-tax-${i}`}>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
                    </div>
                    {i < taxSteps.length - 1 && (
                      <div className="w-px h-8 bg-primary/20" />
                    )}
                  </div>
                  <div className="pt-1 pb-4">
                    <h4 className="text-[15px] font-semibold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-8">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-bold text-foreground">Insurance Flow</h3>
            </div>
            <div className="space-y-0">
              {insuranceSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4" data-testid={`step-insurance-${i}`}>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-green-500" strokeWidth={1.8} />
                    </div>
                    {i < insuranceSteps.length - 1 && (
                      <div className="w-px h-8 bg-green-500/20" />
                    )}
                  </div>
                  <div className="pt-1 pb-4">
                    <h4 className="text-[15px] font-semibold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonalAdvisorSection() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  const benefits = [
    {
      icon: UserCheck,
      title: "Dedicated Tax Advisor",
      description: "When you register with CoinGuard, you are assigned a personal tax advisor who knows your portfolio inside and out.",
    },
    {
      icon: MessageCircle,
      title: "24/7 WhatsApp Support",
      description: "Reach your designated advisor anytime via WhatsApp. Get answers to tax questions, filing guidance, and portfolio advice around the clock.",
    },
    {
      icon: Headphones,
      title: "Priority Consultations",
      description: "Schedule one-on-one video calls with your advisor for complex tax situations, audits, or strategic planning.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" data-testid="section-personal-advisor">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <UserCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-foreground">
                Personal Advisor
              </span>
            </div>

            <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight leading-tight mb-4">
              Your own dedicated
              <br />
              tax advisor
            </h2>

            <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 max-w-md">
              Every CoinGuard member gets a personal tax advisor who understands
              crypto taxation and your specific portfolio. No bots, no queues.
              Just real expertise on demand.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4" data-testid={`benefit-advisor-${benefit.title.toLowerCase().replace(/\s/g, "-")}`}>
                  <benefit.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[15px] font-semibold text-foreground">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              onClick={() => goTo("/apply")}
              className="bg-primary text-primary-foreground font-semibold rounded-full px-8 h-12 text-[15px]"
              data-testid="button-advisor-get-started"
            >
              Get your advisor
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="relative">
            <div className="bg-card border border-border rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={sarahPhoto}
                    alt="Your CoinGuard Advisor"
                    className="w-16 h-16 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Senior Tax Advisor</p>
                  <p className="text-xs text-green-500 font-medium mt-0.5">Available now</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="bg-muted/50 rounded-2xl rounded-bl-md p-4">
                  <p className="text-sm text-foreground">Hi there! I've reviewed your Q4 transactions. You have 3 tax-loss harvesting opportunities that could save you $2,400 this year.</p>
                  <p className="text-xs text-muted-foreground mt-2">Today, 2:34 PM</p>
                </div>
                <div className="bg-primary/10 rounded-2xl rounded-br-md p-4 ml-8">
                  <p className="text-sm text-foreground">That sounds great! Can we schedule a call to go over the details?</p>
                  <p className="text-xs text-muted-foreground mt-2">Today, 2:36 PM</p>
                </div>
                <div className="bg-muted/50 rounded-2xl rounded-bl-md p-4">
                  <p className="text-sm text-foreground">Absolutely! I've sent you a calendar link. Also, your tax report is 95% complete. I'll finalize it after our call.</p>
                  <p className="text-xs text-muted-foreground mt-2">Today, 2:37 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img src={neonLogoPath} alt="CoinGuard" className="h-8 w-auto object-contain dark:mix-blend-screen" />
                <span className="text-xs text-muted-foreground">Powered by CoinGuard Advisory</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AIBlockchainTrackerSection() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  const features = [
    {
      icon: Radar,
      title: "Wallet Monitoring",
      description: "Our AI continuously scans blockchain networks to monitor your connected wallets for any suspicious interactions or flagged addresses.",
    },
    {
      icon: Bell,
      title: "Instant SMS & Email Alerts",
      description: "Receive immediate notifications via SMS and email if your wallet interacts with known suspicious, sanctioned, or compromised addresses.",
    },
    {
      icon: Scan,
      title: "Risk Scoring",
      description: "Every wallet interaction is scored for risk. See a real-time risk dashboard showing the health and safety of your portfolio connections.",
    },
    {
      icon: Activity,
      title: "Transaction Pattern Analysis",
      description: "Advanced AI detects unusual transaction patterns, potential rug pulls, and high-risk DeFi protocols before they affect your assets.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0b1120] dark:bg-[#0b1120]" data-testid="section-ai-tracker">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <Radar className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold tracking-wide text-white">
              AI Blockchain Tracker
            </span>
          </div>

          <h2 className="text-[28px] md:text-[36px] font-bold text-white tracking-tight leading-tight mb-4">
            AI-powered wallet security
            <br />
            that never sleeps
          </h2>
          <p className="text-[15px] text-white/50 max-w-2xl mx-auto leading-relaxed">
            Our advanced AI blockchain tracker monitors your wallets 24/7, detecting suspicious
            interactions and alerting you instantly via SMS and email before threats become losses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-[#111827] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all duration-300"
              data-testid={`card-ai-feature-${i}`}
            >
              <feature.icon className="w-6 h-6 text-primary mb-5" />
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#111827] border border-white/5 rounded-3xl p-8 md:p-10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-white mb-3">Real-time alert preview</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">High Risk Alert</p>
                    <p className="text-xs text-white/40 mt-1">Your wallet 0x7a3...f92 interacted with a flagged address associated with a known phishing scheme. Transaction pending review.</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Critical</span>
                      <span className="text-xs text-white/30 flex items-center gap-1"><Smartphone className="w-3 h-3" /> SMS sent</span>
                      <span className="text-xs text-white/30 flex items-center gap-1"><Mail className="w-3 h-3" /> Email sent</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Eye className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Suspicious Activity</p>
                    <p className="text-xs text-white/40 mt-1">Unusual withdrawal pattern detected on connected exchange. 3 large transfers in 5 minutes from Binance wallet.</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Warning</span>
                      <span className="text-xs text-white/30 flex items-center gap-1"><Mail className="w-3 h-3" /> Email sent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="inline-flex flex-col items-center gap-4">
                <Shield className="w-10 h-10 text-primary" />
                <div>
                  <p className="text-3xl font-bold text-primary">24/7</p>
                  <p className="text-xs text-white/40 mt-1">Active monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          <Button
            size="lg"
            onClick={() => goTo("/apply")}
            className="bg-primary text-primary-foreground font-semibold rounded-full px-8 h-12 text-[15px]"
            data-testid="button-ai-tracker-get-started"
          >
            Enable AI monitoring
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function InsuranceReinforcementSection() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  const coverageItems = [
    {
      icon: ShieldAlert,
      title: "Cybercrime Protection",
      description: "Full coverage against digital theft, phishing attacks, SIM swaps, and unauthorized account access. If your funds are stolen through cybercrime, we have you covered.",
    },
    {
      icon: Fingerprint,
      title: "Phishing Attack Recovery",
      description: "Fell victim to a phishing scam? Our insurance covers losses from sophisticated phishing attacks targeting your wallets, exchanges, and DeFi positions.",
    },
    {
      icon: KeyRound,
      title: "Seed Phrase Recovery",
      description: "Lost partial access to your wallet? Our insurance covers partial seed phrase recovery services, helping you regain access to locked funds through specialized recovery partners.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" data-testid="section-insurance-reinforce">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-card border border-border rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-lg font-bold text-foreground">Insurance Active</p>
                  <p className="text-sm text-green-500 font-medium">All protections enabled</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  { label: "Cybercrime coverage", status: "Protected", color: "text-green-500" },
                  { label: "Phishing protection", status: "Protected", color: "text-green-500" },
                  { label: "Seed phrase recovery", status: "Protected", color: "text-green-500" },
                  { label: "Exchange hack coverage", status: "Protected", color: "text-green-500" },
                  { label: "Smart contract failure", status: "Protected", color: "text-green-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4 p-3 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-foreground">{item.label}</span>
                    </div>
                    <span className={`text-xs font-medium ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img src={neonLogoPath} alt="CoinGuard" className="h-8 w-auto object-contain dark:mix-blend-screen" />
                <span className="text-xs text-muted-foreground">CoinGuard Insurance</span>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs font-semibold tracking-wide text-foreground">
                Comprehensive Coverage
              </span>
            </div>

            <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight leading-tight mb-4">
              Insurance that actually
              <br />
              protects your crypto
            </h2>

            <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 max-w-md">
              Most crypto holders are one hack away from devastating losses.
              CoinGuard insurance covers what others won't, from phishing
              attacks to partial seed phrase recovery.
            </p>

            <div className="space-y-6 mb-8">
              {coverageItems.map((item) => (
                <div key={item.title} className="flex items-start gap-4" data-testid={`benefit-insurance-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                  <item.icon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[15px] font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              onClick={() => goTo("/apply")}
              className="bg-primary text-primary-foreground font-semibold rounded-full px-8 h-12 text-[15px]"
              data-testid="button-insurance-reinforce-cta"
            >
              Get protected today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TaxReinforcementSection() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  const savingsFeatures = [
    {
      icon: TrendingUp,
      title: "Tax-Loss Harvesting",
      description: "Our system automatically identifies unrealized losses you can strategically realize to offset gains and reduce your tax bill legally.",
    },
    {
      icon: PiggyBank,
      title: "Maximize Deductions",
      description: "We find every eligible deduction including gas fees, failed transactions, and platform fees that most traders miss at tax time.",
    },
    {
      icon: BadgeDollarSign,
      title: "Optimal Cost Basis Methods",
      description: "Choose from FIFO, LIFO, HIFO, or specific identification. We calculate which method saves you the most money for each tax year.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30" data-testid="section-tax-reinforce">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <Calculator className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold tracking-wide text-foreground">
              Smart Tax Reporting
            </span>
          </div>

          <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight leading-tight mb-4">
            Stop overpaying on
            <br />
            crypto taxes
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Most crypto investors overpay on taxes simply because they don't know what they can deduct.
            CoinGuard finds every legal opportunity to minimize your tax liability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {savingsFeatures.map((feature, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-3xl p-8 hover:border-primary/30 transition-all duration-300"
              data-testid={`card-tax-savings-${i}`}
            >
              <feature.icon className="w-6 h-6 text-primary mb-5" />
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Average savings with CoinGuard
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Our users save an average of $3,200 per year by leveraging tax-loss harvesting,
                proper cost basis selection, and identifying overlooked deductions. Your personal
                advisor ensures nothing is missed.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <div data-testid="stat-avg-savings">
                  <span className="text-2xl font-bold text-primary">$3,200</span>
                  <p className="text-xs text-muted-foreground mt-0.5">Avg. annual savings</p>
                </div>
                <div data-testid="stat-deductions-found">
                  <span className="text-2xl font-bold text-primary">47%</span>
                  <p className="text-xs text-muted-foreground mt-0.5">More deductions found</p>
                </div>
                <div data-testid="stat-accuracy">
                  <span className="text-2xl font-bold text-primary">99.9%</span>
                  <p className="text-xs text-muted-foreground mt-0.5">Calculation accuracy</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => goTo("/apply")}
                className="bg-primary text-primary-foreground font-semibold rounded-full px-10 h-12 text-[15px]"
                data-testid="button-tax-reinforce-cta"
              >
                Start saving on taxes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" data-testid="section-pricing" id="pricing">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-foreground tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No hidden fees. Pay only for what you need. Cancel insurance anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-card border-2 border-amber-500 rounded-3xl p-8 relative" data-testid="card-pricing-recovery">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
              Most requested
            </div>
            <div className="mb-6">
              <SearchCheck className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-foreground">Recovery</h3>
              <p className="text-sm text-muted-foreground mt-1">Case-by-case</p>
            </div>
            <div className="mb-6">
              <span className="text-xl font-bold text-foreground">Free consultation</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Blockchain forensics",
                "Wrong address recovery",
                "Scam fund tracing",
                "Wallet access recovery",
                "Dedicated case manager",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full h-11 font-semibold"
              onClick={() => goTo("/apply?service=recovery")}
              data-testid="button-pricing-recovery"
            >
              Start recovery
            </Button>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8" data-testid="card-pricing-tax">
            <div className="mb-6">
              <FileText className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground">Tax Report</h3>
              <p className="text-sm text-muted-foreground mt-1">One-time filing</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">$20</span>
              <span className="text-muted-foreground ml-1">/report</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Unlimited transactions",
                "All exchanges and wallets",
                "Capital gains/losses report",
                "PDF + CSV export",
                "Audit trail included",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-primary text-primary-foreground rounded-full h-11 font-semibold"
              onClick={() => goTo("/apply")}
              data-testid="button-pricing-tax"
            >
              Get started
            </Button>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8" data-testid="card-pricing-insurance">
            <div className="mb-6">
              <ShieldCheck className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-foreground">Insurance</h3>
              <p className="text-sm text-muted-foreground mt-1">Monthly coverage</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">$15</span>
              <span className="text-muted-foreground ml-1">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Theft protection",
                "Exchange hack coverage",
                "Smart contract failure",
                "Key loss recovery",
                "Claims within 48 hours",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-primary text-primary-foreground rounded-full h-11 font-semibold"
              onClick={() => goTo("/apply")}
              data-testid="button-pricing-insurance"
            >
              Get started
            </Button>
          </div>

          <div className="bg-card border-2 border-primary rounded-3xl p-8 relative" data-testid="card-pricing-bundle">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
              Best value
            </div>
            <div className="mb-6">
              <Layers className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground">Tax + Insurance</h3>
              <p className="text-sm text-muted-foreground mt-1">Complete protection</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">$30</span>
              <span className="text-muted-foreground ml-1">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Everything in Tax Report",
                "Everything in Insurance",
                "Priority support",
                "Specialist tax review",
                "Dedicated account manager",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-primary text-primary-foreground rounded-full h-11 font-semibold"
              onClick={() => goTo("/apply")}
              data-testid="button-pricing-bundle"
            >
              Get started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Portfolio Manager",
      quote:
        "CoinGuard saved me hours during tax season. The automatic categorization is incredibly accurate.",
      photo: sarahPhoto,
    },
    {
      name: "Marcus Rivera",
      role: "DeFi Investor",
      quote:
        "The insurance gave me peace of mind after the exchange hacks last year. Claims process was straightforward.",
      photo: marcusPhoto,
    },
    {
      name: "James Park",
      role: "Crypto Trader",
      quote:
        "Finally a tax tool that handles DeFi, staking, and airdrops properly. Worth every penny.",
      photo: jamesPhoto,
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" data-testid="section-testimonials">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[32px] md:text-[40px] font-bold text-foreground tracking-tight mb-12 text-center">
          Trusted by investors
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-3xl p-6"
              data-testid={`card-testimonial-${i}`}
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const recoveryFaqs = [
    {
      q: "Can you recover crypto sent to the wrong address?",
      a: "In many cases, yes. Our team traces the transaction on-chain and works with exchanges and wallet providers to attempt recovery. Success depends on the destination address type and network.",
    },
    {
      q: "How long does the recovery process take?",
      a: "Each case is different. Simple cases like wrong address on an exchange may resolve in days. Complex investigations involving scams or stolen funds can take several weeks.",
    },
    {
      q: "What types of scams can you investigate?",
      a: "We investigate fake investment platforms, romance scams, impersonation schemes, fraudulent trading bots, phishing attacks, and rug pulls. Our forensic team traces fund movements across the blockchain.",
    },
    {
      q: "Is there a fee for the initial consultation?",
      a: "No. We provide a free case assessment to evaluate your situation and determine the likelihood of recovery before any commitment.",
    },
  ];

  const taxFaqs = [
    {
      q: "What tax forms does CoinGuard generate?",
      a: "We generate IRS Form 8949 and Schedule D for US taxpayers, along with detailed transaction reports compatible with major tax filing software. International formats are also supported.",
    },
    {
      q: "How accurate is the tax calculation?",
      a: "Our calculations use FIFO, LIFO, and specific identification methods with real-time price data from multiple sources. All reports include an audit trail for verification.",
    },
    {
      q: "Can I import from exchanges that are no longer active?",
      a: "Yes. You can upload CSV files from any exchange, including defunct ones. We support over 500 exchange formats and custom CSV mapping.",
    },
    {
      q: "Do you support DeFi, staking, and airdrops?",
      a: "Absolutely. We handle DeFi swaps, liquidity pools, staking rewards, airdrops, NFT transactions, and more. Each is categorized according to current tax guidelines.",
    },
  ];

  const insuranceFaqs = [
    {
      q: "What does the insurance cover?",
      a: "Coverage includes theft, exchange hacks, smart contract failures, and private key loss. Full terms are available in our coverage documentation.",
    },
    {
      q: "How do I file a claim?",
      a: "Log into your dashboard, navigate to Insurance, and click 'Start Claim'. Provide the incident details and supporting documents. Most claims are reviewed within 48 hours.",
    },
    {
      q: "Can I cancel my insurance plan?",
      a: "Yes, you can cancel anytime from your settings. Coverage remains active until the end of your current billing period.",
    },
    {
      q: "Is there a minimum portfolio size?",
      a: "No minimum portfolio size is required. Our $15/month plan provides coverage for digital assets across all connected wallets and exchanges.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30" data-testid="section-faq" id="faq">
      <div className="max-w-[900px] mx-auto">
        <h2 className="text-[32px] md:text-[40px] font-bold text-foreground tracking-tight mb-12 text-center">
          Frequently asked questions
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <SearchCheck className="w-5 h-5 text-amber-500" />
              Crypto Recovery
            </h3>
            <Accordion type="single" collapsible>
              {recoveryFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`rec-${i}`} className="border-border">
                  <AccordionTrigger className="text-sm font-medium text-foreground text-left" data-testid={`faq-recovery-${i}`}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Tax Reporting
            </h3>
            <Accordion type="single" collapsible>
              {taxFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`tax-${i}`} className="border-border">
                  <AccordionTrigger className="text-sm font-medium text-foreground text-left" data-testid={`faq-tax-${i}`}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Insurance
            </h3>
            <Accordion type="single" collapsible>
              {insuranceFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`ins-${i}`} className="border-border">
                  <AccordionTrigger className="text-sm font-medium text-foreground text-left" data-testid={`faq-insurance-${i}`}>
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" data-testid="section-final-cta">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="text-[32px] md:text-[40px] font-bold text-foreground tracking-tight mb-4">
          Ready to take control?
        </h2>
        <p className="text-[16px] text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10">
          Join thousands of investors who trust CoinGuard for crypto recovery, tax reporting,
          and digital asset protection.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => goTo("/apply")}
            className="bg-primary text-primary-foreground font-semibold rounded-full px-10 h-12 text-[15px]"
            data-testid="button-final-cta"
          >
            Get started for free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => goTo("/contact")}
            className="font-medium rounded-full px-8 h-12 text-[15px]"
            data-testid="button-final-contact"
          >
            Book a consultation
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-6">
          Estimates provided are not a substitute for professional tax advice.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <LogoMarquee />
      <FeaturesSection />
      <CryptoRecoverySection />
      <DarkFeatureGrid />
      <WalletSection />
      <HowItWorksSection />
      <PersonalAdvisorSection />
      <AIBlockchainTrackerSection />
      <InsuranceReinforcementSection />
      <TaxReinforcementSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
