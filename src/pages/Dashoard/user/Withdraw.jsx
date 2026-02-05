import api from "../../../Library/api";
import { useEffect, useState } from "react";
import PageLoader from "../../../components/Loader/PageLoader";
import { toast } from "react-toastify";

const Withdraw = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* =========================
     STATE
  ========================== */
  const [wallet, setWallet] = useState({ balance: 0 });
  const [banks, setBanks] = useState([]);
  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [amount, setAmount] = useState("");

  /* =========================
     FETCH WALLET BALANCE
  ========================== */
  const getUserStats = async () => {
    try {
      const res = await api.get("/stats/users");

      if (res.data.status === "success") {
        setWallet(res.data.data.stats.wallet);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load wallet balance");
    }
  };

  /* =========================
     FETCH USER BANKS
  ========================== */
  const fetchBanks = async () => {
    try {
      const res = await api.get("/users/me/banks");

      if (res.data.status === "success") {
        const accounts =
          res.data.data.accounts || res.data.data.banks || [];

        setBanks(accounts);

        if (accounts.length > 0) {
          setSelectedBankId(accounts[0]._id);
          setSelectedBank(accounts[0]);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bank details");
    }
  };

  /* =========================
     INIT
  ========================== */
  useEffect(() => {
    const init = async () => {
      await Promise.all([getUserStats(), fetchBanks()]);
      setLoading(false);
    };

    init();
  }, []);

  /* =========================
     BANK CHANGE
  ========================== */
  const handleBankChange = (e) => {
    const bankId = e.target.value;
    setSelectedBankId(bankId);

    const bank = banks.find((b) => b._id === bankId);
    setSelectedBank(bank);
  };

  /* =========================
     VALIDATION
  ========================== */
  const validateWithdraw = () => {
    if (!selectedBank) {
      toast.error("Please select a bank account");
      return false;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return false;
    }

    if (Number(amount) > wallet.balance) {
      toast.error("Insufficient wallet balance");
      return false;
    }

    return true;
  };

  /* =========================
     SUBMIT WITHDRAWAL
  ========================== */
  const handleWithdraw = async (e) => {
  e.preventDefault();

  if (!validateWithdraw()) return;

  setSubmitting(true);

  try {
    const payload = {
      amount: Number(amount),
      type: "withdrawal",
      pay_option: "balance",

      bankId: selectedBank._id,
      bankDetails: {
        bankName: selectedBank.bankName,
        accountName: selectedBank.accountName,
        accountNumber: selectedBank.accountNumber,
      },
    };

    const res = await api.post("/users/me/transactions", payload);

    if (res.data.status === "success") {
      toast.success("Withdrawal request submitted");

      // update wallet locally
      setWallet((prev) => ({
        ...prev,
        balance: prev.balance - Number(amount),
      }));

      setAmount("");
    }
  } catch (err) {
    console.error(err);
    toast.error(
      err.response?.data?.message || "Error creating transaction"
    );
  } finally {
    setSubmitting(false);
  }
};



  if (loading) return <PageLoader />;

  return (
    <div className="max-w-2xl m-auto bg-white rounded-xl shadow p-6 space-y-6">
      <h2 className="text-xl font-semibold">Withdraw Funds</h2>

      {/* WALLET */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">Available Balance</p>
        <p className="text-2xl font-bold text-emerald-600">
          ${Number(wallet.balance).toLocaleString()}
        </p>
      </div>

      {/* BANK SELECT */}
      {banks.length > 0 ? (
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-600">
            Withdrawal Bank
          </label>

          <select
            value={selectedBankId}
            onChange={handleBankChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
          >
            {banks.map((bank) => (
              <option key={bank._id} value={bank._id}>
                {bank.bankName} • {bank.accountNumber.slice(-4)}
              </option>
            ))}
          </select>

          {selectedBank && (
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="font-semibold">{selectedBank.bankName}</p>
              <p className="text-sm text-gray-600">
                {selectedBank.accountName}
              </p>
              <p className="text-sm text-gray-500">
                {selectedBank.accountNumber}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          Please add your bank details before withdrawing.
        </div>
      )}

      {/* WITHDRAW FORM */}
      <form onSubmit={handleWithdraw} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Withdrawal Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting || !selectedBank}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          {submitting ? "Processing..." : "Withdraw"}
        </button>
      </form>

      <p className="text-xs text-gray-500">
        Withdrawals are processed within 24 hours.
      </p>
    </div>
  );
};

export default Withdraw;
