import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Download,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
} from "lucide-react";

const categories = ["All", "Trade", "Swap", "Transfer", "Staking", "Airdrop", "NFT", "Fee"];

const mockTransactions = [
  { id: "1", date: "2025-12-15", asset: "Bitcoin", ticker: "BTC", amount: "0.05", type: "Trade", source: "Coinbase", fee: "$2.50", fiatValue: "$4,920.90", status: "Confirmed" },
  { id: "2", date: "2025-12-14", asset: "Ethereum", ticker: "ETH", amount: "2.5", type: "Swap", source: "MetaMask", fee: "$8.20", fiatValue: "$6,810.40", status: "Confirmed" },
  { id: "3", date: "2025-12-13", asset: "Solana", ticker: "SOL", amount: "100", type: "Staking", source: "Phantom", fee: "$0.00", fiatValue: "$19,840.00", status: "Confirmed" },
  { id: "4", date: "2025-12-12", asset: "Bitcoin", ticker: "BTC", amount: "0.1", type: "Transfer", source: "Ledger", fee: "$1.80", fiatValue: "$9,841.80", status: "Confirmed" },
  { id: "5", date: "2025-12-10", asset: "Ethereum", ticker: "ETH", amount: "1.0", type: "Airdrop", source: "Wallet", fee: "$0.00", fiatValue: "$2,724.16", status: "Needs Review" },
  { id: "6", date: "2025-12-08", asset: "USDC", ticker: "USDC", amount: "5000", type: "Trade", source: "Binance", fee: "$5.00", fiatValue: "$5,000.00", status: "Confirmed" },
];

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = mockTransactions.filter((t) => {
    const matchesSearch = t.asset.toLowerCase().includes(search.toLowerCase()) || t.source.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || t.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppShell>
      <div className="p-6 max-w-[1200px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground" data-testid="text-transactions-title">Transactions</h1>
            <p className="text-sm text-muted-foreground mt-1">{mockTransactions.length} total transactions</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 rounded-lg" data-testid="button-export-transactions">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2 rounded-lg" data-testid="button-sync-transactions">
              <RefreshCw className="w-4 h-4" />
              Sync
            </Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 rounded-lg"
                data-testid="input-search-transactions"
              />
            </div>
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-testid={`button-category-${cat.toLowerCase()}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full" data-testid="table-transactions">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Asset</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Type</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Source</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Fee</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Value</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    data-testid={`row-transaction-${t.id}`}
                  >
                    <td className="px-4 py-3 text-sm text-muted-foreground">{t.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-primary">{t.ticker[0]}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-foreground">{t.asset}</span>
                          <span className="text-xs text-muted-foreground ml-1">{t.ticker}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{t.amount}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-md bg-muted text-muted-foreground">
                        {t.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{t.source}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{t.fee}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground text-right">{t.fiatValue}</td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-md ${
                          t.status === "Confirmed"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center" data-testid="empty-transactions">
              <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">No transactions found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5" data-testid="card-issues">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-foreground">Issues (1)</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">Missing cost basis</p>
                  <p className="text-xs text-muted-foreground">1.0 ETH airdrop on Dec 10, 2025</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs rounded-lg" data-testid="button-resolve-issue">
                Resolve
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
