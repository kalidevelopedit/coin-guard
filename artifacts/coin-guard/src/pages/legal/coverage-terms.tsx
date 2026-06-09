import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const sections = [
  {
    title: "1. Overview of Coverage",
    content: [
      "CoinGuard facilitates digital asset insurance coverage through partnerships with licensed underwriting providers. This document outlines the general terms and conditions applicable to coverage obtained through the CoinGuard platform. Specific policy terms may vary based on your plan, jurisdiction, and the underwriting partner assigned to your application.",
      "Coverage is designed to protect qualifying digital assets against certain covered events, as described below. All coverage is subject to underwriting approval, applicable exclusions, and the limits specified in your individual policy.",
    ],
  },
  {
    title: "2. What Is Covered",
    content: [
      "Subject to the terms, conditions, and exclusions of your specific policy, the following events are generally covered under CoinGuard-facilitated insurance plans:",
    ],
    list: [
      "Theft of digital assets resulting from unauthorized access to your exchange accounts or connected wallets, including phishing attacks and credential compromise",
      "Loss of digital assets due to security breaches at supported cryptocurrency exchanges",
      "Loss resulting from fraudulent transactions conducted by unauthorized third parties",
      "Loss of access to digital assets due to the insolvency or bankruptcy of a supported custodial exchange (subject to specific plan tier)",
      "Certain smart contract failures resulting in verifiable loss of funds in approved DeFi protocols (available on Enterprise plans only)",
    ],
    afterList:
      "The scope of coverage depends on your selected plan tier. Basic plans cover exchange-held asset theft and unauthorized access. Professional and Enterprise plans extend coverage to additional scenarios as specified in your policy documents.",
  },
  {
    title: "3. Coverage Limits",
    content: [
      "All coverage is subject to the following limit structures:",
    ],
    list: [
      "Per-incident limit: The maximum amount payable for any single covered event, as specified in your policy",
      "Annual aggregate limit: The maximum total amount payable across all claims within a policy year",
      "Per-asset sublimit: Certain high-volatility or low-liquidity assets may have individual sublimits",
      "Deductible: A deductible amount applies to each claim. The deductible varies by plan tier and is specified in your policy schedule",
    ],
    afterList:
      "Coverage limits are determined based on the value of your reported digital asset holdings at the time of policy issuance or renewal. You are responsible for accurately reporting your holdings. Underreporting may result in reduced claim payments. Coverage limits are denominated in U.S. dollars.",
  },
  {
    title: "4. Exclusions",
    content: [
      "The following events and circumstances are generally excluded from coverage. Your specific policy may contain additional exclusions:",
    ],
    list: [
      "Losses resulting from market volatility, price depreciation, or trading losses",
      "Losses caused by your own negligence, including sharing private keys, seed phrases, or account credentials",
      "Losses from investments in fraudulent projects, rug pulls, or Ponzi schemes that you voluntarily participated in",
      "Losses related to assets held on unsupported or unregulated exchanges or platforms",
      "Losses resulting from government seizure, confiscation, or sanctions enforcement",
      "Losses caused by protocol upgrades, hard forks, or network changes that do not constitute theft or unauthorized access",
      "Losses from assets that were not declared or reported to CoinGuard at the time of policy issuance",
      "Losses occurring before the policy effective date or after the policy expiration date",
      "Losses arising from illegal activities or assets obtained through unlawful means",
      "Indirect or consequential losses, including lost profits, opportunity costs, or emotional distress",
    ],
  },
  {
    title: "5. Claims Process",
    content: [
      "In the event of a covered loss, you must follow these steps to file a claim:",
    ],
    subsections: [
      {
        subtitle: "Step 1: Immediate notification",
        content:
          "Report the incident to CoinGuard within 72 hours of discovering the loss. Delayed reporting may affect your claim eligibility. You can initiate a claim through your CoinGuard dashboard or by contacting our support team.",
      },
      {
        subtitle: "Step 2: Documentation",
        content:
          "Provide all requested documentation to support your claim, including transaction records, screenshots, police reports (if applicable), exchange correspondence, and any other evidence of the loss event.",
      },
      {
        subtitle: "Step 3: Investigation",
        content:
          "Our claims team, in coordination with the underwriting partner, will investigate the claim. This may include blockchain forensics analysis, exchange verification, and third-party assessment. The investigation period typically takes 30 to 60 business days.",
      },
      {
        subtitle: "Step 4: Resolution",
        content:
          "Upon completion of the investigation, you will receive a determination. Approved claims are paid in U.S. dollars or stablecoin equivalent within 15 business days of approval. Denied claims include a detailed explanation of the basis for denial.",
      },
    ],
    afterList:
      "You have the right to appeal a denied claim within 30 days of receiving the denial notice. Appeals are reviewed by a senior claims panel.",
  },
  {
    title: "6. Policyholder Obligations",
    content: [
      "To maintain your coverage and ensure claim eligibility, you must adhere to the following obligations:",
    ],
    list: [
      "Maintain accurate and up-to-date records of your digital asset holdings within the CoinGuard platform",
      "Promptly report any changes to your portfolio that materially affect the value of covered assets",
      "Implement reasonable security measures, including multi-factor authentication on all exchange accounts and wallets",
      "Cooperate fully with any claims investigation, including providing requested documentation and access to relevant records",
      "Notify CoinGuard of any security incidents or suspicious activity promptly, even if no loss has yet occurred",
      "Pay all premiums on time. Coverage may lapse if premiums are not paid within the 15-day grace period",
    ],
  },
  {
    title: "7. Premium Payments",
    content: [
      "Insurance premiums are calculated based on the total value of your covered digital assets, your selected plan tier, and your risk profile. Premiums are billed separately from CoinGuard platform subscription fees.",
    ],
    list: [
      "Premiums may be paid monthly or annually, with annual payments receiving a discount as specified at the time of purchase",
      "Premium rates are subject to adjustment at renewal based on changes in your portfolio value, claims history, and market conditions",
      "Failure to pay premiums within the grace period will result in coverage lapse. Reinstatement may require a new underwriting review.",
      "Premium refunds for cancellation are prorated based on the remaining coverage period, less any administrative fees",
    ],
  },
  {
    title: "8. Cancellation and Non-Renewal",
    content: [
      "Either party may cancel the policy under the following conditions:",
    ],
    list: [
      "You may cancel your coverage at any time by providing written notice through your CoinGuard account settings. Cancellation takes effect at the end of the current billing period.",
      "CoinGuard or the underwriting partner may cancel coverage with 30 days written notice for non-payment of premiums.",
      "CoinGuard or the underwriting partner may cancel coverage immediately in cases of fraud, material misrepresentation, or violation of policy terms.",
      "At renewal, the underwriting partner reserves the right to modify terms, adjust premiums, or decline to renew coverage based on updated risk assessment.",
    ],
    afterList:
      "Upon cancellation, coverage ceases for any events occurring after the effective cancellation date. Claims for events that occurred during the active coverage period may still be submitted within 90 days of cancellation.",
  },
  {
    title: "9. Subrogation",
    content: [
      "Upon payment of a claim, the underwriting partner is subrogated to your rights of recovery against any third party responsible for the loss. You agree to cooperate with any recovery efforts and to not take any action that would prejudice the underwriter's subrogation rights.",
      "Any amounts recovered through subrogation will first be applied to reimburse the underwriter for the claim payment, then to reimburse your deductible, and any remaining amounts will be returned to you.",
    ],
  },
  {
    title: "10. Dispute Resolution",
    content: [
      "Disputes related to coverage, claims, or policy terms should first be directed to CoinGuard's support team for resolution. If a satisfactory resolution cannot be reached, disputes may be escalated to the underwriting partner's formal dispute resolution process.",
      "For disputes that cannot be resolved through these channels, binding arbitration in accordance with the American Arbitration Association rules will apply, unless prohibited by the laws of your jurisdiction.",
    ],
  },
  {
    title: "11. Contact for Claims and Coverage Questions",
    content: [
      "For questions about your coverage, to report a claim, or to request policy documents, please contact us through the CoinGuard platform or visit our Contact page. Our insurance support team is available to assist with all coverage-related inquiries.",
    ],
  },
];

export default function CoverageTerms() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-coverage-terms">
      <Navigation />
      <main className="pt-28 pb-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-sm font-medium text-primary mb-2" data-testid="text-coverage-label">
              Legal
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              data-testid="text-coverage-title"
            >
              Coverage Terms
            </h1>
            <p className="text-muted-foreground" data-testid="text-coverage-updated">
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
                {section.subsections &&
                  section.subsections.map((sub) => (
                    <div key={sub.subtitle} className="mb-4">
                      <h3 className="text-base font-medium text-foreground mb-2">
                        {sub.subtitle}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {sub.content}
                      </p>
                    </div>
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
