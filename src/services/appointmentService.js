import { secureAxios } from "./authAxios";
import { APIENDPOINT } from "./api";

export const createAppointment = async (appointmentData) => {
  try {
    const response = await secureAxios.post(APIENDPOINT.APPOINTMENTS, appointmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const fetchAppointment = async (id) => {
  try {
    const response = await secureAxios.get(`${APIENDPOINT.APPOINTMENTS}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const fetchUserAppointments = async (userId) => {
  try {
    const response = await secureAxios.get(`${APIENDPOINT.APPOINTMENTS}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const updateAppointment = async (id, updateData) => {
  try {
    const response = await secureAxios.put(`${APIENDPOINT.APPOINTMENTS}/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await secureAxios.delete(`${APIENDPOINT.APPOINTMENTS}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};
