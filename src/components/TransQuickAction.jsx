const QuickActions = () => {
  const actions = [
    { label: "Deposit", color: "bg-emerald-600" },
    { label: "Withdraw", color: "bg-blue-600" },
    { label: "My Bank Accounts", color: "bg-gray-700" },
    { label: "Fund Wallet Now", color: "bg-purple-600" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          className={`${action.color} text-white py-3 rounded-lg font-medium hover:opacity-90`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
