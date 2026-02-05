import { useState } from "react";
import api from "../../Library/api";
import { toast } from "react-toastify";

const AddWalletModal = ({ onClose, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    walletNetwork: "",
    walletAddress: "",
  });

  /* =====================
     HANDLE INPUT CHANGE
  ===================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================
     VALIDATION
  ===================== */
  const validate = () => {
    const { walletNetwork, walletAddress } = formData;

    if (!walletNetwork || !walletAddress) {
      toast.error("All fields are required");
      return false;
    }

    if (walletAddress.length < 10) {
      toast.error("Invalid wallet address");
      return false;
    }

    return true;
  };

  /* =====================
     SUBMIT FORM
  ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const res = await api.post("/users/me/banks", formData);

      if (res.data.status === "success") {
        toast.success("Wallet added successfully");
        onSuccess?.();
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to add wallet"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg relative">
        {/* HEADER */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Add Wallet
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Add a withdrawal wallet address
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* WALLET NETWORK */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Network
            </label>
            <select
              name="walletNetwork"
              value={formData.walletNetwork}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">Select network</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ERC20)</option>
              <option value="USDT_TRC20">USDT (TRC20)</option>
              <option value="USDT_ERC20">USDT (ERC20)</option>
            </select>
          </div>

          {/* WALLET ADDRESS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              name="walletAddress"
              placeholder="Enter wallet address"
              value={formData.walletAddress}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border rounded-lg py-2 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="w-1/2 bg-emerald-600 text-white rounded-lg py-2 text-sm
                         hover:bg-emerald-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Wallet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWalletModal;
