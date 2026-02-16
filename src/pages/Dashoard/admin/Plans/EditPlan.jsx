import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../Library/api";
import PageLoader from "../../../../components/Loader/PageLoader";
import { Link } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6";

const EditPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    minDeposit: "",
    maxDeposit: "",
    planDuration: "",
    timingParameter: "hours",
    percentage: "",
    referalBonus: "",
    allowReferral: true,
    currency: "USD",
    returnPrincipal: true,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch existing plan
  const getPlan = async () => {
    try {
      const res = await api.get(`/plans/${id}`);
      if (res.data.status === "success") {
        const plan = res.data.data.plan;
        setForm({
          name: plan.name,
          minDeposit: plan.minDeposit,
          maxDeposit: plan.maxDeposit,
          planDuration: plan.planDuration,
          timingParameter: plan.timingParameter,
          percentage: plan.percentage,
          referalBonus: plan.referalBonus,
          allowReferral: plan.allowReferral,
          currency: plan.currency,
          returnPrincipal: plan.returnPrincipal,
        });
      }
    } catch (err) {
      toast.error("Failed to fetch plan");
      navigate("/admin/plans");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    getPlan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.patch(`/plans/${id}`, form);
      toast.success("Plan updated successfully");
      navigate("/admin/plans");
    } catch {
      toast.error("Failed to update plan");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <PageLoader />;

  return (
    <div className="relative min-h-screen bg-gray-50 py-6">
           <Link
        to={"/admin/plans"}
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
      <div className="max-w-2xl bg-white p-6 m-auto rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Edit Plan</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          name="name"
          placeholder="Plan name"
          value={form.name}
          onChange={handleChange}
          className="input"
        />
        <input
          name="minDeposit"
          type="number"
          placeholder="Min Deposit"
          value={form.minDeposit}
          onChange={handleChange}
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <input
          name="maxDeposit"
          type="number"
          placeholder="Max Deposit"
          value={form.maxDeposit}
          onChange={handleChange}
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <input
          name="planDuration"
          type="number"
          placeholder="Duration"
          value={form.planDuration}
          onChange={handleChange}
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <input
          name="percentage"
          type="number"
          placeholder="ROI %"
          value={form.percentage}
          onChange={handleChange}
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
        <input
          name="referalBonus"
          type="number"
          placeholder="Referral Bonus %"
          value={form.referalBonus}
          onChange={handleChange}
          className="w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="allowReferral"
            checked={form.allowReferral}
            onChange={handleChange}
          />
          Allow Referral
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="returnPrincipal"
            checked={form.returnPrincipal}
            onChange={handleChange}
          
          />
          Return Principal
        </label>

        <button
          type="submit"
          className={`bg-emerald-600 text-white px-4 py-2 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Plan"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditPlan;
