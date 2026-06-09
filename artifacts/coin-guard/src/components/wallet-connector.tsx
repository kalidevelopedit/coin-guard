import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  CheckCircle2,
  Loader2,
  AlertCircle,
  RefreshCw,
  Unplug,
  Upload,
  Download,
  ArrowLeft,
  Wallet,
  Building2,
  FileSpreadsheet,
} from "lucide-react";
import {
  CoinbaseLogo,
  BinanceLogo,
  KrakenLogo,
  GeminiLogo,
  BitfinexLogo,
  BitstampLogo,
  KuCoinLogo,
  GateioLogo,
  HuobiLogo,
  BybitLogo,
  OkxLogo,
  CryptocomLogo,
  MetaMaskLogo,
  TrezorLogo,
  LedgerLogo,
  TangemLogo,
  ArculusLogo,
  TrustWalletLogo,
  PhantomLogo,
  ExodusLogo,
} from "@/components/crypto-logos";

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "syncing" | "failed";

interface Provider {
  id: string;
  name: string;
  type: "wallet" | "exchange";
  logo: React.ComponentType<{ className?: string }>;
  description: string;
  status: ConnectionStatus;
  label?: string;
}

const walletProviders: Provider[] = [
  { id: "metamask", name: "MetaMask", type: "wallet", logo: MetaMaskLogo, description: "Browser extension wallet for Ethereum and EVM chains", status: "disconnected" },
  { id: "ledger", name: "Ledger", type: "wallet", logo: LedgerLogo, description: "Hardware wallet with industry-leading security", status: "disconnected" },
  { id: "trezor", name: "Trezor", type: "wallet", logo: TrezorLogo, description: "Open-source hardware wallet for secure storage", status: "disconnected" },
  { id: "trustwallet", name: "Trust Wallet", type: "wallet", logo: TrustWalletLogo, description: "Multi-chain mobile wallet by Binance", status: "disconnected" },
  { id: "phantom", name: "Phantom", type: "wallet", logo: PhantomLogo, description: "Solana and multi-chain wallet", status: "disconnected" },
  { id: "exodus", name: "Exodus", type: "wallet", logo: ExodusLogo, description: "Desktop and mobile multi-currency wallet", status: "disconnected" },
  { id: "tangem", name: "Tangem", type: "wallet", logo: TangemLogo, description: "Card-shaped hardware wallet with NFC", status: "disconnected" },
  { id: "arculus", name: "Arculus", type: "wallet", logo: ArculusLogo, description: "Cold storage card wallet", status: "disconnected" },
];

const exchangeProviders: Provider[] = [
  { id: "coinbase", name: "Coinbase", type: "exchange", logo: CoinbaseLogo, description: "US-based cryptocurrency exchange", status: "disconnected" },
  { id: "binance", name: "Binance", type: "exchange", logo: BinanceLogo, description: "World's largest crypto exchange by volume", status: "disconnected" },
  { id: "kraken", name: "Kraken", type: "exchange", logo: KrakenLogo, description: "US-regulated exchange with advanced trading", status: "disconnected" },
  { id: "gemini", name: "Gemini", type: "exchange", logo: GeminiLogo, description: "Regulated exchange by the Winklevoss twins", status: "disconnected" },
  { id: "bitfinex", name: "Bitfinex", type: "exchange", logo: BitfinexLogo, description: "Professional trading platform", status: "disconnected" },
  { id: "bitstamp", name: "Bitstamp", type: "exchange", logo: BitstampLogo, description: "One of the longest-running exchanges", status: "disconnected" },
  { id: "kucoin", name: "KuCoin", type: "exchange", logo: KuCoinLogo, description: "Global exchange with wide token selection", status: "disconnected" },
  { id: "gateio", name: "Gate.io", type: "exchange", logo: GateioLogo, description: "Exchange with extensive altcoin listings", status: "disconnected" },
  { id: "huobi", name: "HTX (Huobi)", type: "exchange", logo: HuobiLogo, description: "Global digital asset exchange", status: "disconnected" },
  { id: "bybit", name: "Bybit", type: "exchange", logo: BybitLogo, description: "Derivatives and spot trading platform", status: "disconnected" },
  { id: "okx", name: "OKX", type: "exchange", logo: OkxLogo, description: "Global exchange with Web3 features", status: "disconnected" },
  { id: "cryptocom", name: "Crypto.com", type: "exchange", logo: CryptocomLogo, description: "Exchange with Visa card and DeFi wallet", status: "disconnected" },
];

function StatusBadge({ status }: { status: ConnectionStatus }) {
  switch (status) {
    case "connected":
      return (
        <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" data-testid="status-connected">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Connected
        </Badge>
      );
    case "syncing":
      return (
        <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800" data-testid="status-syncing">
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          Syncing
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="outline" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800" data-testid="status-failed">
          <AlertCircle className="w-3 h-3 mr-1" />
          Failed
        </Badge>
      );
    case "connecting":
      return (
        <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" data-testid="status-connecting">
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          Connecting
        </Badge>
      );
    default:
      return null;
  }
}

interface WalletConnectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WalletConnector({ open, onOpenChange }: WalletConnectorProps) {
  const [activeTab, setActiveTab] = useState("wallets");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [providers, setProviders] = useState<Provider[]>([...walletProviders, ...exchangeProviders]);
  const [labelValue, setLabelValue] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const filteredProviders = useMemo(() => {
    const typeFilter = activeTab === "wallets" ? "wallet" : "exchange";
    return providers
      .filter((p) => p.type === typeFilter)
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [providers, activeTab, searchQuery]);

  const simulateConnection = (provider: Provider) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === provider.id ? { ...p, status: "connecting" as ConnectionStatus } : p
      )
    );
    setSelectedProvider({ ...provider, status: "connecting" });

    setTimeout(() => {
      setProviders((prev) =>
        prev.map((p) =>
          p.id === provider.id ? { ...p, status: "syncing" as ConnectionStatus } : p
        )
      );
      setSelectedProvider((prev) => prev && prev.id === provider.id ? { ...prev, status: "syncing" } : prev);

      setTimeout(() => {
        const finalStatus: ConnectionStatus = Math.random() > 0.2 ? "connected" : "failed";
        setProviders((prev) =>
          prev.map((p) =>
            p.id === provider.id ? { ...p, status: finalStatus, label: labelValue || undefined } : p
          )
        );
        setSelectedProvider((prev) => prev && prev.id === provider.id ? { ...prev, status: finalStatus, label: labelValue || undefined } : prev);
      }, 1500);
    }, 1200);
  };

  const handleDisconnect = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId ? { ...p, status: "disconnected" as ConnectionStatus, label: undefined } : p
      )
    );
    setSelectedProvider((prev) => prev && prev.id === providerId ? { ...prev, status: "disconnected", label: undefined } : prev);
  };

  const handleResync = (provider: Provider) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === provider.id ? { ...p, status: "syncing" as ConnectionStatus } : p
      )
    );
    setSelectedProvider({ ...provider, status: "syncing" });

    setTimeout(() => {
      setProviders((prev) =>
        prev.map((p) =>
          p.id === provider.id ? { ...p, status: "connected" as ConnectionStatus } : p
        )
      );
      setSelectedProvider((prev) => prev && prev.id === provider.id ? { ...prev, status: "connected" } : prev);
    }, 2000);
  };

  const currentProvider = selectedProvider
    ? providers.find((p) => p.id === selectedProvider.id) || selectedProvider
    : null;

  const handleBack = () => setSelectedProvider(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl p-0 gap-0 overflow-hidden backdrop-blur-xl bg-background/95 dark:bg-card/95"
        data-testid="modal-wallet-connector"
      >
        <DialogHeader className="p-4 pb-0">
          <div className="flex items-center gap-2">
            {currentProvider && (
              <Button
                size="icon"
                variant="ghost"
                onClick={handleBack}
                data-testid="button-back"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div>
              <DialogTitle data-testid="text-modal-title">
                {currentProvider ? currentProvider.name : "Connect Wallet or Exchange"}
              </DialogTitle>
              <DialogDescription data-testid="text-modal-description">
                {currentProvider
                  ? currentProvider.description
                  : "Import your transaction history to calculate taxes"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {currentProvider ? (
          <ProviderDetail
            provider={currentProvider}
            labelValue={labelValue}
            onLabelChange={setLabelValue}
            onConnect={() => simulateConnection(currentProvider)}
            onDisconnect={() => handleDisconnect(currentProvider.id)}
            onResync={() => handleResync(currentProvider)}
          />
        ) : (
          <div className="p-4 pt-3">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search wallets and exchanges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-providers"
              />
            </div>

            <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setSearchQuery(""); }}>
              <TabsList className="w-full" data-testid="tabs-provider-type">
                <TabsTrigger value="wallets" className="flex-1 gap-1.5" data-testid="tab-wallets">
                  <Wallet className="w-4 h-4" />
                  Wallets
                </TabsTrigger>
                <TabsTrigger value="exchanges" className="flex-1 gap-1.5" data-testid="tab-exchanges">
                  <Building2 className="w-4 h-4" />
                  Exchanges
                </TabsTrigger>
                <TabsTrigger value="csv" className="flex-1 gap-1.5" data-testid="tab-csv">
                  <FileSpreadsheet className="w-4 h-4" />
                  Manual CSV
                </TabsTrigger>
              </TabsList>

              <TabsContent value="wallets">
                <ProviderList
                  providers={filteredProviders}
                  onSelect={(p) => { setSelectedProvider(p); setLabelValue(p.label || ""); }}
                />
              </TabsContent>

              <TabsContent value="exchanges">
                <ProviderList
                  providers={filteredProviders}
                  onSelect={(p) => { setSelectedProvider(p); setLabelValue(p.label || ""); }}
                />
              </TabsContent>

              <TabsContent value="csv">
                <CsvUploadPanel dragOver={dragOver} setDragOver={setDragOver} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ProviderList({
  providers,
  onSelect,
}: {
  providers: Provider[];
  onSelect: (provider: Provider) => void;
}) {
  if (providers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground" data-testid="text-no-results">
        <Search className="w-8 h-8 mb-2 opacity-40" />
        <p className="text-sm">No providers found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-1 max-h-[340px] overflow-y-auto pr-1">
      {providers.map((provider) => {
        const Logo = provider.logo;
        return (
          <button
            key={provider.id}
            onClick={() => onSelect(provider)}
            className="flex items-center gap-3 p-3 rounded-md text-left transition-colors hover-elevate active-elevate-2"
            data-testid={`button-provider-${provider.id}`}
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-md bg-muted flex items-center justify-center">
              <Logo className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium">{provider.name}</span>
                {provider.label && (
                  <span className="text-xs text-muted-foreground">({provider.label})</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{provider.description}</p>
            </div>
            <StatusBadge status={provider.status} />
          </button>
        );
      })}
    </div>
  );
}

function ProviderDetail({
  provider,
  labelValue,
  onLabelChange,
  onConnect,
  onDisconnect,
  onResync,
}: {
  provider: Provider;
  labelValue: string;
  onLabelChange: (v: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
  onResync: () => void;
}) {
  const Logo = provider.logo;
  const isConnected = provider.status === "connected";
  const isFailed = provider.status === "failed";
  const isBusy = provider.status === "connecting" || provider.status === "syncing";

  const steps = provider.type === "wallet"
    ? [
        "Open your wallet application",
        "Approve the connection request",
        "Transactions will be imported automatically",
      ]
    : [
        "Generate a read-only API key on the exchange",
        "Paste your API key and secret below",
        "Transaction history will sync automatically",
      ];

  return (
    <div className="p-4 pt-2 space-y-4">
      <div className="flex items-center gap-4 p-4 rounded-md bg-muted/50">
        <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
          <Logo className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold">{provider.name}</span>
            <StatusBadge status={provider.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{provider.description}</p>
        </div>
      </div>

      {!isConnected && !isBusy && (
        <>
          <div>
            <label className="text-sm font-medium mb-1.5 block" data-testid="label-name-field">
              Label (optional)
            </label>
            <Input
              placeholder={`e.g. "My ${provider.name}"`}
              value={labelValue}
              onChange={(e) => onLabelChange(e.target.value)}
              data-testid="input-provider-label"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Add a custom name to identify this connection
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Connection steps</p>
            <ol className="space-y-2">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <Button
            className="w-full"
            onClick={onConnect}
            disabled={isBusy}
            data-testid="button-connect-provider"
          >
            {provider.status === "failed" ? "Retry Connection" : "Connect"}
          </Button>
        </>
      )}

      {isBusy && (
        <div className="flex flex-col items-center py-6 gap-3" data-testid="status-busy-indicator">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            {provider.status === "connecting" ? "Connecting..." : "Syncing transactions..."}
          </p>
        </div>
      )}

      {isConnected && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 rounded-md bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-sm" data-testid="text-connection-success">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            Successfully connected and synced
          </div>

          {provider.label && (
            <p className="text-sm text-muted-foreground" data-testid="text-provider-label">
              Labeled as: <span className="font-medium text-foreground">{provider.label}</span>
            </p>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 gap-1.5"
              onClick={onResync}
              data-testid="button-resync"
            >
              <RefreshCw className="w-4 h-4" />
              Resync
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-1.5 text-destructive"
              onClick={onDisconnect}
              data-testid="button-disconnect"
            >
              <Unplug className="w-4 h-4" />
              Disconnect
            </Button>
          </div>
        </div>
      )}

      {isFailed && (
        <div className="flex items-center gap-2 p-3 rounded-md bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-sm" data-testid="text-connection-failed">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Connection failed. Please check your credentials and try again.
        </div>
      )}
    </div>
  );
}

function CsvUploadPanel({
  dragOver,
  setDragOver,
}: {
  dragOver: boolean;
  setDragOver: (v: boolean) => void;
}) {
  const [uploaded, setUploaded] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    setUploaded(true);
  };

  return (
    <div className="space-y-4 py-2">
      <div>
        <p className="text-sm font-medium mb-1">Download Template</p>
        <p className="text-xs text-muted-foreground mb-2">
          Use our CSV template to ensure your data is formatted correctly
        </p>
        <Button variant="outline" className="gap-1.5" data-testid="button-download-template">
          <Download className="w-4 h-4" />
          Download CSV Template
        </Button>
      </div>

      <div>
        <p className="text-sm font-medium mb-1">Upload Transactions</p>
        <p className="text-xs text-muted-foreground mb-2">
          Drag and drop your CSV file or click to browse
        </p>
        <div
          className={`border-2 border-dashed rounded-md p-8 text-center transition-colors ${
            dragOver
              ? "border-primary bg-primary/5"
              : uploaded
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
              : "border-border"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          data-testid="area-csv-upload"
        >
          {uploaded ? (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <p className="text-sm font-medium" data-testid="text-upload-success">File uploaded successfully</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUploaded(false)}
                data-testid="button-upload-another"
              >
                Upload another file
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drop your CSV file here
              </p>
              <Button variant="outline" size="sm" data-testid="button-browse-files">
                Browse Files
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
