import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../../../Library/api";
import PageLoader from "../../../../components/Loader/PageLoader";

const PlansList = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPlans = async () => {
    setLoading(true);
    try {
      const res = await api.get("/plans");
      if (res.data.status === "success") {
        setPlans(res.data.data.plans);
      }
    } catch (err) {
      toast.error("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await api.delete(`/plans/${id}`);
      toast.success("Plan deleted");
      setPlans((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error("Failed to delete plan");
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Investment Plans</h1>
        <Link
          to="/admin/plans/create"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Create Plan
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Min</th>
              <th className="px-4 py-3">Max</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">ROI %</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan._id} className="border-t border-gray-300">
                <td className="px-4 py-3 font-medium">{plan.name}</td>
                <td className="px-4 py-3">{plan.minDeposit}</td>
                <td className="px-4 py-3">{plan.maxDeposit}</td>
                <td className="px-4 py-3">
                  {plan.planDuration} {plan.timingParameter}
                </td>
                <td className="px-4 py-3">{plan.percentage}%</td>
                <td className="px-4 py-3 flex gap-7">
                  <Link
                    to={`/admin/plans/${plan._id}/edit`}
                    className="text-blue-600"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => deletePlan(plan._id)}
                    className="text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {plans.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No plans created
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlansList;
