import { Check } from "lucide-react";
import api from "../../Library/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Investment = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* =========================
     FETCH INVESTMENT PLANS
  ========================== */
  const getPlans = async () => {
    setLoading(true);
    try {
      const res = await api.get("/plans"); // ✅ correct endpoint

      if (res.data.status === "success") {
        setPlans(res.data.data.plans);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to load investment plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  /* =========================
     UI
  ========================== */
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <section className="bg-gradient-to-r from-emerald-700 to-green-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Investment Plans
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Choose a plan that matches your financial goals. All plans are secure,
          transparent, and professionally managed.
        </p>
      </section>

      {/* LOADING */}
      {loading && (
        <p className="text-center mt-10 text-gray-500">
          Loading plans...
        </p>
      )}

      {/* PLAN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="rounded-2xl p-8 shadow-lg border bg-white hover:scale-105 transition-transform"
          >
            {/* PLAN NAME */}
            <h3 className="text-2xl font-semibold mb-1">
              {plan.name}
            </h3>

            {/* DURATION */}
            <p className="text-sm text-gray-500">
              Duration: {plan.planDuration} {plan.timingParameter}
            </p>

            {/* ROI */}
            <div className="my-6">
              <p className="text-3xl font-bold text-emerald-600">
                {Number(plan.percentage ?? 0)}%
              </p>
              <p className="text-sm text-gray-500">
                Expected ROI
              </p>
            </div>

            {/* DETAILS */}
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Check size={18} className="text-emerald-600" />
                Minimum: {plan.currency}{" "}
                {Number(plan.minDeposit ?? 0).toLocaleString()}
              </li>

              <li className="flex items-center gap-2">
                <Check size={18} className="text-emerald-600" />
                Maximum: {plan.currency}{" "}
                {Number(plan.maxDeposit ?? 0).toLocaleString()}
              </li>

              <li className="flex items-center gap-2">
                <Check size={18} className="text-emerald-600" />
                {plan.returnPrincipal
                  ? "Capital Returned"
                  : "Capital Not Returned"}
              </li>

              {plan.allowReferral && (
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-emerald-600" />
                  Referral Bonus Available
                </li>
              )}
            </ul>

            {/* INVEST BUTTON */}
            <button
              onClick={() =>
                navigate("/newInvest", { state: { planId: plan._id } })
              }
              className="mt-8 w-full py-3 rounded-full font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Invest Now
            </button>
          </div>
        ))}
      </div>

      {/* DISCLAIMER */}
      <p className="text-center text-xs text-gray-500 max-w-3xl mx-auto pb-6">
        *Investments involve risk. Returns are projected and not guaranteed.
        Please invest responsibly.
      </p>
    </div>
  );
};

export default Investment;
