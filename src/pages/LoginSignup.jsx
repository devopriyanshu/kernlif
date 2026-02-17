import React, { useState, useEffect } from "react";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaUserMd, FaHospital } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { login, signup } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../services/api";
import AuthTabs from "../components/Auth/AuthTabs";

const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'expert') navigate("/expert_dashboard");
      else if (user.role === 'center') navigate("/center_dashboard"); // Verify this route
      else navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const errorParam = urlParams.get("error");
    const roleParam = urlParams.get("role");

    if (roleParam) setRole(roleParam);

    if (errorParam) {
      setError("Authentication failed. Please try again.");
      return;
    }

    if (token) {
      localStorage.setItem("token", token);
      // Force reload to update auth context or manually update it
      // Better to have a way to refresh auth context, but reload works for now as quick fix
      window.location.href = "/dashboard"; 
    }
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (activeTab === "signup") {
        const response = await signup(email, password, role);
        setSuccessMessage("Account created! Please check your email to verify your account.");
        // Clear form
        setEmail("");
        setPassword("");
      } else {
        const response = await login(email, password);
        localStorage.setItem("token", response.token);
        // Redirect based on role
        const userRole = response.user.role;
        if (userRole === 'expert') window.location.href = "/expert_dashboard"; 
        else if (userRole === 'center') window.location.href = "/center_dashboard"; // Verify route
        else window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  const RoleOption = ({ value, label, icon: Icon }) => (
    <button
      type="button"
      onClick={() => setRole(value)}
      className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
        role === value
          ? "border-blue-500 bg-blue-50 text-blue-600"
          : "border-gray-200 hover:border-blue-200 text-gray-500"
      }`}
    >
      <Icon className="text-2xl mb-1" />
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 shadow-xl rounded-2xl max-w-md w-full overflow-hidden relative">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to WellNest</h2>
          <p className="text-gray-500">Your journey to wellness starts here</p>
        </div>

        {/* Tabs */}
        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <form className="space-y-5" onSubmit={handleAuth}>
              
              {/* Role Selection - Only for Signup */}
              {activeTab === "signup" && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <RoleOption value="user" label="User" icon={FaUser} />
                  <RoleOption value="expert" label="Expert" icon={FaUserMd} />
                  <RoleOption value="center" label="Center" icon={FaHospital} />
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Messages */}
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
                  {error}
                </div>
              )}
              {successMessage && (
                <div className="p-3 bg-green-50 text-green-600 text-sm rounded-lg text-center border border-green-100">
                  {successMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all transform active:scale-95 ${
                  loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  activeTab === "login" ? "Login" : "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-medium">Or continue with</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaGoogle className="text-red-500" />
                <span className="text-gray-700 font-medium">Google</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginSignup;
