import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  Clock,
  XCircle,
  Phone,
  User as UserIcon,
  Mail,
  FileText,
  Shield,
  PhoneCall,
  Search,
  DatabaseZap,
  MessageSquare,
  Zap,
  Check,
  Scan,
  Headphones,
  KeyRound,
  TrendingDown,
  UserCheck,
  Calculator,
  ShieldCheck,
  SearchCheck,
  Smartphone,
  HardDrive,
  Ban,
  ChevronDown,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Navigation } from "@/components/navigation";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";
import { taxTestimonials, insuranceTestimonials } from "@/lib/testimonials-data";
import {
  CoinbaseLogo,
  BinanceLogo,
  KrakenLogo,
  GeminiLogo,
  KuCoinLogo,
  OkxLogo,
  CryptocomLogo,
  BybitLogo,
  MexcLogo,
  MetaMaskLogo,
  PhantomLogo,
  TrustWalletLogo,
  ExodusLogo,
  LedgerLogo,
  TrezorLogo,
  TangemLogo,
  RobinhoodLogo,
  RobinhoodWalletLogo,
  ledgerStaxDevicePng,
  ledgerFlexDevicePng,
  ledgerNanoGen5DevicePng,
  ledgerNanoClassicsDevicePng,
  trezorSafe3Png,
  trezorSafe5Png,
  trezorSafe7Png,
  tangemBlackCardPng,
} from "@/components/crypto-logos";

const benefitAvatars = [...taxTestimonials, ...insuranceTestimonials]
  .filter((t) => !t.portraitVideo)
  .slice(0, 5)
  .map((t) => ({ avatar: t.avatar, name: t.name }));

type SafeUser = Omit<User, "password">;

function StatusBadge({ status }: { status: string }) {
  if (status === "approved") {
    return (
      <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full px-4 py-2 text-sm font-semibold" data-testid="badge-status-approved">
        <CheckCircle2 className="w-4 h-4" />
        Approved
      </div>
    );
  }
  if (status === "rejected") {
    return (
      <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full px-4 py-2 text-sm font-semibold" data-testid="badge-status-rejected">
        <XCircle className="w-4 h-4" />
        Not approved
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground border border-border rounded-full px-4 py-2 text-sm font-medium" data-testid="badge-status-pending">
      <Clock className="w-4 h-4" />
      Pending verification
    </div>
  );
}

function CheckingStatusLoader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);

  const phases = [
    { label: "Checking your records...", icon: Search },
    { label: "Looking at admin feedback...", icon: DatabaseZap },
    { label: "Retrieving application status...", icon: FileText },
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 2400);
    const t3 = setTimeout(() => onDone(), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className="bg-card border border-border rounded-3xl p-8">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1" data-testid="text-checking-title">
          Checking status
        </h2>
        <p className="text-sm text-muted-foreground">Please wait a moment</p>
      </div>

      <div className="space-y-3">
        {phases.map((p, i) => {
          const PhaseIcon = p.icon;
          const isActive = phase === i;
          const isDone = phase > i;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 ${
                isDone
                  ? "bg-primary/5"
                  : isActive
                  ? "bg-muted"
                  : "opacity-40"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              ) : isActive ? (
                <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />
              ) : (
                <PhaseIcon className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
              <span className={`text-sm ${isDone || isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {p.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ApplicationProgress({ user }: { user: SafeUser }) {
  const [, setLocation] = useLocation();
  const status = user.applicationStatus || "pending";

  const steps = [
    { label: "Application received", desc: "Your details have been submitted", done: true, icon: FileText },
    { label: "Verification in progress", desc: "Our team is reviewing your application", done: status === "approved" || status === "rejected", active: status === "pending", icon: Shield },
    { label: "Decision", desc: status === "approved" ? "Your application has been approved" : status === "rejected" ? "Your application was not approved" : "Awaiting final decision", done: status === "approved" || status === "rejected", icon: status === "approved" ? CheckCircle2 : status === "rejected" ? XCircle : Clock },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-card border border-border rounded-3xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-foreground mb-1" data-testid="text-progress-title">
            Application Status
          </h2>
          <p className="text-sm text-muted-foreground" data-testid="text-applicant-name">
            {user.name || "Applicant"}
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <StatusBadge status={status} />
        </div>

        <div className="space-y-0 mb-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-3 animate-in fade-in slide-in-from-left-2"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                    step.done
                      ? "bg-primary text-primary-foreground"
                      : step.active
                      ? "border-2 border-primary text-primary"
                      : "border border-border text-muted-foreground"
                  }`}
                >
                  <step.icon className="w-3.5 h-3.5" />
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-px h-8 ${step.done ? "bg-primary/30" : "bg-border"}`} />
                )}
              </div>
              <div className="pt-1 pb-4">
                <p className={`text-sm font-medium ${step.done || step.active ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {status === "approved" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: "400ms", animationFillMode: "both" }}>
            <Button
              onClick={() => {
                if (user.onboardingComplete) {
                  setLocation("/app");
                } else {
                  setLocation("/app/onboarding");
                }
                window.scrollTo(0, 0);
              }}
              className="w-full bg-primary text-primary-foreground rounded-full h-11 font-semibold"
              data-testid="button-continue-to-app"
            >
              Continue to dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {status === "rejected" && (
          <div className="text-center space-y-3 animate-in fade-in duration-300">
            <p className="text-sm text-muted-foreground">
              Your application was not approved at this time. Please contact our team for more information.
            </p>
            <a
              href="tel:+18001234567"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              data-testid="link-call-team-rejected"
            >
              <PhoneCall className="w-4 h-4" />
              Call verification team
            </a>
          </div>
        )}

        {status === "pending" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-muted/50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground text-center">
                Your application is being reviewed by our verification team. You will be notified once a decision has been made.
              </p>
            </div>
            <div className="flex justify-center">
              <a
                href="tel:+18001234567"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                data-testid="link-call-team"
              >
                <PhoneCall className="w-4 h-4" />
                Call verification team
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type ApplyIntent = "direct" | "sales" | null;

const serviceLabels: Record<string, string> = {
  tax: "Crypto Tax Setup",
  insurance: "Insurance",
  recovery: "Crypto Recovery",
};

const serviceIcons: Record<string, typeof Calculator> = {
  tax: Calculator,
  insurance: ShieldCheck,
  recovery: SearchCheck,
};

const taxBenefits = [
  { icon: TrendingDown, title: "Save up to 40% on taxes", desc: "Our advisors identify every legal deduction, offset, and strategy available for your jurisdiction to minimize what you owe." },
  { icon: UserCheck, title: "Dedicated personal advisor", desc: "Every client is paired with a certified crypto tax specialist who handles your filing from start to finish." },
  { icon: FileText, title: "Audit-ready reports in 48 hours", desc: "Get IRS, HMRC, ATO, or CRA compliant reports generated from your exchange and wallet data. Accepted by every major tax authority." },
  { icon: Scan, title: "Supports 500+ exchanges and wallets", desc: "Automated data import from Coinbase, Binance, Kraken, MetaMask, Ledger, and hundreds more. No manual entry needed." },
];

const insuranceBenefits = [
  { icon: Shield, title: "Up to $250,000 in coverage", desc: "Protect your portfolio against exchange hacks, wallet theft, phishing, and unauthorized access with real, underwritten insurance." },
  { icon: KeyRound, title: "Wallet recovery included", desc: "Lost access to your wallet or partial seed phrases? Our insurance covers professional recovery services at no extra cost." },
  { icon: Scan, title: "Real-time threat monitoring", desc: "AI-powered blockchain tracker alerts you via SMS and email the moment your wallets interact with flagged or suspicious addresses." },
  { icon: Headphones, title: "Claims paid within 14 days", desc: "No long wait times. Our claims team reviews and processes payouts in under two weeks, with 24/7 WhatsApp support throughout." },
];

const recoveryBenefits = [
  { icon: SearchCheck, title: "Expert blockchain forensics", desc: "Our investigators use advanced on-chain tracing tools to follow your funds across wallets, exchanges, and multiple blockchains." },
  { icon: Ban, title: "Scam & fraud investigation", desc: "We trace stolen funds from fake investment platforms, romance scams, impersonation schemes, and phishing attacks." },
  { icon: KeyRound, title: "Wallet access recovery", desc: "Lost passwords, damaged wallet files, or partial seed phrases. Our specialists help you regain access to locked funds." },
  { icon: UserCheck, title: "Dedicated recovery specialist", desc: "Every case is assigned to a dedicated investigator who provides regular progress updates and works your case to resolution." },
];

function getBenefits(service: string) {
  if (service === "insurance") return insuranceBenefits;
  if (service === "recovery") return recoveryBenefits;
  return taxBenefits;
}

const recoverySubOptions = [
  { value: "phone_stolen", label: "Phone stolen or lost", icon: Smartphone },
  { value: "seed_phrase_lost", label: "Lost seed phrase or partial backup", icon: HardDrive },
  { value: "password_forgotten", label: "Forgotten wallet password", icon: KeyRound },
  { value: "wrong_address", label: "Sent crypto to wrong address", icon: ArrowRight },
  { value: "scam_fraud", label: "Scam or fraud victim", icon: Ban },
  { value: "exchange_locked", label: "Exchange account locked", icon: Shield },
  { value: "hacked_wallet", label: "Wallet hacked or stolen funds", icon: SearchCheck },
];

const hardwareDevices: Record<string, { id: string; name: string; image: string }[]> = {
  ledger: [
    { id: "ledger-stax", name: "Ledger Stax", image: ledgerStaxDevicePng },
    { id: "ledger-flex", name: "Ledger Flex", image: ledgerFlexDevicePng },
    { id: "ledger-nano-gen5", name: "Nano Gen5", image: ledgerNanoGen5DevicePng },
    { id: "ledger-nano-s-plus", name: "Nano S Plus", image: ledgerNanoClassicsDevicePng },
  ],
  trezor: [
    { id: "trezor-safe-3", name: "Trezor Safe 3", image: trezorSafe3Png },
    { id: "trezor-safe-5", name: "Trezor Safe 5", image: trezorSafe5Png },
    { id: "trezor-safe-7", name: "Trezor Safe 7", image: trezorSafe7Png },
  ],
  tangem: [
    { id: "tangem-card", name: "Tangem Card", image: tangemBlackCardPng },
  ],
};

const recoveryWalletCategories = [
  {
    id: "hardware",
    label: "Hardware Wallets",
    desc: "Physical devices like Ledger, Trezor, Tangem",
    icon: HardDrive,
    items: [
      { id: "ledger", name: "Ledger", Logo: LedgerLogo },
      { id: "trezor", name: "Trezor", Logo: TrezorLogo },
      { id: "tangem", name: "Tangem", Logo: TangemLogo },
    ],
  },
  {
    id: "decentralized",
    label: "Decentralized Wallets",
    desc: "Software wallets like MetaMask, Trust Wallet, Exodus",
    icon: Smartphone,
    items: [
      { id: "metamask", name: "MetaMask", Logo: MetaMaskLogo },
      { id: "trust", name: "Trust Wallet", Logo: TrustWalletLogo },
      { id: "exodus", name: "Exodus", Logo: ExodusLogo },
      { id: "phantom", name: "Phantom", Logo: PhantomLogo },
      { id: "robinhood-wallet", name: "Robinhood", Logo: RobinhoodWalletLogo, logoSize: "w-9 h-9" },
    ],
  },
  {
    id: "centralized",
    label: "Centralized Exchanges",
    desc: "Platforms like Coinbase, Binance, Kraken",
    icon: DatabaseZap,
    items: [
      { id: "coinbase", name: "Coinbase", Logo: CoinbaseLogo },
      { id: "binance", name: "Binance", Logo: BinanceLogo },
      { id: "kraken", name: "Kraken", Logo: KrakenLogo, logoSize: "w-8 h-8" },
      { id: "gemini", name: "Gemini", Logo: GeminiLogo },
      { id: "kucoin", name: "KuCoin", Logo: KuCoinLogo },
      { id: "robinhood", name: "Robinhood", Logo: RobinhoodLogo, logoSize: "w-9 h-9" },
      { id: "okx", name: "OKX", Logo: OkxLogo },
      { id: "cryptocom", name: "Crypto.com", Logo: CryptocomLogo },
      { id: "bybit", name: "Bybit", Logo: BybitLogo },
      { id: "mexc", name: "MEXC", Logo: MexcLogo },
    ],
  },
];

function RecoveryWalletPicker({
  onSelect,
  onBack,
  recoveryType,
}: {
  onSelect: (wallet: string) => void;
  onBack: () => void;
  recoveryType: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [otherName, setOtherName] = useState("");

  const subLabel = recoverySubOptions.find((s) => s.value === recoveryType)?.label || "";

  const activeCategory = recoveryWalletCategories.find((c) => c.id === selectedCategory);
  const devices = selected ? hardwareDevices[selected] : null;

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setSelected(null);
    setSelectedDevice(null);
    setOtherName("");
  };

  const handleWalletClick = (id: string) => {
    if (selected !== id) {
      setSelected(id);
      setSelectedDevice(null);
      setOtherName("");
    }
  };

  const canContinue = () => {
    if (!selected) return false;
    if (selected === "other") return otherName.trim() !== "";
    if (hardwareDevices[selected]) return selectedDevice !== null;
    return true;
  };

  const getFinalValue = () => {
    if (selected === "other") return otherName.trim() ? `other:${otherName.trim()}` : "other";
    if (selectedDevice) return selectedDevice;
    return selected || "";
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-2 duration-300">
      <button
        onClick={() => {
          if (selectedCategory) {
            setSelectedCategory(null);
            setSelected(null);
            setSelectedDevice(null);
            setOtherName("");
          } else {
            onBack();
          }
        }}
        className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1 transition-colors"
        data-testid="button-back-from-wallet"
      >
        <ArrowRight className="w-3 h-3 rotate-180" />
        Back
      </button>

      <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-4">
        <SearchCheck className="w-3 h-3 text-primary" />
        <span className="text-xs text-foreground font-medium">{subLabel}</span>
      </div>

      {!selectedCategory ? (
        <>
          <h1 className="text-2xl font-bold text-foreground mb-1" data-testid="text-wallet-title">
            What type of wallet or exchange?
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Choose the category that best describes your situation.
          </p>

          <div className="space-y-2">
            {recoveryWalletCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                data-testid={`button-category-${cat.id}`}
                className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-primary/30 bg-card transition-all duration-150 flex items-center gap-3.5"
              >
                <cat.icon className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            ))}

            <button
              onClick={() => {
                setSelectedCategory("other-direct");
                setSelected("other");
              }}
              data-testid="button-category-other"
              className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-primary/30 bg-card transition-all duration-150 flex items-center gap-3.5"
            >
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">Other</p>
                <p className="text-xs text-muted-foreground">Not listed in any of the above</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </button>
          </div>
        </>
      ) : selectedCategory === "other-direct" ? (
        <>
          <h1 className="text-2xl font-bold text-foreground mb-1" data-testid="text-wallet-title">
            Enter your wallet or exchange
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Tell us which wallet or exchange is related to your recovery case.
          </p>
          <Input
            type="text"
            value={otherName}
            onChange={(e) => setOtherName(e.target.value)}
            placeholder="Enter wallet or exchange name"
            data-testid="input-wallet-other-name"
            className="h-10 rounded-xl"
            autoFocus
          />

          <Button
            onClick={() => onSelect(getFinalValue())}
            disabled={!canContinue()}
            className="w-full mt-5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-11 font-semibold group"
            data-testid="button-continue-wallet"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </>
      ) : activeCategory ? (
        <div className="animate-in fade-in slide-in-from-right-2 duration-200">
          <h1 className="text-2xl font-bold text-foreground mb-1" data-testid="text-wallet-title">
            Select your {activeCategory.label.toLowerCase().replace("wallets", "wallet").replace("exchanges", "exchange")}
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Choose the specific wallet or exchange related to your recovery case.
          </p>

          <div className="grid grid-cols-3 gap-2">
            {activeCategory.items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleWalletClick(item.id)}
                data-testid={`button-wallet-${item.id}`}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-150 ${
                  selected === item.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-primary/30 bg-card"
                }`}
              >
                <item.Logo className={(item as any).logoSize || "w-7 h-7"} />
                <span className="text-xs font-medium text-foreground">{item.name}</span>
              </button>
            ))}
          </div>

          {devices && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <p className="text-xs text-muted-foreground mb-2">Select your device</p>
              <div className="grid grid-cols-2 gap-2">
                {devices.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => setSelectedDevice(device.id)}
                    data-testid={`button-device-${device.id}`}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-150 ${
                      selectedDevice === device.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border hover:border-primary/30 bg-card"
                    }`}
                  >
                    <img src={device.image} alt={device.name} className="w-16 h-16 object-contain" loading="lazy" />
                    <span className="text-xs font-medium text-foreground">{device.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => handleWalletClick("other")}
            data-testid="button-wallet-other"
            className={`w-full text-left p-3 mt-3 rounded-xl border-2 transition-all duration-150 ${
              selected === "other"
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-border hover:border-primary/30 bg-card"
            }`}
          >
            <span className="text-sm text-foreground">Not listed here</span>
          </button>
          {selected === "other" && (
            <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <Input
                type="text"
                value={otherName}
                onChange={(e) => setOtherName(e.target.value)}
                placeholder="Enter wallet or exchange name"
                data-testid="input-wallet-other-name"
                className="h-10 rounded-xl"
                autoFocus
              />
            </div>
          )}

          <Button
            onClick={() => onSelect(getFinalValue())}
            disabled={!canContinue()}
            className="w-full mt-5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-11 font-semibold group"
            data-testid="button-continue-wallet"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function ServicePicker({
  onSelect,
  onBack,
  onSelectRecovery,
}: {
  onSelect: (service: string) => void;
  onBack: () => void;
  onSelectRecovery?: (recoveryType: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [recoveryExpanded, setRecoveryExpanded] = useState(false);
  const [recoveryType, setRecoveryType] = useState<string | null>(null);

  const options = [
    { value: "tax", label: "Register to set up your crypto taxes", desc: "Crypto tax calculations and filing", icon: Calculator },
    { value: "insurance", label: "Insurance", desc: "Digital asset protection coverage", icon: ShieldCheck },
    { value: "recovery", label: "Crypto Recovery", desc: "Recover lost or stolen crypto assets", icon: SearchCheck },
  ];

  const handleSelect = (value: string) => {
    if (value === "recovery") {
      setSelected("recovery");
      setRecoveryExpanded(true);
    } else {
      setSelected(value);
      setRecoveryExpanded(false);
      setRecoveryType(null);
    }
  };

  const canContinue = selected && (selected !== "recovery" || recoveryType);

  return (
    <div className="animate-in fade-in slide-in-from-right-2 duration-300">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1 transition-colors"
        data-testid="button-back-from-service"
      >
        <ArrowRight className="w-3 h-3 rotate-180" />
        Back
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-1" data-testid="text-service-title">
        What do you need?
      </h1>
      <p className="text-sm text-muted-foreground mb-5">
        Select the service you are interested in.
      </p>

      <div className="space-y-2.5">
        {options.map((opt) => (
          <div key={opt.value}>
            <button
              onClick={() => handleSelect(opt.value)}
              data-testid={`button-service-pick-${opt.value}`}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3.5 ${
                selected === opt.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30 bg-card"
              }`}
            >
              <opt.icon className={`w-5 h-5 shrink-0 ${selected === opt.value ? "text-primary" : "text-muted-foreground"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </div>
              {opt.value === "recovery" && selected === "recovery" ? (
                <ChevronDown className="w-4 h-4 text-primary shrink-0" />
              ) : (
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                  selected === opt.value ? "border-primary bg-primary" : "border-muted-foreground/30"
                }`}>
                  {selected === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              )}
            </button>

            {opt.value === "recovery" && recoveryExpanded && selected === "recovery" && (
              <div className="mt-2 ml-4 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200" data-testid="section-recovery-sub-options">
                {recoverySubOptions.map((sub) => (
                  <button
                    key={sub.value}
                    onClick={() => setRecoveryType(sub.value)}
                    data-testid={`button-recovery-sub-${sub.value}`}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-150 flex items-center gap-3 ${
                      recoveryType === sub.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30 bg-card"
                    }`}
                  >
                    <sub.icon className={`w-4 h-4 shrink-0 ${recoveryType === sub.value ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-sm text-foreground">{sub.label}</span>
                    <div className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 flex items-center justify-center ml-auto transition-all ${
                      recoveryType === sub.value ? "border-primary bg-primary" : "border-muted-foreground/30"
                    }`}>
                      {recoveryType === sub.value && <div className="w-1 h-1 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        onClick={() => {
          if (selected === "recovery" && recoveryType && onSelectRecovery) {
            onSelectRecovery(recoveryType);
          } else if (canContinue) {
            onSelect(selected!);
          }
        }}
        disabled={!canContinue}
        className="w-full mt-5 rounded-full h-11 font-semibold group bg-primary text-primary-foreground"
        data-testid="button-continue-service"
      >
        Continue
        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}

function ApplyForm({
  intent,
  onBack,
  selectedService,
  recoveryMeta,
}: {
  intent: ApplyIntent;
  onBack: () => void;
  selectedService: string;
  recoveryMeta?: { type: string; wallet: string };
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState(selectedService || "");
  const [loading, setLoading] = useState(false);
  const [statusUser, setStatusUser] = useState<SafeUser | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { apply } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const isSales = intent === "sales";
  const isRecovery = selectedService === "recovery";
  const benefits = getBenefits(selectedService);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    if (!email.trim()) {
      toast({ title: "Email is required", variant: "destructive" });
      return;
    }
    if (!phone.trim() || phone.length < 7) {
      toast({ title: "Valid phone number is required", variant: "destructive" });
      return;
    }
    if (isSales && !reason) {
      toast({ title: "Please select a reason", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await apply({ name, email, phone });
      if ((result as any)._duplicate) {
        const { _duplicate, ...user } = result as any;
        setStatusUser(user);
        setSubmitted(true);
        toast({
          title: "Application already exists",
          description: "We found your existing application",
        });
      } else {
        trackEvent("application_submit", { service: selectedService, ...(recoveryMeta || {}) });
        setShowSuccess(true);
        if (!isRecovery) {
          await new Promise((r) => setTimeout(r, 800));
          queryClient.setQueryData(["/api/auth/me"], result);
          const goalParam = selectedService === "insurance" ? "insurance" : selectedService === "tax" ? "tax" : "both";
          setLocation(`/app/onboarding?goal=${goalParam}`);
          window.scrollTo(0, 0);
        }
      }
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err.message || "Could not submit application",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    if (isRecovery) {
      const subLabel = recoverySubOptions.find((s) => s.value === recoveryMeta?.type)?.label || "";
      const walletLabel = recoveryMeta?.wallet?.startsWith("other:")
        ? recoveryMeta.wallet.replace("other:", "")
        : recoveryWalletCategories
            .flatMap((c) => c.items)
            .find((i) => i.id === recoveryMeta?.wallet)?.name
          || Object.values(hardwareDevices).flat().find((d) => d.id === recoveryMeta?.wallet)?.name
          || recoveryMeta?.wallet || "";

      return (
        <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-6" data-testid="section-recovery-success">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2" data-testid="text-success-title">
            Recovery application submitted
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto mb-6">
            A member of our team will be in contact with you shortly to complete the process and begin your recovery case.
          </p>

          {(subLabel || walletLabel) && (
            <div className="bg-muted/50 rounded-xl p-4 text-left space-y-2 mb-6">
              {subLabel && (
                <div className="flex items-center gap-2">
                  <SearchCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">Issue: <span className="text-foreground font-medium">{subLabel}</span></span>
                </div>
              )}
              {walletLabel && (
                <div className="flex items-center gap-2">
                  <HardDrive className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">Device/Exchange: <span className="text-foreground font-medium">{walletLabel}</span></span>
                </div>
              )}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            We typically respond within 24 hours.
          </p>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-6">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
          <Check className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2" data-testid="text-success-title">
          Application submitted
        </h2>
        <p className="text-sm text-muted-foreground">
          Redirecting you to onboarding...
        </p>
        <div className="mt-4 flex justify-center">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (submitted && statusUser) {
    return <ApplicationProgress user={statusUser} />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-2 duration-300">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1 transition-colors"
        data-testid="button-back-to-options"
      >
        <ArrowRight className="w-3 h-3 rotate-180" />
        Back
      </button>

      <div className="flex items-center gap-2 mb-1">
        {isSales ? (
          <MessageSquare className="w-5 h-5 text-primary" />
        ) : (
          <Zap className="w-5 h-5 text-primary" />
        )}
        <h1 className="text-2xl font-bold text-foreground" data-testid="text-apply-title">
          {isSales ? "Speak with our team" : "Apply now"}
        </h1>
      </div>
      <p className="text-sm text-muted-foreground mb-5">
        {isSales
          ? "Fill in your details and a member of our sales team will reach out to discuss your needs."
          : "Submit your details to start the application process."}
      </p>

      {selectedService && !isSales && (
        <div className="mb-5 p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 bg-primary/5 border border-primary/10" data-testid="badge-preselected-service">
          {(() => {
            const Icon = serviceIcons[selectedService] || Calculator;
            return <Icon className="w-4 h-4 shrink-0 text-primary" />;
          })()}
          <div>
            <p className="text-xs text-muted-foreground">Selected service</p>
            <p className="text-sm font-semibold text-foreground">{serviceLabels[selectedService] || selectedService}</p>
            {isRecovery && recoveryMeta && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {recoverySubOptions.find((s) => s.value === recoveryMeta.type)?.label}
                {" - "}
                {recoveryMeta.wallet?.startsWith("other:")
                  ? recoveryMeta.wallet.replace("other:", "")
                  : recoveryWalletCategories.flatMap((c) => c.items).find((i) => i.id === recoveryMeta.wallet)?.name
                    || Object.values(hardwareDevices).flat().find((d) => d.id === recoveryMeta.wallet)?.name
                    || recoveryMeta.wallet}
              </p>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleApply} className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium block">Full name</Label>
          <div className="relative">
            <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              required
              data-testid="input-apply-name"
              className="h-11 rounded-xl pl-10"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium block">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              data-testid="input-apply-email"
              className="h-11 rounded-xl pl-10"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium block">Phone number</Label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              required
              data-testid="input-apply-phone"
              className="h-11 rounded-xl pl-10"
            />
          </div>
        </div>

        {isSales && (
          <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Label className="text-sm font-medium block">Reason for contacting</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger data-testid="select-sales-reason" className="h-11 rounded-xl">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tax">I want to use CoinGuard for tax reporting</SelectItem>
                <SelectItem value="insurance">I want to use CoinGuard for insurance</SelectItem>
                <SelectItem value="recovery">I need help recovering lost or stolen crypto</SelectItem>
                <SelectItem value="questions">I have questions about CoinGuard</SelectItem>
                <SelectItem value="enterprise">Enterprise or business inquiry</SelectItem>
                <SelectItem value="partnership">Partnership opportunity</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-full h-11 font-semibold mt-2 group bg-primary text-primary-foreground"
          data-testid="button-apply-submit"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              {isSales ? "Request consultation" : isRecovery ? "Submit recovery application" : "Submit application"}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      {!isSales && benefits.length > 0 && (
        <div className="mt-6 pt-5 border-t border-border" data-testid="section-service-benefits">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
            {selectedService === "insurance" ? "Why CoinGuard Insurance" : selectedService === "recovery" ? "Why CoinGuard Recovery" : "Why CoinGuard Tax"}
          </p>
          <div className="space-y-3">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <b.icon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">{b.title}.</span> {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4 text-center leading-relaxed">
        By submitting, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}

export function ApplicationPage() {
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);
  const serviceFromUrl = params.get("service") || "";

  const [view, setView] = useState<"apply" | "check-status">("apply");
  const [intent, setIntent] = useState<ApplyIntent>("direct");
  const [chosenService, setChosenService] = useState(serviceFromUrl);
  const [recoveryType, setRecoveryType] = useState("");
  const [recoveryWallet, setRecoveryWallet] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusUser, setStatusUser] = useState<SafeUser | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [checkingAnimation, setCheckingAnimation] = useState(false);
  const [pendingUser, setPendingUser] = useState<SafeUser | null>(null);
  const { checkStatus } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || phone.length < 7) {
      toast({ title: "Valid phone number is required", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const user = await checkStatus(phone);
      setPendingUser(user);
      setCheckingAnimation(true);
    } catch (err: any) {
      toast({
        title: "Application pending",
        description: "Your start application is pending. A member of our team will be in contact with you shortly to finish up the process of your account.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckingDone = () => {
    if (pendingUser) {
      setStatusUser(pendingUser);
      setSubmitted(true);
      setCheckingAnimation(false);
      setPendingUser(null);
    }
  };

  if (checkingAnimation) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center p-6 pt-24">
          <div className="w-full max-w-md">
            <CheckingStatusLoader onDone={handleCheckingDone} />
          </div>
        </div>
      </div>
    );
  }

  if (submitted && statusUser) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center p-6 pt-24">
          <div className="w-full max-w-md">
            <ApplicationProgress user={statusUser} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex items-center justify-center p-6 pt-24 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-1 mb-8 bg-muted rounded-full p-1" data-testid="tabs-auth-mode">
              <button
                onClick={() => { setView("apply"); setIntent(null); setPhone(""); }}
                className={`flex-1 text-sm font-medium rounded-full py-2.5 px-4 transition-all duration-300 ${
                  view === "apply"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="tab-apply"
              >
                Apply now
              </button>
              <button
                onClick={() => { setView("check-status"); setIntent(null); setPhone(""); }}
                className={`flex-1 text-sm font-medium rounded-full py-2.5 px-4 transition-all duration-300 ${
                  view === "check-status"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="tab-check-status"
              >
                Check status
              </button>
            </div>

            {view === "apply" ? (
              intent === null ? (
                <div className="animate-in fade-in slide-in-from-right-2 duration-300" key="choose-intent">
                  <h1 className="text-2xl font-bold text-foreground mb-1" data-testid="text-apply-title">
                    Register with us
                  </h1>
                  <p className="text-sm text-muted-foreground mb-6">
                    Choose how you would like to get started.
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => setIntent("direct")}
                      data-testid="button-intent-direct"
                      className="w-full text-left p-5 rounded-2xl border-2 border-border bg-card hover:border-primary/30 transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5">
                          <Zap className="w-5 h-5 text-primary" strokeWidth={1.8} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-foreground">Apply directly</h3>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            Start your application for crypto recovery, tax filing, or digital asset insurance right away.
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary mt-0.5 transition-colors" />
                      </div>
                    </button>

                    <button
                      onClick={() => setIntent("sales")}
                      data-testid="button-intent-sales"
                      className="w-full text-left p-5 rounded-2xl border-2 border-border bg-card hover:border-primary/30 transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5">
                          <MessageSquare className="w-5 h-5 text-primary" strokeWidth={1.8} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-foreground">Talk to our sales team</h3>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            Want to learn more about our recovery services, insurance plans, or need help choosing? Speak with an advisor.
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary mt-0.5 transition-colors" />
                      </div>
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border" data-testid="section-benefits">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex -space-x-2">
                        {benefitAvatars.map((a, i) => (
                          <img
                            key={i}
                            src={a.avatar}
                            alt={a.name}
                            className="w-7 h-7 rounded-full border-2 border-background object-cover"
                            loading="lazy"
                            style={{ zIndex: benefitAvatars.length - i }}
                          />
                        ))}
                      </div>
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                        Why CoinGuard
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5">
                        <TrendingDown className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          <span className="text-foreground font-medium">Save up to 40% on taxes.</span> Our advisors find every legal deduction and strategy to minimize what you owe across all major jurisdictions.
                        </p>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <UserCheck className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          <span className="text-foreground font-medium">Personal tax advisor.</span> Every registered client gets a certified crypto tax specialist who handles your filing from start to finish.
                        </p>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <SearchCheck className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          <span className="text-foreground font-medium">Expert crypto recovery.</span> Blockchain forensics to trace and recover funds from scams, wrong addresses, lost wallets, and stolen crypto.
                        </p>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Shield className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          <span className="text-foreground font-medium">Up to $250,000 insurance coverage.</span> Protection against exchange hacks, wallet theft, phishing, and unauthorized access.
                        </p>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Headphones className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          <span className="text-foreground font-medium">24/7 WhatsApp support.</span> Reach your dedicated advisor anytime. No waiting, no ticket queues.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : intent === "direct" && !chosenService ? (
                <ServicePicker
                  onSelect={(s) => setChosenService(s)}
                  onBack={() => setIntent(null)}
                  onSelectRecovery={(rt) => {
                    setChosenService("recovery");
                    setRecoveryType(rt);
                  }}
                />
              ) : chosenService === "recovery" && !recoveryWallet ? (
                <RecoveryWalletPicker
                  recoveryType={recoveryType}
                  onSelect={(w) => setRecoveryWallet(w)}
                  onBack={() => {
                    setRecoveryType("");
                    setChosenService("");
                    setRecoveryWallet("");
                  }}
                />
              ) : (
                <ApplyForm intent={intent} onBack={() => {
                  if (chosenService === "recovery") {
                    setRecoveryWallet("");
                  } else if (intent === "direct" && !serviceFromUrl) {
                    setChosenService("");
                  } else {
                    setIntent(null);
                    setChosenService("");
                  }
                }} selectedService={chosenService} recoveryMeta={chosenService === "recovery" ? { type: recoveryType, wallet: recoveryWallet } : undefined} />
              )
            ) : (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300" key="check">
                <h1 className="text-2xl font-bold text-foreground mb-1" data-testid="text-check-title">
                  Check your application
                </h1>
                <p className="text-sm text-muted-foreground mb-6">
                  Enter the phone number you registered with to view your application status.
                </p>

                <form onSubmit={handleCheckStatus} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium block">Phone number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        required
                        data-testid="input-check-phone"
                        className="h-11 rounded-xl pl-10"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground rounded-full h-11 font-semibold mt-2 group"
                    data-testid="button-check-submit"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Check status
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
