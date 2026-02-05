import { useEffect, useState } from "react";
import api from "../../../Library/api";
import PageLoader from "../../../components/Loader/PageLoader";
import { toast } from "react-toastify";

const Deposit = () => {
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ================= FETCH PAYMENT OPTIONS ================= */
  useEffect(() => {
    const fetchPaymentOptions = async () => {
      setLoading(true);
      try {
        const res = await api.get("/paymentOptions");
        if (res.data.status === "success") {
          setPaymentOptions(res.data.data.paymentOptions);
        } else {
          toast.error("Failed to fetch payment options");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load payment options");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentOptions();
  }, []);

  /* ================= HANDLE SELECT ================= */
  const handleSelect = (id) => {
    const option = paymentOptions.find((opt) => opt._id === id);
    setSelectedOption(option);
  };

  /* ================= RECEIPT HANDLER ================= */
  const handleReceiptChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG or PDF files allowed");
      return;
    }

    // Validate size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Receipt must be less than 2MB");
      return;
    }

    setReceipt(file);
  };

  /* ================= COPY ================= */
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  /* ================= CREATE TRANSACTION ================= */
  const handleDeposit = async () => {
    if (!amount || !selectedOption || !receipt) {
      toast.error("Amount, payment option and receipt are required");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("paymentOptionId", selectedOption._id);
      formData.append("type", "deposit");
      formData.append("receipt", receipt); // ✅ IMPORTANT

      const res = await api.post(
        "/users/me/transactions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === "success") {
        toast.success("Deposit submitted successfully");

        // Reset form
        setAmount("");
        setSelectedOption(null);
        setReceipt(null);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to submit deposit"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow space-y-6">
      {/* TITLE */}
      <div>
        <h2 className="text-xl font-semibold">Make a Deposit</h2>
        <p className="text-sm text-gray-500">
          Select a payment option and upload receipt
        </p>
      </div>

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Enter amount"
        className="w-full border rounded-lg p-3 border-gray-300"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* PAYMENT OPTIONS */}
      <select
        className="w-full border rounded-lg p-3 border-gray-300"
        onChange={(e) => handleSelect(e.target.value)}
        value={selectedOption?._id || ""}
      >
        <option value="">Select Payment Method</option>
        {paymentOptions.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {opt.payOption}
          </option>
        ))}
      </select>

      {/* DETAILS */}
      {selectedOption && (
        <div className="bg-gray-50 p-4 rounded-xl space-y-4">
          <div>
            <p className="text-xs text-gray-500">Bank / Wallet</p>
            <p className="font-semibold border-gray-300">{selectedOption.bank}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Account / Address</p>
            <div className="flex justify-between items-center gap-2">
              <p className="font-mono text-sm break-all">
                {selectedOption.accountNumber}
              </p>
              <button
                onClick={() =>
                  copyToClipboard(selectedOption.accountNumber)
                }
                className="text-emerald-600 text-xs "
              >
                Copy
              </button>
            </div>
          </div>

          {selectedOption.image && (
            <div className="flex justify-center">
              <img
                src={selectedOption.image}
                alt="QR"
                className="w-44 h-44 object-contain border-gray-300"
              />
            </div>
          )}
        </div>
      )}

      {/* RECEIPT UPLOAD */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Upload Payment Receipt
        </label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleReceiptChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {receipt && (
          <p className="text-xs text-green-600 mt-1">
            {receipt.name} selected
          </p>
        )}
      </div>

      {/* SUBMIT */}
      <button
        disabled={!amount || !selectedOption || !receipt || submitting}
        onClick={handleDeposit}
        className="w-full bg-emerald-600 disabled:opacity-50 text-white py-3 rounded-lg font-medium"
      >
        {submitting ? "Processing..." : "I Have Made Payment"}
      </button>
    </div>
  );
};

export default Deposit;
