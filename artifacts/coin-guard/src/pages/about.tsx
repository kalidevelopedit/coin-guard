import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Shield,
  ArrowRight,
  Target,
  Users,
  Lock,
  Globe,
  Award,
  Heart,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import teamAlexImg from "@assets/team_alex.png";
import teamSarahImg from "@assets/team_sarah.png";
import teamMarcusImg from "@assets/team_marcus.png";
import teamElenaImg from "@assets/team_elena.png";

const values = [
  {
    icon: Lock,
    title: "Security first",
    description: "Every decision we make prioritizes the security and privacy of your data. We use bank-grade encryption and never store your private keys.",
  },
  {
    icon: Target,
    title: "Accuracy matters",
    description: "We obsess over calculation accuracy. Our tax engine is built by CPAs and crypto tax experts to ensure compliance across jurisdictions.",
  },
  {
    icon: Users,
    title: "User-centric design",
    description: "Complex crypto taxes shouldn't require a complex interface. We build tools that anyone can use, from beginners to institutional traders.",
  },
  {
    icon: Globe,
    title: "Global reach",
    description: "Crypto is borderless, and so are we. We support tax regulations across the US, UK, EU, Australia, Canada, and more.",
  },
  {
    icon: Heart,
    title: "Transparency",
    description: "No hidden fees, no surprise charges. We believe in transparent pricing, transparent claims processing, and transparent communication.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We hold ourselves to the highest standards. Our platform is continuously audited, improved, and updated to reflect the latest regulations.",
  },
];

const statsData = [
  { target: 50000, suffix: "+", label: "Users worldwide", display: "50K+" },
  { target: 2000000000, suffix: "+", label: "Assets tracked", display: "$2B+" },
  { target: 40, suffix: "+", label: "Countries supported", display: "40+" },
  { target: 99.9, suffix: "%", label: "Uptime SLA", display: "99.9%" },
];

const team = [
  { name: "Alex Chen", role: "CEO & Co-founder", photo: teamAlexImg },
  { name: "Sarah Williams", role: "CTO & Co-founder", photo: teamSarahImg },
  { name: "Marcus Johnson", role: "Head of Tax", photo: teamMarcusImg },
  { name: "Elena Rodriguez", role: "Head of Insurance", photo: teamElenaImg },
];

const timeline = [
  { year: "2021", title: "Founded", description: "CoinGuard was born out of frustration with the lack of simple, reliable crypto tax tools." },
  { year: "2022", title: "Tax engine launched", description: "Released our first tax reporting engine supporting 100+ exchanges and DeFi protocols." },
  { year: "2023", title: "Insurance introduced", description: "Became the first platform to combine crypto tax reporting with digital asset insurance." },
  { year: "2024", title: "Global expansion", description: "Expanded to 40+ countries with localized tax rules and multi-language support." },
  { year: "2025", title: "50K users", description: "Reached 50,000 users worldwide and $2B+ in tracked digital assets." },
];

function useCountUp(target: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startCounting) return;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, startCounting]);

  return count;
}

function AnimatedStat({ stat, index }: { stat: typeof statsData[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(
    stat.target === 2000000000 ? 2 : stat.target === 50000 ? 50 : stat.target,
    2000 + index * 300,
    isVisible
  );

  const formatValue = () => {
    if (!isVisible) return "0";
    if (stat.target === 2000000000) return `$${count}B${stat.suffix}`;
    if (stat.target === 50000) return `${count}K${stat.suffix}`;
    if (stat.target === 99.9) return `${count === 99 ? "99.9" : count}${stat.suffix}`;
    return `${count}${stat.suffix}`;
  };

  return (
    <Card ref={ref} className="p-6 text-center" data-testid={`card-stat-${index}`}>
      <span className="text-[32px] font-bold text-primary">{formatValue()}</span>
      <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
    </Card>
  );
}

export default function About() {
  const [, setLocation] = useLocation();
  const goTo = (path: string) => {
    setLocation(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-about">
      <Navigation />
      <div className="pt-16">
        <section className="py-24 px-6" data-testid="section-about-hero">
          <div className="max-w-[800px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-primary">About Us</span>
            </div>
            <h1 className="text-[36px] md:text-[48px] font-bold text-foreground tracking-tight mb-6 leading-tight">
              Building trust in the crypto economy
            </h1>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              CoinGuard was founded with a simple mission: make cryptocurrency tax compliance
              and asset protection accessible to everyone. We believe that as crypto adoption grows,
              so should the tools that protect investors.
            </p>
          </div>
        </section>

        <section className="py-12 px-6" data-testid="section-about-stats">
          <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, i) => (
              <AnimatedStat key={i} stat={stat} index={i} />
            ))}
          </div>
        </section>

        <section className="py-24 px-6" data-testid="section-mission">
          <div className="max-w-[1000px] mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4 leading-tight">
                  Our mission
                </h2>
                <p className="text-[16px] text-muted-foreground leading-relaxed mb-4">
                  The crypto industry moves fast, but compliance and protection shouldn't be an afterthought.
                  We're building the infrastructure that bridges the gap between decentralized finance and
                  regulatory requirements.
                </p>
                <p className="text-[16px] text-muted-foreground leading-relaxed">
                  Our team combines deep expertise in cryptocurrency, tax law, insurance, and software
                  engineering to deliver a platform that's both powerful and intuitive. Every feature is
                  designed with the end user in mind.
                </p>
              </div>
              <Card className="p-8" data-testid="card-mission-highlight">
                <blockquote className="text-[18px] font-medium text-foreground leading-relaxed mb-4">
                  "We envision a world where every crypto investor has access to professional-grade
                  tax tools and comprehensive asset protection, regardless of portfolio size."
                </blockquote>
                <div className="flex items-center gap-3">
                  <img src={teamAlexImg} alt="Alex Chen" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Alex Chen</p>
                    <p className="text-xs text-muted-foreground">CEO & Co-founder</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-muted/30" data-testid="section-timeline">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4">
                Our journey
              </h2>
              <p className="text-[16px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
                From a small team to a global platform trusted by thousands.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 mb-10 last:mb-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  data-testid={`timeline-item-${i}`}
                >
                  <div className="hidden md:block md:w-[calc(50%-2rem)] text-right">
                    {i % 2 === 0 && (
                      <Card className="p-5 inline-block text-left">
                        <span className="text-xs font-bold text-primary">{item.year}</span>
                        <h3 className="text-sm font-bold text-foreground mt-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                      </Card>
                    )}
                  </div>
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background mt-1.5 z-10" />
                  <div className="hidden md:block md:w-[calc(50%-2rem)]">
                    {i % 2 !== 0 && (
                      <Card className="p-5 inline-block">
                        <span className="text-xs font-bold text-primary">{item.year}</span>
                        <h3 className="text-sm font-bold text-foreground mt-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                      </Card>
                    )}
                  </div>
                  <div className="md:hidden pl-12">
                    <Card className="p-5">
                      <span className="text-xs font-bold text-primary">{item.year}</span>
                      <h3 className="text-sm font-bold text-foreground mt-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6" data-testid="section-values">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4">
                Our values
              </h2>
              <p className="text-[16px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
                The principles that guide everything we build.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {values.map((value, i) => (
                <Card key={i} className="p-6" data-testid={`card-value-${i}`}>
                  <value.icon className="w-5 h-5 text-primary mb-4" />
                  <h3 className="text-base font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-muted/30" data-testid="section-team">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4">
                Leadership team
              </h2>
              <p className="text-[16px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Experienced professionals from crypto, fintech, and cybersecurity.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <Card key={i} className="p-6 text-center" data-testid={`card-team-${i}`}>
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-sm font-bold text-foreground">{member.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6" data-testid="section-about-cta">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-[28px] md:text-[36px] font-bold text-foreground tracking-tight mb-4">
              Join us on our mission
            </h2>
            <p className="text-[16px] text-muted-foreground mb-8 leading-relaxed">
              Start protecting your crypto portfolio and simplify your tax reporting today.
            </p>
            <Button
              size="lg"
              data-testid="button-about-cta"
              onClick={() => goTo("/apply")}
              className="bg-primary text-primary-foreground font-semibold gap-2 px-8 text-[15px] rounded-full"
            >
              Get started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
