import { useState } from "react";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";

const Transactions = () => {
  const [selectedTx, setSelectedTx] = useState(null);

  const transactions = [
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      photo: "https://i.pravatar.cc/100?img=12",
      type: "deposit",
      amount: 50000,
      status: "pending",
      date: "2025-01-10",
      receipt: true,
    },
    {
      id: 2,
      user: "Mary Smith",
      email: "mary@example.com",
      photo: "https://i.pravatar.cc/100?img=22",
      type: "investment",
      amount: 120000,
      status: "success",
      date: "2025-01-08",
      receipt: false,
    },
  ];

  const statusStyle = {
    pending: "bg-yellow-100 text-yellow-700",
    success: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    declined: "bg-gray-200 text-gray-700",
  };

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
              <tr>
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
          <div className="bg-white rounded-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedTx.photo}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">
                  {selectedTx.user}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedTx.email}
                </p>
              </div>
            </div>

            <div className="text-sm space-y-2">
              <p><strong>Type:</strong> {selectedTx.type}</p>
              <p><strong>Amount:</strong> ₦{selectedTx.amount.toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedTx.status}</p>
              <p><strong>Date:</strong> {selectedTx.date}</p>

              {selectedTx.type === "deposit" && selectedTx.receipt && (
                <p className="text-blue-600 underline cursor-pointer">
                  View Receipt
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              {selectedTx.status === "pending" && (
                <>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg">
                    <FaCheck /> Approve
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg">
                    <FaTimes /> Decline
                  </button>
                </>
              )}

              {selectedTx.status === "success" && (
                <button className="px-4 py-2 bg-gray-300 rounded-lg">
                  Decline
                </button>
              )}

              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 border rounded-lg"
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
