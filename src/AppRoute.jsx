import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestLayout from "./layout/QuestLayout";
import AuthLayout from "./layout/AuthLayout";
import Home from "./pages/LandingPage/Home";
import AboutUs from "./pages/AboutPage/About";
import InvestmentPlans from "./pages/InvestmentPage/InvestmentPlans";
import FAQ from "./pages/FAQPage/FAQs";
import Support from "./pages/SupportPage/Support";
import Service from "./pages/ServicePage/Service";
import Auth from "./pages/AuthPage/Auth";


const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/investmentplans" element={<InvestmentPlans />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/services" element={<Service />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<Auth />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
