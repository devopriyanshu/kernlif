import React from 'react';
import { motion } from 'framer-motion';

const AuthTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex bg-gray-100 p-1 rounded-xl mb-8 relative">
      <button
        onClick={() => setActiveTab('login')}
        className={`flex-1 py-3 text-sm font-semibold rounded-lg z-10 transition-colors duration-200 ${
          activeTab === 'login' ? 'text-gray-800' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Login
      </button>
      <button
        onClick={() => setActiveTab('signup')}
        className={`flex-1 py-3 text-sm font-semibold rounded-lg z-10 transition-colors duration-200 ${
          activeTab === 'signup' ? 'text-gray-800' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Sign Up
      </button>

      {/* Sliding Background */}
      <motion.div
        className="absolute top-1 bottom-1 left-1 bg-white rounded-lg shadow-sm"
        initial={false}
        animate={{
          x: activeTab === 'login' ? 0 : '100%',
          width: 'calc(50% - 4px)'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
};

export default AuthTabs;
