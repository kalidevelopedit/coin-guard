import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "CoinGuard collects information to provide, maintain, and improve our Services. The types of information we collect include:",
    ],
    subsections: [
      {
        subtitle: "Personal Information",
        list: [
          "Name, email address, and contact details provided during account registration",
          "Billing information, including payment card details processed through our secure payment provider",
          "Government-issued identification when required for insurance applications or compliance verification",
          "Tax identification numbers necessary for tax reporting services",
        ],
      },
      {
        subtitle: "Financial and Transaction Data",
        list: [
          "Cryptocurrency wallet addresses and transaction histories imported via exchange API connections",
          "Portfolio balances and asset holdings",
          "DeFi protocol interactions, staking rewards, and yield farming data",
          "Historical trading data imported from CSV uploads or direct exchange integrations",
        ],
      },
      {
        subtitle: "Technical and Usage Data",
        list: [
          "IP address, browser type, device information, and operating system",
          "Pages visited, features used, and time spent on the platform",
          "Error logs and performance data to help us improve the Services",
          "Cookies and similar tracking technologies as described in our Cookie section below",
        ],
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: ["We use the information we collect for the following purposes:"],
    list: [
      "Providing and maintaining our tax reporting, portfolio tracking, and insurance facilitation services",
      "Processing transactions and generating tax documents",
      "Communicating with you about your account, service updates, and support requests",
      "Improving and personalizing the Services based on usage patterns",
      "Detecting, preventing, and addressing fraud, security issues, and technical problems",
      "Complying with legal obligations, including tax reporting requirements and anti-money laundering regulations",
      "Sending promotional communications (only with your explicit consent, and you may opt out at any time)",
    ],
  },
  {
    title: "3. Data Storage and Security",
    content: [
      "CoinGuard employs industry-standard security measures to protect your data. All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Our infrastructure is hosted on SOC 2 Type II certified cloud providers with data centers in the United States and European Union.",
      "We implement strict access controls, regular security audits, and penetration testing to safeguard your information. While we strive to protect your personal data, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but are committed to promptly addressing any security incidents.",
    ],
    list: [
      "Multi-factor authentication is available and recommended for all accounts",
      "API keys connecting to exchanges use read-only permissions and are encrypted at rest",
      "Employee access to user data is limited to those who require it for their job function and is logged for audit purposes",
      "Data backups are encrypted and stored in geographically separate locations",
    ],
  },
  {
    title: "4. Third-Party Sharing",
    content: [
      "CoinGuard does not sell your personal information to third parties. We may share your information in the following limited circumstances:",
    ],
    list: [
      "With insurance underwriting partners when you apply for digital asset coverage (only the information necessary to process your application)",
      "With payment processors to facilitate billing and subscription management",
      "With analytics providers to help us understand and improve our Services (data is aggregated and anonymized where possible)",
      "With legal authorities when required by law, regulation, or valid legal process",
      "In connection with a merger, acquisition, or sale of assets, in which case users will be notified before their data is transferred",
    ],
    afterList:
      "All third-party service providers are bound by data processing agreements that require them to protect your data in accordance with our standards and applicable law.",
  },
  {
    title: "5. Cookies and Tracking Technologies",
    content: [
      "CoinGuard uses cookies and similar technologies to enhance your experience on our platform. We use the following types of cookies:",
    ],
    list: [
      "Essential cookies: Required for the platform to function properly, including session management and security features",
      "Functional cookies: Remember your preferences such as language, theme settings, and display options",
      "Analytics cookies: Help us understand how users interact with our platform so we can improve the experience",
    ],
    afterList:
      "You can manage your cookie preferences through your browser settings. Disabling essential cookies may affect the functionality of the Services.",
  },
  {
    title: "6. Your Rights and Choices",
    content: [
      "Depending on your jurisdiction, you may have the following rights regarding your personal data:",
    ],
    list: [
      "Right to access: Request a copy of the personal data we hold about you",
      "Right to rectification: Request correction of inaccurate or incomplete data",
      "Right to erasure: Request deletion of your personal data, subject to legal retention requirements",
      "Right to data portability: Receive your data in a structured, machine-readable format",
      "Right to restrict processing: Request that we limit how we use your data",
      "Right to object: Object to processing of your data for certain purposes, including direct marketing",
      "Right to withdraw consent: Withdraw previously given consent at any time",
    ],
    afterList:
      "To exercise any of these rights, please contact us through our Contact page. We will respond to your request within 30 days.",
  },
  {
    title: "7. Data Retention",
    content: [
      "We retain your personal data for as long as your account is active or as needed to provide you the Services. If you close your account, we will retain your data for a period of 90 days to allow for account recovery. After this period, your data will be permanently deleted from our active systems.",
      "Certain data may be retained for longer periods where required by law, such as tax records which must be maintained for a minimum of seven years in accordance with IRS requirements, or where necessary to resolve disputes or enforce our agreements.",
    ],
  },
  {
    title: "8. International Data Transfers",
    content: [
      "If you access the Services from outside the United States, your data may be transferred to and processed in the United States or other countries where our service providers operate. We ensure that appropriate safeguards are in place for international data transfers, including Standard Contractual Clauses approved by the European Commission where applicable.",
    ],
  },
  {
    title: "9. Children's Privacy",
    content: [
      "The Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a child under 18, we will take steps to delete such information promptly.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of material changes by posting a notice on our platform or sending you an email. The \"Last updated\" date at the top of this page indicates when the policy was last revised.",
    ],
  },
  {
    title: "11. Contact Us",
    content: [
      "If you have questions or concerns about this Privacy Policy or our data practices, please contact us through our Contact page. For data protection inquiries specific to GDPR, you may also contact our Data Protection Officer at the same address.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-privacy">
      <Navigation />
      <main className="pt-28 pb-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-sm font-medium text-primary mb-2" data-testid="text-privacy-label">
              Legal
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              data-testid="text-privacy-title"
            >
              Privacy Policy
            </h1>
            <p className="text-muted-foreground" data-testid="text-privacy-updated">
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
                      <ul className="list-disc pl-6 space-y-2">
                        {sub.list.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-muted-foreground leading-relaxed"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
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
