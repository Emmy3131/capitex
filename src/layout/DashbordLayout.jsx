import AdminSideBar from "../components/AdminSideBar";
import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar/>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
export default DashboardLayout;