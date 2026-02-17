import { publicAxios, secureAxios } from "./authAxios";
import { APIENDPOINT } from "./api";

export const signup = async (email, password, role = 'user') => {
  try {
    const response = await publicAxios.post(APIENDPOINT.SIGNUP, {
      email,
      password,
      role,
    });
    return response; // publicAxios already returns response.data
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const login = async (email, password) => {
  try {
    const response = await publicAxios.post(APIENDPOINT.LOGIN, {
      email,
      password,
    });
    return response; // publicAxios already returns response.data
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const getUserMe = async () => {
  try {
    const res = await secureAxios.get(APIENDPOINT.GET_USER_ME);
    return res.data; // Return user data
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const updateUserProfile = async (updatedData) => {
  try {
    const res = await secureAxios.post(APIENDPOINT.UPDATE_USER, updatedData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

