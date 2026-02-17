import { useEffect, useState } from "react";
import api from "../../../Library/api";
import PageLoader from "../../../components/Loader/PageLoader";
import { toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Deposit = () => {
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [btcEquivalent, setBtcEquivalent] = useState("");
  const [btcPrice, setBtcPrice] = useState(null);

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

  /* ================= FETCH BTC PRICE ================= */
  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );

        const data = await res.json();

        setBtcPrice(data.bitcoin.usd);
      } catch (err) {
        console.error("BTC price error", err);
      }
    };

    fetchBTCPrice();

    // refresh every 60 seconds
    const interval = setInterval(fetchBTCPrice, 60000);

    return () => clearInterval(interval);
  }, []);


  /* ================= CALCULATE BTC ================= */
  useEffect(() => {
    if (!amount || !btcPrice) {
      setBtcEquivalent("");
      return;
    }

    const btc = Number(amount) / btcPrice;

    setBtcEquivalent(btc.toFixed(6)); // 6 decimals
  }, [amount, btcPrice]);


  /* ================= HANDLE SELECT ================= */
  const handleSelect = (id) => {
    const option = paymentOptions.find((opt) => opt._id === id);
    setSelectedOption(option);
  };

  /* ================= RECEIPT HANDLER ================= */
  const handleReceiptChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG or PDF allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Receipt must be less than 2MB");
      return;
    }

    setReceipt(file);
  };

  /* ================= COPY ================= */
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Wallet copied");
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
      formData.append("receipt", receipt);

      const res = await api.post("/users/me/transactions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === "success") {
        toast.success("Deposit submitted successfully");

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
    <div className="relative min-h-screen bg-gray-50 py-6">

      {/* BACK BUTTON */}
      <Link
        to={"/transactions"}
        className="
          fixed top-18 md:top-5 left-1 md:left-69
          flex items-center justify-center
          w-10 h-10 md:w-11 md:h-11
          rounded-full
          bg-white
          text-emerald-600
          shadow-md
          border border-emerald-100
          hover:bg-emerald-600
          hover:text-white
          hover:shadow-lg
          active:scale-95
          transition-all duration-200
          z-50
        "
      >
        <FaArrowLeftLong className="text-lg md:text-xl" />
      </Link>

      {/* MAIN CARD */}
      <div className="md:w-4xl max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">

        {/* TITLE */}
        <div>
          <h2 className="text-xl font-semibold">Make a Deposit</h2>
          <p className="text-sm text-gray-500">
            Select crypto and upload receipt after payment
          </p>
        </div>

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Enter amount USD"
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="BTC equivalent"
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          value={btcEquivalent ? `${btcEquivalent} BTC` : ""}
          readOnly
        />

        {/* PAYMENT OPTIONS */}
        <select
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          onChange={(e) => handleSelect(e.target.value)}
          value={selectedOption?._id || ""}
        >
          <option value="">Select Crypto Payment</option>

          {paymentOptions.map((opt) => (
            <option key={opt._id} value={opt._id}>
              {opt.cryptoName || opt.bank}
              {opt.network ? ` - ${opt.network}` : ""}
            </option>
          ))}
        </select>

        {/* DETAILS */}
        {selectedOption && (
          <div className="border border-emerald-300 rounded-lg px-3 py-4 text-sm font-mono space-y-3">

            {/* METHOD */}
            <div>
              <p className="text-xs text-gray-500">Payment Method</p>
              <p className="font-semibold">
                {selectedOption.cryptoName ||
                  selectedOption.payOption}
              </p>
            </div>

            {/* NETWORK */}
            <div>
              <p className="text-xs text-gray-500">Network</p>
              <p className="font-semibold">
                {selectedOption.network ||
                  selectedOption.bank}
              </p>
            </div>

            {/* WALLET */}
            <div>
              <p className="text-xs text-gray-500">Wallet Address</p>

              <div className="flex justify-between items-center gap-2">
                <p className="font-mono text-sm break-all">
                  {selectedOption.walletAddress ||
                    selectedOption.accountNumber}
                </p>

                <button
                  onClick={() =>
                    copyToClipboard(
                      selectedOption.walletAddress ||
                      selectedOption.accountNumber
                    )
                  }
                  className="text-emerald-600 text-xs font-semibold"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* QR IMAGE */}
            {selectedOption.image && (
              <div className="flex justify-center">
                <img
                  src={
                    selectedOption.image.startsWith("http")
                      ? selectedOption.image
                      : `${import.meta.env.VITE_API_URL
                      }/${selectedOption.image}`
                  }
                  alt="QR"
                  className="w-44 h-44 object-contain border border-emerald-300 rounded-lg p-2"
                />
              </div>
            )}

          </div>
        )}

        {/* RECEIPT */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Payment Receipt
          </label>

          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleReceiptChange}
            className="w-full border border-emerald-300 rounded-lg p-2"
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
          className="w-full bg-emerald-600 disabled:opacity-50 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
        >
          {submitting ? "Processing..." : "I Have Made Payment"}
        </button>

      </div>
    </div>
  );
};

export default Deposit;
