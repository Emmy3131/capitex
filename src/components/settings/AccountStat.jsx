const stats = [
  { label: "Account Balance", value: "₦250,000" },
  { label: "Referral Balance", value: "₦45,000" },
  { label: "Total Referrals", value: "12" },
  { label: "Total Withdrawals", value: "₦150,000" },
];

const AccountStats = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

export default AccountStats;
