import { secureAxios } from "./authAxios";

export const fetchCenters = async ({ page = 1, limit = 10, filters = {} }) => {
  try {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.search) params.search = filters.search;

    params.page = page;
    params.limit = limit;

    const response = await secureAxios.get(`/centers/list`, { params });
    return response.data || { centers: [], page: 1 };
  } catch (error) {
    console.error("Error fetching centers:", error);
    return { centers: [], page: 1 }; // fallback
  }
};

export const fetchCenterDetails = async (id) => {
  try {
    const response = await secureAxios.get(`centers/${id}`);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching center details:", error);
    return {};
  }
};
