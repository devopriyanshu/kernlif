import { secureAxios } from "./authAxios";
import { APIENDPOINT } from "./api";

export const fetchAdminUsers = async (page = 1, limit = 20) => {
  try {
    const response = await secureAxios.get(APIENDPOINT.ADMIN_USERS, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const fetchAdminExperts = async (page = 1, limit = 20) => {
  try {
    const response = await secureAxios.get(APIENDPOINT.ADMIN_EXPERTS, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const fetchAdminCenters = async (page = 1, limit = 20) => {
  try {
    const response = await secureAxios.get(APIENDPOINT.ADMIN_CENTERS, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const fetchDashboardStats = async () => {
  try {
    const response = await secureAxios.get(APIENDPOINT.ADMIN_STATS);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const fetchAuditLogs = async (page = 1, limit = 50) => {
  try {
    const response = await secureAxios.get(APIENDPOINT.ADMIN_AUDIT_LOGS, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};
