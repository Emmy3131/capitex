import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Deposit",
      color: "bg-emerald-600",
      path: "/deposit",
    },
    {
      label: "Withdraw",
      color: "bg-blue-600",
      path: "/withdraw",
    },
    {
      label: "My Bank Accounts",
      color: "bg-gray-700",
      path: "/banks",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => navigate(action.path)}
          className={`${action.color} text-white py-3 rounded-lg font-medium hover:opacity-90`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
