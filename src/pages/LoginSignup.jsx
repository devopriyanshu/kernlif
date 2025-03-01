import React, { useState } from "react";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import {
  auth,
  googleProvider,
  githubProvider,
  facebookProvider,
} from "../config/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful! 🎉");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful! 🚀");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      alert("Login successful! 🎉");
    } catch (error) {
      alert(error.message);
    }
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

        {/* Divider */}
        <div className="text-center my-4 text-gray-500">or continue with</div>

        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-3">
          <button
            onClick={() => handleSocialLogin(googleProvider)}
            className="bg-red-500 text-white p-3 rounded-full"
          >
            <FaGoogle />
          </button>
          <button
            onClick={() => handleSocialLogin(githubProvider)}
            className="bg-gray-800 text-white p-3 rounded-full"
          >
            <FaGithub />
          </button>
          <button
            onClick={() => handleSocialLogin(facebookProvider)}
            className="bg-blue-600 text-white p-3 rounded-full"
          >
            <FaFacebook />
          </button>
        </div>

        {/* Toggle Signup/Login */}
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
