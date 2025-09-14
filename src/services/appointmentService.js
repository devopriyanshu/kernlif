import { secureAxios } from "./authAxios";

// Fetch appointments by user ID
export const fetchAppointmentsByUserId = async (userId) => {
  try {
    const response = await secureAxios.get(`/appointments/user/${userId}`);
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    throw error;
  }
};

// Fetch appointments by expert ID
export const fetchAppointmentsByExpertId = async (expertId) => {
  try {
    const response = await secureAxios.get(`/appointments/expert/${expertId}`);
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching expert appointments:", error);
    throw error;
  }
};

// Fetch appointments by both user and expert ID
export const fetchAppointmentsByUserAndExpert = async (userId, expertId) => {
  try {
    const response = await secureAxios.get(
      `/appointments/user/${userId}/expert/${expertId}`
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching user-expert appointments:", error);
    throw error;
  }
};

// Create a new appointment
export const createAppointment = async (appointmentData) => {
  try {
    const response = await secureAxios.post("/appointments", appointmentData);
    return response.data?.data || {};
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

// Delete an appointment
export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await secureAxios.delete(`/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

// Update appointment status
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await secureAxios.patch(
      `/appointments/${appointmentId}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};
