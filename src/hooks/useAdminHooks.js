import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminUsers,
  fetchAdminExperts,
  fetchAdminCenters,
  fetchDashboardStats,
  fetchAuditLogs,
} from "../services/adminService";

export const useAdminUsers = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ["adminUsers", page, limit],
    queryFn: () => fetchAdminUsers(page, limit),
    keepPreviousData: true,
  });
};

export const useAdminExperts = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ["adminExperts", page, limit],
    queryFn: () => fetchAdminExperts(page, limit),
    keepPreviousData: true,
  });
};

export const useAdminCenters = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ["adminCenters", page, limit],
    queryFn: () => fetchAdminCenters(page, limit),
    keepPreviousData: true,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useAuditLogs = (page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["auditLogs", page, limit],
    queryFn: () => fetchAuditLogs(page, limit),
    keepPreviousData: true,
  });
};
