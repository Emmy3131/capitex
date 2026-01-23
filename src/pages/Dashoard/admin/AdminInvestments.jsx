import { useEffect, useState } from "react";
import api from "../../../Library/api";
import PageLoader from "../../../components/Loader/PageLoader";

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getInvestments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/investments");

      if (res.data.status === "success") {
        setInvestments(res.data.data.investments);
      }
    } catch (err) {
      console.error("Error fetching investments:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on component mount
  useEffect(() => {
    getInvestments();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 px-4 md:px-0">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Investments</h1>
        <p className="text-sm text-gray-500">Track all user investments</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-left">User</th>
              <th className="px-5 py-3 text-left">Plan</th>
              <th className="px-5 py-3 text-left">Amount</th>
              <th className="px-5 py-3 text-left">Profit</th>
              <th className="px-5 py-3 text-left">Start Date</th>
              <th className="px-5 py-3 text-left">End Date</th>
              <th className="px-5 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {investments.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No investments found
                </td>
              </tr>
            ) : (
              investments.map((inv) => (
                <tr key={inv._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium">
                    {inv.user?.name || "N/A"}
                  </td>
                  <td className="px-5 py-3">{inv.plan?.name}</td>
                  <td className="px-5 py-3 font-semibold">
                    ₦{inv.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-emerald-600 font-semibold">
                    ₦{inv.profit.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    {new Date(inv.startDate).toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    {new Date(inv.endDate).toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Investments;
