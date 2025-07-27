import { secureAxios } from "./authAxios";

export const fetchCenters = async ({ page = 1, limit = 10, filters = {} }) => {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.city) params.append("city", filters.city);
  if (filters.search) params.append("search", filters.search);
  params.append("page", page);
  params.append("limit", limit);

  const response = await secureAxios.get(`/centers/list?${params.toString()}`);
  return response.data; // should return { centers, page }
};

export const fetchCenterDetails = async (id) => {
  try {
    const response = await secureAxios.get(`centers/${id}`);
    console.log(response);

    return response;
  } catch {
    console.error("error fetching center details:", error);
  }
};
