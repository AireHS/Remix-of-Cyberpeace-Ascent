import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieConsent from "./components/CookieConsent";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop";
import ServicesPage from "./pages/ServicesPage.tsx";
import SOC360 from "./pages/SOC360.tsx";
import Neuma from "./pages/Neuma.tsx";
import ThreatIntelligence from "./pages/ThreatIntelligence.tsx";
import DomainScan from "./pages/DomainScan.tsx";
import CloudSecurity from "./pages/CloudSecurity.tsx";
import Compliance from "./pages/Compliance.tsx";
import Ransomware from "./pages/Ransomware.tsx";
import OTIoT from "./pages/OTIoT.tsx";
import About from "./pages/About.tsx";
import Careers from "./pages/Careers.tsx";
import Resources from "./pages/Resources.tsx";
import PartnerPortal from "./pages/PartnerPortal.tsx";
import CPCSIRT from "./pages/CPCSIRT.tsx";
import CSIRT from "./pages/CSIRT.tsx";
import BrandProtection from "./pages/BrandProtection.tsx";
import Gobernanza from "./pages/Gobernanza.tsx";
import RedTeaming from "./pages/RedTeaming.tsx";
import Capacidades from "./pages/Capacidades.tsx";
import Plataforma from "./pages/Plataforma.tsx";
import Empresa from "./pages/Empresa.tsx";
import Contacto from "./pages/Contacto.tsx";
import PartnerLogin from "./pages/PartnerLogin.tsx";
import PartnerDashboard from "./pages/PartnerDashboard.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";
import Pricing from "./pages/Pricing.tsx";
import Checkout from "./pages/Checkout.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <CookieConsent />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/soc-360" element={<SOC360 />} />
          <Route path="/soc360" element={<SOC360 />} />
          <Route path="/soc360/neuma" element={<Neuma />} />
          <Route path="/threat-intelligence" element={<SOC360 />} />
          <Route path="/escanea-tu-dominio" element={<DomainScan />} />
          <Route path="/cloud-security" element={<CloudSecurity />} />
          <Route path="/cumplimiento" element={<Compliance />} />
          <Route path="/ransomware" element={<Ransomware />} />
          <Route path="/ot-iot" element={<OTIoT />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/carreras" element={<Careers />} />
          <Route path="/recursos" element={<Resources />} />
          <Route path="/partners" element={<PartnerPortal />} />
          <Route path="/partner-login" element={<PartnerLogin />} />
          <Route path="/partner-dashboard" element={<PartnerDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/cpcsirt" element={<CPCSIRT />} />
          <Route path="/csirt" element={<CSIRT />} />
          <Route path="/brand-protection" element={<BrandProtection />} />
          <Route path="/gobernanza" element={<Gobernanza />} />
          <Route path="/red-teaming" element={<RedTeaming />} />
          <Route path="/capacidades" element={<Capacidades />} />
          <Route path="/plataforma" element={<Plataforma />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/domain-scan" element={<DomainScan />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
