import { useState } from "react";
import { FaBars } from "react-icons/fa";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import UserInfo from "../components/UserInfo";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <SideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-full">
        {/* Top bar (mobile only) */}
        <header className="lg:hidden bg-white shadow p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-700 text-xl"
          >
            <FaBars />
          </button>
           <UserInfo isMobile />
        </header>


        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 mt-12 lg:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
