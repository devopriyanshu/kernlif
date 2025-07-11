import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, User, ChevronDown } from "lucide-react";
import { useAuth } from "../context/Authcontext";

import Avatar from "../utils/Avatar";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false); // Scrolling down
      } else {
        setShowNavbar(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample notifications
  const notifications = [
    { id: 1, text: "New wellness program available", time: "2 hours ago" },
    { id: 2, text: "Dr. Sarah has an opening tomorrow", time: "Yesterday" },
    { id: 3, text: "Your weekly wellness report is ready", time: "3 days ago" },
  ];

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Experts", path: "/experts" },
    { name: "Centers", path: "/centers" },
    // { name: "Products", path: "/products" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 h-16 bg-transparent  `}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center ">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center  space-x-2 rounded-full border-yellow-600 border-4 bg-white pr-4 relative"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-yellow-600 border-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg transform scale-100 absolute left-0">
              W
            </div>
            <span className={`text-xl font-bold text-blue-500 pl-10`}>
              WellNest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`hidden md:flex space-x-8 shadow-md border-spacing-3 rounded-full  border border-[#c0c0c0] p-4 px-20 transition-transform duration-300 fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/30 backdrop-blur-md ${
              showNavbar
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium md:text-xs lg:text-base transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-blue-500"
                    : scrolled || location.pathname !== "/"
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-gray-700 hover:text-blue-200"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Login */}
            {!user && (
              <div className="relative">
                <Link to={"/login"}>
                  <button onClick={() => {}}>
                    <p className="text-red-600 text-lg font-medium">Login</p>
                  </button>
                </Link>
              </div>
            )}
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileOpen(false);
                }}
                className={`p-2 rounded-full hover:bg-gray-100  transition-colors relative text-black`}
              >
                <Bell size={25} className="fill-indigo-50" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-20">
                  <h3 className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                    Notifications
                  </h3>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <p className="text-sm text-gray-800">
                          {notification.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 text-center">
                    <Link
                      to="/"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Show More
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center space-x-2"
              >
                <Avatar name="Priyanshu Patel" width={36} height={36} />

                <ChevronDown
                  size={16}
                  className={`transition-colors text-gray-700`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>

                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? (
                <X
                  size={24}
                  className={
                    scrolled || location.pathname !== "/"
                      ? "text-gray-700"
                      : "text-white"
                  }
                />
              ) : (
                <Menu
                  size={24}
                  className={
                    scrolled || location.pathname !== "/"
                      ? "text-gray-700"
                      : "text-white"
                  }
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg overflow-hidden">
          <nav className="px-4 pt-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-3 text-gray-700 hover:text-blue-600 font-medium border-b border-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                to="/profile"
                className="flex items-center py-3 text-gray-700 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                <User size={18} className="mr-3" />
                My Profile
              </Link>
              <button
                onClick={logout}
                className="flex items-center py-3 text-red-600 hover:text-red-700 w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
