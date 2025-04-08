import { createContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("decoded", decoded);

      setUser(decoded);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
