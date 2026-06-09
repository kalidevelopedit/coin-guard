import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon, ChevronDown, FileText, ShieldCheck, DollarSign, Globe, Cog, Lock, Users, MessageSquare, Star, SearchCheck } from "lucide-react";
import { Logo } from "@/components/logo";

interface DropdownItem {
  label: string;
  href: string;
  description: string;
  icon: typeof FileText;
}

interface NavDropdown {
  label: string;
  items: DropdownItem[];
}

const navDropdowns: NavDropdown[] = [
  {
    label: "Products",
    items: [
      { label: "Crypto Recovery", href: "/services#recovery", description: "Recover lost or stolen crypto assets", icon: SearchCheck },
      { label: "Tax Reporting", href: "/services#tax-reporting", description: "Automated crypto tax calculations", icon: FileText },
      { label: "Insurance", href: "/services#insurance", description: "Digital asset protection coverage", icon: ShieldCheck },
      { label: "Pricing", href: "/pricing", description: "Simple, transparent plans", icon: DollarSign },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Tax Guides", href: "/tax-guides", description: "Country-specific crypto tax rules", icon: Globe },
      { label: "How It Works", href: "/how-it-works", description: "Step-by-step walkthrough", icon: Cog },
      { label: "Security", href: "/security", description: "How we protect your data", icon: Lock },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about", description: "Our mission and team", icon: Users },
      { label: "Testimonials", href: "/testimonials", description: "What our clients say", icon: Star },
      { label: "Contact", href: "/contact", description: "Get in touch with us", icon: MessageSquare },
    ],
  },
];

function DropdownMenu({ dropdown, isOpen, goTo, onClose }: { dropdown: NavDropdown; isOpen: boolean; goTo: (path: string) => void; onClose: () => void }) {
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 transition-all duration-150 ${
        isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1 pointer-events-none"
      }`}
      onMouseLeave={onClose}
    >
      <div className="bg-popover/95 backdrop-blur-xl border border-border rounded-xl shadow-lg p-2 min-w-[280px]">
        {dropdown.items.map((item) => (
          <button
            key={item.label}
            onClick={() => { goTo(item.href); onClose(); }}
            className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
            data-testid={`link-dropdown-${item.label.toLowerCase().replace(/\s/g, "-")}`}
          >
            <item.icon className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Navigation() {
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("coinguard-theme") || "dark";
    }
    return "dark";
  });

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("coinguard-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (path: string) => {
    const [pathname, hash] = path.split("#");
    setLocation(pathname);
    setMobileOpen(false);
    setOpenDropdown(null);
    if (hash) {
      window.history.replaceState(null, "", `${pathname}#${hash}`);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <nav
      data-testid="navigation-bar"
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-[1200px] rounded-2xl border ${
        scrolled
          ? "bg-background/40 backdrop-blur-2xl border-white/10 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-background/20 backdrop-blur-xl border-white/5 dark:border-white/5"
      }`}
    >
      <div className="px-3 sm:px-5 flex items-center justify-between gap-2 sm:gap-4 h-14">
        <div
          className="flex items-center cursor-pointer flex-shrink-0"
          onClick={() => goTo("/home")}
          data-testid="link-home"
        >
          <Logo size="md" />
        </div>

        <div className="hidden lg:flex items-center gap-0.5">
          <button
            onClick={() => goTo("/home")}
            data-testid="link-nav-home"
            className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-colors duration-200 ${
              location === "/home"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Home
          </button>

          {navDropdowns.map((dropdown) => (
            <div
              key={dropdown.label}
              className="relative"
              onMouseEnter={() => handleDropdownEnter(dropdown.label)}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                data-testid={`link-nav-${dropdown.label.toLowerCase()}`}
                className="flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-lg transition-colors duration-200 text-muted-foreground hover:text-foreground"
              >
                {dropdown.label}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === dropdown.label ? "rotate-180" : ""}`} />
              </button>
              <DropdownMenu dropdown={dropdown} isOpen={openDropdown === dropdown.label} goTo={goTo} onClose={() => setOpenDropdown(null)} />
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goTo("/apply")}
            data-testid="link-check-status"
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground"
          >
            Check status
          </Button>
          <Button
            data-testid="button-get-started"
            onClick={() => goTo("/apply")}
            className="bg-primary text-primary-foreground text-[13px] font-semibold rounded-full px-5 h-8"
          >
            Apply now
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" data-testid="button-mobile-menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[300px] bg-background/95 backdrop-blur-2xl border-l border-border p-6">
              <div className="flex flex-col gap-1 mt-8">
                {navDropdowns.map((dropdown) => (
                  <div key={dropdown.label}>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === dropdown.label ? null : dropdown.label)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[15px] font-medium text-muted-foreground hover:text-foreground"
                      data-testid={`link-mobile-${dropdown.label.toLowerCase()}`}
                    >
                      {dropdown.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === dropdown.label ? "rotate-180" : ""}`} />
                    </button>
                    {mobileExpanded === dropdown.label && (
                      <div className="pl-4 pb-2 space-y-1">
                        {dropdown.items.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => goTo(item.href)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                          >
                            <item.icon className="w-3.5 h-3.5 text-primary" />
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="border-t border-border pt-4 mt-3 flex flex-col gap-2">
                  <button
                    onClick={toggleTheme}
                    data-testid="button-mobile-theme"
                    className="flex items-center gap-2 px-3 py-2.5 text-[15px] font-medium text-muted-foreground hover:text-foreground"
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground"
                    onClick={() => goTo("/apply")}
                    data-testid="link-mobile-check-status"
                  >
                    Check status
                  </Button>
                  <Button
                    className="bg-primary text-primary-foreground w-full rounded-full"
                    onClick={() => goTo("/apply")}
                    data-testid="button-mobile-apply"
                  >
                    Apply now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
