import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const activeUser = JSON.parse(localStorage.getItem("user"));

 
  if (!activeUser) {
    return <Navigate to="/auth" replace />;
  }

 
  if (role && activeUser.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

