import { useState, useEffect } from "react";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import PageLoader from "../../../components/Loader/PageLoader";
import api from "../../../Library/api";

const Transactions = () => {
  const [selectedTx, setSelectedTx] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTransactions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/transactions");
      if (res.data.status === "success") {
        setTransactions(res.data.data.transactions);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on component mount
  useEffect(() => {
    getTransactions();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Transactions
        </h1>
        <p className="text-sm text-gray-500">
          Review and manage all transactions
        </p>
      </div>


      <div className="bg-white rounded-xl shadow">
        {/* Scroll container */}
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr className="text-left">
                <th className="px-5 py-3 text-left whitespace-nowrap">
                  User
                </th>
                <th className="px-5 py-3 whitespace-nowrap">
                  Type
                </th>
                <th className="px-5 py-3 whitespace-nowrap">
                  Amount
                </th>
                <th className="px-5 py-3 whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 py-3 whitespace-nowrap">
                  Date
                </th>
                <th className="px-5 py-3 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="shadow-sm hover:bg-gray-50"
                >
                  <td className="px-5 py-3 flex items-center gap-3 whitespace-nowrap">
                    <img
                      src={tx.photo}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    {tx.user}
                  </td>

                  <td className="px-5 py-3 capitalize whitespace-nowrap">
                    {tx.type}
                  </td>

                  <td className="px-5 py-3 font-semibold whitespace-nowrap">
                    ₦{tx.amount.toLocaleString()}
                  </td>

                  <td className="px-5 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${statusStyle[tx.status]}`}
                    >
                      {tx.status}
                    </span>
                  </td>

                  <td className="px-5 py-3 whitespace-nowrap">
                    {tx.date}
                  </td>

                  <td className="px-5 py-3 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedTx(tx)}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* DETAILS MODAL */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-xl p-6 space-y-6">

            {/* USER HEADER */}
            <div className="flex items-center gap-5">
              <img
                src={selectedTx.photo}
                alt={selectedTx.user}
                className="w-16 h-16 rounded-full object-cover border-4 border-blue-500"
              />

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedTx.user}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedTx.email}
                </p>

                <span
                  className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold
              ${statusStyle[selectedTx.status]}
            `}
                >
                  {selectedTx.status}
                </span>
              </div>
            </div>

            {/* TRANSACTION SUMMARY */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Transaction Type</span>
                <span className="font-semibold capitalize">
                  {selectedTx.type}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-semibold text-green-600">
                  ₦{selectedTx.amount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold">
                  {selectedTx.date}
                </span>
              </div>
            </div>

            {/* RECEIPT */}
            {selectedTx.type === "deposit" && selectedTx.receipt && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
                <p className="font-semibold text-blue-700 mb-1">
                  Payment Receipt
                </p>
                <button className="text-blue-600 underline">
                  View Uploaded Receipt
                </button>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              {selectedTx.status === "pending" && (
                <>
                  <button
                    className="flex items-center gap-2 px-4 py-2
              bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    <FaCheck />
                    Approve
                  </button>

                  <button
                    className="flex items-center gap-2 px-4 py-2
              bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <FaTimes />
                    Decline
                  </button>
                </>
              )}

              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Transactions;
