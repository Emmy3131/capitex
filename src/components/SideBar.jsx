import { Link, useLocation, useNavigate } from "react-router-dom";
import SidebarLinks from "../utilities/SideBarLinks";
import { CiLogout } from "react-icons/ci";
import Brand from "./Brand";
import UserInfo from "./UserInfo";
import { useState } from "react";
import { logoutUser } from "../utilities/auth";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";
  const links = SidebarLinks[role];

  const handleLogout = () => {
    logoutUser();
    navigate("/auth"); // ✅ correct route
  };

  return (
    <>
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
        lg:translate-x-0 lg:static`}
      >
        <div className="mb-8">
          <Brand showText size="lg" />
          <p className="text-xs text-gray-400 ml-12">
            {role === "admin" ? "Admin Panel" : "User Panel"}
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-5 py-3 rounded-lg transition
                ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}

          {/* ✅ LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex gap-3 px-5 py-3 mt-6 rounded-lg
                       text-gray-300 hover:bg-red-600 hover:text-white transition"
          >
            <CiLogout className="text-xl" />
            Logout
          </button>
        </nav>

        <div className="hidden lg:block mt-auto">
          <UserInfo />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
