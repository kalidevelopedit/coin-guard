import { useLocation } from "wouter";
import { Logo } from "@/components/logo";

const footerLinks = {
  Product: [
    { label: "Crypto Recovery", href: "/services#recovery" },
    { label: "Tax Reporting", href: "/services#tax-reporting" },
    { label: "Insurance", href: "/services#insurance" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Security", href: "/security" },
  ],
  Resources: [
    { label: "Tax Guides", href: "/tax-guides" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Risk Disclosures", href: "/legal/risk-disclosures" },
    { label: "Coverage Terms", href: "/legal/coverage-terms" },
  ],
  Support: [
    { label: "Help Center", href: "/contact" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export function Footer() {
  const [, setLocation] = useLocation();

  const handleClick = (href: string) => {
    if (href.startsWith("#")) return;
    setLocation(href);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo size="lg" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crypto recovery, tax reporting, and digital asset protection built for serious investors.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[13px] font-semibold text-foreground mb-4 tracking-wide">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleClick(link.href)}
                      className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8">
          <p
            className="text-xs text-muted-foreground leading-relaxed max-w-3xl"
            data-testid="text-disclaimer"
          >
            CoinGuard provides cryptocurrency recovery services, software tools for crypto tax
            reporting, and facilitates applications for digital asset protection coverage. Recovery
            outcomes depend on case specifics and blockchain analysis. Tax calculations depend on
            imported data quality and are not a substitute for professional tax advice. Coverage
            eligibility and terms are subject to underwriting review. CoinGuard does not provide
            tax, legal, or investment advice.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-4" data-testid="text-copyright">
            &copy; {new Date().getFullYear()} CoinGuard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
