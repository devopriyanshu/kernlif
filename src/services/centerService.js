import { secureAxios } from "./authAxios";

export const fetchCenters = async (
  search,
  category,
  sortBy,
  page = 1,
  limit = 10
) => {
  try {
    const params = {};
    if (category) params.category = category;
    if (search) params.search = search;
    if (sortBy) params.sortBy = sortBy;
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
    return response || {};
  } catch (error) {
    console.error("Error fetching center details:", error);
    return {};
  }
};
