import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const activeUser = JSON.parse(localStorage.getItem("user"));

  if (!activeUser) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
