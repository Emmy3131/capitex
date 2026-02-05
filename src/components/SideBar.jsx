import { Link, useLocation, useNavigate } from "react-router-dom";
import SidebarLinks from "../utilities/SideBarLinks";
import { CiLogout } from "react-icons/ci";
import Brand from "./Brand";
import UserInfo from "./UserInfo";
import { useState } from "react";
import axios from "axios";
import ButtonLoader from "./Loader/ButtonLoader";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const baseURL = "https://capitex-api.vercel.app/api/v1/users/logout";

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";
  const links = SidebarLinks[role];
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get(baseURL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/auth");
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 px-4 py-6 z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static flex flex-col`}
      >
        {/* BRAND / LOGO */}
        <div className="flex flex-col mb-6">
          <Brand showText size="lg" />
          <p className="text-xs text-gray-400 ml-12">
            {role === "admin" ? "Admin Panel" : "User Panel"}
          </p>
        </div>

        {/* LINKS - scrollable */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {links.map((link) => {
            const isActive = pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-5 py-3 rounded-lg transition
                  ${isActive
                    ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            disabled={loading}
          className={`flex items-center gap-3 px-5 py-3 mt-6 rounded-lg w-full transition
              ${loading
                ? "bg-red-600 text-white cursor-not-allowed"
                : "text-gray-300 hover:bg-red-600 hover:text-white"
              }`}
          >
            {loading ? (
              <>
                <ButtonLoader />
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <CiLogout className="text-xl" />
                <span>Logout</span>
              </>
            )}
          </button>
        </nav>

        {/* USER INFO - fixed at bottom */}
        <div className="mt-auto hidden lg:block">
          <UserInfo />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
