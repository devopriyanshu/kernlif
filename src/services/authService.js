import axios from "axios";
import { BASE_URL } from "./api";

export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
    // console.log(response);
  } catch (error) {
    throw error.response.data.error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const googleSignIn = async (idToken) => {
  try {
    const response = await axios.post(`${BASE_URL}/google-auth`, { idToken });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
