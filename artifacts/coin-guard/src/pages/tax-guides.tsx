import { useState } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Globe, Search, ArrowRight, BookOpen, Scale, Calendar, DollarSign, Percent, FileText, AlertTriangle, ChevronDown, CheckCircle2, UserCheck, MessageCircle, Shield } from "lucide-react";

import irsLogo from "@assets/image_1772113205486.png";
import atoLogo from "@assets/image_1772113265084.png";
import craLogo from "@assets/image_1772113325535.png";
import germanLogo from "@assets/image_1772113396888.png";
import hmrcLogo from "@assets/image_1772113440790.png";

interface TaxGuide {
  country: string;
  flag: string;
  authority: string;
  authorityLogo: string;
  taxYear: string;
  capitalGainsRate: string;
  shortTermRate: string;
  holdingPeriod: string;
  freeAllowance: string;
  reportingDeadline: string;
  summary: string;
  keyRules: string[];
  taxableEvents: string[];
  nonTaxableEvents: string[];
}

const taxGuides: TaxGuide[] = [
  {
    country: "United States",
    flag: "US",
    authority: "Internal Revenue Service (IRS)",
    authorityLogo: irsLogo,
    taxYear: "Jan 1 - Dec 31",
    capitalGainsRate: "0-20%",
    shortTermRate: "10-37%",
    holdingPeriod: "1 year",
    freeAllowance: "None",
    reportingDeadline: "April 15",
    summary: "The IRS treats cryptocurrency as property. Every disposal, trade, or exchange is a taxable event. You must report all transactions on Form 8949 and Schedule D.",
    keyRules: [
      "Crypto is classified as property, not currency",
      "Capital gains tax applies to all disposals",
      "Short-term gains (held < 1 year) taxed as ordinary income",
      "Long-term gains (held > 1 year) taxed at 0%, 15%, or 20%",
      "Mining and staking rewards are taxed as income when received",
      "Airdrops and hard fork tokens are taxable income",
      "Losses can offset gains, with $3,000 annual deduction limit",
      "Wash sale rules may apply starting 2025",
    ],
    taxableEvents: [
      "Selling crypto for fiat (USD, EUR, etc.)",
      "Trading one crypto for another",
      "Paying for goods or services with crypto",
      "Receiving mining or staking rewards",
      "Receiving airdrops or hard fork tokens",
      "Earning crypto as payment or salary",
    ],
    nonTaxableEvents: [
      "Buying crypto with fiat currency",
      "Transferring between your own wallets",
      "Donating crypto to a qualified charity",
      "Gifting crypto (up to annual exclusion amount)",
    ],
  },
  {
    country: "United Kingdom",
    flag: "GB",
    authority: "HM Revenue & Customs (HMRC)",
    authorityLogo: hmrcLogo,
    taxYear: "Apr 6 - Apr 5",
    capitalGainsRate: "10-20%",
    shortTermRate: "N/A",
    holdingPeriod: "None",
    freeAllowance: "3,000 GBP",
    reportingDeadline: "January 31",
    summary: "HMRC considers cryptocurrency as an asset subject to Capital Gains Tax. The UK does not distinguish between short-term and long-term holdings for CGT purposes.",
    keyRules: [
      "Crypto assets are subject to Capital Gains Tax (CGT)",
      "Annual CGT-free allowance of 3,000 GBP (2024/25 onwards)",
      "Basic rate taxpayers pay 10% CGT, higher rate pay 20%",
      "No distinction between short-term and long-term gains",
      "Same-day and 30-day matching rules apply (bed and breakfasting)",
      "Mining and staking income subject to Income Tax",
      "DeFi lending and staking may be treated as income",
      "Losses can be carried forward indefinitely",
    ],
    taxableEvents: [
      "Selling crypto for GBP or other fiat",
      "Exchanging one crypto for another",
      "Using crypto to pay for goods or services",
      "Receiving mining or staking income",
      "Receiving crypto as employment income",
      "Receiving airdrops (if something was done to receive them)",
    ],
    nonTaxableEvents: [
      "Buying crypto with GBP",
      "Transferring crypto between your own wallets",
      "Gifting crypto to a spouse or civil partner",
      "Donating crypto to charity",
    ],
  },
  {
    country: "Australia",
    flag: "AU",
    authority: "Australian Taxation Office (ATO)",
    authorityLogo: atoLogo,
    taxYear: "Jul 1 - Jun 30",
    capitalGainsRate: "0-45%",
    shortTermRate: "Marginal rate",
    holdingPeriod: "1 year",
    freeAllowance: "None (personal use < $10k)",
    reportingDeadline: "October 31",
    summary: "The ATO treats cryptocurrency as a CGT asset. If you hold crypto for more than 12 months, you may be eligible for a 50% CGT discount. Personal use assets under $10,000 may be exempt.",
    keyRules: [
      "Crypto is a CGT asset subject to capital gains tax",
      "50% CGT discount if held for more than 12 months",
      "Personal use asset exemption for purchases under $10,000 AUD",
      "Gains taxed at your marginal income tax rate",
      "Mining and staking rewards are assessable income",
      "DeFi transactions are taxable events",
      "Losses can only offset capital gains, not income",
      "Record-keeping requirements apply for 5 years",
    ],
    taxableEvents: [
      "Selling crypto for AUD or other fiat",
      "Trading crypto to crypto",
      "Using crypto to purchase goods or services",
      "Receiving crypto from mining or staking",
      "Converting crypto to stablecoins",
      "Receiving airdrops (income when received)",
    ],
    nonTaxableEvents: [
      "Buying crypto with AUD",
      "Holding crypto without disposing",
      "Transferring between your own wallets",
      "Personal use purchases under $10,000 AUD",
    ],
  },
  {
    country: "Canada",
    flag: "CA",
    authority: "Canada Revenue Agency (CRA)",
    authorityLogo: craLogo,
    taxYear: "Jan 1 - Dec 31",
    capitalGainsRate: "Up to 26.76%",
    shortTermRate: "Same as capital gains",
    holdingPeriod: "None",
    freeAllowance: "None",
    reportingDeadline: "April 30",
    summary: "The CRA treats cryptocurrency as a commodity. Capital gains from crypto are 50% taxable (inclusion rate). If you are actively trading, your profits may be classified as business income, which is fully taxable.",
    keyRules: [
      "Crypto is treated as a commodity by the CRA",
      "Only 50% of capital gains are taxable (inclusion rate increased to 66.7% above $250,000)",
      "Active trading may be classified as business income (100% taxable)",
      "Mining income is classified as business income or hobby",
      "Adjusted cost base (ACB) method used for cost calculations",
      "Barter transaction rules apply to crypto-to-crypto trades",
      "Losses can only offset capital gains",
      "Superficial loss rules apply (30-day rule)",
    ],
    taxableEvents: [
      "Selling crypto for CAD or other fiat",
      "Trading one crypto for another",
      "Purchasing goods or services with crypto",
      "Receiving crypto as payment for services",
      "Mining cryptocurrency",
      "Receiving staking rewards",
    ],
    nonTaxableEvents: [
      "Buying crypto with CAD",
      "Transferring between your own wallets",
      "Gifting crypto (donor may have CGT)",
      "Donating crypto to registered charities",
    ],
  },
  {
    country: "Germany",
    flag: "DE",
    authority: "Bundeszentralamt fur Steuern (BZSt)",
    authorityLogo: germanLogo,
    taxYear: "Jan 1 - Dec 31",
    capitalGainsRate: "0% (after 1 year)",
    shortTermRate: "Up to 45%",
    holdingPeriod: "1 year",
    freeAllowance: "600 EUR",
    reportingDeadline: "July 31",
    summary: "Germany has one of the most favorable crypto tax regimes. If you hold your crypto for more than one year, your gains are completely tax-free. Short-term gains under 600 EUR are also exempt.",
    keyRules: [
      "Crypto held for more than 1 year is completely tax-free",
      "Short-term gains under 600 EUR annual exemption are tax-free",
      "If gains exceed 600 EUR, the entire amount is taxable",
      "Short-term gains taxed at personal income tax rate (up to 45%)",
      "Staking and lending do not extend the holding period (BMF 2022 clarification)",
      "Mining is treated as commercial income",
      "FIFO method typically used for cost basis",
      "Losses can be offset against private sale gains",
    ],
    taxableEvents: [
      "Selling crypto held less than 1 year",
      "Trading crypto to crypto (if held < 1 year)",
      "Using crypto for purchases (if held < 1 year)",
      "Mining cryptocurrency (commercial income)",
      "Receiving staking rewards (may be income)",
      "Margin trading profits",
    ],
    nonTaxableEvents: [
      "Selling crypto held for more than 1 year",
      "Buying crypto with EUR",
      "Short-term gains under 600 EUR total",
      "Transferring between your own wallets",
    ],
  },
  {
    country: "Singapore",
    flag: "SG",
    authority: "Inland Revenue Authority of Singapore (IRAS)",
    authorityLogo: "",
    taxYear: "Jan 1 - Dec 31",
    capitalGainsRate: "0%",
    shortTermRate: "0-22% (if business)",
    holdingPeriod: "N/A",
    freeAllowance: "N/A",
    reportingDeadline: "April 15",
    summary: "Singapore does not impose capital gains tax. Long-term crypto investors pay no tax on their gains. However, if you are trading crypto as a business, your profits are subject to income tax.",
    keyRules: [
      "No capital gains tax in Singapore",
      "Investment gains from crypto are tax-free",
      "Business income from active trading is taxable (0-22%)",
      "Payment tokens (BTC, ETH) are not subject to GST",
      "Airdrops and hard forks are generally not taxable",
      "Mining and staking income may be taxable as business income",
      "Crypto salaries are taxable as employment income",
      "Record-keeping for at least 5 years required",
    ],
    taxableEvents: [
      "Profits from trading crypto as a business",
      "Receiving crypto as salary or payment",
      "Mining as a business operation",
      "ICO token sales (if classified as income)",
    ],
    nonTaxableEvents: [
      "Capital gains from long-term holding",
      "Buying crypto",
      "Crypto-to-crypto trades (for investors)",
      "Receiving airdrops and hard fork tokens",
      "Transferring between wallets",
    ],
  },
  {
    country: "Japan",
    flag: "JP",
    authority: "National Tax Agency (NTA)",
    authorityLogo: "",
    taxYear: "Jan 1 - Dec 31",
    capitalGainsRate: "15-55%",
    shortTermRate: "Same rate",
    holdingPeriod: "None",
    freeAllowance: "200,000 JPY",
    reportingDeadline: "March 15",
    summary: "Japan treats crypto gains as miscellaneous income, which can be taxed at rates up to 55% including local taxes. There is a 200,000 JPY annual exemption for salaried workers with side income.",
    keyRules: [
      "Crypto gains classified as miscellaneous income",
      "Progressive tax rates from 15% to 55% (including local tax)",
      "200,000 JPY annual exemption for salaried workers",
      "Total cost average method used for cost basis",
      "Crypto-to-crypto trades are taxable",
      "Mining and staking rewards taxed at market value when received",
      "Losses cannot offset other types of income",
      "Losses cannot be carried forward to future years",
    ],
    taxableEvents: [
      "Selling crypto for JPY",
      "Exchanging crypto for another crypto",
      "Purchasing goods or services with crypto",
      "Mining rewards",
      "Staking and lending rewards",
      "Receiving airdrops",
    ],
    nonTaxableEvents: [
      "Buying crypto with JPY",
      "Transferring between your own wallets",
      "Holding crypto without disposal",
    ],
  },
  {
    country: "France",
    flag: "FR",
    authority: "Direction Generale des Finances Publiques",
    authorityLogo: "",
    taxYear: "Jan 1 - Dec 31",
    capitalGainsRate: "30% (flat tax)",
    shortTermRate: "30%",
    holdingPeriod: "None",
    freeAllowance: "305 EUR",
    reportingDeadline: "May/June",
    summary: "France applies a flat tax of 30% on crypto capital gains (including social contributions). Occasional traders benefit from this flat rate. Professional traders may be subject to higher rates.",
    keyRules: [
      "Flat tax of 30% on crypto gains (PFU - Prelevement Forfaitaire Unique)",
      "Includes 12.8% income tax + 17.2% social contributions",
      "305 EUR annual exemption on total disposals",
      "Crypto-to-crypto trades are NOT taxable events",
      "Only converting to fiat or spending triggers tax",
      "Professional traders taxed under BIC (higher rates)",
      "Mining income taxed as non-commercial profits (BNC)",
      "Must declare all crypto accounts held on foreign platforms",
    ],
    taxableEvents: [
      "Selling crypto for EUR or other fiat",
      "Using crypto to purchase goods or services",
      "Mining cryptocurrency (BNC income)",
      "Receiving crypto as salary",
      "Professional trading profits",
    ],
    nonTaxableEvents: [
      "Trading crypto to crypto",
      "Buying crypto with EUR",
      "Transferring between wallets",
      "Disposals under 305 EUR annually",
    ],
  },
];

function CountryFlag({ code, size = "sm" }: { code: string; size?: "sm" | "lg" }) {
  const w = size === "lg" ? 40 : 32;
  const h = size === "lg" ? 30 : 24;

  const flags: Record<string, JSX.Element> = {
    US: (
      <svg viewBox="0 0 60 30" width={w} height={h}>
        <rect fill="#B22234" width="60" height="30"/>
        <rect fill="#fff" y="2.31" width="60" height="2.31"/>
        <rect fill="#fff" y="6.92" width="60" height="2.31"/>
        <rect fill="#fff" y="11.54" width="60" height="2.31"/>
        <rect fill="#fff" y="16.15" width="60" height="2.31"/>
        <rect fill="#fff" y="20.77" width="60" height="2.31"/>
        <rect fill="#fff" y="25.38" width="60" height="2.31"/>
        <rect fill="#3C3B6E" width="24" height="16.15"/>
        <g fill="#fff" fontSize="2.5" fontFamily="serif">
          <text x="2" y="3.5">*</text><text x="6" y="3.5">*</text><text x="10" y="3.5">*</text><text x="14" y="3.5">*</text><text x="18" y="3.5">*</text>
          <text x="4" y="6.5">*</text><text x="8" y="6.5">*</text><text x="12" y="6.5">*</text><text x="16" y="6.5">*</text>
          <text x="2" y="9.5">*</text><text x="6" y="9.5">*</text><text x="10" y="9.5">*</text><text x="14" y="9.5">*</text><text x="18" y="9.5">*</text>
          <text x="4" y="12.5">*</text><text x="8" y="12.5">*</text><text x="12" y="12.5">*</text><text x="16" y="12.5">*</text>
          <text x="2" y="15.5">*</text><text x="6" y="15.5">*</text><text x="10" y="15.5">*</text><text x="14" y="15.5">*</text><text x="18" y="15.5">*</text>
        </g>
      </svg>
    ),
    GB: (
      <svg viewBox="0 0 60 30" width={w} height={h}>
        <rect fill="#012169" width="60" height="30"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#gbclip)"/>
        <clipPath id="gbclip"><path d="M30,0 L60,0 L30,15 Z M30,30 L0,30 L30,15 Z M0,0 L0,15 L15,7.5 Z M60,30 L60,15 L45,22.5 Z"/></clipPath>
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
      </svg>
    ),
    AU: (
      <svg viewBox="0 0 60 30" width={w} height={h}>
        <rect fill="#012169" width="60" height="30"/>
        <g stroke="#fff" strokeWidth="2"><path d="M0,0 L24,15 M24,0 L0,15"/><path d="M12,0 V15 M0,7.5 H24" strokeWidth="4"/></g>
        <g stroke="#C8102E" strokeWidth="1.5"><path d="M12,0 V15 M0,7.5 H24" strokeWidth="2.5"/></g>
        <g fill="#fff">
          <polygon points="15,21 15.9,23.8 18.9,23.8 16.5,25.5 17.4,28.3 15,26.6 12.6,28.3 13.5,25.5 11.1,23.8 14.1,23.8" transform="scale(0.7) translate(12,4)"/>
          <polygon points="45,8 45.6,9.9 47.6,9.9 46,11 46.6,12.9 45,11.8 43.4,12.9 44,11 42.4,9.9 44.4,9.9" transform="scale(0.9)"/>
          <polygon points="50,16 50.5,17.5 52.1,17.5 50.8,18.4 51.3,19.9 50,19 48.7,19.9 49.2,18.4 47.9,17.5 49.5,17.5"/>
          <polygon points="45,23 45.5,24.5 47.1,24.5 45.8,25.4 46.3,26.9 45,26 43.7,26.9 44.2,25.4 42.9,24.5 44.5,24.5"/>
          <polygon points="38,19 38.5,20.5 40.1,20.5 38.8,21.4 39.3,22.9 38,22 36.7,22.9 37.2,21.4 35.9,20.5 37.5,20.5"/>
          <polygon points="42,13 42.3,13.9 43.2,13.9 42.5,14.5 42.7,15.4 42,14.8 41.3,15.4 41.5,14.5 40.8,13.9 41.7,13.9" transform="scale(0.8) translate(10,3)"/>
        </g>
      </svg>
    ),
    CA: (
      <svg viewBox="0 0 60 30" width={w} height={h}>
        <rect fill="#FF0000" width="15" height="30"/>
        <rect fill="#fff" x="15" width="30" height="30"/>
        <rect fill="#FF0000" x="45" width="15" height="30"/>
        <path fill="#FF0000" d="M30,7 L31,11 L35,11 L32,13.5 L33,17.5 L30,15 L27,17.5 L28,13.5 L25,11 L29,11 Z"/>
      </svg>
    ),
    DE: (
      <svg viewBox="0 0 60 30" width={w} height={h}>
        <rect fill="#000" width="60" height="10"/>
        <rect fill="#DD0000" y="10" width="60" height="10"/>
        <rect fill="#FFCC00" y="20" width="60" height="10"/>
      </svg>
    ),
    SG: (
      <svg viewBox="0 0 60 30" width={w} height={h}>
        <rect fill="#EF3340" width="60" height="15"/>
        <rect fill="#fff" y="15" width="60" height="15"/>
        <circle cx="12" cy="7.5" r="4.5" fill="#fff"/>
        <circle cx="13.5" cy="7.5" r="4" fill="#EF3340"/>
        <g fill="#fff">
          <polygon points="18,4 18.3,5 19.3,5 18.5,5.5 18.8,6.5 18,6 17.2,6.5 17.5,5.5 16.7,5 17.7,5"/>
          <polygon points="20,6 20.3,7 21.3,7 20.5,7.5 20.8,8.5 20,8 19.2,8.5 19.5,7.5 18.7,7 19.7,7"/>
          <polygon points="19,9 19.3,10 20.3,10 19.5,10.5 19.8,11.5 19,11 18.2,11.5 18.5,10.5 17.7,10 18.7,10"/>
          <polygon points="16,10 16.3,11 17.3,11 16.5,11.5 16.8,12.5 16,12 15.2,12.5 15.5,11.5 14.7,11 15.7,11"/>
          <polygon points="17.5,7 17.8,8 18.8,8 18,8.5 18.3,9.5 17.5,9 16.7,9.5 17,8.5 16.2,8 17.2,8"/>
        </g>
      </svg>
    ),
    JP: (
      <svg viewBox="0 0 60 30" width={w} height={h}>
        <rect fill="#fff" width="60" height="30"/>
        <circle cx="30" cy="15" r="9" fill="#BC002D"/>
      </svg>
    ),
    FR: (
      <svg viewBox="0 0 60 30" width={w} height={h}>
        <rect fill="#002395" width="20" height="30"/>
        <rect fill="#fff" x="20" width="20" height="30"/>
        <rect fill="#ED2939" x="40" width="20" height="30"/>
      </svg>
    ),
  };

  return (
    <div className="flex-shrink-0 rounded-sm overflow-hidden border border-border/50 shadow-sm" style={{ width: w, height: h }}>
      {flags[code] || (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <span className="text-[10px] font-bold text-muted-foreground">{code}</span>
        </div>
      )}
    </div>
  );
}

function GuideCard({ guide, onClick }: { guide: TaxGuide; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-card border border-border rounded-md overflow-hidden text-left hover:border-primary/30 transition-all duration-200 group"
      data-testid={`card-guide-${guide.flag.toLowerCase()}`}
    >
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent p-6 flex items-center gap-4">
        <CountryFlag code={guide.flag} />
        <div>
          <p className="text-xs font-semibold text-primary tracking-wide uppercase">Guides</p>
          <p className="text-lg font-bold text-foreground">{guide.country}</p>
          <p className="text-xs text-muted-foreground">Crypto Tax Guide</p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          {guide.authorityLogo ? (
            <div className="h-5 flex-shrink-0 bg-white dark:bg-white/90 rounded px-1.5 py-0.5 flex items-center">
              <img
                src={guide.authorityLogo}
                alt={guide.authority}
                className="h-3.5 w-auto object-contain"
              />
            </div>
          ) : (
            <Scale className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-xs text-muted-foreground truncate">{guide.authority}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {guide.summary}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Percent className="w-3 h-3" />
            <span>{guide.capitalGainsRate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{guide.reportingDeadline}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          Read guide
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </button>
  );
}

function GuideDetail({ guide, onBack }: { guide: TaxGuide; onBack: () => void }) {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-[900px] mx-auto" data-testid={`detail-guide-${guide.flag.toLowerCase()}`}>
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 flex items-center gap-1"
        data-testid="button-back-guides"
      >
        <ArrowRight className="w-3.5 h-3.5 rotate-180" />
        Back to all guides
      </button>

      <div className="flex items-center gap-4 mb-2">
        <CountryFlag code={guide.flag} size="lg" />
        <div>
          <h1 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight">
            {guide.country} Crypto Tax Guide
          </h1>
          <p className="text-sm text-muted-foreground">Updated for {new Date().getFullYear()}</p>
        </div>
      </div>

      {guide.authorityLogo && (
        <div className="flex items-center gap-3 mt-4 mb-8 p-4 bg-muted/50 rounded-xl">
          <div className="bg-white dark:bg-white/90 rounded-lg px-3 py-2 flex items-center flex-shrink-0">
            <img
              src={guide.authorityLogo}
              alt={guide.authority}
              className="h-6 w-auto object-contain"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Tax Authority</p>
            <p className="text-sm font-semibold text-foreground">{guide.authority}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Capital Gains Rate", value: guide.capitalGainsRate, icon: Percent },
          { label: "Short-term Rate", value: guide.shortTermRate, icon: DollarSign },
          { label: "Holding Period", value: guide.holdingPeriod, icon: Calendar },
          { label: "Free Allowance", value: guide.freeAllowance, icon: FileText },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
            <stat.icon className="w-4 h-4 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-sm font-bold text-foreground mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Overview
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed bg-card border border-border rounded-xl p-5">
          {guide.summary}
        </p>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Tax Year & Deadline</h2>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex flex-wrap gap-8">
          <div>
            <p className="text-xs text-muted-foreground">Tax Year</p>
            <p className="text-sm font-semibold text-foreground mt-1">{guide.taxYear}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Filing Deadline</p>
            <p className="text-sm font-semibold text-foreground mt-1">{guide.reportingDeadline}</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary" />
          Key Tax Rules
        </h2>
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          {guide.keyRules.map((rule, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-primary">{i + 1}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            Taxable Events
          </h3>
          <div className="bg-card border border-border rounded-xl p-5 space-y-2.5">
            {guide.taxableEvents.map((event, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0 mt-1.5" />
                <p className="text-sm text-muted-foreground">{event}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-500" />
            Non-Taxable Events
          </h3>
          <div className="bg-card border border-border rounded-xl p-5 space-y-2.5">
            {guide.nonTaxableEvents.map((event, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-1.5" />
                <p className="text-sm text-muted-foreground">{event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10" data-testid="section-how-to-taxes">
        <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-primary" />
          How to Go About Your Taxes
        </h2>
        <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Filing crypto taxes in {guide.country} doesn't have to be complicated. Here's a step-by-step guide to getting your taxes sorted with CoinGuard.
          </p>

          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Register with CoinGuard",
                description: "Create your account and securely connect your wallets and exchange accounts. We support all major exchanges and blockchains.",
              },
              {
                step: "2",
                title: "We import & calculate everything",
                description: `CoinGuard automatically imports all your transactions and calculates your gains, losses, and taxable events according to ${guide.country}'s specific tax rules.`,
              },
              {
                step: "3",
                title: "Get assigned a personal tax advisor",
                description: "Once registered, you'll be assigned a dedicated tax advisor who understands crypto taxation and will review your report for accuracy.",
              },
              {
                step: "4",
                title: "Review & file your return",
                description: `Your advisor prepares your tax report for ${guide.authority} and walks you through every detail. We handle the filing so you don't have to.`,
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">{item.step}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10" data-testid="section-advisor-cta">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/15 dark:via-primary/5 dark:to-transparent border border-primary/20 rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <Logo size="sm" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                CoinGuard takes care of everything
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Stop worrying about crypto taxes. When you register with CoinGuard, we handle your entire tax process from start to finish.
              </p>
              <div className="space-y-2.5">
                {[
                  { icon: UserCheck, text: "Personal tax advisor assigned to your account" },
                  { icon: MessageCircle, text: "24/7 WhatsApp support with your designated advisor" },
                  { icon: Shield, text: "Tax-saving opportunities identified automatically" },
                  { icon: CheckCircle2, text: `Full compliance with ${guide.authority} requirements` },
                ].map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-2.5">
                    <benefit.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button
                onClick={() => {
                  goTo("/apply");
                }}
                className="bg-primary text-primary-foreground font-semibold rounded-full px-8 w-full md:w-auto"
                data-testid="button-advisor-cta"
              >
                Get your advisor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10">
        <p className="text-xs text-muted-foreground leading-relaxed">
          This guide is for informational purposes only and does not constitute tax advice.
          Tax laws change frequently. Always consult with a qualified tax professional
          in {guide.country} for your specific situation. Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}.
        </p>
      </div>
    </div>
  );
}

export default function TaxGuides() {
  const [, setLocation] = useLocation();
  const [selectedGuide, setSelectedGuide] = useState<TaxGuide | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  const filteredGuides = taxGuides.filter(
    (g) =>
      g.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.authority.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-24 pb-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          {selectedGuide ? (
            <GuideDetail
              guide={selectedGuide}
              onBack={() => setSelectedGuide(null)}
            />
          ) : (
            <>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold tracking-wide text-foreground">
                    Country Tax Guides
                  </span>
                </div>
                <h1 className="text-[32px] md:text-[44px] font-bold text-foreground tracking-tight mb-4">
                  Crypto Tax Guides by Country
                </h1>
                <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Understand the crypto tax rules and regulations in your country.
                  Each guide covers capital gains rates, taxable events, filing deadlines, and more.
                </p>
              </div>

              <div className="max-w-md mx-auto mb-10">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    data-testid="input-search-guides"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {filteredGuides.map((guide) => (
                  <GuideCard
                    key={guide.flag}
                    guide={guide}
                    onClick={() => {
                      setSelectedGuide(guide);
                      window.scrollTo(0, 0);
                    }}
                  />
                ))}
                {filteredGuides.length === 0 && (
                  <div className="col-span-full text-center py-16">
                    <Globe className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground mb-2">No guides found</p>
                    <p className="text-sm text-muted-foreground">Try a different search term</p>
                  </div>
                )}
              </div>

              <div className="text-center py-12 border-t border-border">
                <h2 className="text-xl font-bold text-foreground mb-3">
                  Need help with your crypto taxes?
                </h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                  Get started with CoinGuard and generate your tax report in minutes.
                  We support all major countries and exchanges.
                </p>
                <Button
                  onClick={() => goTo("/apply")}
                  className="bg-primary text-primary-foreground font-semibold rounded-full px-8 h-11"
                  data-testid="button-guides-cta"
                >
                  Get started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
