import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import {
  login as loginApi,
  signup as signupApi,
  getUserMe,
} from "../services/authService.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false); // No token, stop loading
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const user = await getUserMe();
      console.log("user", user);

      setUser(user);
    } catch (e) {
      logout(); // Token invalid
    } finally {
      setLoading(false); // ✅ done loading in any case
    }
  };

  const login = async (email, password) => {
    const { token, user } = await loginApi(email, password);

    localStorage.setItem("token", token);
    setToken(token);
    await fetchUser();
  };

  const signup = async (email, password) => {
    const data = await signupApi(email, password);
    localStorage.setItem("token", data.token);
    setToken(data.token);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
