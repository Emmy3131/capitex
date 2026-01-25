import { useEffect, useState } from "react";
import api from "../../../Library/api";
import InvestmentPlanCard from "../../../components/investment/InvestmentPlanCard";
import PageLoader from "../../../components/Loader/PageLoader";

const InvestmentPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await api.get("/investments");

      if (res.data?.status === "success") {
        setPlans(res.data.data.plans || res.data.data);
      }
    } catch (err) {
      console.error(
        "Error fetching investment plans:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Available Investment Plans</h1>
        <p className="text-gray-500">
          Choose a plan that fits your financial goal
        </p>
      </div>

      {/* Plans Grid */}
      {plans.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No investment plans available
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <InvestmentPlanCard
              key={plan._id}
              plan={plan}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InvestmentPlans;
