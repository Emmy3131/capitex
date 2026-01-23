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
      const res = await api.get("/admin/dashboard");

      if (res.data.status === "success") {
        const { latest_transactions, latest_investments } =
          res.data.data;

        setLatestTransactions(latest_transactions || []);
        setLatestInvestments(latest_investments || []);
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
      value: `₦${stats.total_balance}`,
      icon: <FaWallet />,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Total Profits",
      value: `₦${stats.total_profit}`,
      icon: <FaChartLine />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Referral Balance",
      value: `₦${stats.total_referral_balance}`,
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

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {["Daily Deposits", "Withdrawals", "Investments"].map(
          (chart, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-5 h-64"
            >
              <h3 className="font-semibold mb-3">{chart}</h3>
              <div className="h-full flex items-center justify-center text-gray-400">
                Chart Placeholder
              </div>
            </div>
          )
        )}
      </div>

      {/* TABLES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <tbody>
          {latestTransactions.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-6 text-gray-400"
              >
                No recent transactions
              </td>
            </tr>
          ) : (
            latestTransactions.map((tx) => (
              <tr key={tx._id} className="shadow-sm">
                <td className="py-2 px-2">
                  {tx.user?.name || "N/A"}
                </td>
                <td className="px-2 capitalize">{tx.type}</td>
                <td className="px-2 font-medium">
                  ₦{Number(tx.amount).toLocaleString()}
                </td>
                <td
                  className={`px-2 font-medium ${tx.status === "success"
                    ? "text-green-600"
                    : tx.status === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                    }`}
                >
                  {tx.status}
                </td>
                <td className="px-2 text-gray-500">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>


        {/* Recent Investments */}
        <tbody>
          {latestInvestments.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center py-6 text-gray-400"
              >
                No recent investments
              </td>
            </tr>
          ) : (
            latestInvestments.map((inv) => (
              <tr key={inv._id} className="shadow-sm">
                <td className="py-2 px-2">
                  {inv.user?.name || "N/A"}
                </td>
                <td className="px-2">{inv.plan?.name}</td>
                <td className="px-2 font-medium">
                  ₦{Number(inv.amount).toLocaleString()}
                </td>
                <td className="px-2 text-emerald-600 font-medium">
                  ₦{Number(inv.profit).toLocaleString()}
                </td>
                <td
                  className={`px-2 font-medium ${inv.status === "active"
                    ? "text-blue-600"
                    : "text-green-600"
                    }`}
                >
                  {inv.status}
                </td>
              </tr>
            ))
          )}
        </tbody>

      </div>

    </div>
  );
};

export default Dashboard;
