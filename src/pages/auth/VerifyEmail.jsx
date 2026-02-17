import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { BASE_URL } from '../../services/api';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link.');
        return;
      }

      try {
        await axios.get(`${BASE_URL}/auth/verify-email?token=${token}`);
        setStatus('success');
        setMessage('Email verified successfully!');
        
        // Redirect after 3 seconds
        setTimeout(() => {
           navigate('/login');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.error || 'Verification failed. Link may be expired.');
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 shadow-xl rounded-2xl max-w-md w-full text-center">
        {status === 'verifying' && (
          <div className="flex flex-col items-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
             <h2 className="text-xl font-semibold text-gray-800">Verifying...</h2>
             <p className="text-gray-500 mt-2">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-5xl text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Verified!</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <p className="text-sm text-gray-400 mt-4">Redirecting to login...</p>
            <button 
              onClick={() => navigate('/login')}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <FaTimesCircle className="text-5xl text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Verification Failed</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <button 
              onClick={() => navigate('/login')}
              className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
