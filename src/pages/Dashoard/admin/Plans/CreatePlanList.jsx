import { useState } from "react";
import api from "../../../../Library/api";
import { toast } from "react-toastify";
import ButtonLoader from "../../../../components/Loader/ButtonLoader";

const CreatePlan = () => {
  const [loading, setLoading] = useState(false);

  // UI STATE
  const [formData, setFormData] = useState({
    name: "",
    minDeposit: "",
    maxDeposit: "",
    planDuration: "",
    timingParameter: "days", // UI value: days | weeks | months
    percentage: "",
    referalBonus: "",
    allowReferral: true,
    currency: "USD",
    returnPrincipal: true,
  });

  /* =========================
     HANDLE INPUT CHANGE
  ========================== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =========================
     NORMALIZE DURATION
     Backend accepts ONLY:
     timingParameter: "hours" | "days"
  ========================== */
  const normalizeDuration = () => {
    const duration = Number(formData.planDuration);

    if (formData.timingParameter === "weeks") {
      return {
        planDuration: duration * 7,
        timingParameter: "days",
      };
    }

    if (formData.timingParameter === "months") {
      return {
        planDuration: duration * 30,
        timingParameter: "days",
      };
    }

    // days (default)
    return {
      planDuration: duration,
      timingParameter: "days",
    };
  };

  /* =========================
     VALIDATION
  ========================== */
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Plan name is required");
      return false;
    }

    if (Number(formData.minDeposit) <= 0) {
      toast.error("Minimum deposit must be greater than 0");
      return false;
    }

    if (Number(formData.maxDeposit) <= Number(formData.minDeposit)) {
      toast.error("Max deposit must be greater than min deposit");
      return false;
    }

    if (Number(formData.planDuration) < 1) {
      toast.error("Plan duration must be at least 1");
      return false;
    }

    if (Number(formData.percentage) <= 0) {
      toast.error("ROI percentage must be greater than 0");
      return false;
    }

    return true;
  };

  /* =========================
     SUBMIT FORM
  ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const normalized = normalizeDuration();

      const payload = {
        name: formData.name,
        minDeposit: Number(formData.minDeposit),
        maxDeposit: Number(formData.maxDeposit),
        planDuration: normalized.planDuration,
        timingParameter: normalized.timingParameter, // ✅ hours | days only
        percentage: Number(formData.percentage),
        referalBonus: Number(formData.referalBonus || 0),
        allowReferral: formData.allowReferral,
        currency: formData.currency,
        returnPrincipal: formData.returnPrincipal,
      };

      const res = await api.post("/plans", payload);

      if (res.data.status === "success") {
        toast.success("Plan created successfully");

        // RESET FORM
        setFormData({
          name: "",
          minDeposit: "",
          maxDeposit: "",
          planDuration: "",
          timingParameter: "days",
          percentage: "",
          referalBonus: "",
          allowReferral: true,
          currency: "USD",
          returnPrincipal: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create plan");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================== */
  return (
    <div className="max-w-3xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">Create Investment Plan</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* PLAN NAME */}
        <div>
          <label className="block text-sm mb-1">Plan Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* CURRENCY */}
        <div>
          <label className="block text-sm mb-1">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="USD">USD</option>
            <option value="NGN">NGN</option>
          </select>
        </div>

        {/* MIN DEPOSIT */}
        <div>
          <label className="block text-sm mb-1">Minimum Deposit</label>
          <input
            type="number"
            name="minDeposit"
            value={formData.minDeposit}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* MAX DEPOSIT */}
        <div>
          <label className="block text-sm mb-1">Maximum Deposit</label>
          <input
            type="number"
            name="maxDeposit"
            value={formData.maxDeposit}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* DURATION */}
        <div>
          <label className="block text-sm mb-1">Plan Duration</label>

          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              name="planDuration"
              value={formData.planDuration}
              onChange={handleChange}
              className="w-1/2 border rounded px-3 py-2"
              required
            />

            <select
              name="timingParameter"
              value={formData.timingParameter}
              onChange={handleChange}
              className="w-1/2 border rounded px-3 py-2"
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Stored as{" "}
            {formData.timingParameter === "months"
              ? formData.planDuration * 30
              : formData.timingParameter === "weeks"
              ? formData.planDuration * 7
              : formData.planDuration}{" "}
            days
          </p>
        </div>

        {/* ROI */}
        <div>
          <label className="block text-sm mb-1">ROI Percentage (%)</label>
          <input
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* REFERRAL BONUS */}
        <div>
          <label className="block text-sm mb-1">Referral Bonus (%)</label>
          <input
            type="number"
            name="referalBonus"
            value={formData.referalBonus}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* TOGGLES */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="allowReferral"
            checked={formData.allowReferral}
            onChange={handleChange}
          />
          <span className="text-sm">Allow Referral</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="returnPrincipal"
            checked={formData.returnPrincipal}
            onChange={handleChange}
          />
          <span className="text-sm">Return Principal</span>
        </div>

        {/* SUBMIT */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {loading ? <ButtonLoader /> : "Create Plan"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreatePlan;
