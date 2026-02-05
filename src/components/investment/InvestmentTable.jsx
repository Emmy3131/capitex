import InvestmentStatus from "./InvestmentStatus";
import api from "../../Library/api";
import { useEffect, useState } from "react";
import PageLoader from "../Loader/PageLoader";

const InvestmentTable = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getInvestment = async () => {
    setLoading(true);
    try {
      const res = await api.get("/investments");

      if (res.data?.status === "success") {
        setInvestments(res.data.data.investments);
      }
    } catch (err) {
      console.error(
        "Error fetching user investment:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvestment();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-6 py-3 text-left">Plan</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Profit</th>
            <th className="px-6 py-3 text-left">Start Date</th>
            <th className="px-6 py-3 text-left">End Date</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {investments.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-6 text-center text-gray-500">
                No investments found
              </td>
            </tr>
          ) : (
            investments.map((inv) => (
              <tr key={inv._id} className="border-t border-gray-200">
                {/* ✅ FIX HERE */}
                <td className="px-6 py-4">
                  {inv.plan?.name || "N/A"}
                </td>

                <td className="px-6 py-4">
                  ${Number(inv.amount).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-emerald-600">
                  ${Number(inv.profit).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {new Date(inv.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  {new Date(inv.expiryDate).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <InvestmentStatus status={inv.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentTable;
