import StatusBadge from "./StatusBadge";
import api from "../Library/api";
import PageLoader from "./Loader/PageLoader";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const TransactionTable = () => {
  const [loader, setLoader] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const fetchAllTransaction = async () => {
    setLoader(true);
    try {
      const res = await api.get("users/me/transactions");
      if (res.data.status === "success") {
        setTransactions(res.data.data.transactions);
        console.log("Fetched transactions:", res.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch transactions");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchAllTransaction();
  }, []);

  if (loader) return <PageLoader />;

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-t border-gray-200">
              <td className="px-6 py-4">{tx.type}</td>
              <td className="px-6 py-4">${tx.amount.toLocaleString()}</td>
              <td className="px-6 py-4">
                <StatusBadge status={tx.status} />
              </td>
              <td className="px-6 py-4">{tx.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
