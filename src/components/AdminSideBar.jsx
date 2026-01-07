import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaWallet,
  FaExchangeAlt,
  FaChartLine,
  FaUserCircle,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import Brand from "./Brand";

const AdminSideBar = ({ isOpen, onClose }) => {
  const linkStyle =
    "flex items-center gap-3 px-5 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition";

  const activeStyle =
    "bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow";

  return (
    <>
      {/* Overlay (mobile & tablet) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-50
          top-0 left-0
          w-64 min-h-screen
          bg-gray-900 px-4 py-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Mobile close icon */}
        <div className="flex justify-between items-center mb-5 lg:hidden">
          <Brand showText size="md" />
          <button onClick={onClose} className="text-gray-300 text-xl">
            <FaTimes />
          </button>
        </div>

        {/* Desktop Brand */}
        <div className="hidden lg:flex flex-col items-start mb-5">
          <Brand showText size="lg" />
          <p className="text-xs text-gray-400 tracking-wide ml-12">
            Admin Panel
          </p>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin/dashboard" className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }>
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <NavLink to="/admin/manage-users" className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }>
            <FaUsers /> Manage Users
          </NavLink>

          <NavLink to="/admin/fund-user" className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }>
            <FaWallet /> Fund User
          </NavLink>

          <NavLink to="/admin/transactions" className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }>
            <FaExchangeAlt /> Transactions
          </NavLink>

          <NavLink to="/admin/investments" className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }>
            <FaChartLine /> Investments
          </NavLink>

          <NavLink to="/admin/profile" className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }>
            <FaUserCircle /> Profile
          </NavLink>

          <NavLink to="/" className={linkStyle}>
            <CiLogout className="text-xl" /> Logout
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default AdminSideBar;
