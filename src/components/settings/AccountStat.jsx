import api from "../../Library/api";
import { useEffect, useState } from "react";
import PageLoader from "../Loader/PageLoader";

const AccountStats = () => {
  const [loading, setLoading] = useState(false);
  const [statsData, setStatsData] = useState(null);

  /* ======================
     FETCH USER STATS
  ====================== */
  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await api.get("/stats/users");

      if (res.data.status === "success") {
        setStatsData(res.data.data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch account stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || !statsData) return <PageLoader />;

  /* ======================
     FORMAT STATS FOR UI
  ====================== */
  const displayStats = [
    {
      label: "Account Balance",
      value: `$${statsData.wallet?.balance?.toLocaleString() || 0}`,
    },
    {
      label: "Referral Balance",
      value: `$${statsData.wallet?.referralBalance?.toLocaleString() || 0}`,
    },
    {
      label: "Total Referrals",
      value: statsData.total_referrals,
    },
    {
      label: "Total Withdrawals",
      value: `$${statsData.total_withdrawal?.toLocaleString() || 0}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {displayStats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-5 rounded-xl shadow"
        >
          <p className="text-sm text-gray-500">{stat.label}</p>
          <h3 className="text-xl font-semibold mt-1">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default AccountStats;
