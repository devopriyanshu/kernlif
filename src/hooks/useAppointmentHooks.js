import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAppointment,
  fetchAppointment,
  fetchUserAppointments,
  updateAppointment,
  deleteAppointment,
} from "../services/appointmentService";

// Get appointments by user ID
export const useUserAppointments = (userId) =>
  useQuery({
    queryKey: ["appointments", "user", userId],
    queryFn: () => fetchUserAppointments(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

// Get single appointment by ID
export const useAppointment = (appointmentId) =>
  useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => fetchAppointment(appointmentId),
    enabled: !!appointmentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

// Create appointment mutation
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      // Invalidate and refetch appointment queries
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.error("Error creating appointment:", error);
    },
  });
};

// Update appointment mutation
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updateData }) => updateAppointment(id, updateData),
    onSuccess: () => {
      // Invalidate and refetch appointment queries
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardLogs"] });
    },
    onError: (error) => {
      console.error("Error updating appointment:", error);
    },
  });
};

// Delete appointment mutation
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardLogs"] });
    },
    onError: (error) => {
      console.error("Error deleting appointment:", error);
    },
  });
};
