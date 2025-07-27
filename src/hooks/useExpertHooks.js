// hooks/expertHooks.js
import { useQuery } from "@tanstack/react-query";
import {
  fetchExpertDetails,
  fetchExpertsList,
} from "../services/expertService";

export const useExperts = ({ search, category, sortBy, page, limit }) =>
  useQuery({
    queryKey: ["experts", { search, category, sortBy, page, limit }],
    queryFn: () => fetchExpertsList(search, category, sortBy, page, limit),
    keepPreviousData: true,
  });

export const useExpertDetail = (id) => {
  return useQuery({
    queryKey: ["expertDetail", id],
    queryFn: async () => {
      const data = await fetchExpertDetails(id);

      return data || {}; // ✅ Second safety net
    },
    enabled: !!id,
  });
};
