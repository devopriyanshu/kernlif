import axios from "axios";

const API_URL = "http://localhost:4000/auth"; // Adjust if using a different backend URL

export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
    // console.log(response);
  } catch (error) {
    throw error.response.data.error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const googleSignIn = async (idToken) => {
  try {
    const response = await axios.post(`${API_URL}/google-auth`, { idToken });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
