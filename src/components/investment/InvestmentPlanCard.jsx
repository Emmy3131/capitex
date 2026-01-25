import { useNavigate } from "react-router-dom";

const InvestmentPlanCard = ({ plan }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      {/* Plan Name */}
      <h3 className="text-xl font-semibold mb-3">
        {plan.name}
      </h3>

      {/* Plan Info */}
      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-medium">Duration:</span>{" "}
          {plan.planDuration} {plan.timingParameter}
        </p>

        <p>
          <span className="font-medium">Profit:</span>{" "}
          <span className="text-emerald-600">
            {plan.percentage}%
          </span>
        </p>

        <p>
          <span className="font-medium">Deposit Range:</span>{" "}
          {plan.currency} {plan.minDeposit} – {plan.maxDeposit}
        </p>

        <p>
          <span className="font-medium">Referral Bonus:</span>{" "}
          {plan.allowReferral ? `${plan.referalBonus}%` : "Not available"}
        </p>

        <p>
          <span className="font-medium">Capital Returned:</span>{" "}
          {plan.returnPrincipal ? "Yes" : "No"}
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate(`/invest/${plan._id}`)}
        className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg"
      >
        Invest Now
      </button>
    </div>
  );
};

export default InvestmentPlanCard;
