import React, { useState, useEffect } from "react";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { login, signup } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { BASE_URL } from "../../services/api";

const UserAuth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // Get user from auth context

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'user') {
        navigate("/dashboard");
      } else if (user.role === 'expert') {
        navigate("/register/expert");
      } else if (user.role === 'center') {
        navigate("/register/center");
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const error = urlParams.get("error");

    if (error) {
      alert("Authentication failed. Please try again.");
      return;
    }

    if (token) {
      localStorage.setItem("token", token);
      // Wait for auth context to update via token change
      window.location.href = "/dashboard";
    }
  }, [navigate]);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (isSignup) {
        // Hardcode role as 'user'
        response = await signup(email, password, 'user');
        alert("Account created! Please check your email to verify your account.");
        setIsSignup(false);
      } else {
        response = await login(email, password);
        localStorage.setItem("token", response.token);
        // Force reload or let context handle it. 
        // For consistent behavior with user's code:
        window.location.reload(); 
      }
    } catch (error) {
      alert(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 shadow-xl rounded-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isSignup ? "Start your wellness journey today" : "Sign in to continue to WellNest"}
        </p>

        <form className="space-y-4" onSubmit={handleEmailAuth}>
          <div className="flex items-center border border-gray-300 p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
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

          <div className="flex items-center border border-gray-300 p-3 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-70 flex justify-center items-center"
          >
            {loading ? (
              <span className="flex items-center">
                 Processing...
              </span>
            ) : (
              isSignup ? "Sign Up" : "Login"
            )}
          </button>
        </form>

        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaGoogle className="text-red-500" />
            <span className="text-gray-700 font-medium">Google</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="text-blue-600 font-semibold hover:underline"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Login" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
