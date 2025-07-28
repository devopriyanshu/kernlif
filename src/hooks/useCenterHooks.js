// hooks/useCenterHooks.js
import { useQuery } from "@tanstack/react-query";
import { fetchCenterDetails, fetchCenters } from "../services/centerService";

export const useCenters = (filters = {}, page = 1, limit = 10) => {
  const queryKey = ["centers", { ...filters, page }];

  return useQuery({
    queryKey,
    queryFn: () => fetchCenters({ filters, page, limit }),
    keepPreviousData: true,
    select: (data) => {
      // Apply client-side filtering if needed
      return data?.centers || [];
    },
  });
};

export const useCenterDetail = (id) => {
  return useQuery({
    queryKey: ["centerDetail", id],
    queryFn: () => fetchCenterDetails(id),
    enabled: !!id,
  });
};
