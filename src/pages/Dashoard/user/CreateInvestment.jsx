import { useEffect, useState } from "react";
import api from "../../../Library/api";
import ButtonLoader from "../../../components/Loader/ButtonLoader";
import { toast } from "react-toastify";

const CreateInvestment = () => {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [wallet, setWallet] = useState(null);

  const [formData, setFormData] = useState({
    planId: "",
    amount: "",
    paymentMethod: "wallet",
  });

  /* =========================
     FETCH PLANS
  ========================== */
  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans");

      if (res.data.status === "success") {
        setPlans(res.data.data.plans);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load investment plans");
    }
  };

  /* =========================
     FETCH USER STATS (WALLET)
  ========================== */
  const getUserStats = async () => {
    try {
      const res = await api.get("/stats/users");

      if (res.data.status === "success") {
        setWallet(res.data.data.stats.wallet);
      }
    } catch (err) {
      console.error("Failed to fetch user stats", err);
      toast.error("Failed to load wallet balance");
    }
  };

  /* =========================
     HANDLE INPUT CHANGE
  ========================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     SUBMIT INVESTMENT
  ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      return toast.error("User not found");
    }

    const selectedPlan = plans.find(
      (p) => p._id === formData.planId
    );

    if (!selectedPlan) {
      return toast.error("Please select a valid plan");
    }

    const amount = Number(formData.amount);

    if (!amount || amount <= 0) {
      return toast.error("Enter a valid investment amount");
    }

    if (amount < selectedPlan.minDeposit) {
      return toast.error(
        `Minimum investment is ${selectedPlan.currency} ${selectedPlan.minDeposit.toLocaleString()}`
      );
    }

    if (amount > selectedPlan.maxDeposit) {
      return toast.error(
        `Maximum investment is ${selectedPlan.currency} ${selectedPlan.maxDeposit.toLocaleString()}`
      );
    }

    // WALLET CHECK
    if (
      formData.paymentMethod === "wallet" &&
      wallet &&
      amount > wallet.balance
    ) {
      return toast.error(
        "Insufficient wallet balance. Kindly fund your wallet and try again."
      );
    }

    setLoading(true);

    try {
      const payload = {
        plan: formData.planId,
        user: userId,
        amount,
      };

      const res = await api.post("/investments", payload);

      if (res.data.status === "success") {
        toast.success("Investment created successfully");
        setFormData({
          planId: "",
          amount: "",
          paymentMethod: "wallet",
        });
        getUserStats(); // refresh wallet
      }
    } catch (err) {
      console.error(err);

      const errorResponse = err?.response?.data;

      if (errorResponse?.errors) {
        const firstError = Object.values(errorResponse.errors)[0];
        toast.error(firstError);
      } else if (errorResponse?.message) {
        toast.error(errorResponse.message);
      } else {
        toast.error("Investment failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INIT LOAD
  ========================== */
  useEffect(() => {
    fetchPlans();
    getUserStats();
  }, []);

  /* =========================
     UI
  ========================== */
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">
        New Investment
      </h2>

      {/* WALLET BALANCE */}
      <div className="mb-6 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white p-5 rounded-xl">
        <p className="text-sm opacity-90">Available Balance</p>
        <h3 className="text-3xl font-bold mt-1">
          ${Number(wallet?.balance ?? 0).toLocaleString()}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">

        {/* PLAN SELECT */}
        <div>
          <label className="block text-sm mb-1">Select Plan</label>
          <select
            name="planId"
            value={formData.planId}
            onChange={handleChange}
            className="w-full border-2 border-emerald-200 rounded px-3 py-2 
focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"

            required
          >
            <option value="">-- Select Plan --</option>

            {plans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.name} — {plan.percentage}% in{" "}
                {plan.planDuration} {plan.timingParameter}
                {" "} (Min: {plan.currency}{" "}
                {plan.minDeposit.toLocaleString()} – Max:{" "}
                {plan.currency}{" "}
                {plan.maxDeposit.toLocaleString()})
              </option>
            ))}
          </select>
        </div>

        {/* AMOUNT */}
        <div>
          <label className="block text-sm mb-1">
            Investment Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border-2 border-emerald-200 rounded px-3 py-2 
focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
"
            required
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700"
        >
          {loading ? <ButtonLoader /> : "Confirm Investment"}
        </button>
      </form>
    </div>
  );
};

export default CreateInvestment;
