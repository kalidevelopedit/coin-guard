import { Router, Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { ApplicationPage } from "@/pages/auth";
import { lazy, Suspense, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { trackPageView, trackEvent } from "@/lib/analytics";

const Services = lazy(() => import("@/pages/services"));
const Pricing = lazy(() => import("@/pages/pricing"));
const HowItWorks = lazy(() => import("@/pages/how-it-works"));
const Security = lazy(() => import("@/pages/security"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const TaxGuides = lazy(() => import("@/pages/tax-guides"));
const Dashboard = lazy(() => import("@/pages/app/dashboard"));
const Onboarding = lazy(() => import("@/pages/app/onboarding"));
const Transactions = lazy(() => import("@/pages/app/transactions"));
const Tax = lazy(() => import("@/pages/app/tax"));
const Filing = lazy(() => import("@/pages/app/filing"));
const Insurance = lazy(() => import("@/pages/app/insurance"));
const AppSettings = lazy(() => import("@/pages/app/settings"));
const Admin = lazy(() => import("@/pages/admin"));
const TermsOfService = lazy(() => import("@/pages/legal/terms"));
const PrivacyPolicy = lazy(() => import("@/pages/legal/privacy"));
const RiskDisclosures = lazy(() => import("@/pages/legal/risk-disclosures"));
const CoverageTerms = lazy(() => import("@/pages/legal/coverage-terms"));
const Careers = lazy(() => import("@/pages/careers"));
const TestimonialsPage = lazy(() => import("@/pages/testimonials"));
const Testimonials = lazy(() => import("@/pages/app/testimonials"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  );
}

function ProtectedRoute({ component: Component, skipOnboardingCheck }: { component: React.ComponentType; skipOnboardingCheck?: boolean }) {
  const { user, isLoading } = useAuth();
  const [location] = useLocation();

  if (isLoading) return <PageLoader />;

  if (!user) {
    return <Redirect to="/apply" />;
  }

  if (!skipOnboardingCheck && !user.onboardingComplete && location !== "/app/onboarding") {
    return <Redirect to="/app/onboarding" />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

function PageTracker() {
  const [location] = useLocation();
  const prevPath = useRef("");
  useEffect(() => {
    if (location !== prevPath.current) {
      prevPath.current = location;
      trackPageView();
    }
  }, [location]);
  return null;
}

function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <PageTracker />
      <Switch>
        <Route path="/">{() => <Redirect to="/apply" />}</Route>
        <Route path="/home" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/security" component={Security} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/tax-guides" component={TaxGuides} />
        <Route path="/apply" component={ApplicationPage} />
        <Route path="/legal/terms" component={TermsOfService} />
        <Route path="/legal/privacy" component={PrivacyPolicy} />
        <Route path="/legal/risk-disclosures" component={RiskDisclosures} />
        <Route path="/legal/coverage-terms" component={CoverageTerms} />
        <Route path="/careers" component={Careers} />
        <Route path="/testimonials" component={TestimonialsPage} />
        <Route path="/admin" component={Admin} />
        <Route path="/get-started">{() => <Redirect to="/apply" />}</Route>
        <Route path="/register">{() => <Redirect to="/apply" />}</Route>
        <Route path="/login">{() => <Redirect to="/apply" />}</Route>
        <Route path="/sign-in">{() => <Redirect to="/apply" />}</Route>
        <Route path="/app">
          {() => <ProtectedRoute component={Dashboard} />}
        </Route>
        <Route path="/app/onboarding">
          {() => <ProtectedRoute component={Onboarding} skipOnboardingCheck />}
        </Route>
        <Route path="/app/transactions">
          {() => <ProtectedRoute component={Transactions} />}
        </Route>
        <Route path="/app/tax">
          {() => <ProtectedRoute component={Tax} />}
        </Route>
        <Route path="/app/filing">
          {() => <ProtectedRoute component={Filing} />}
        </Route>
        <Route path="/app/insurance">
          {() => <ProtectedRoute component={Insurance} />}
        </Route>
        <Route path="/app/testimonials">
          {() => <ProtectedRoute component={Testimonials} />}
        </Route>
        <Route path="/app/settings">
          {() => <ProtectedRoute component={AppSettings} />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";

function App() {
  return (
    <Router base={BASE}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <AppRouter />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
