import axios from "axios";
import { BASE_URL } from "./api";

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

publicAxios.interceptors.request.use(
  function (config) {
    console.log("Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    return config; // Pass the request configuration
  },
  function (error) {
    console.error("Request Error:", error);
    return Promise.reject(error); // Handle the error
  }
);

// Add response interceptor to handle and log responses
publicAxios.interceptors.response.use(
  function (response) {
    console.log("Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response.data; // Return only the data
  },
  async function (error) {
    console.error("Response Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error); // Handle the error
  }
);

export const secureAxios = axios.create({
  baseURL: BASE_URL,
});

secureAxios.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log("Secure Request:", {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data,
      });
      return config;
    } catch (error) {
      console.error("error retrieving token", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    Promise.reject(error);
    console.error("Request Error:", error);
  }
);

secureAxios.interceptors.response.use(
  function (response) {
    console.log("Secure Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response.data; // Return only the data
  },
  async function (error) {
    console.error("Secure Response Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Optional: Handle token expiration or specific error codes
    if (error.response?.status === 401) {
      console.warn("Token expired or invalid. Redirect to login.");
      await AsyncStorage.removeItem("access_token"); // Clear the invalid token
      // Redirect user to login if needed (depends on your app flow)
    }

    return Promise.reject(error); // Handle response error
  }
);
