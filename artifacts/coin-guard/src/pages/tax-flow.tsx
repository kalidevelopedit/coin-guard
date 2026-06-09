import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  Download,
  Check,
  Shield,
  Search,
} from "lucide-react";
import {
  CoinbaseLogo,
  BinanceLogo,
  KrakenLogo,
  GeminiLogo,
  BitfinexLogo,
  BitstampLogo,
  GateioLogo,
  HuobiLogo,
  BybitLogo,
  OkxLogo,
  CryptocomLogo,
  MetaMaskLogo,
  LedgerLogo,
  TrezorLogo,
  TangemLogo,
  ArculusLogo,
  TrustWalletLogo,
  PhantomLogo,
  ExodusLogo,
  KuCoinLogo,
} from "@/components/crypto-logos";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const steps = ["Connect Sources", "Review Transactions", "Generate Reports"];

const exchangeList = [
  { name: "Coinbase", Logo: CoinbaseLogo },
  { name: "Binance", Logo: BinanceLogo },
  { name: "Kraken", Logo: KrakenLogo },
  { name: "Gemini", Logo: GeminiLogo },
  { name: "KuCoin", Logo: KuCoinLogo },
  { name: "Bitfinex", Logo: BitfinexLogo },
  { name: "Bitstamp", Logo: BitstampLogo },
  { name: "Gate.io", Logo: GateioLogo },
  { name: "Huobi", Logo: HuobiLogo },
  { name: "Bybit", Logo: BybitLogo },
  { name: "OKX", Logo: OkxLogo },
  { name: "Crypto.com", Logo: CryptocomLogo },
];

const softwareWalletList = [
  { name: "MetaMask", Logo: MetaMaskLogo },
  { name: "Trust Wallet", Logo: TrustWalletLogo },
  { name: "Phantom", Logo: PhantomLogo },
  { name: "Exodus", Logo: ExodusLogo },
];

const hardwareWalletList = [
  { name: "Ledger Nano X", Logo: LedgerLogo },
  { name: "Ledger Nano S Plus", Logo: LedgerLogo },
  { name: "Trezor Model T", Logo: TrezorLogo },
  { name: "Trezor Safe 3", Logo: TrezorLogo },
  { name: "Tangem Wallet", Logo: TangemLogo },
  { name: "Arculus Cold Storage", Logo: ArculusLogo },
];

export default function TaxFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [connectedSources, setConnectedSources] = useState<string[]>([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [, setLocation] = useLocation();

  const progress = ((currentStep + 1) / steps.length) * 100;

  const toggleSource = (source: string) => {
    setConnectedSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
    );
  };

  const filteredExchanges = exchangeList.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goHome = () => {
    setLocation("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#0a0f14]">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="max-w-[800px] mx-auto px-6">
          <button onClick={goHome} className="inline-flex items-center gap-2 text-sm text-gray-500 mb-6 cursor-pointer" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>

          <h1 className="text-3xl font-semibold text-white mb-2">File Crypto Taxes</h1>
          <p className="text-gray-400 mb-8">
            Connect your accounts, review your transactions, and download your tax reports.
          </p>

          <div className="flex items-center gap-4 mb-8">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-3 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                    i <= currentStep
                      ? "bg-[#22c55e] text-black"
                      : "bg-white/10 text-gray-500"
                  }`}
                >
                  {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:block ${
                    i <= currentStep ? "text-white" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px bg-white/10" />
                )}
              </div>
            ))}
          </div>

          <Progress value={progress} className="mb-8 h-1" />

          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Connect Exchanges</h3>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Search exchanges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                    data-testid="input-search-exchanges"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredExchanges.map((exchange) => (
                    <button
                      key={exchange.name}
                      onClick={() => toggleSource(exchange.name)}
                      data-testid={`button-exchange-${exchange.name.toLowerCase().replace(/\./g, "")}`}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all duration-150 ${
                        connectedSources.includes(exchange.name)
                          ? "border-[#22c55e] bg-[#22c55e]/10"
                          : "border-white/10 bg-white/[0.02]"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">
                        <exchange.Logo className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-white">{exchange.name}</span>
                      {connectedSources.includes(exchange.name) && (
                        <Check className="w-4 h-4 text-[#22c55e] ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Software Wallets</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {softwareWalletList.map((wallet) => (
                    <button
                      key={wallet.name}
                      onClick={() => toggleSource(wallet.name)}
                      data-testid={`button-wallet-${wallet.name.toLowerCase().replace(/\s/g, "-")}`}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all duration-150 ${
                        connectedSources.includes(wallet.name)
                          ? "border-[#22c55e] bg-[#22c55e]/10"
                          : "border-white/10 bg-white/[0.02]"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">
                        <wallet.Logo className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-white">{wallet.name}</span>
                      {connectedSources.includes(wallet.name) && (
                        <Check className="w-4 h-4 text-[#22c55e] ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Hardware Wallets</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {hardwareWalletList.map((wallet) => (
                    <button
                      key={wallet.name}
                      onClick={() => toggleSource(wallet.name)}
                      data-testid={`button-hw-${wallet.name.toLowerCase().replace(/\s/g, "-")}`}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all duration-150 ${
                        connectedSources.includes(wallet.name)
                          ? "border-[#22c55e] bg-[#22c55e]/10"
                          : "border-white/10 bg-white/[0.02]"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">
                        <wallet.Logo className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-white">{wallet.name}</span>
                      {connectedSources.includes(wallet.name) && (
                        <Check className="w-4 h-4 text-[#22c55e] ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Add Wallet Address</h3>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter wallet address (0x...)"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                    data-testid="input-wallet-address"
                  />
                  <Button
                    variant="outline"
                    className="border-white/10 text-white"
                    onClick={() => {
                      if (walletAddress) {
                        toggleSource(`Wallet: ${walletAddress.slice(0, 8)}...`);
                        setWalletAddress("");
                      }
                    }}
                    data-testid="button-add-wallet"
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Import CSV</h3>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-gray-400 mb-2">
                    Drag and drop your CSV file here, or click to browse
                  </p>
                  <Button variant="outline" size="sm" className="border-white/10 text-white" data-testid="button-upload-csv">
                    Browse Files
                  </Button>
                </div>
              </div>

              {connectedSources.length > 0 && (
                <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white mb-3">
                    Connected Sources ({connectedSources.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {connectedSources.map((source) => (
                      <span
                        key={source}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#22c55e]/10 text-[#22c55e] rounded-md text-sm font-medium"
                      >
                        <Check className="w-3 h-3" />
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Transaction Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Total Transactions", value: "1,247" },
                    { label: "Capital Gains", value: "$24,831.42" },
                    { label: "Capital Losses", value: "-$3,420.18" },
                    { label: "Income", value: "$1,088.73" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/[0.03] border border-white/5 rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                      <p className="text-xl font-semibold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {[
                    { date: "Dec 15, 2025", type: "Sell", asset: "BTC", amount: "0.25", gain: "+$2,340.00" },
                    { date: "Dec 10, 2025", type: "Swap", asset: "ETH / USDC", amount: "1.5", gain: "+$890.50" },
                    { date: "Dec 5, 2025", type: "Stake", asset: "SOL", amount: "50", gain: "$0.00" },
                    { date: "Nov 28, 2025", type: "Sell", asset: "ETH", amount: "2.0", gain: "-$420.30" },
                    { date: "Nov 20, 2025", type: "Buy", asset: "BTC", amount: "0.1", gain: "N/A" },
                  ].map((tx, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-white/5 bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500 w-24">{tx.date}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                          tx.type === "Sell" ? "bg-red-500/10 text-red-400" :
                          tx.type === "Buy" ? "bg-green-500/10 text-green-400" :
                          "bg-[#22c55e]/10 text-[#22c55e]"
                        }`}>{tx.type}</span>
                        <span className="text-sm text-white font-medium">{tx.asset}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">{tx.amount}</span>
                        <span className={`text-sm font-medium ${
                          tx.gain.startsWith("+") ? "text-green-400" :
                          tx.gain.startsWith("-") ? "text-red-400" :
                          "text-gray-500"
                        }`}>{tx.gain}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 rounded-xl p-4 flex items-start gap-3 bg-white/[0.02]">
                <Shield className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-500">
                  These calculations are estimates based on imported data. Consult a qualified
                  tax professional before filing.
                </p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#22c55e]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Your reports are ready
                  </h3>
                  <p className="text-gray-400 mb-8">
                    Download your tax reports below. You can re-generate them at any time.
                  </p>

                  <div className="max-w-md mx-auto space-y-3">
                    {[
                      { name: "Tax Summary Report", format: "PDF", size: "2.4 MB" },
                      { name: "Complete Transaction Log", format: "CSV", size: "1.1 MB" },
                      { name: "Capital Gains Detail", format: "PDF", size: "3.2 MB" },
                      { name: "Form 8949", format: "PDF", size: "890 KB" },
                    ].map((report) => (
                      <button
                        key={report.name}
                        className="flex items-center justify-between gap-4 w-full px-5 py-4 rounded-lg border border-white/10 text-left bg-white/[0.02] hover-elevate"
                        data-testid={`button-download-${report.name.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-[#22c55e]" strokeWidth={1.5} />
                          <div>
                            <p className="text-sm font-medium text-white">{report.name}</p>
                            <p className="text-xs text-gray-500">
                              {report.format} / {report.size}
                            </p>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border border-white/10 rounded-xl p-4 flex items-start gap-3 bg-white/[0.02]">
                <Shield className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-500">
                  Tax calculations are based on imported data and the selected cost basis
                  method. This is not tax advice. Please consult a qualified tax professional
                  before filing your return.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="border-white/10 text-white disabled:text-gray-600"
              data-testid="button-previous-step"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 0 && connectedSources.length === 0}
                className="bg-[#22c55e] text-black font-semibold"
                data-testid="button-next-step"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-[#22c55e] text-black font-semibold" onClick={goHome} data-testid="button-finish">
                Done
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
