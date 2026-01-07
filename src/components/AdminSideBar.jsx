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
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static z-50 w-64 min-h-screen bg-gray-900 px-4 py-6
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex flex-col items-start mb-6">
          <Brand showText size="lg" />
          <p className="text-xs text-gray-400 ml-12">
            Admin Panel
          </p>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin/dashboard"
            onClick={onClose}
            className={({ isActive }) =>
              `${linkStyle} ${isActive && activeStyle}`
            }
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/manage-users"
            onClick={onClose}
            className={({ isActive }) =>
              `${linkStyle} ${isActive && activeStyle}`
            }
          >
            <FaUsers />
            Manage Users
          </NavLink>

          <NavLink
            to="/admin/fund-user"
            onClick={onClose}
            className={({ isActive }) =>
              `${linkStyle} ${isActive && activeStyle}`
            }
          >
            <FaWallet />
            Fund User
          </NavLink>

          <NavLink
            to="/admin/transactions"
            onClick={onClose}
            className={({ isActive }) =>
              `${linkStyle} ${isActive && activeStyle}`
            }
          >
            <FaExchangeAlt />
            Transactions
          </NavLink>

          <NavLink
            to="/admin/investments"
            onClick={onClose}
            className={({ isActive }) =>
              `${linkStyle} ${isActive && activeStyle}`
            }
          >
            <FaChartLine />
            Investments
          </NavLink>

          <NavLink
            to="/admin/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `${linkStyle} ${isActive && activeStyle}`
            }
          >
            <FaUserCircle />
            Profile
          </NavLink>

          <NavLink
            to="/"
            onClick={onClose}
            className={linkStyle}
          >
            <CiLogout className="text-xl" />
            Logout
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default AdminSideBar;
