import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LogoBackdrop from "@/components/LogoBackdrop";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import MiningStore from "@/pages/mining-store";
import MiningFarms from "@/pages/mining-farms";
import DeploymentSites from "@/pages/deployment-sites";
import Contact from "@/pages/contact";
import BookAppointment from "@/pages/book-appointment";
import TermsOfConditions from "@/pages/terms-of-conditions";
import TermsOfUse from "@/pages/terms-of-use";
import PrivacyPolicy from "@/pages/privacy-policy";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/mining-store" component={MiningStore} />
      <Route path="/mining-farms" component={MiningFarms} />
      <Route path="/deployment-sites" component={DeploymentSites} />
      <Route path="/contact" component={Contact} />
      <Route path="/book-appointment" component={BookAppointment} />
      <Route path="/terms-of-conditions" component={TermsOfConditions} />
      <Route path="/terms-of-use" component={TermsOfUse} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LogoBackdrop />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
