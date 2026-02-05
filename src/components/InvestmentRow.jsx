import { useEffect, useState } from "react";
import api from "../Library/api";
import PageLoader from "./Loader/PageLoader";

const InvestmentRow = () => {
  const [latestInvestment, setLatestInvestment] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ======================
     FETCH INVESTMENTS
  ====================== */
  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/investments");

      if (res.data.status === "success") {
        const investments = res.data.data.investments || [];

        if (investments.length > 0) {
          // Sort by newest first (safest approach)
          const sorted = investments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setLatestInvestment(sorted[0]);
        } else {
          setLatestInvestment(null);
        }
      }
    } catch (err) {
      console.error("Failed to fetch investments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  /* ======================
     STATES
  ====================== */
  if (loading) return <PageLoader />;

  if (!latestInvestment) {
    return (
      <p className="text-sm text-gray-500 text-center">
        No active investments
      </p>
    );
  }

  /* ======================
     CALCULATIONS
  ====================== */
  const start = new Date(latestInvestment.createdAt);
  const end = new Date(latestInvestment.expiryDate);
  const now = new Date();

  const totalDays =
    (end - start) / (1000 * 60 * 60 * 24);

  const elapsedDays =
    (now - start) / (1000 * 60 * 60 * 24);

  const remainingDays = Math.max(
    Math.ceil(totalDays - elapsedDays),
    0
  );

  const progress = Math.min(
    Math.round((elapsedDays / totalDays) * 100),
    100
  );

  /* ======================
     UI
  ====================== */
  return (
    <div className="border rounded-lg p-4 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="font-medium">
          {latestInvestment.plan?.name || "Investment"}
        </p>
        <span
          className={`text-sm font-medium ${
            latestInvestment.status === "active"
              ? "text-emerald-600"
              : "text-gray-500"
          }`}
        >
          {latestInvestment.status}
        </span>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <p>Start: {start.toLocaleDateString()}</p>
        <p>End: {end.toLocaleDateString()}</p>
        <p>Duration: {Math.round(totalDays)} days</p>
        <p>Remaining: {remainingDays} days</p>
      </div>

      {/* Progress */}
      <div>
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-emerald-600 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {progress}% completed
        </p>
      </div>
    </div>
  );
};

export default InvestmentRow;
