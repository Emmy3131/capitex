import { useState, useEffect } from "react";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import PageLoader from "../../../components/Loader/PageLoader";
import ButtonLoader from "../../../components/Loader/ButtonLoader";
import StatusBadge from "../../../components/StatusBadge";
import api from "../../../Library/api";
import { toast } from "react-toastify";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  /* ================= FETCH TRANSACTIONS ================= */
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/me/transactions");

      if (res.data.status === "success") {
        setTransactions(res.data.data.transactions);
      }
    } catch (err) {
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  /* ================= APPROVE ================= */
  const approveTransaction = async (id) => {
    setActionLoading("approve");

    try {
      const res = await api.patch(`/transactions/${id}/action/approve`);

      if (res.data.status === "success") {
        setTransactions((prev) =>
          prev.map((tx) =>
            tx._id === id ? { ...tx, status: "approved" } : tx
          )
        );

        setSelectedTx((prev) =>
          prev ? { ...prev, status: "approved" } : null
        );

        toast.success("Transaction approved");
      }
    } catch (err) {
      toast.error("Approval failed");
    } finally {
      setActionLoading(null);
    }
  };

  /* ================= DECLINE ================= */
  const declineTransaction = async (id) => {
    setActionLoading("decline");

    try {
      const res = await api.patch(`/transactions/${id}/action/decline`);

      if (res.data.status === "success") {
        setTransactions((prev) =>
          prev.map((tx) =>
            tx._id === id ? { ...tx, status: "declined" } : tx
          )
        );

        setSelectedTx((prev) =>
          prev ? { ...prev, status: "declined" } : null
        );

        toast.success("Transaction declined");
      }
    } catch (err) {
      toast.error("Decline failed");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Admin Transactions</h1>
        <p className="text-sm text-gray-500">
          Review and manage all user transactions
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx._id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-5 py-3">{tx.user?.name}</td>

                <td className="px-5 py-3 capitalize">{tx.type}</td>

                <td className="px-5 py-3 font-semibold">
                  ${tx.amount.toLocaleString()}
                </td>

                <td className="px-5 py-3">
                  <StatusBadge status={tx.status} />
                </td>

                <td className="px-5 py-3">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-3">
                  <button
                    onClick={() => setSelectedTx(tx)}
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= TRANSACTION MODAL ================= */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white max-w-xl w-full rounded-xl p-6 space-y-6">

            {/* USER */}
            <div>
              <h3 className="font-semibold">{selectedTx.user?.name}</h3>
              <p className="text-sm text-gray-500">
                {selectedTx.user?.email}
              </p>
              <StatusBadge status={selectedTx.status} />
            </div>

            {/* DETAILS */}
            <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
              <div className="flex justify-between">
                <span>Type</span>
                <span className="capitalize">{selectedTx.type}</span>
              </div>

              <div className="flex justify-between">
                <span>Amount</span>
                <span className="font-semibold">
                  ${selectedTx.amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* RECEIPT */}
            {selectedTx.receipt && (
              <div className="space-y-2">
                <p className="text-sm font-semibold">Payment Receipt</p>

                <img
                  src={selectedTx.receipt}
                  alt="receipt"
                  className="w-24 h-24 object-cover rounded cursor-pointer"
                  onClick={() => setShowReceipt(true)}
                />

                <button
                  onClick={() => setShowReceipt(true)}
                  className="text-blue-600 text-sm underline"
                >
                  View Full Receipt
                </button>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              {selectedTx.status === "pending" && (
                <>
                  <button
                    onClick={() => approveTransaction(selectedTx._id)}
                    disabled={actionLoading !== null}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 min-w-[110px]"
                  >
                    {actionLoading === "approve" ? (
                      <ButtonLoader />
                    ) : (
                      <>
                        <FaCheck />
                        Approve
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => declineTransaction(selectedTx._id)}
                    disabled={actionLoading !== null}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 min-w-[110px]"
                  >
                    {actionLoading === "decline" ? (
                      <ButtonLoader />
                    ) : (
                      <>
                        <FaTimes />
                        Decline
                      </>
                    )}
                  </button>
                </>
              )}

              <button
                onClick={() => setSelectedTx(null)}
                className="border px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= RECEIPT PREVIEW MODAL ================= */}
      {showReceipt && selectedTx?.receipt && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl max-w-lg w-full space-y-4">

            <img
              src={selectedTx.receipt}
              alt="Receipt"
              className="w-full rounded-lg"
            />

            <div className="flex justify-end">
              <button
                onClick={() => setShowReceipt(false)}
                className="border px-4 py-2 rounded-lg"
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

export default AdminTransactions;
