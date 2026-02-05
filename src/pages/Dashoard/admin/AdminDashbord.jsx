import { FaUsers, FaWallet, FaChartLine, FaUserFriends } from "react-icons/fa";
import api from "../../../Library/api";
import PageLoader from "../../../components/Loader/PageLoader";
import { useEffect, useState } from "react";
import AdminQuickAction from "../../../components/AdminQuickAction"

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [latestInvestments, setLatestInvestments] = useState([]);


  const getAdminStats = async () => {
    setLoading(true);
    try {
      const res = await api.get("/stats/admin");
      if (res.data.status === "success") {
        console.log("Fetched admin stats:", res.data);
        setStats(res.data.data.stats);
      }
    } catch (err) {
      console.error("Error fetching admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const getDashboardData = async () => {
    try {
      const res = await api.get("/stats/admin");

      if (res.data.status === "success") {
        const { latest_transactions, latest_investments } =
          res.data.data;

        setLatestTransactions((latest_transactions || []).slice(0, 3));
        setLatestInvestments((latest_investments || []).slice(0, 3));
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };

  useEffect(() => {
    Promise.all([getAdminStats(), getDashboardData()])
  }, []);

  if (loading) return <PageLoader />;
  if (!stats) return null;

  const dashboardStats = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <FaUsers />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Balance",
      value: `$${stats.total_balance}`,
      icon: <FaWallet />,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Total Profits",
      value: `$${stats.total_profit}`,
      icon: <FaChartLine />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Referral Balance",
      value: `$${stats.total_referral_balance}`,
      icon: <FaUserFriends />,
      color: "from-orange-500 to-amber-600",
    },

  ];

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of platform activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {dashboardStats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-xs sm:text-sm text-gray-500">
                {item.title}
              </p>
              <h3 className="text-sm sm:text-xl font-bold text-gray-800">
                {item.value}
              </h3>
            </div>

            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r ${item.color}
              text-white flex items-center justify-center`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>


      {/* QUICK ACTIONS */}

      <AdminQuickAction />

      {/* TABLES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">

        {/* ================= RECENT TRANSACTIONS ================= */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Transactions
            </h3>
            <span className="text-xs text-gray-400">Latest activity</span>
          </div>

          {latestTransactions.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No recent transactions
            </p>
          ) : (
            <div className="space-y-4">
              {latestTransactions.map((tx) => (
                <div
                  key={tx._id}
                  className="flex items-center justify-between bg-gray-50
            rounded-xl px-4 py-3 hover:bg-gray-100 transition"
                >
                  {/* USER */}
                  <div className="max-w-[120px] truncate">
                    <p className="font-medium text-gray-800 w-[100px] truncate">
                      {tx.user?.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize truncate">
                      {tx.type}
                    </p>
                  </div>

                  {/* AMOUNT */}
                  <div className="font-semibold text-gray-800 max-w-[80px] truncate">
                    ${Number(tx.amount).toLocaleString()}
                  </div>

                  {/* STATUS */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium max-w-[80px] truncate
              ${tx.status === "success"
                        ? "bg-green-100 text-green-700"
                        : tx.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {tx.status}
                  </span>

                  {/* DATE */}
                  <div className="text-xs text-gray-500 max-w-[80px] truncate">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= RECENT INVESTMENTS ================= */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Investments
            </h3>
            <span className="text-xs text-gray-400">Latest plans</span>
          </div>

          {latestInvestments.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No recent investments
            </p>
          ) : (
            <div className="space-y-4">
              {latestInvestments.map((inv) => (
                <div
                  key={inv._id}
                  className="flex items-center justify-between bg-gray-50
            rounded-xl px-4 py-3 hover:bg-gray-100 transition"
                >
                  {/* USER */}
                  <div className="max-w-[120px] truncate">
                    <p className="font-medium text-gray-800 truncate">
                      {inv.user?.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {inv.plan?.name}
                    </p>
                  </div>

                  {/* AMOUNT */}
                  <div className="font-semibold text-gray-800 max-w-[80px] truncate">
                    ${Number(inv.amount).toLocaleString()}
                  </div>

                  {/* PROFIT */}
                  <div className="text-sm font-medium text-emerald-600 max-w-[80px] truncate">
                    +${Number(inv.profit).toLocaleString()}
                  </div>

                  {/* STATUS */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium max-w-[80px] truncate
              ${inv.status === "active"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                      }`}
                  >
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      
    </div>
  );
};

export default Dashboard;
