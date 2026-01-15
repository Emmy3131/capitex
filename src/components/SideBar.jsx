import { Link, useLocation } from "react-router-dom";
import SidebarLinks from "../utilities/SideBarLinks";
import { CiLogout } from "react-icons/ci";
import Brand from "./Brand";
import UserInfo from "./UserInfo";

const Sidebar = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";

  const links = SidebarLinks[role];

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-900 px-4 py-6 z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Brand */}
        <div className="mb-8">
          <Brand showText size="lg" />
          <p className="text-xs text-gray-400 ml-12">
            {role === "admin" ? "Admin Panel" : "User Panel"}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-5 py-3 rounded-lg transition
                  ${isActive
                    ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}

          {/* Logout */}
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-5 py-3 mt-6 rounded-lg
                       text-gray-300 hover:bg-red-600 hover:text-white transition"
          >
            <CiLogout className="text-xl" />
            Logout
          </Link>
        </nav>
        <div className="hidden lg:block">
          <UserInfo />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
