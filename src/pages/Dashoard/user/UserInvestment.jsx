import InvestmentStats from "../../../components/investment/InvestmentStat";
import InvestmentTable from "../../../components/investment/InvestmentTable";
import { useNavigate } from "react-router-dom";

const Investment = () => {
  const navigate = useNavigate();

  const togglePlan = () => {
    navigate("/investmentPlan");
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Investments</h1>

        <button
          onClick={togglePlan}
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700"
        >
          Invest Now
        </button>
      </div>

      {/* Stats */}
      <InvestmentStats />

      {/* Investment Table */}
      <InvestmentTable />
    </div>
  );
};

export default Investment;
