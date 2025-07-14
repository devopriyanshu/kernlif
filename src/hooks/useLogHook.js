import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addActivityLog,
  addMealLog,
  addSleepLog,
  fetchDashboardLogs,
  updateActivityLog,
  updateMealLog,
  updateSleepLog,
} from "../services/logService";

// --- Dashboard Logs (GET) ---
export const useDashboardLogs = () => {
  const {
    data: dashboardLogs,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboardLogs"],
    queryFn: fetchDashboardLogs,
    staleTime: 1000 * 60 * 5,
  });

  return {
    dashboardLogs,
    isLoading,
    isError,
    error,
    refetch,
  };
};

// --- Add Activity Log ---
export const useAddActivityLog = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addActivityLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardLogs"] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};

// --- Update Activity Log ---
export const useUpdateActivityLog = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ logId, data }) => updateActivityLog(logId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardLogs"] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};

// --- Add Meal Log ---
export const useAddMealLog = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addMealLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardLogs"] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};

// --- Update Meal Log ---
export const useUpdateMealLog = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ logId, data }) => updateMealLog(logId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardLogs"] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};

// --- Add Sleep Log ---
export const useAddSleepLog = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addSleepLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardLogs"] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};

// --- Update Sleep Log ---
export const useUpdateSleepLog = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ logId, data }) => updateSleepLog(logId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardLogs"] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};
