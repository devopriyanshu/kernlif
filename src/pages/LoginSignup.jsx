import React, { useState, useEffect } from "react";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use React Router for navigation

  // Handle Google OAuth Redirect
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
      alert("Login successful! 🎉");
      navigate("/dashboard");
    }
  }, [navigate]);

  // Email Signup/Login
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignup
        ? "http://localhost:4000/signup"
        : "http://localhost:4000/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      alert(`${isSignup ? "Signup" : "Login"} successful! 🎉`);
      navigate("/dashboard"); // Redirect after login/signup
    } catch (error) {
      alert(error.message);
    }
  };

  // Google Login Redirect
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-blue-600">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        {/* Email & Password Form */}
        <form className="mt-6 space-y-4" onSubmit={handleEmailAuth}>
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaEnvelope className="text-gray-500 mx-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaLock className="text-gray-500 mx-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">or continue with</div>

        {/* Google Login */}
        <div className="flex justify-center space-x-3">
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white p-3 rounded-full"
          >
            <FaGoogle />
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="text-blue-600 font-semibold"
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

export default LoginSignup;
