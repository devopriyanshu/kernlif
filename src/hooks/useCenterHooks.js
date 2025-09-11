import { useQuery } from "@tanstack/react-query";
import { fetchCenterDetails, fetchCenters } from "../services/centerService";

export const useCenters = ({ filters = {}, page = 1, limit = 10 }) =>
  useQuery({
    queryKey: ["centers", { ...filters, page, limit }],
    queryFn: () => fetchCenters({ filters, page, limit }),
    keepPreviousData: true,
  });

export const useCenterDetail = (id) =>
  useQuery({
    queryKey: ["centerDetail", id],
    queryFn: () => fetchCenterDetails(id),
    enabled: !!id,
  });
