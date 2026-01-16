const AuthGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};
