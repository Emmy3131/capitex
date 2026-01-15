const stats = [
  { label: "Total Profit", value: "₦120,000" },
  { label: "Total Investments", value: "5" },
  { label: "Amount Invested", value: "₦500,000" },
];

const InvestmentStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-5 rounded-xl shadow"
        >
          <p className="text-sm text-gray-500">{stat.label}</p>
          <h3 className="text-xl font-semibold mt-1">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default InvestmentStats;
