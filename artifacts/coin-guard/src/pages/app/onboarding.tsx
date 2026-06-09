import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Send,
  Mail,
  ChevronDown,
  FileText,
  Shield,
  Gem,
  Zap,
  PenLine,
  SearchCheck,
} from "lucide-react";
import { Logo } from "@/components/logo";
import {
  CoinbaseLogo,
  BinanceLogo,
  MetaMaskLogo,
  LedgerLogo,
  TrezorLogo,
  PhantomLogo,
  ExodusLogo,
  KrakenLogo,
  TangemLogo,
  ArculusLogo,
  TrustWalletLogo,
  ledgerStaxDevicePng,
  ledgerFlexDevicePng,
  ledgerNanoGen5DevicePng,
  ledgerNanoClassicsDevicePng,
  trezorSafe7Png,
  trezorSafe5Png,
  trezorSafe3Png,
  tangemCardPng,
  tangemRingPng,
  arculusCardPng,
  arculusSilverPng,
} from "@/components/crypto-logos";
import { Navigation } from "@/components/navigation";
import { SiWhatsapp } from "react-icons/si";

type GoalId = "tax" | "insurance" | "both" | "recovery";

const goals = [
  {
    id: "recovery" as GoalId,
    title: "Crypto recovery",
    subtitle: "Recover lost or stolen crypto assets",
    icon: SearchCheck,
  },
  {
    id: "tax" as GoalId,
    title: "File crypto taxes",
    subtitle: "Generate audit-ready tax reports for your jurisdiction",
    icon: FileText,
  },
  {
    id: "insurance" as GoalId,
    title: "Protect my portfolio",
    subtitle: "Comprehensive digital asset insurance coverage",
    icon: Shield,
  },
  {
    id: "both" as GoalId,
    title: "Tax filing + Insurance",
    subtitle: "Complete protection, compliance, and peace of mind",
    icon: Gem,
  },
];

const countries = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "SG", name: "Singapore" },
  { code: "CH", name: "Switzerland" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "IE", name: "Ireland" },
  { code: "NZ", name: "New Zealand" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "ZA", name: "South Africa" },
  { code: "NG", name: "Nigeria" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "PT", name: "Portugal" },
  { code: "PL", name: "Poland" },
];

const taxYears = ["2025", "2024", "2023", "2022", "2021"];

const portfolioRanges = [
  { id: "under-1k", label: "Under $1,000", tier: "standard" },
  { id: "1k-10k", label: "$1K - $10K", tier: "standard" },
  { id: "10k-50k", label: "$10K - $50K", tier: "silver" },
  { id: "50k-100k", label: "$50K - $100K", tier: "platinum" },
  { id: "100k-500k", label: "$100K - $500K", tier: "gold" },
  { id: "500k-plus", label: "$500K+", tier: "gold" },
];

interface DeviceOption {
  id: string;
  name: string;
  image: string;
}

const ledgerDevices: DeviceOption[] = [
  { id: "ledger-stax", name: "Ledger Stax", image: ledgerStaxDevicePng },
  { id: "ledger-flex", name: "Ledger Flex", image: ledgerFlexDevicePng },
  { id: "ledger-nano-gen5", name: "Nano Gen5", image: ledgerNanoGen5DevicePng },
  { id: "ledger-nano-classics", name: "Nano Classics", image: ledgerNanoClassicsDevicePng },
];

const trezorDevices: DeviceOption[] = [
  { id: "trezor-safe-7", name: "Trezor Safe 7", image: trezorSafe7Png },
  { id: "trezor-safe-5", name: "Trezor Safe 5", image: trezorSafe5Png },
  { id: "trezor-safe-3", name: "Trezor Safe 3", image: trezorSafe3Png },
];

const tangemDevices: DeviceOption[] = [
  { id: "tangem-card", name: "Tangem Card", image: tangemCardPng },
  { id: "tangem-ring", name: "Tangem Ring", image: tangemRingPng },
];

const arculusDevices: DeviceOption[] = [
  { id: "arculus-card", name: "Arculus Key Card", image: arculusCardPng },
  { id: "arculus-silver", name: "Arculus Silver", image: arculusSilverPng },
];

const deviceMap: Record<string, DeviceOption[]> = {
  ledger: ledgerDevices,
  trezor: trezorDevices,
  tangem: tangemDevices,
  arculus: arculusDevices,
};

const coldWallets = [
  { id: "ledger", name: "Ledger", Logo: LedgerLogo },
  { id: "trezor", name: "Trezor", Logo: TrezorLogo },
  { id: "tangem", name: "Tangem", Logo: TangemLogo },
  { id: "arculus", name: "Arculus", Logo: ArculusLogo },
];

const decentralisedWallets = [
  { id: "metamask", name: "MetaMask", Logo: MetaMaskLogo },
  { id: "phantom", name: "Phantom", Logo: PhantomLogo },
  { id: "trust", name: "Trust Wallet", Logo: TrustWalletLogo },
  { id: "exodus", name: "Exodus", Logo: ExodusLogo },
];

const centralisedWallets = [
  { id: "coinbase", name: "Coinbase", Logo: CoinbaseLogo },
  { id: "binance", name: "Binance", Logo: BinanceLogo },
  { id: "kraken", name: "Kraken", Logo: KrakenLogo },
];

function getSteps(goal: GoalId | "") {
  if (goal === "tax") {
    return [
      { title: "Service", desc: "Choose your service" },
      { title: "Tax details", desc: "Country and tax year" },
      { title: "Portfolio", desc: "Your holdings" },
      { title: "Wallet", desc: "How you store crypto" },
      { title: "Review", desc: "Confirm and submit" },
    ];
  }
  if (goal === "insurance") {
    return [
      { title: "Service", desc: "Choose your service" },
      { title: "Coverage", desc: "Portfolio details" },
      { title: "Wallet", desc: "How you store crypto" },
      { title: "Review", desc: "Confirm and submit" },
    ];
  }
  if (goal === "both") {
    return [
      { title: "Service", desc: "Choose your service" },
      { title: "Tax details", desc: "Country and tax year" },
      { title: "Portfolio", desc: "Your holdings" },
      { title: "Wallet", desc: "How you store crypto" },
      { title: "Review", desc: "Confirm and submit" },
    ];
  }
  if (goal === "recovery") {
    return [
      { title: "Service", desc: "Choose your service" },
      { title: "Review", desc: "Confirm and submit" },
    ];
  }
  return [{ title: "Service", desc: "Choose your service" }];
}

export default function Onboarding() {
  const searchStr = useSearch();
  const urlGoal = (new URLSearchParams(searchStr).get("goal") || "") as GoalId | "";
  const validGoal = (["tax", "insurance", "both", "recovery"] as GoalId[]).includes(urlGoal as GoalId) ? urlGoal as GoalId : "" as const;

  const [step, setStep] = useState(validGoal ? 1 : 0);
  const [, setLocation] = useLocation();
  const { user, updateUser } = useAuth();

  const [selectedGoal, setSelectedGoal] = useState<GoalId | "">(validGoal);
  const [country, setCountry] = useState("");
  const [taxYear, setTaxYear] = useState("2025");
  const [portfolioValue, setPortfolioValue] = useState("");
  const [walletCategory, setWalletCategory] = useState<"cold" | "decentralised" | "centralised" | "">("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [otherWalletName, setOtherWalletName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const steps = getSteps(selectedGoal);

  useEffect(() => {
    if (step >= steps.length) setStep(Math.max(0, steps.length - 1));
  }, [selectedGoal, step, steps.length]);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSaved = useRef<string>("");
  const autoSave = useCallback((data: Record<string, unknown>) => {
    const key = JSON.stringify(data);
    if (key === lastSaved.current) return;
    lastSaved.current = key;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await apiRequest("PATCH", "/api/auth/user", data);
      } catch {}
    }, 600);
  }, []);

  useEffect(() => {
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, []);

  const handleGoalChange = (goal: GoalId) => {
    setSelectedGoal(goal);
    setStep(0);
    autoSave({ selectedGoals: [goal] });
  };

  const handleCountryChange = (code: string) => {
    setCountry(code);
    autoSave({ country: code });
  };

  const handleTaxYearChange = (yr: string) => {
    setTaxYear(yr);
    autoSave({ taxYear: yr });
  };

  const handlePortfolioChange = (val: string) => {
    setPortfolioValue(val);
    autoSave({ portfolioValue: val });
  };

  const handleWalletSelect = (id: string) => {
    setSelectedWallet(id);
    setSelectedDevice("");
    if (id === "other") {
      setOtherWalletName("");
    } else {
      autoSave({ walletType: id });
    }
  };

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(deviceId);
    autoSave({ walletType: `${selectedWallet}:${deviceId}` });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await updateUser({
        selectedGoals: [selectedGoal],
        country,
        taxYear,
        portfolioValue,
        walletType: selectedWallet === "other" ? `other:${otherWalletName.trim()}` : (selectedDevice || selectedWallet || walletCategory),
        applicationStatus: "pending",
        onboardingComplete: true,
      });
    } catch {}
    await new Promise((r) => setTimeout(r, 2500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const canProceed = () => {
    if (step === 0) return selectedGoal !== "";
    if (selectedGoal === "tax" || selectedGoal === "both") {
      if (step === 1) return country !== "" && taxYear !== "";
      if (step === 2) return portfolioValue !== "";
      if (step === 3) return selectedWallet !== "" && (selectedWallet !== "other" || otherWalletName.trim() !== "");
      return true;
    }
    if (selectedGoal === "insurance") {
      if (step === 1) return portfolioValue !== "";
      if (step === 2) return selectedWallet !== "" && (selectedWallet !== "other" || otherWalletName.trim() !== "");
      return true;
    }
    if (selectedGoal === "recovery") {
      return true;
    }
    return false;
  };

  const renderTaxStep = () => (
    <div data-testid="onboarding-step-tax" className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h1 className="text-2xl font-bold text-foreground mb-2">Tax filing details</h1>
      <p className="text-sm text-muted-foreground mb-8">We need this to generate accurate reports for your jurisdiction.</p>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Country of tax residence</label>
          <div className="relative">
            <button
              onClick={() => setCountryOpen(!countryOpen)}
              data-testid="select-country"
              className="w-full flex items-center justify-between px-4 py-3 bg-card border border-border rounded-xl text-sm text-left transition-colors hover:border-primary/40"
            >
              <span className={country ? "text-foreground" : "text-muted-foreground"}>
                {country ? countries.find((c) => c.code === country)?.name : "Select your country"}
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${countryOpen ? "rotate-180" : ""}`} />
            </button>
            {countryOpen && (
              <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-xl max-h-60 overflow-hidden">
                <div className="p-2 border-b border-border">
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search countries..."
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50"
                    data-testid="input-country-search"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto max-h-44">
                  {countries
                    .filter((c) => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
                    .map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          handleCountryChange(c.code);
                          setCountryOpen(false);
                          setCountrySearch("");
                        }}
                        data-testid={`option-country-${c.code}`}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          country === c.code
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Tax year</label>
          <div className="flex gap-2">
            {taxYears.map((yr) => (
              <button
                key={yr}
                onClick={() => handleTaxYearChange(yr)}
                data-testid={`button-year-${yr}`}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  taxYear === yr
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border text-foreground hover:border-primary/30"
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const getPortfolioButtonStyle = (range: typeof portfolioRanges[0], isSelected: boolean) => {
    if (range.tier === "gold") {
      if (isSelected) {
        return "border-2 border-transparent text-white font-semibold shadow-lg relative overflow-hidden bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-400";
      }
      return "border border-amber-300 dark:border-amber-700 text-foreground hover:border-amber-400 dark:hover:border-amber-600 relative overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-amber-950/40";
    }
    if (range.tier === "platinum") {
      if (isSelected) {
        return "border-2 border-transparent text-white font-semibold shadow-lg relative overflow-hidden bg-gradient-to-br from-slate-600 via-slate-400 to-slate-300";
      }
      return "border border-slate-300 dark:border-slate-600 text-foreground hover:border-slate-400 dark:hover:border-slate-500 relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800";
    }
    if (range.tier === "silver") {
      if (isSelected) {
        return "border-2 border-transparent text-white font-semibold shadow-lg relative overflow-hidden bg-gradient-to-br from-gray-500 via-gray-400 to-gray-300";
      }
      return "border border-gray-300 dark:border-gray-600 text-foreground hover:border-gray-400 dark:hover:border-gray-500 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800";
    }
    if (isSelected) {
      return "bg-primary text-primary-foreground shadow-sm border-2 border-primary";
    }
    return "bg-card border border-border text-foreground hover:border-primary/30";
  };

  const renderPortfolioStep = () => (
    <div data-testid="onboarding-step-portfolio" className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h1 className="text-2xl font-bold text-foreground mb-2">
        {selectedGoal === "insurance" ? "Coverage details" : "Your portfolio"}
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        {selectedGoal === "insurance"
          ? "This helps us determine the right coverage level for your assets."
          : "Understanding your portfolio helps us provide accurate tax calculations."}
      </p>

      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">Estimated portfolio value</label>
        <div className="grid grid-cols-2 gap-2">
          {portfolioRanges.map((range) => {
            const isSelected = portfolioValue === range.id;
            const isPremiumTier = range.tier === "silver" || range.tier === "platinum" || range.tier === "gold";
            return (
              <button
                key={range.id}
                onClick={() => handlePortfolioChange(range.id)}
                data-testid={`button-portfolio-${range.id}`}
                className={`group px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${getPortfolioButtonStyle(range, isSelected)}`}
              >
                {isPremiumTier && (
                  <div className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 ${isSelected ? "opacity-30" : "group-hover:opacity-15"}`}
                    style={{
                      background: "linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%)",
                      backgroundSize: "200% 200%",
                      animation: isSelected ? "shimmer 2s ease-in-out infinite" : "none",
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-1.5">
                  {range.tier === "gold" && <Gem className="w-3.5 h-3.5" />}
                  {range.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderWalletStep = () => {
    const wallets = walletCategory === "cold" ? coldWallets : walletCategory === "decentralised" ? decentralisedWallets : walletCategory === "centralised" ? centralisedWallets : [];
    const devices = walletCategory === "cold" && selectedWallet ? (deviceMap[selectedWallet] || []) : [];

    return (
      <div data-testid="onboarding-step-wallet" className="animate-in fade-in slide-in-from-right-4 duration-300">
        <h1 className="text-2xl font-bold text-foreground mb-2">How do you store your crypto?</h1>
        <p className="text-sm text-muted-foreground mb-8">Select your primary wallet type, then choose your wallet.</p>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => { setWalletCategory("cold"); setSelectedWallet(""); setSelectedDevice(""); }}
            data-testid="button-wallet-cold"
            className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              walletCategory === "cold"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card border border-border text-foreground hover:border-primary/30"
            }`}
          >
            Hardware (Cold)
          </button>
          <button
            onClick={() => { setWalletCategory("decentralised"); setSelectedWallet(""); setSelectedDevice(""); }}
            data-testid="button-wallet-decentralised"
            className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              walletCategory === "decentralised"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card border border-border text-foreground hover:border-primary/30"
            }`}
          >
            Decentralised
          </button>
          <button
            onClick={() => { setWalletCategory("centralised"); setSelectedWallet(""); setSelectedDevice(""); }}
            data-testid="button-wallet-centralised"
            className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              walletCategory === "centralised"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card border border-border text-foreground hover:border-primary/30"
            }`}
          >
            Centralised
          </button>
        </div>

        {walletCategory && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            <label className="text-sm font-medium text-foreground mb-3 block">
              {walletCategory === "cold" ? "Select your hardware wallet" : walletCategory === "decentralised" ? "Select your decentralised wallet" : "Select your exchange"}
            </label>
            <div className={`grid gap-3 ${wallets.length <= 3 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4"}`}>
              {wallets.map((w) => (
                <button
                  key={w.id}
                  onClick={() => handleWalletSelect(w.id)}
                  data-testid={`button-wallet-${w.id}`}
                  className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedWallet === w.id
                      ? "border-primary bg-primary/5 shadow-[0_0_24px_rgba(59,130,246,0.2)]"
                      : "border-border bg-card hover:border-primary/30 hover:shadow-[0_0_12px_rgba(59,130,246,0.08)]"
                  }`}
                >
                  {selectedWallet === w.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none ${
                    selectedWallet === w.id ? "opacity-20" : "group-hover:opacity-10"
                  }`} style={{
                    background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                  }} />
                  <w.Logo className="w-8 h-8 mb-2 relative z-10" />
                  <span className="text-xs font-medium text-foreground relative z-10">{w.name}</span>
                </button>
              ))}
              <button
                onClick={() => handleWalletSelect("other")}
                data-testid="button-wallet-other"
                className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                  selectedWallet === "other"
                    ? "border-primary bg-primary/5 shadow-[0_0_24px_rgba(59,130,246,0.2)]"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-[0_0_12px_rgba(59,130,246,0.08)]"
                }`}
              >
                {selectedWallet === "other" && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                <div className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none ${
                  selectedWallet === "other" ? "opacity-20" : "group-hover:opacity-10"
                }`} style={{
                  background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                }} />
                <PenLine className="w-8 h-8 mb-2 relative z-10 text-muted-foreground" />
                <span className="text-xs font-medium text-foreground relative z-10">Other</span>
              </button>
            </div>

            {selectedWallet === "other" && (
              <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Enter your wallet name
                </label>
                <input
                  type="text"
                  value={otherWalletName}
                  onChange={(e) => {
                    setOtherWalletName(e.target.value);
                    autoSave({ walletType: e.target.value.trim() ? `other:${e.target.value.trim()}` : "other" });
                  }}
                  placeholder="Type your wallet or exchange name"
                  data-testid="input-other-wallet"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            )}

            {devices.length > 0 && (
              <div className="mt-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Select your {coldWallets.find(w => w.id === selectedWallet)?.name} device
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {devices.map((device) => (
                    <button
                      key={device.id}
                      onClick={() => handleDeviceSelect(device.id)}
                      data-testid={`button-device-${device.id}`}
                      className={`group relative flex flex-col items-center rounded-2xl border-2 p-3 transition-all duration-300 ${
                        selectedDevice === device.id
                          ? "border-primary bg-primary/5 shadow-[0_0_24px_rgba(59,130,246,0.2)]"
                          : "border-border bg-card hover:border-primary/30 hover:shadow-[0_0_12px_rgba(59,130,246,0.08)]"
                      }`}
                    >
                      {selectedDevice === device.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center z-20">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                      <div className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none ${
                        selectedDevice === device.id ? "opacity-20" : "group-hover:opacity-10"
                      }`} style={{
                        background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                      }} />
                      <div className="w-full aspect-square rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 mb-2 flex items-center justify-center relative z-10">
                        <img
                          src={device.image}
                          alt={device.name}
                          className="w-full h-full object-contain p-1"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs font-medium text-foreground text-center relative z-10 leading-tight">{device.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderReviewStep = () => {
    const walletName = selectedWallet === "other" ? otherWalletName.trim() :
      ([...coldWallets, ...decentralisedWallets, ...centralisedWallets].find((w) => w.id === selectedWallet)?.name ||
      (walletCategory === "cold" ? "Hardware wallet" : walletCategory === "decentralised" ? "Decentralised wallet" : "Exchange"));
    const deviceName = selectedDevice
      ? Object.values(deviceMap).flat().find(d => d.id === selectedDevice)?.name
      : null;

    return (
      <div data-testid="onboarding-step-review" className="animate-in fade-in slide-in-from-right-4 duration-300">
        <h1 className="text-2xl font-bold text-foreground mb-2">Review your application</h1>
        <p className="text-sm text-muted-foreground mb-8">Please confirm your details before submitting.</p>

        <div className="bg-card border border-border rounded-2xl divide-y divide-border mb-6">
          <ReviewRow label="Name" value={user?.name || user?.username || "Not provided"} />
          <ReviewRow label="Email" value={user?.email || ""} />
          <ReviewRow
            label="Service"
            value={selectedGoal === "tax" ? "Tax Filing" : selectedGoal === "insurance" ? "Insurance" : "Tax + Insurance"}
          />
          {(selectedGoal === "tax" || selectedGoal === "both") && (
            <>
              <ReviewRow label="Tax country" value={countries.find((c) => c.code === country)?.name || ""} />
              <ReviewRow label="Tax year" value={taxYear} />
            </>
          )}
          <ReviewRow label="Portfolio value" value={portfolioRanges.find((p) => p.id === portfolioValue)?.label || ""} />
          <ReviewRow label="Wallet" value={deviceName ? `${walletName} - ${deviceName}` : walletName} />
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          By submitting, you agree to our Terms of Service and Privacy Policy. Your application will be reviewed by our team.
        </p>
      </div>
    );
  };

  const renderCurrentStep = () => {
    if (step === 0) {
      return (
        <div data-testid="onboarding-step-goals" className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h1 className="text-2xl font-bold text-foreground mb-2">What brings you to CoinGuard?</h1>
          <p className="text-sm text-muted-foreground mb-8">Select the service that best fits your needs.</p>
          <div className="space-y-3">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => handleGoalChange(goal.id)}
                data-testid={`button-goal-${goal.id}`}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                  selectedGoal === goal.id
                    ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <goal.icon
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      selectedGoal === goal.id ? "text-primary" : "text-muted-foreground"
                    }`}
                    strokeWidth={1.8}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">{goal.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{goal.subtitle}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selectedGoal === goal.id ? "border-primary bg-primary" : "border-muted-foreground/30"
                    }`}
                  >
                    {selectedGoal === goal.id && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (selectedGoal === "tax" || selectedGoal === "both") {
      if (step === 1) return renderTaxStep();
      if (step === 2) return renderPortfolioStep();
      if (step === 3) return renderWalletStep();
      if (step === 4) return renderReviewStep();
    }

    if (selectedGoal === "insurance") {
      if (step === 1) return renderPortfolioStep();
      if (step === 2) return renderWalletStep();
      if (step === 3) return renderReviewStep();
    }

    if (selectedGoal === "recovery") {
      if (step === 1) return renderReviewStep();
    }

    return null;
  };

  const referenceNumber = `#CG-72${String(user?.id || 0).padStart(3, "0")}31`;

  const getWhatsAppUrl = () => {
    const serviceName = selectedGoal === "tax" ? "Tax Filing" : selectedGoal === "insurance" ? "Insurance" : selectedGoal === "recovery" ? "Crypto Recovery" : "Tax Filing + Insurance";
    const portfolioLabel = portfolioRanges.find((p) => p.id === portfolioValue)?.label || "";
    const walletName = selectedWallet === "other" ? otherWalletName.trim() : ([...coldWallets, ...decentralisedWallets, ...centralisedWallets].find((w) => w.id === selectedWallet)?.name || "");
    const countryName = countries.find((c) => c.code === country)?.name || "";

    const message = [
      `Hi CoinGuard, I would like to speed up my application.`,
      ``,
      `Reference: ${referenceNumber}`,
      `Name: ${user?.name || user?.username || ""}`,
      `Email: ${user?.email || ""}`,
      `Phone: ${user?.phone || ""}`,
      ``,
      `Service: ${serviceName}`,
      portfolioLabel ? `Portfolio: ${portfolioLabel}` : "",
      walletName ? `Wallet: ${walletName}` : "",
      countryName && (selectedGoal === "tax" || selectedGoal === "both") ? `Tax Country: ${countryName}` : "",
      ``,
      `Summary: New applicant requesting ${serviceName.toLowerCase()} services${portfolioLabel ? ` with a ${portfolioLabel} portfolio` : ""}${walletName ? `, using ${walletName}` : ""}.`,
    ].filter(Boolean).join("\n");

    return `https://wa.me/18001234567?text=${encodeURIComponent(message)}`;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background" data-testid="onboarding-success">
        <Navigation />
        <div className="flex items-center justify-center p-6 pt-24">
          <div className="w-full max-w-lg text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-card border border-border rounded-2xl p-10">
              <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-6">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3" data-testid="text-success-title">
                Your application has been sent
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Once accepted, a member of our team will be in contact with you to finalise the application. We will send you your account details.
              </p>

              <div className="bg-muted/30 border border-border rounded-xl p-5 mb-6 text-left">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Application summary</h3>
                  <span className="text-xs font-mono font-semibold text-primary" data-testid="text-reference-number">{referenceNumber}</span>
                </div>
                <div className="space-y-2.5">
                  <SummaryRow label="Service" value={selectedGoal === "tax" ? "Tax Filing" : selectedGoal === "insurance" ? "Insurance" : "Tax + Insurance"} />
                  {(selectedGoal === "tax" || selectedGoal === "both") && (
                    <>
                      <SummaryRow label="Tax country" value={countries.find((c) => c.code === country)?.name || ""} />
                      <SummaryRow label="Tax year" value={taxYear} />
                    </>
                  )}
                  <SummaryRow label="Portfolio value" value={portfolioRanges.find((p) => p.id === portfolioValue)?.label || ""} />
                  <SummaryRow label="Wallet" value={selectedWallet === "other" ? otherWalletName.trim() : ([...coldWallets, ...decentralisedWallets, ...centralisedWallets].find((w) => w.id === selectedWallet)?.name || "")} />
                </div>
              </div>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-whatsapp-speed-up"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full font-semibold text-sm text-white transition-all hover:brightness-110 hover:shadow-lg mb-4"
                style={{ backgroundColor: "#25D366" }}
              >
                <Zap className="w-4 h-4" />
                Speed up application (free of charge)
                <SiWhatsapp className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground mb-6">
                <Mail className="w-3.5 h-3.5" />
                <span>Confirmation sent to {user?.email}</span>
              </div>

              <Button
                onClick={() => { setLocation("/app"); window.scrollTo(0, 0); }}
                className="bg-primary text-primary-foreground rounded-full px-8 font-semibold gap-2"
                data-testid="button-go-to-dashboard"
              >
                Go to dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen bg-background" data-testid="onboarding-submitting">
        <Navigation />
        <div className="flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-md text-center">

          <div className="bg-card border border-border rounded-2xl p-10 animate-in fade-in zoom-in-95 duration-400">
            <div className="relative w-14 h-14 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-muted" />
              <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <Send className="w-5 h-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2" data-testid="text-submitting-title">
              Preparing your application
            </h2>
            <SubmittingSteps />
          </div>
        </div>
        </div>
      </div>
    );
  }

  const progressPercent = steps.length > 1 ? ((step + 1) / steps.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background" data-testid="page-onboarding">
      <Navigation />
      <div className="flex pt-16">
        <div className="hidden lg:flex w-72 bg-card border-r border-border flex-col p-8 min-h-[calc(100vh-4rem)]">
          <div className="space-y-1 mt-4">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-2" data-testid={`step-indicator-${i}`}>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all duration-300 ${
                    i < step
                      ? "bg-primary text-primary-foreground"
                      : i === step
                      ? "border-2 border-primary text-primary"
                      : "border border-border text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <div>
                  <p className={`text-sm font-medium transition-colors ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
          <div className="w-full max-w-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-medium text-muted-foreground">
                Step {step + 1} of {steps.length}
              </span>
              <div className="flex-1 bg-muted rounded-full h-1 overflow-hidden">
                <div
                  className="bg-primary rounded-full h-1 transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {renderCurrentStep()}

            <div className="flex items-center justify-between mt-8">
              {step > 0 ? (
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  className="text-muted-foreground gap-2 text-sm"
                  data-testid="button-onboarding-back"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="bg-primary text-primary-foreground rounded-full px-6 gap-2 font-semibold text-sm"
                  data-testid="button-onboarding-next"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="bg-primary text-primary-foreground rounded-full px-6 gap-2 font-semibold text-sm"
                  data-testid="button-onboarding-submit"
                >
                  Submit application
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center px-5 py-3.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  );
}

function SubmittingSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const loadingSteps = [
    "Validating your information",
    "Preparing your application",
    "Sending to the review team",
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStep(1), 800);
    const timer2 = setTimeout(() => setActiveStep(2), 1600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="space-y-2.5 mt-6">
      {loadingSteps.map((s, i) => (
        <div key={i} className="flex items-center gap-3 justify-center">
          {i < activeStep ? (
            <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-primary" />
            </div>
          ) : i === activeStep ? (
            <Loader2 className="w-4 h-4 text-primary animate-spin" />
          ) : (
            <div className="w-4 h-4 rounded-full border border-border" />
          )}
          <span className={`text-sm ${i <= activeStep ? "text-foreground" : "text-muted-foreground/40"}`}>
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}
