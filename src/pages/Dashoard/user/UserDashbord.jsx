import StatCard from "../../../components/StatCard.jsx";
import QuickAction from "../../../components/QuickActions.jsx";
import TransactionRow from "../../../components/TransactionRow.jsx";
import InvestmentRow from "../../../components/InvestmentRow.jsx";
import api from "../../../Library/api";
import PageLoader from "../../../components/Loader/PageLoader.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoPrices from "./CryptoPrice.jsx"; 
import { FaWallet, FaChartLine, FaUserFriends } from "react-icons/fa";

import TradingViewWidget from "./TradingViewWidget";
import MarketOverview from "./MarketOverview";




const UserDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const viewTransaction = () => navigate("/transactions");
  const newInvestment = () => navigate("/newInvest");

  /* ======================
     FETCH USER STATS
  ====================== */
  const getUserStat = async () => {
    setLoading(true);
    try {
      const res = await api.get("/stats/users");
      if (res.data?.status === "success") {
        setStats(res.data.data.stats);
      }
    } catch (err) {
      console.error(
        "Error fetching user stats:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const doMining = async () => {
    const res = await api.patch("/users/me/investments/mine");

  }

  /* ======================
     FETCH CURRENT USER
  ====================== */
  const getCurrentUser = async () => {
    try {
      const res = await api.get("/users/me");
      if (res.data.status === "success") {
        setUser(res.data.data.user);
      }
    } catch (err) {
      console.error("Error fetching user info", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getUserStat(), getCurrentUser()]);
    };
    fetchData();
    doMining();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-4">

      {/* ===== Welcome ===== */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.name?.split(" ")[0] || "Investor"}!
        </h1>
        <p className="text-gray-500 text-sm">
          Here’s what’s happening with your account today
        </p>
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Account Balance"
          value={`$${stats?.wallet?.balance?.toLocaleString() || 0}`}
          icon = {<FaWallet/>}
        />

        <StatCard
          title="Referral Balance"
          value={`$${stats?.wallet?.referralBalance?.toLocaleString() || 0}`}
          icon = {<FaUserFriends/>}
        />

        <StatCard
          title="Total Deposit"
          value={`$${stats?.total_deposit?.toLocaleString() || 0}`}
          icon = {<FaChartLine/>}
        />

        <StatCard
          title="Accrued Profit"
          value={`$${stats?.wallet?.profit?.toLocaleString() || 0}`}
          icon = {<FaChartLine/>}
        />
      </div>

      {/* ===== Quick Actions ===== */}
      <div className="flex flex-wrap gap-4">
        <QuickAction
          label="New Investment"
          onClick={newInvestment}
        />

        <QuickAction
          label="View Transactions"
          onClick={viewTransaction}
        />
      </div>


      {/* ===== Main Content ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ===== Active Investments ===== */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">
            Active Investments
          </h2>
          <InvestmentRow />
        </div>

        {/* ===== User Info ===== */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">User Info</h2>

          <div className="flex items-center gap-4">
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

         

          <div className="mt-4">
            <p className="text-sm text-gray-500">Referral Link</p>
            <input
              readOnly
              value={`${import.meta.env.VITE_APP_URL}/auth?tab=signUp&refId=${user.accountId}`}
              className="w-full mt-1 px-3 py-2 text-sm border rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>

      <div className="w-4xl">
        <CryptoPrices />
      </div>

      {/* ===== Recent Transactions ===== */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4">
          Recent Transactions
        </h2>

        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <TransactionRow />
          </tbody>
        </table>
      </div>

      {/* TradingView Widget  */}
      <div className="bg-white rounded-xl shadow p-6 w-4xl mx-auto">
        <MarketOverview />
      </div>
      {/* <TradingViewWidget /> */}
    </div>
  );
};

export default UserDashboard;
