import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../Library/api";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const PaymentOptionsList = () => {
  const [paymentOptions, setPaymentOptions] = useState([]);
  const navigate = useNavigate();

  const fetchPaymentOptions = async () => {
    try {
      const res = await api.get("/paymentOptions");
      setPaymentOptions(res.data.data.paymentOptions || []);
    } catch (err) {
      toast.error("Failed to load payment options");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment option?")) return;

    try {
      await api.delete(`/paymentOptions/${id}`);
      toast.success("Payment option deleted");
      setPaymentOptions((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchPaymentOptions();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Payment Options</h2>

        <button
          onClick={() => navigate("/admin/payment-options/create")}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Payment Option
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr className="text-left">
            <th className="p-3">Type</th>
            <th className="p-3">Bank / Network</th>
            <th className="p-3">Account Number / Wallet Address</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paymentOptions.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-400">
                No payment options found
              </td>
            </tr>
          ) : (
            paymentOptions.map((opt) => (
              <tr key={opt._id} className="border-b  border-gray-100">
                <td className="p-3">{opt.payOption}</td>
                <td>{opt.bank}</td>
                <td>{opt.accountNumber}</td>
                <td className="flex gap-3 mt-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/payment-options/:id/edit/${opt._id}`)
                    }
                    className="text-emerald-600"
                  >
                    
                    < FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(opt._id)}
                    className="text-red-600"
                  >
                  <FaTrashAlt/>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentOptionsList;
