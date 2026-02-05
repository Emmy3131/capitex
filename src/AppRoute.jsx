import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import GuestLayout from "./layout/QuestLayout";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashbordLayout";
import ResetPassword from "./pages/AuthPage/ResetPassword";

import Home from "./pages/LandingPage/Home";
import AboutUs from "./pages/AboutPage/About";
import Investment from "./pages/InvestmentPage/Investment";
import FAQ from "./pages/FAQPage/FAQs";
import Support from "./pages/SupportPage/Support";
import Service from "./pages/ServicePage/Service";
import Auth from "./pages/AuthPage/Auth";

import AdminDashboard from "./pages/Dashoard/admin/AdminDashbord";
import ManageUsers from "./pages/Dashoard/admin/ManageUsers";
import AdminTransactions from "./pages/Dashoard/admin/AdminTransactions";
import AdminInvestments from "./pages/Dashoard/admin/AdminInvestments";
import PlansList from "./pages/Dashoard/admin/Plans/PlanList";
import CreatePlan from "./pages/Dashoard/admin/Plans/CreatePlanList";
import EditPlan from "./pages/Dashoard/admin/Plans/EditPlan";
import FAQsList from "./pages/Dashoard/admin/FAQs/FAQsList";
import CreateFAQ from "./pages/Dashoard/admin/FAQs/CreateFAQ";
import PaymentOptionsList from "./pages/Dashoard/admin/PaymentOption/PaymentOptionList";
import CreatePaymentOption from "./pages/Dashoard/admin/PaymentOption/CreatePaymentOption";
import EditPaymentOption from "./pages/Dashoard/admin/PaymentOption/EditPaymentOption";
import AdminProfile from "./pages/Dashoard/admin/AdminProfile";

import UserDashboard from "./pages/Dashoard/user/UserDashbord";
import UserInvestments from "./pages/Dashoard/user/UserInvestments";
import UserTransactions from "./pages/Dashoard/user/UserTransactions";
import UserSettings from "./pages/Dashoard/user/UserSettings";
import Deposit from "./pages/Dashoard/user/Deposit";
import CreateInvestment from "./pages/Dashoard/user/CreateInvestment";
import BankAccountDetails from "./pages/Dashoard/user/AddBankAccountDetails";
import Withdraw from "./pages/Dashoard/user/Withdraw";

import UpdateUserProfile from "./pages/Profile/UpdateUserProfile";

import ProtectedRoute from "./pages/ProtectedRoute";
import AuthGuard from "./pages/AuthPage/AuthGuard";

const AppRoute = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== PUBLIC PAGES ===== */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/services" element={<Service />} />
        </Route>

        {/* ===== AUTH ===== */}
        <Route element={<AuthGuard><AuthLayout /></AuthGuard>}>
          <Route path="/users/resetPassword" element={<ResetPassword />} />
          <Route path="/auth" element={<Auth />} />
        </Route>

        {/* ===== SHARED DASHBOARD (USER + ADMIN) ===== */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* USER */}
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/userInvestments" element={<UserInvestments />} />
          <Route path="/transactions" element={<UserTransactions />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/newInvest" element={<CreateInvestment />} />
          <Route path="/banks" element={<BankAccountDetails />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/profile" element={<UpdateUserProfile />} />
        </Route>

        {/* ===== ADMIN ONLY ===== */}
        <Route
          element={
            <ProtectedRoute adminOnly>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
          <Route path="/admin/investments" element={<AdminInvestments />} />
          <Route path="/admin/payment-options" element={<PaymentOptionsList />} />
          <Route path="/admin/payment-options/create" element={<CreatePaymentOption />} />
          <Route path="/admin/payment-options/:id/edit" element={<EditPaymentOption />} />
          <Route path="/admin/plans" element={<PlansList />} />
          <Route path="/admin/plans/create" element={<CreatePlan />} />
          <Route path="/admin/plans/:id/edit" element={<EditPlan />} />
          <Route path="/admin/faqs" element={<FAQsList />} />
          <Route path="/admin/faqs/create" element={<CreateFAQ />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
