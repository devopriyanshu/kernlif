// hooks/useGetUserProfile.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserMe, updateUserProfile } from "../services/authService";

export const useGetUserProfile = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserMe,
    staleTime: 1000 * 60 * 5, // optional: cache for 5 mins
  });

  return {
    user,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateProfile,
    isLoading,
    isError,
    error,
    isSuccess,
    data,
  } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedUser) => {
      // ✅ Update cached profile data
      queryClient.setQueryData(["userProfile"], updatedUser);
    },
  });

  return {
    updateProfile,
    isLoading,
    isError,
    error,
    isSuccess,
    data,
  };
};
