import {
  FaTachometerAlt,
  FaUsers,
  FaExchangeAlt,
  FaChartLine,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";

const SidebarLinks = {
  admin: [
    { to: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/admin/manage-users", label: "Users", icon: <FaUsers /> },
    { to: "/admin/plans", label: "Plans", icon: <FaUsers /> },
    { to: "/admin/transactions", label: "Transactions", icon: <FaExchangeAlt /> },
    { to: "/admin/investments", label: "Investments", icon: <FaChartLine /> },
    { to: "/admin/payment-options", label: "Payment Options", icon: <FaExchangeAlt />},
    { to: "/admin/faqs", label: "Manage FAQs", icon:  <FaChartLine />},
    { to: "/admin/profile", label: "Profile", icon: <FaUserCircle /> },
  ],
  user: [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/investments", label: "Investments", icon: <FaChartLine /> },
    { to: "/transactions", label: "Transactions", icon: <FaExchangeAlt /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
  ],
};

export default SidebarLinks;
