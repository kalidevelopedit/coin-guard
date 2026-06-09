import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ArrowRight,
  Calculator,
  ShieldCheck,
  Layers,
  FileText,
  RefreshCw,
  BarChart3,
  Globe,
  Headphones,
  Lock,
  Zap,
  Clock,
  Database,
  SearchCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const plans = [
  {
    name: "Crypto Recovery",
    price: "Custom",
    period: "per case",
    description: "Professional blockchain forensics and fund recovery services. Pricing is based on case complexity and amount involved.",
    icon: SearchCheck,
    color: "amber",
    sections: [
      {
        label: "Recovery Services",
        features: [
          "Scam and fraud fund tracing across multiple blockchains",
          "Lost wallet and seed phrase recovery assistance",
          "Wrong address transaction investigation",
          "Exchange account access recovery support",
          "Stolen crypto forensic investigation",
          "SIM swap and phishing attack fund recovery",
        ],
      },
      {
        label: "Investigation Process",
        features: [
          "Dedicated recovery specialist assigned to your case",
          "Advanced on-chain tracing and wallet analysis tools",
          "Coordination with exchanges for fund freezing",
          "Evidence compilation for law enforcement referral",
          "Regular progress updates throughout investigation",
        ],
      },
      {
        label: "Support",
        features: [
          "Free initial case evaluation",
          "24/7 emergency response for recent incidents",
          "WhatsApp and phone support with your specialist",
          "No upfront fees on eligible recovery cases",
        ],
      },
    ],
    cta: "Start your recovery",
    popular: true,
  },
  {
    name: "Tax Reporting",
    price: "$20",
    period: "per tax year",
    description: "Complete crypto tax calculations and audit-ready reports for a single tax year. One-time purchase per filing year.",
    icon: Calculator,
    color: "primary",
    sections: [
      {
        label: "Transaction Handling",
        features: [
          "Unlimited transaction imports across all wallets",
          "Auto-sync from 500+ exchanges and wallets",
          "DeFi protocol support (swaps, staking, lending, liquidity pools)",
          "NFT minting, buying, selling, and royalty tracking",
          "Cross-chain bridge transaction detection",
          "Airdrop and hard fork income classification",
        ],
      },
      {
        label: "Tax Calculations",
        features: [
          "Capital gains and losses with cost-basis tracking",
          "FIFO, LIFO, HIFO, and specific identification methods",
          "Short-term vs. long-term holding period classification",
          "Wash sale rule identification and flagging",
          "Staking, mining, and yield farming income calculation",
          "Multi-currency support with historical FMV lookups",
        ],
      },
      {
        label: "Reports & Filing",
        features: [
          "IRS Form 8949 and Schedule D generation",
          "International tax report formats (UK, Canada, Australia, EU)",
          "CSV, PDF, and TurboTax-compatible exports",
          "Audit trail with full transaction history documentation",
          "Tax-loss harvesting opportunity reports",
        ],
      },
      {
        label: "Support",
        features: [
          "Email support with 24-hour response time",
          "Knowledge base and guided setup documentation",
        ],
      },
    ],
    cta: "Start filing",
    popular: false,
  },
  {
    name: "Bundle",
    price: "$29",
    period: "per month",
    description: "Tax reporting plus full insurance coverage in a single plan. Best value for investors who want complete protection and compliance.",
    icon: Layers,
    color: "primary",
    sections: [
      {
        label: "Everything in Tax Reporting",
        features: [
          "All transaction imports, calculations, and report generation",
          "All supported tax methods and international formats",
          "DeFi, NFT, and cross-chain transaction support",
        ],
      },
      {
        label: "Everything in Insurance",
        features: [
          "Full coverage for exchange hacks, smart contract failures, and theft",
          "Up to $100K in digital asset protection",
          "24/7 claims support with dedicated case managers",
        ],
      },
      {
        label: "Bundle Exclusives",
        features: [
          "Priority support with under 4-hour response time",
          "Dedicated account manager for personalized assistance",
          "Multi-year tax history access and filing (up to 5 years back)",
          "Custom report templates for CPAs and accountants",
          "API access for portfolio and tax data integration",
          "Advanced portfolio analytics with gain/loss trends",
          "Phone support during business hours",
          "Early access to new features and integrations",
        ],
      },
    ],
    cta: "Get the bundle",
    popular: false,
  },
  {
    name: "Insurance",
    price: "$15",
    period: "per month",
    description: "Comprehensive digital asset protection with transparent terms and fast claims processing. Coverage starts immediately.",
    icon: ShieldCheck,
    color: "green",
    sections: [
      {
        label: "Coverage Types",
        features: [
          "Exchange hack and platform insolvency protection",
          "Smart contract exploit and protocol failure coverage",
          "Private key loss and wallet recovery assistance",
          "Theft and unauthorized access protection",
          "Phishing and social engineering attack coverage",
          "SIM swap fraud and account takeover protection",
        ],
      },
      {
        label: "Claims & Processing",
        features: [
          "Instant coverage activation upon subscription",
          "Real-time claims status tracking dashboard",
          "Dedicated claims adjuster for each case",
          "Average claim resolution within 14 business days",
          "No deductible on claims under $5,000",
        ],
      },
      {
        label: "Coverage Details",
        features: [
          "Up to $100K coverage per incident",
          "Coverage across all connected exchanges and wallets",
          "Monthly and annual billing options",
          "24/7 emergency support line",
        ],
      },
    ],
    cta: "Get covered",
    popular: false,
  },
];

const highlights = [
  { icon: RefreshCw, title: "Auto-sync", desc: "Connect once. Transactions import automatically from 500+ sources." },
  { icon: Globe, title: "Multi-jurisdiction", desc: "Tax reports formatted for the US, UK, Canada, Australia, Germany, and more." },
  { icon: Lock, title: "Bank-grade security", desc: "AES-256 encryption, SOC 2 compliant, read-only API connections." },
  { icon: Zap, title: "Instant activation", desc: "Insurance coverage begins the moment your subscription is confirmed." },
  { icon: Clock, title: "Fast claims", desc: "Average insurance claim resolved within 14 business days." },
  { icon: Database, title: "500+ integrations", desc: "Coinbase, Binance, Kraken, MetaMask, Phantom, Uniswap, and hundreds more." },
];

const faqs = [
  {
    q: "Can I try before I buy?",
    a: "Yes. Create a free account, connect your wallets and exchanges, and preview your full tax summary including capital gains, income, and transaction counts. You only pay when you're ready to download your completed tax forms. Insurance coverage requires an active paid subscription.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as cryptocurrency payments including BTC, ETH, USDC, and USDT. All payments are processed through PCI-compliant payment providers. Annual billing is available for the Bundle and Insurance plans at a 15% discount.",
  },
  {
    q: "Can I cancel my insurance anytime?",
    a: "Yes, you can cancel your insurance subscription at any time with no cancellation fees. Your coverage continues through the end of your current billing period. Any pending claims at the time of cancellation will still be processed and honored according to the original coverage terms.",
  },
  {
    q: "What exactly does the Bundle include that I can't get separately?",
    a: "The Bundle combines Tax Reporting and Insurance into one plan and adds exclusive features: a dedicated account manager, priority support with under 4-hour response times, multi-year tax history access (up to 5 years back), custom report templates for CPAs, API access for integrating tax data into your own systems, advanced portfolio analytics, and phone support during business hours.",
  },
  {
    q: "Do you support DeFi and NFT transactions?",
    a: "Yes, we fully support DeFi transactions including token swaps, liquidity pool deposits and withdrawals, yield farming rewards, staking income, lending and borrowing, and wrapped token conversions. For NFTs, we track minting costs, purchases, sales, royalty income, and airdrops across major marketplaces like OpenSea, Blur, and Magic Eden. Cross-chain bridges are also detected and reconciled automatically.",
  },
  {
    q: "Which exchanges and wallets do you support?",
    a: "We integrate with over 500 exchanges, wallets, and blockchains. Major exchanges include Coinbase, Binance, Kraken, Gemini, KuCoin, Bybit, OKX, and Crypto.com. Wallet support includes MetaMask, Phantom, Ledger, Trezor, Trust Wallet, and any EVM-compatible or Solana wallet via public address. We also support direct blockchain imports for Bitcoin, Ethereum, Solana, Polygon, Arbitrum, and Avalanche.",
  },
  {
    q: "How do you calculate cost basis for my crypto?",
    a: "We support multiple cost-basis accounting methods: FIFO (First In, First Out), LIFO (Last In, First Out), HIFO (Highest In, First Out), and Specific Identification. You can choose the method that minimizes your tax liability or matches what you've used in prior filings. Our system automatically fetches historical fair market values from reliable price feeds at the exact time of each transaction.",
  },
  {
    q: "What happens if I get audited?",
    a: "Your tax reports include a complete audit trail documenting every transaction, the source of each data point, cost-basis calculations, and the accounting method used. All reports are formatted to meet IRS, HMRC, ATO, and CRA requirements. Bundle subscribers also receive priority support from our team to help you navigate any audit inquiries and provide additional documentation if needed.",
  },
  {
    q: "What does the insurance actually cover?",
    a: "Our insurance covers losses resulting from exchange hacks, platform insolvency, smart contract exploits, unauthorized account access, phishing attacks, SIM swap fraud, and private key loss (with qualifying security measures in place). Coverage applies to digital assets held on any connected exchange or wallet. Each incident is covered up to $100,000, and there is no deductible on claims under $5,000.",
  },
  {
    q: "How fast are insurance claims processed?",
    a: "After you submit a claim through your dashboard, a dedicated claims adjuster is assigned to your case within 24 hours. The average claim is resolved within 14 business days. Simple claims (such as verified exchange hacks with public confirmation) are often resolved faster. You can track your claim status in real time from your dashboard throughout the entire process.",
  },
  {
    q: "Is my data safe?",
    a: "Security is foundational to CoinGuard. All data is encrypted with AES-256 at rest and TLS 1.3 in transit. We use read-only API connections to exchanges, meaning we can never move or access your funds. Our infrastructure is SOC 2 Type II compliant, and we conduct regular third-party penetration testing. We never sell or share your data with third parties.",
  },
  {
    q: "Can my CPA or accountant access my reports?",
    a: "Yes. You can export your tax reports in multiple formats including IRS-ready Form 8949, Schedule D, TurboTax-compatible CSV files, and detailed PDF summaries. Bundle subscribers can also create custom report templates tailored to their accountant's preferences and use API access for direct data integration into professional tax software.",
  },
];

export default function Pricing() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-pricing">
      <Navigation />
      <div className="pt-16">
        <section className="py-24 px-6 text-center" data-testid="section-pricing-hero">
          <div className="max-w-[800px] mx-auto">
            <h1 className="text-[36px] md:text-[48px] font-bold text-foreground tracking-tight mb-6 leading-tight">
              Simple, transparent pricing
            </h1>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              No hidden fees. No surprises. Pay once for tax reports or subscribe monthly for insurance and bundled services. Preview your tax summary free before purchasing.
            </p>
          </div>
        </section>

        <section className="pb-24 px-6" data-testid="section-pricing-cards">
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <Card
                key={i}
                className={`relative p-6 flex flex-col ${plan.popular ? "border-primary border-2" : ""}`}
                data-testid={`card-plan-${plan.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <plan.icon className={`w-5 h-5 ${plan.color === "green" ? "text-green-500" : plan.color === "amber" ? "text-amber-500" : "text-primary"}`} />
                    <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[36px] font-bold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-5 mb-8 flex-1">
                  {plan.sections.map((section) => (
                    <div key={section.label}>
                      <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2">{section.label}</p>
                      <div className="space-y-2">
                        {section.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2.5">
                            <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.color === "green" ? "text-green-500" : plan.color === "amber" ? "text-amber-500" : "text-primary"}`} />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  data-testid={`button-plan-${plan.name.toLowerCase().replace(/\s/g, "-")}`}
                  onClick={() => goTo("/apply")}
                  className={`w-full rounded-full font-semibold text-[15px] ${plan.popular ? (plan.color === "amber" ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-primary text-primary-foreground") : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20 px-6 border-t border-border" data-testid="section-pricing-highlights">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-[24px] md:text-[30px] font-bold text-foreground tracking-tight mb-4 text-center">
              Included with every plan
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              Core capabilities that come standard, regardless of which plan you choose.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3" data-testid={`highlight-${i}`}>
                  <h.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{h.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-muted/30" data-testid="section-pricing-faq">
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4 text-center">
              Frequently asked questions
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Detailed answers to the most common questions about our tax reporting and insurance services.
            </p>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-5" data-testid={`accordion-faq-${i}`}>
                  <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-24 px-6" data-testid="section-pricing-cta">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4">
              Start for free
            </h2>
            <p className="text-[16px] text-muted-foreground mb-8 leading-relaxed">
              Create your account, connect your wallets, and preview your complete tax summary. No payment required until you're ready to download your reports.
            </p>
            <Button
              size="lg"
              data-testid="button-pricing-cta"
              onClick={() => goTo("/apply")}
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
