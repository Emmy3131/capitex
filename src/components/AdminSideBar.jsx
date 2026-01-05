import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaWallet, FaExchangeAlt, FaChartLine, FaUserCircle,} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import Brand from "./Brand";

const AdminSideBar = () => {
  const linkStyle =
    "flex items-center gap-3 px-5 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition";

  const activeStyle =
    "bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow";

  return (
    <aside className="w-64 min-h-screen bg-gray-900 px-4 py-6">
      {/* Logo */}
      <div className="flex flex-col items-start mb-5">
        {/* Brand */}
        <Brand showText={true} size="lg" />

        {/* Subtitle aligned under text */}
        <p className="text-xs text-gray-400 tracking-wide ml-12">
          Admin Panel
        </p>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/manage-users"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }
        >
          <FaUsers />
          Manage Users
        </NavLink>

        <NavLink
          to="/admin/fund-user"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }
        >
          <FaWallet />
          Fund User
        </NavLink>

        <NavLink
          to="/admin/transactions"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }
        >
          <FaExchangeAlt />
          Transactions
        </NavLink>

        <NavLink
          to="/admin/investments"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }
        >
          <FaChartLine />
          Investments
        </NavLink>

        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }
        >
          <FaUserCircle />
          Profile
        </NavLink>

         <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && activeStyle}`
          }
        >
          <CiLogout className="inline-block mr-3 text-xl" />
          LogOut
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSideBar;
