import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using the CoinGuard platform, website, mobile applications, or any related services (collectively, the \"Services\"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service (\"Terms\"). If you do not agree to these Terms, you must not access or use our Services.",
      "CoinGuard reserves the right to modify these Terms at any time. We will notify users of material changes via email or through the platform. Your continued use of the Services after such modifications constitutes acceptance of the updated Terms.",
    ],
  },
  {
    title: "2. Description of Services",
    content: [
      "CoinGuard provides a suite of digital tools and services designed for cryptocurrency investors, including:",
    ],
    list: [
      "Automated cryptocurrency tax reporting and calculation tools",
      "Digital asset insurance application facilitation",
      "Portfolio tracking and transaction monitoring",
      "Tax document generation and filing assistance",
      "Integration with cryptocurrency exchanges, wallets, and DeFi protocols",
    ],
    afterList:
      "CoinGuard is a software platform. We do not provide tax advice, legal counsel, or investment recommendations. Our tools are designed to assist with calculations and reporting, but you remain responsible for the accuracy and completeness of your tax filings.",
  },
  {
    title: "3. Account Registration and Security",
    content: [
      "To access certain features of the Services, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      "You must immediately notify CoinGuard of any unauthorized use of your account or any other breach of security. CoinGuard will not be liable for any loss arising from unauthorized use of your account.",
    ],
  },
  {
    title: "4. Eligibility",
    content: [
      "You must be at least 18 years of age to use the Services. By using the Services, you represent and warrant that you meet all eligibility requirements. If you are using the Services on behalf of an organization, you represent and warrant that you have authority to bind that organization to these Terms.",
    ],
  },
  {
    title: "5. Payment Terms",
    content: [
      "Certain features of the Services require payment of fees. All fees are stated in U.S. dollars unless otherwise specified. You agree to pay all applicable fees in accordance with the pricing and payment terms presented to you at the time of purchase.",
    ],
    list: [
      "Subscription fees are billed in advance on a monthly or annual basis, depending on the plan selected.",
      "All payments are non-refundable except as expressly stated in our refund policy or as required by applicable law.",
      "CoinGuard reserves the right to change pricing with 30 days advance notice to existing subscribers.",
      "Failure to pay applicable fees may result in suspension or termination of your access to paid features.",
      "Insurance premiums are separate from platform subscription fees and are subject to their own payment terms.",
    ],
  },
  {
    title: "6. Acceptable Use",
    content: ["When using the Services, you agree not to:"],
    list: [
      "Violate any applicable local, state, national, or international law or regulation",
      "Use the Services for any fraudulent, misleading, or deceptive purpose",
      "Attempt to gain unauthorized access to any portion of the Services or any systems or networks connected to the Services",
      "Interfere with or disrupt the integrity or performance of the Services",
      "Use automated systems, bots, or scripts to access the Services without prior written consent",
      "Reverse engineer, decompile, or disassemble any aspect of the Services",
      "Upload or transmit any malicious code, viruses, or harmful content",
    ],
  },
  {
    title: "7. Intellectual Property",
    content: [
      "All content, features, and functionality of the Services, including but not limited to text, graphics, logos, icons, software, and the compilation thereof, are the exclusive property of CoinGuard or its licensors and are protected by copyright, trademark, and other intellectual property laws.",
      "You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any content from the Services without prior written permission from CoinGuard.",
    ],
  },
  {
    title: "8. Data and Privacy",
    content: [
      "Your use of the Services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Services, you consent to the collection, use, and sharing of your information as described in our Privacy Policy.",
      "You retain ownership of all data you submit to the Services. By submitting data, you grant CoinGuard a limited license to use, process, and store that data solely for the purpose of providing the Services to you.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    content: [
      "To the maximum extent permitted by applicable law, CoinGuard and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection with your use of the Services.",
      "CoinGuard's total aggregate liability for all claims arising out of or relating to these Terms or the Services shall not exceed the amount you have paid to CoinGuard in the twelve (12) months preceding the claim.",
      "Tax calculations provided by CoinGuard are based on the data you import and the calculation methodologies selected. CoinGuard does not guarantee the accuracy of tax calculations and shall not be liable for any tax penalties, interest, or other consequences resulting from reliance on the Services.",
    ],
  },
  {
    title: "10. Disclaimers",
    content: [
      "The Services are provided on an \"as is\" and \"as available\" basis without warranties of any kind, whether express or implied. CoinGuard disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      "CoinGuard does not warrant that the Services will be uninterrupted, error-free, or secure, or that any defects will be corrected. You use the Services at your own risk.",
    ],
  },
  {
    title: "11. Termination",
    content: [
      "You may terminate your account at any time by contacting our support team or through your account settings. Upon termination, your right to use the Services will immediately cease.",
      "CoinGuard may suspend or terminate your access to the Services at any time, with or without cause, and with or without notice. Grounds for termination include, but are not limited to, violation of these Terms, fraudulent activity, or extended periods of inactivity.",
      "Upon termination, CoinGuard will retain your data for a period of 90 days, during which you may request an export of your data. After this period, your data may be permanently deleted.",
    ],
  },
  {
    title: "12. Dispute Resolution",
    content: [
      "Any disputes arising out of or relating to these Terms or the Services shall first be attempted to be resolved through good-faith negotiation between the parties. If the dispute cannot be resolved through negotiation within 30 days, it shall be submitted to binding arbitration in accordance with the rules of the American Arbitration Association.",
      "You agree that any dispute resolution proceedings will be conducted on an individual basis and not in a class, consolidated, or representative action.",
    ],
  },
  {
    title: "13. Governing Law",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms shall be brought exclusively in the federal or state courts located in Delaware.",
    ],
  },
  {
    title: "14. Severability",
    content: [
      "If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it valid and enforceable.",
    ],
  },
  {
    title: "15. Contact Information",
    content: [
      "If you have any questions about these Terms of Service, please contact us through our Contact page or reach out to our support team directly.",
    ],
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-terms">
      <Navigation />
      <main className="pt-28 pb-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-sm font-medium text-primary mb-2" data-testid="text-terms-label">
              Legal
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              data-testid="text-terms-title"
            >
              Terms of Service
            </h1>
            <p className="text-muted-foreground" data-testid="text-terms-updated">
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
