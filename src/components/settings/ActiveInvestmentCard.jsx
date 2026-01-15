const investment = {
  start: "2026-01-01 10:00",
  end: "2026-02-01 10:00",
  duration: "30 days",
  remaining: "12 days",
  progress: 60,
};

const ActiveInvestmentCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h3 className="text-lg font-semibold">Active Investment</h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Start Date</p>
          <p>{investment.start}</p>
        </div>
        <div>
          <p className="text-gray-500">End Date</p>
          <p>{investment.end}</p>
        </div>
        <div>
          <p className="text-gray-500">Duration</p>
          <p>{investment.duration}</p>
        </div>
        <div>
          <p className="text-gray-500">Time Remaining</p>
          <p>{investment.remaining}</p>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{investment.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-emerald-600 h-2 rounded-full"
            style={{ width: `${investment.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveInvestmentCard;
