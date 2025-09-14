import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAppointmentsByUserId,
  fetchAppointmentsByExpertId,
  fetchAppointmentsByUserAndExpert,
  createAppointment,
  deleteAppointment,
  updateAppointmentStatus,
} from "../services/appointmentService";

// Get appointments by user ID
export const useUserAppointments = (userId) =>
  useQuery({
    queryKey: ["appointments", "user", userId],
    queryFn: () => fetchAppointmentsByUserId(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

// Get appointments by expert ID
export const useExpertAppointments = (expertId) =>
  useQuery({
    queryKey: ["appointments", "expert", expertId],
    queryFn: () => fetchAppointmentsByExpertId(expertId),
    enabled: !!expertId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

// Get appointments by both user and expert ID
export const useUserExpertAppointments = (userId, expertId) =>
  useQuery({
    queryKey: ["appointments", "userExpert", userId, expertId],
    queryFn: () => fetchAppointmentsByUserAndExpert(userId, expertId),
    enabled: !!userId && !!expertId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

// Create appointment mutation
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: (data) => {
      // Invalidate and refetch appointment queries
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.error("Error creating appointment:", error);
    },
  });
};

// Delete appointment mutation
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      // Invalidate and refetch appointment queries
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.error("Error deleting appointment:", error);
    },
  });
};

// Update appointment status mutation
export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ appointmentId, status }) =>
      updateAppointmentStatus(appointmentId, status),
    onSuccess: () => {
      // Invalidate and refetch appointment queries
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.error("Error updating appointment status:", error);
    },
  });
};
