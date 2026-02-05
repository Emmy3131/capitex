import { useEffect, useState } from "react";
import api from "../../Library/api";

const InvestmentStats = () => {
  const [stats, setStats] = useState({
    totalProfit: 0,
    totalInvestments: 0,
    totalAmount: 0,
  });

  const getInvestments = async () => {
    try {
      const res = await api.get("/investments");

      if (res.data?.status === "success") {
        const investments = res.data.data.investments;

        const totalProfit = investments.reduce(
          (sum, inv) => sum + Number(inv.profit || 0),
          0
        );

        const totalAmount = investments.reduce(
          (sum, inv) => sum + Number(inv.amount || 0),
          0
        );

        setStats({
          totalProfit,
          totalAmount,
          totalInvestments: investments.length,
        });
      }
    } catch (err) {
      console.error(
        "Error fetching investment stats:",
        err.response?.data || err.message
      );
    }
  };

  const getStats = async()=>{
    const res = await api.get('/stats/users');
    console.log(res);
    
  }

  useEffect(() => {
    getInvestments();
    getStats()
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Profit */}
      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-sm text-gray-500">Total Profit</p>
        <h3 className="text-xl font-semibold mt-1 text-emerald-600">
          ${stats.totalProfit.toLocaleString()}
        </h3>
      </div>

      {/* Total Investments */}
      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-sm text-gray-500">Total Investments</p>
        <h3 className="text-xl font-semibold mt-1">
          {stats.totalInvestments}
        </h3>
      </div>

      {/* Amount Invested */}
      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-sm text-gray-500">Amount Invested</p>
        <h3 className="text-xl font-semibold mt-1">
          ${stats.totalAmount.toLocaleString()}
        </h3>
      </div>
    </div>
  );
};

export default InvestmentStats;
