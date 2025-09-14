import { useQuery } from "@tanstack/react-query";
import { fetchCenterDetails, fetchCenters } from "../services/centerService";

export const useCenters = ({
  search,
  category,
  sortBy,
  page = 1,
  limit = 10,
}) =>
  useQuery({
    queryKey: ["centers", { search, category, sortBy, page, limit }],
    queryFn: () => fetchCenters(search, category, sortBy, page, limit),
    keepPreviousData: true,
  });

export const useCenterDetail = (id) =>
  useQuery({
    queryKey: ["centerDetail", id],
    queryFn: async () => {
      const data = await fetchCenterDetails(id);

      return data || {}; // ✅ Second safety net
    },
    enabled: !!id,
  });
