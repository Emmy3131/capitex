import { FaCogs, FaMoneyCheckAlt, FaChartPie, FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Manage Plans",
      icon: <FaCogs />,
      onClick: () => navigate("/admin/plans"),
    },
    {
      label: "Payment Options",
      icon: <FaMoneyCheckAlt />,
      onClick: () => navigate("/admin/payment-options"),
    },
    {
      label: "View Investments",
      icon: <FaChartPie />,
      onClick: () => navigate("/admin/investments"),
    },
    {
      label: "Manage FAQ",
      icon: <FaQuestionCircle />,
      onClick: () => navigate("/admin/faqs"),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6">
      <h2 className="font-semibold text-base sm:text-lg mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={action.onClick}
            className="
              flex items-center justify-center gap-2
              w-full
              border rounded-lg
              py-3 px-4
              text-sm font-medium
              hover:bg-gray-100
              active:scale-95
              transition
            "
          >
            <span className="text-gray-600">{action.icon}</span>
            <span className="truncate">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
