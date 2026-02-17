import { secureAxios } from "./authAxios";
import { APIENDPOINT } from "./api";

export const fetchDashboardLogs = async () => {
  try {
    const res = await secureAxios.get(APIENDPOINT.LOGS_DASHBOARD);
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const addActivityLog = async (data) => {
  try {
    const res = await secureAxios.post(APIENDPOINT.LOGS_ACTIVITY, data);
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const updateActivityLog = async (logId, data) => {
  try {
    const res = await secureAxios.put(`${APIENDPOINT.LOGS_ACTIVITY}/${logId}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const addMealLog = async (data) => {
  try {
    const res = await secureAxios.post(APIENDPOINT.LOGS_MEAL, data);
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const updateMealLog = async (logId, data) => {
  try {
    const res = await secureAxios.put(`${APIENDPOINT.LOGS_MEAL}/${logId}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const addSleepLog = async (data) => {
  try {
    const res = await secureAxios.post(APIENDPOINT.LOGS_SLEEP, data);
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const updateSleepLog = async (logId, data) => {
  try {
    const res = await secureAxios.put(`${APIENDPOINT.LOGS_SLEEP}/${logId}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};
