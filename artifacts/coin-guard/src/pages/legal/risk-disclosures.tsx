import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const sections = [
  {
    title: "1. General Risk Warning",
    content: [
      "Cryptocurrency and digital assets involve significant risks. Before using CoinGuard's tax reporting or insurance services, you should carefully consider the risks described in this document. This is not an exhaustive list of all risks associated with digital assets, and you should conduct your own research and seek professional advice where appropriate.",
      "CoinGuard does not provide financial, investment, tax, or legal advice. The information provided through our platform is for informational and computational purposes only and should not be construed as a recommendation to buy, sell, or hold any cryptocurrency or digital asset.",
    ],
  },
  {
    title: "2. Cryptocurrency Volatility",
    content: [
      "Cryptocurrency markets are highly volatile and can experience dramatic price fluctuations within short periods. The value of your digital assets can decrease significantly, and you may lose some or all of your investment. Historical performance is not indicative of future results.",
    ],
    list: [
      "Digital asset prices can be affected by regulatory changes, market sentiment, technological developments, and macroeconomic factors",
      "Liquidity may vary significantly across different cryptocurrencies and exchanges",
      "Market manipulation, including wash trading and spoofing, can affect asset prices",
      "Stablecoins may lose their peg to their reference asset, resulting in loss of value",
      "DeFi protocols carry additional smart contract risks, including potential exploits and protocol failures",
    ],
  },
  {
    title: "3. Tax Calculation Limitations",
    content: [
      "CoinGuard's tax reporting tools are designed to assist with cryptocurrency tax calculations, but they have inherent limitations that users should understand:",
    ],
    list: [
      "Tax calculations depend entirely on the accuracy and completeness of the data you import. Missing or incorrect transaction data will produce inaccurate results.",
      "CoinGuard supports multiple cost basis methods (FIFO, LIFO, HIFO, specific identification), but the appropriate method depends on your jurisdiction and personal circumstances.",
      "DeFi transactions, airdrops, hard forks, and other complex events may require manual review and classification.",
      "Tax laws and regulations vary by jurisdiction and are subject to change. CoinGuard strives to stay current but cannot guarantee that all regulatory updates are immediately reflected in our calculations.",
      "Our platform does not account for all possible tax scenarios, including certain state or local tax obligations, foreign tax credits, or interaction effects with other income sources.",
      "Generated tax documents should be reviewed by a qualified tax professional before filing.",
    ],
    afterList:
      "CoinGuard is not a registered tax preparer, CPA firm, or law firm. Our tools are designed to help organize and calculate your cryptocurrency transactions, but they are not a substitute for professional tax advice tailored to your specific situation.",
  },
  {
    title: "4. Insurance Limitations",
    content: [
      "CoinGuard facilitates applications for digital asset insurance coverage through third-party underwriting partners. Users should understand the following limitations:",
    ],
    list: [
      "CoinGuard is not an insurance company or licensed insurance broker in all jurisdictions. We facilitate the application process and connect users with underwriting partners.",
      "Coverage is not guaranteed. All applications are subject to underwriting review, and coverage may be denied based on risk assessment.",
      "Insurance coverage has specific terms, conditions, exclusions, and limits. Not all types of loss are covered.",
      "Coverage limits may not reflect the full value of your digital asset holdings.",
      "Claims are subject to investigation and verification. The claims process may take time, and payment is not guaranteed.",
      "Insurance products and availability may vary by jurisdiction and are subject to regulatory requirements.",
      "Premium rates are determined by underwriting partners and may change based on market conditions and risk factors.",
    ],
  },
  {
    title: "5. Regulatory and Legal Risks",
    content: [
      "The regulatory landscape for cryptocurrencies and digital assets is evolving rapidly across jurisdictions worldwide. Users should be aware of the following:",
    ],
    list: [
      "Regulatory changes may affect the legality, taxation, or reporting requirements for cryptocurrency transactions in your jurisdiction",
      "Certain jurisdictions may restrict or prohibit the use of specific cryptocurrencies, exchanges, or DeFi protocols",
      "Anti-money laundering (AML) and know-your-customer (KYC) requirements may apply to your cryptocurrency activities",
      "Tax enforcement related to cryptocurrency is increasing, with authorities gaining access to more data from exchanges and blockchain analytics",
      "Compliance with regulations is your responsibility. CoinGuard's tools can assist with reporting but do not ensure compliance.",
    ],
  },
  {
    title: "6. Technology and Security Risks",
    content: [
      "While CoinGuard employs robust security measures, users should be aware of technology-related risks:",
    ],
    list: [
      "No system is completely immune to security breaches, hacking, or unauthorized access",
      "Blockchain transactions are irreversible. Errors in wallet addresses or transaction amounts cannot be corrected once confirmed.",
      "Smart contracts may contain bugs or vulnerabilities that could result in loss of funds",
      "Exchange outages, API failures, or data feed interruptions may affect the accuracy or availability of our Services",
      "Hardware failures, software bugs, or internet connectivity issues may temporarily prevent access to the platform",
    ],
  },
  {
    title: "7. Third-Party Risks",
    content: [
      "CoinGuard integrates with various third-party services, including cryptocurrency exchanges, wallet providers, and DeFi protocols. Users should understand:",
    ],
    list: [
      "CoinGuard is not responsible for the actions, policies, or failures of third-party services",
      "Exchange bankruptcies, insolvencies, or fraud may result in loss of assets that cannot be recovered through CoinGuard",
      "Third-party API changes or discontinuations may affect data import functionality",
      "Data accuracy depends on the reliability of third-party data sources",
    ],
  },
  {
    title: "8. Not Financial Advice",
    content: [
      "Nothing on the CoinGuard platform, including tax calculations, portfolio analytics, or insurance recommendations, should be considered financial, investment, tax, or legal advice. All information is provided for informational purposes only.",
      "You should consult with qualified professionals, including tax advisors, financial planners, and legal counsel, before making decisions about your cryptocurrency investments, tax obligations, or insurance needs.",
      "CoinGuard employees, contractors, and representatives are not authorized to provide personalized financial, tax, or legal advice. Any general information shared through our support channels or educational content does not constitute professional advice.",
    ],
  },
  {
    title: "9. Acknowledgment of Risk",
    content: [
      "By using CoinGuard's Services, you acknowledge that you have read and understood the risks described in this document. You accept that cryptocurrency investing, tax reporting, and insurance involve inherent uncertainties and that CoinGuard cannot eliminate these risks.",
      "You agree that you are solely responsible for your investment decisions, tax compliance, and risk management. CoinGuard provides tools and information to assist you, but the ultimate responsibility for your financial and legal obligations rests with you.",
    ],
  },
];

export default function RiskDisclosures() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-risk-disclosures">
      <Navigation />
      <main className="pt-28 pb-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-sm font-medium text-primary mb-2" data-testid="text-risk-label">
              Legal
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              data-testid="text-risk-title"
            >
              Risk Disclosures
            </h1>
            <p className="text-muted-foreground" data-testid="text-risk-updated">
              Last updated: February 2026
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {section.title}
                </h2>
                {section.content.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-muted-foreground leading-relaxed mb-3"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2 mb-3">
                    {section.list.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-muted-foreground leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.afterList && (
                  <p className="text-muted-foreground leading-relaxed">
                    {section.afterList}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
