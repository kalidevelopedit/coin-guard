import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Lock,
  Eye,
  Server,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  FileCheck,
  AlertTriangle,
  Check,
  Zap,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const securityFeatures = [
  {
    icon: Lock,
    title: "AES-256 Encryption",
    description: "All data is encrypted at rest and in transit using military-grade AES-256 encryption. Your financial data is never stored in plaintext.",
  },
  {
    icon: KeyRound,
    title: "Zero-knowledge architecture",
    description: "We never store your private keys, seed phrases, or exchange API secrets in our databases. Read-only API access only.",
  },
  {
    icon: ShieldCheck,
    title: "SOC 2 Type II compliant",
    description: "Our infrastructure and processes are independently audited to meet SOC 2 Type II standards for security, availability, and confidentiality.",
  },
  {
    icon: Server,
    title: "Secure infrastructure",
    description: "Hosted on enterprise-grade cloud infrastructure with multi-region redundancy, automated backups, and DDoS protection.",
  },
  {
    icon: Eye,
    title: "Privacy by design",
    description: "We collect only the data necessary to provide our services. Your personal information is never sold or shared with third parties.",
  },
  {
    icon: FileCheck,
    title: "Regular security audits",
    description: "Independent third-party penetration testing and security audits are conducted quarterly to identify and address vulnerabilities.",
  },
];

const practices = [
  {
    title: "Authentication",
    items: [
      "Multi-factor authentication (MFA)",
      "Session management with secure tokens",
      "Brute force protection",
      "Password hashing with bcrypt",
    ],
  },
  {
    title: "Data protection",
    items: [
      "TLS 1.3 for all connections",
      "AES-256 encryption at rest",
      "Encrypted database backups",
      "Data retention policies",
    ],
  },
  {
    title: "Infrastructure",
    items: [
      "Multi-region cloud hosting",
      "Automated failover systems",
      "99.9% uptime SLA",
      "24/7 infrastructure monitoring",
    ],
  },
  {
    title: "Compliance",
    items: [
      "SOC 2 Type II certified",
      "GDPR compliant",
      "CCPA compliant",
      "Regular third-party audits",
    ],
  },
];

export default function Security() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-security">
      <Navigation />
      <div className="pt-16">
        <section className="py-24 px-6 text-center" data-testid="section-security-hero">
          <div className="max-w-[800px] mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-foreground">
                Security
              </span>
            </div>
            <h1 className="text-[36px] md:text-[48px] font-bold text-foreground tracking-tight mb-6 leading-tight">
              Your security is our priority
            </h1>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We employ industry-leading security practices to ensure your data and
              financial information are always protected.
            </p>
          </div>
        </section>

        <section className="pb-24 px-6" data-testid="section-security-stats">
          <div className="max-w-[900px] mx-auto grid grid-cols-3 gap-6">
            <Card className="p-6 text-center" data-testid="card-security-stat-0">
              <Lock className="w-6 h-6 text-primary mx-auto mb-3" />
              <span className="text-[28px] font-bold text-foreground">256-bit</span>
              <p className="text-sm text-muted-foreground mt-1">AES Encryption</p>
            </Card>
            <Card className="p-6 text-center" data-testid="card-security-stat-1">
              <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-3" />
              <span className="text-[28px] font-bold text-foreground">0</span>
              <p className="text-sm text-muted-foreground mt-1">Security incidents</p>
            </Card>
            <Card className="p-6 text-center" data-testid="card-security-stat-2">
              <FileCheck className="w-6 h-6 text-primary mx-auto mb-3" />
              <span className="text-[28px] font-bold text-foreground">SOC 2</span>
              <p className="text-sm text-muted-foreground mt-1">Type II Certified</p>
            </Card>
          </div>
        </section>

        <section className="py-24 px-6 bg-muted/30" data-testid="section-security-features">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4">
                How we protect your data
              </h2>
              <p className="text-[16px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Multiple layers of security ensure your information stays safe.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {securityFeatures.map((feature, i) => (
                <Card key={i} className="p-6" data-testid={`card-security-feature-${i}`}>
                  <feature.icon className="w-7 h-7 text-primary mb-4" strokeWidth={1.8} />
                  <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6" data-testid="section-security-practices">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4">
                Security practices
              </h2>
              <p className="text-[16px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
                A detailed look at our security implementation.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {practices.map((practice, i) => (
                <Card key={i} className="p-6" data-testid={`card-practice-${i}`}>
                  <h3 className="text-base font-bold text-foreground mb-4">{practice.title}</h3>
                  <ul className="space-y-3">
                    {practice.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-muted/30" data-testid="section-security-report">
          <div className="max-w-[700px] mx-auto">
            <Card className="p-8" data-testid="card-vulnerability-report">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Responsible disclosure
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Found a security vulnerability? We take security reports seriously and appreciate
                    responsible disclosure. Please contact our security team directly.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    data-testid="button-report-vulnerability"
                    onClick={() => goTo("/contact")}
                  >
                    Report a vulnerability
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="py-24 px-6" data-testid="section-security-cta">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4">
              Ready to get started?
            </h2>
            <p className="text-[16px] text-muted-foreground mb-8 leading-relaxed">
              Your data is safe with us. Create an account and experience our security-first platform.
            </p>
            <Button
              size="lg"
              data-testid="button-security-cta"
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
