import { FaUsers, FaWallet, FaChartLine, FaUserFriends,} from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../../../Library/api";
import PageLoader from "../../../components/Loader/PageLoader";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAdminStats = async () => {
    setLoading(true);
    try {
      const res = await api.get("/stats/admin");
      if (res.data.status === "success") {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching admin stats:", err);
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminStats();
  }, []);

  if (loading) return <PageLoader />;
  if (!stats) return null;

  const dashboardStats = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Balance",
      value: `₦${stats.totalBalance}`,
      icon: <FaWallet />,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Total Profits",
      value: `₦${stats.totalProfits}`,
      icon: <FaChartLine />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Referral Balance",
      value: `₦${stats.referralBalance}`,
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
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            "Manage Plans",
            "Payment Options",
            "View Investments",
            "Manage FAQ",
          ].map((action, i) => (
            <button
              key={i}
              className="border rounded-lg py-3 text-sm font-medium
              hover:bg-gray-100 transition"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
