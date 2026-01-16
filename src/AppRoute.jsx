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

import AdminDashboard from "./pages/Dashoard/admin/AdminDashbord";
import ManageUsers from "./pages/Dashoard/admin/ManageUsers";
import AdminTransactions from "./pages/Dashoard/admin/AdminTransactions";
import AdminInvestments from "./pages/Dashoard/admin/AdminInvestments";
import AdminProfile from "./pages/Dashoard/admin/AdminProfile";

import UserDashboard from "./pages/Dashoard/user/UserDashbord";
import UserInvestments from "./pages/Dashoard/user/UserInvestment";
import UserTransactions from "./pages/Dashoard/user/UserTransactions";
import UserSettings from "./pages/Dashoard/user/UserSettings";

import ProtectedRoute from "./pages/ProtectedRoute";


const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/investmentplans" element={<InvestmentPlans />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/services" element={<Service />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<Auth />} />
        </Route>

        {/* Admin Protected */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="investments" element={<AdminInvestments />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Route>

        {/* User Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="investments" element={<UserInvestments />} />
            <Route path="transactions" element={<UserTransactions />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>

  );
};

export default AppRoute;
