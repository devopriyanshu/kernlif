import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaUserMd, FaHospital } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { login, signup } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const PartnerAuth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Initialize Role from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const roleParam = searchParams.get("role");
    
    if (roleParam === "expert" || roleParam === "center") {
      setRole(roleParam);
    } else {
      // Default or error state? Let's default to expert if unspecified, or redirect home.
      // Better to check if we can infer or just default
      if (!role) setRole("expert"); 
    }
  }, [location.search]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'expert') {
        navigate("/register/expert");
      } else if (user.role === 'center') {
        navigate("/register/center");
      } else {
        // If a regular user tries to access partner login, redirect them to dashboard
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (isSignup) {
        response = await signup(email, password, role);
        alert(`Account created! Please check your email to verify your ${role} account.`);
        setIsSignup(false);
      } else {
        response = await login(email, password);
        localStorage.setItem("token", response.token);
        
        // Handle redirect based on returned user role
        // Ideally we reload to refreshing auth context
         window.location.reload();
      }
    } catch (error) {
       alert(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const isExpert = role === 'expert';
  const roleTitle = isExpert ? "Expert" : "Center";
  const ThemeIcon = isExpert ? FaUserMd : FaHospital;
  const themeColor = isExpert ? "emerald" : "indigo"; // Tailwind colors

  // Dynamic classes based on role
  const buttonClass = isExpert 
    ? "bg-emerald-600 hover:bg-emerald-700" 
    : "bg-indigo-600 hover:bg-indigo-700";
    
  const linkClass = isExpert
    ? "text-emerald-600"
    : "text-indigo-600";
    
  const focusRing = isExpert
    ? "focus-within:ring-emerald-500"
    : "focus-within:ring-indigo-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 shadow-xl rounded-2xl max-w-md w-full border-t-4 border-gray-100">
        
        <div className="text-center mb-8">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isExpert ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
                <ThemeIcon className="text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
            {isSignup ? `Register as ${roleTitle}` : `${roleTitle} Login`}
            </h2>
            <p className="text-gray-500 mt-2">
            {isSignup 
                ? `Join our network of wellness ${isExpert ? 'professionals' : 'centers'}` 
                : "Manage your profile and services"}
            </p>
        </div>

        <form className="space-y-4" onSubmit={handleAuth}>
          <div className={`flex items-center border border-gray-300 p-3 rounded-lg ${focusRing} focus-within:border-transparent transition-all`}>
            <FaEnvelope className="text-gray-400 mx-2" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          <div className={`flex items-center border border-gray-300 p-3 rounded-lg ${focusRing} focus-within:border-transparent transition-all`}>
            <FaLock className="text-gray-400 mx-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none text-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg font-semibold transition-colors shadow-md disabled:opacity-70 flex justify-center items-center ${buttonClass}`}
          >
            {loading ? (
              <span className="flex items-center">
                 Processing...
              </span>
            ) : (
              isSignup ? "Create Account" : "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className={`${linkClass} font-semibold hover:underline`}
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Login" : "Sign up"}
            </button>
          </p>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-400">
            <p>Not a {roleTitle}? <a href="/login" className="underline hover:text-gray-600">Login as User</a></p>
        </div>
      </div>
    </div>
  );
};

export default PartnerAuth;
