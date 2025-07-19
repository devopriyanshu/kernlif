// hooks/expertHooks.js
import { useQuery } from "@tanstack/react-query";
import { fetchExperts } from "../services/expertService";

export const useExperts = (filters = {}, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["experts", filters, page, limit],
    queryFn: () => fetchExperts({ ...filters, page, limit }),
    keepPreviousData: true,
  });
};
