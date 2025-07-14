import { secureAxios } from "./authAxios";

export const fetchDashboardLogs = async () => {
  const res = await secureAxios.get("logs/dashboard");
  return res;
};

export const addActivityLog = (data) =>
  secureAxios.post("/logs/activity", data);

export const updateActivityLog = (logId, data) =>
  secureAxios.put(`/logs/activity/${logId}`, data);

export const addMealLog = (data) => secureAxios.post("/logs/meal", data);

export const updateMealLog = (logId, data) =>
  secureAxios.put(`/logs/meal/${logId}`, data);

export const addSleepLog = (data) => secureAxios.post("/logs/sleep", data);

export const updateSleepLog = (logId, data) =>
  secureAxios.put(`/logs/sleep/${logId}`, data);
