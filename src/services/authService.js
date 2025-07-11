import axios from "axios";
import { APIENDPOINT, BASE_URL } from "./api";
import { publicAxios, secureAxios } from "./authAxios";

export const signup = async (email, password) => {
  try {
    const response = await publicAxios.post(APIENDPOINT.SIGNUP, {
      email,
      password,
    });
    return response.data;
    // console.log(response);
  } catch (error) {
    throw error.response.data.error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const getUserMe = async () => {
  const res = await secureAxios.get(`api/user/me`);
  console.log("getuserme", res);

  return res;
};
