import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // Simulating user authentication
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user info from local storage

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Please log in to view your profile
        </h2>
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white shadow-md rounded-lg">
      <div className="text-center">
        <img
          src={user.profilePicture || "/images/default-profile.png"}
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
        />
        <h2 className="text-2xl font-bold mt-3">{user.fullName}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">
          Personal Information
        </h3>
        <ul className="mt-2 text-gray-600">
          <li>
            <strong>Age:</strong> {user.age || "N/A"}
          </li>
          <li>
            <strong>Gender:</strong> {user.gender || "N/A"}
          </li>
          <li>
            <strong>Phone:</strong> {user.phoneNumber || "N/A"}
          </li>
          <li>
            <strong>Address:</strong> {user.address || "N/A"}
          </li>
          <li>
            <strong>Language Preference:</strong>{" "}
            {user.languagePreference || "N/A"}
          </li>
        </ul>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
