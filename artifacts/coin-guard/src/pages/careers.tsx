import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Lightbulb,
  Shield,
  Eye,
  Users,
  Zap,
  MapPin,
  Clock,
  Building2,
  ArrowRight,
  Laptop,
  Coins,
  HeartPulse,
  BookOpen,
  Palmtree,
  Coffee,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We push boundaries in crypto compliance and digital asset protection. Every team member is empowered to challenge assumptions and build solutions that redefine the industry.",
  },
  {
    icon: Shield,
    title: "Security",
    description:
      "Trust is our foundation. We build with security at every layer, from infrastructure to user experience, ensuring our clients' assets and data remain protected.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We believe in open communication with our team and our users. No hidden agendas, no corporate jargon. Just honest, direct collaboration toward shared goals.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "The best ideas come from diverse perspectives working together. We foster a culture of respectful debate, knowledge sharing, and collective problem solving.",
  },
  {
    icon: Zap,
    title: "Impact",
    description:
      "Every line of code, every design decision, and every customer interaction should create meaningful value. We measure success by the real-world impact we deliver.",
  },
];

const positions = [
  {
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Design and build scalable backend services that power our tax calculation engine and insurance platform. You will work with Node.js, PostgreSQL, and blockchain data pipelines.",
  },
  {
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Craft polished, performant user interfaces that make complex crypto tax workflows intuitive. You will work with React, TypeScript, and modern design systems.",
  },
  {
    title: "Product Designer",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    description:
      "Lead the design of user experiences across our tax reporting and insurance products. You will conduct user research, create prototypes, and collaborate closely with engineering.",
  },
  {
    title: "Compliance Analyst",
    department: "Compliance",
    location: "Remote",
    type: "Full-time",
    description:
      "Monitor and interpret evolving cryptocurrency regulations across global jurisdictions. You will ensure our platform stays compliant and help shape our regulatory strategy.",
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description:
      "Guide clients through onboarding, tax filing season, and insurance claims. You will be the voice of the customer and work cross-functionally to improve our product.",
  },
  {
    title: "Blockchain Data Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Build and maintain data pipelines that ingest, normalize, and reconcile transaction data from 200+ exchanges and DeFi protocols. Experience with on-chain data is essential.",
  },
];

const benefits = [
  {
    icon: Laptop,
    title: "Remote first",
    description: "Work from anywhere in the world. We are a fully distributed team across multiple time zones.",
  },
  {
    icon: Coins,
    title: "Crypto compensation",
    description: "Choose to receive a portion of your salary in cryptocurrency. We practice what we preach.",
  },
  {
    icon: HeartPulse,
    title: "Health insurance",
    description: "Comprehensive medical, dental, and vision coverage for you and your dependents.",
  },
  {
    icon: BookOpen,
    title: "Learning budget",
    description: "Annual stipend for conferences, courses, books, and certifications to support your growth.",
  },
  {
    icon: Palmtree,
    title: "Generous PTO",
    description: "Flexible time off policy with a minimum of 25 days per year, plus local public holidays.",
  },
  {
    icon: Coffee,
    title: "Home office stipend",
    description: "One-time setup budget plus monthly allowance to keep your workspace comfortable and productive.",
  },
];

export default function Careers() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 px-4" data-testid="section-careers-hero">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-primary text-sm font-semibold tracking-wide mb-4">CAREERS</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-foreground leading-tight mb-6" data-testid="text-careers-title">
            Join CoinGuard
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-[600px] mx-auto mb-8">
            Help us build the future of crypto compliance. We are looking for talented people who want to make
            digital asset management safer, simpler, and more accessible for everyone.
          </p>
          <Button
            onClick={() => {
              const el = document.getElementById("open-positions");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="bg-primary text-primary-foreground rounded-full px-6"
            data-testid="button-view-positions"
          >
            View open positions
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4" data-testid="section-values">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4" data-testid="text-values-title">
              What drives us
            </h2>
            <p className="text-muted-foreground max-w-[500px] mx-auto">
              Our values shape every decision we make, from hiring to product development to how we support our users.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value) => (
              <Card key={value.title} className="p-6" data-testid={`card-value-${value.title.toLowerCase()}`}>
                <value.icon className="w-5 h-5 text-primary mb-4" />
                <h3 className="text-base font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="open-positions" className="py-16 sm:py-20 px-4 bg-card" data-testid="section-positions">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4" data-testid="text-positions-title">
              Open positions
            </h2>
            <p className="text-muted-foreground max-w-[500px] mx-auto">
              We are growing across engineering, product, compliance, and customer success. Find a role that matches your skills and ambitions.
            </p>
          </div>
          <div className="space-y-3">
            {positions.map((position, index) => (
              <Card
                key={position.title}
                className="p-5 sm:p-6"
                data-testid={`card-position-${index}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <h3 className="text-base font-semibold text-foreground" data-testid={`text-position-title-${index}`}>
                    {position.title}
                  </h3>
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Building2 className="w-3 h-3" />
                      {position.department}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {position.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {position.type}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{position.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLocation("/contact");
                    window.scrollTo(0, 0);
                  }}
                  data-testid={`button-apply-${index}`}
                >
                  Apply now
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4" data-testid="section-benefits">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4" data-testid="text-benefits-title">
              Benefits and perks
            </h2>
            <p className="text-muted-foreground max-w-[500px] mx-auto">
              We take care of our team so they can focus on building great products.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="p-6" data-testid={`card-benefit-${benefit.title.toLowerCase().replace(/\s/g, "-")}`}>
                <benefit.icon className="w-5 h-5 text-primary mb-4" />
                <h3 className="text-base font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 bg-card" data-testid="section-cta">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Don't see the right role?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We are always interested in hearing from talented individuals. Send us a message and tell us how you
            would contribute to the CoinGuard mission.
          </p>
          <Button
            onClick={() => {
              setLocation("/contact");
              window.scrollTo(0, 0);
            }}
            className="bg-primary text-primary-foreground rounded-full px-6"
            data-testid="button-contact-us"
          >
            Get in touch
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
