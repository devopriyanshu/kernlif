import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null; // or <Spinner />

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
