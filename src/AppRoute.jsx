import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestLayout from "./layout/QuestLayout";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashbordLayout";
import Home from "./pages/LandingPage/Home";
import AboutUs from "./pages/AboutPage/About";
import InvestmentPlans from "./pages/InvestmentPage/InvestmentPlans";
import FAQ from "./pages/FAQPage/FAQs";
import Support from "./pages/SupportPage/Support";
import Service from "./pages/ServicePage/Service";
import Auth from "./pages/AuthPage/Auth";

import Dashboard from "./pages/Dashoard/admin/Dashbord";
import ManageUsers from "./pages/Dashoard/admin/ManageUsers";
import FundUser from "./pages/Dashoard/admin/FundUser";
import Transactions from "./pages/Dashoard/admin/Transactions";
import Investments from "./pages/Dashoard/admin/Investments";
import Profile from "./pages/Dashoard/admin/Profile";


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

        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/fund-user" element={<FundUser />} />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route path="/admin/investments" element={<Investments />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
