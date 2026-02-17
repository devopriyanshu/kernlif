// API Configuration
const API_VERSION = '/api/v1';
export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
export const API_BASE_URL = `${BASE_URL}${API_VERSION}`;

export const APIENDPOINT = {
  // Auth
  LOGIN: "auth/login",
  SIGNUP: "auth/signup",
  GOOGLE_AUTH: "auth/google",
  
  // Users
  GET_USER_ME: "users/me",
  UPDATE_USER: "users/update",
  
  // Experts
  EXPERTS_LIST: "experts/list",
  EXPERTS_DETAIL: "experts",
  EXPERTS_REGISTER: "experts/register",
  
  // Centers
  CENTERS_LIST: "centers",
  CENTERS_DETAIL: "centers",
  CENTERS_REGISTER: "centers/register",
  
  // Logs
  LOGS_SLEEP: "logs/sleep",
  LOGS_ACTIVITY: "logs/activity",
  LOGS_MEAL: "logs/meal",
  LOGS_DASHBOARD: "logs/dashboard",
  
  // Appointments
  APPOINTMENTS: "appointments",
  
  // Admin
  ADMIN_USERS: "admin/users",
  ADMIN_EXPERTS: "admin/experts",
  ADMIN_CENTERS: "admin/centers",
  ADMIN_STATS: "admin/dashboard/stats",
  ADMIN_AUDIT_LOGS: "admin/audit-logs",
};
