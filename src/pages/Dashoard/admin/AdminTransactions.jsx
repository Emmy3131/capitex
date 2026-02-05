import { useState, useEffect } from "react";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import PageLoader from "../../../components/Loader/PageLoader";
import StatusBadge from "../../../components/StatusBadge";
import api from "../../../Library/api";
import { toast } from "react-toastify";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  /* ================= FETCH ALL TRANSACTIONS ================= */
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/me/transactions");
      if (res.data.status === "success") {
        console.log("Fetched transactions:", res.data);
        setTransactions(res.data.data.transactions);
      }
    } catch (err) {
      console.error(err);
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
    setActionLoading(true);
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
      console.error(err);
      toast.error("Approval failed");
    } finally {
      setActionLoading(false);
    }
  };

  /* ================= DECLINE ================= */
  const declineTransaction = async (id) => {
    setActionLoading(true);
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
      console.error(err);
      toast.error("Decline failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <PageLoader />;

  const isDeposit = selectedTx?.type === "deposit";
  const isWithdrawal = selectedTx?.type === "withdrawal";

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
              <tr key={tx._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-5 py-3 flex items-center gap-3">
                  {tx.user.name}
                </td>

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

      {/* ================= MODAL ================= */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white max-w-xl w-full rounded-xl p-6 space-y-6">

            {/* USER */}
            <div className="flex items-center gap-4">
              <img
                src={selectedTx.user.photo}
                className="w-14 h-14 rounded-full"
                alt=""
              />
              <div>
                <h3 className="font-semibold">{selectedTx.user.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedTx.user.email}
                </p>
                <StatusBadge status={selectedTx.status} />
              </div>
            </div>

            {/* BASIC DETAILS */}
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

            {/* ===== DEPOSIT → RECEIPT ===== */}
            {isDeposit && selectedTx.receipt && (
              <>
                <button
                  onClick={() => setShowReceipt(true)}
                  className="text-blue-600 underline"
                >
                  View Receipt
                </button>

                {showReceipt && (
                  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white max-w-3xl w-full p-4 rounded-xl relative">
                      <button
                        onClick={() => setShowReceipt(false)}
                        className="absolute top-3 right-3"
                      >
                        ✕
                      </button>

                      {selectedTx.receipt.match(/\.(jpg|jpeg|png)$/i) && (
                        <img
                          src={selectedTx.receipt}
                          className="w-full max-h-[70vh] object-contain"
                          alt=""
                        />
                      )}

                      {selectedTx.receipt.match(/\.pdf$/i) && (
                        <iframe
                          src={selectedTx.receipt}
                          className="w-full h-[70vh]"
                          title="Receipt"
                        />
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ===== WITHDRAWAL → BANK DETAILS ===== */}
            {isWithdrawal && selectedTx.bankDetails && (
              <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
                <h4 className="font-semibold">Withdrawal Account</h4>

                <div className="flex justify-between">
                  <span>Bank</span>
                  <span>{selectedTx.bankDetails.bankName}</span>
                </div>

                <div className="flex justify-between">
                  <span>Account Name</span>
                  <span>{selectedTx.bankDetails.accountName}</span>
                </div>

                <div className="flex justify-between">
                  <span>Account Number</span>
                  <span className="font-mono">
                    {selectedTx.bankDetails.accountNumber}
                  </span>
                </div>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              {selectedTx.status === "pending" && (
                <>
                  <button
                    onClick={() => approveTransaction(selectedTx._id)}
                    disabled={actionLoading}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    <FaCheck /> Approve
                  </button>

                  <button
                    onClick={() => declineTransaction(selectedTx._id)}
                    disabled={actionLoading}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    <FaTimes /> Decline
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
    </div>
  );
};

export default AdminTransactions;
