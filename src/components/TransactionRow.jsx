import { useEffect, useState } from "react";
import api from "../Library/api";
import PageLoader from "./Loader/PageLoader";

const TransactionRow = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ======================
     FETCH TRANSACTIONS
  ====================== */
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/transactions");

      if (res.data.status === "success") {
        setTransactions(res.data.data.transactions);
      }
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <tr>
        <td colSpan="4" className="py-4 text-center">
          <PageLoader />
        </td>
      </tr>
    );
  }

  if (transactions.length === 0) {
    return (
      <tr>
        <td colSpan="4" className="py-4 text-center text-gray-500">
          No transactions found
        </td>
      </tr>
    );
  }

  return (
    <>
      {transactions.map((tx) => (
        <tr
          key={tx._id}
          className=" text-sm px-4 py-4 hover:bg-gray-50 transition-colors"
        >
          {/* DATE */}
          <td className="p-4">
            {new Date(tx.createdAt).toLocaleDateString()}
          </td>

          {/* TYPE */}
          <td className="capitalize">
            {tx.type}
          </td>

          {/* AMOUNT */}
          <td>
            ${Number(tx.amount).toLocaleString()}
          </td>

          {/* STATUS */}
          <td
            className={`font-medium ${
              tx.status === "success"
                ? "text-emerald-600"
                : tx.status === "pending"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {tx.status}
          </td>
        </tr>
      ))}
    </>
  );
};

export default TransactionRow;
