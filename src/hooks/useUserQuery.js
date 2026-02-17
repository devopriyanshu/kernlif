// hooks/useAuth.js
import { useQuery } from "@tanstack/react-query";
import { getUserMe } from "../services/authService";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const token = localStorage.getItem("token");

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: getUserMe,
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  const getUserRole = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.role || "user";
    } catch {
      return null;
    }
  };

  const hasRole = (role) => {
    const userRole = getUserRole();
    return userRole === role;
  };

  const isAdmin = () => hasRole("admin");
  const isExpert = () => hasRole("expert");
  const isCenter = () => hasRole("center");
  const isUser = () => hasRole("user");

  return {
    user,
    isLoading,
    isError,
    error,
    isAuthenticated: !!token && !!user,
    token,
    role: getUserRole(),
    hasRole,
    isAdmin,
    isExpert,
    isCenter,
    isUser,
  };
};
