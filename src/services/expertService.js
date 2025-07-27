import { secureAxios } from "./authAxios";

export const fetchExpertsList = async (
  search,
  category,
  sortBy,
  page = 1,
  limit = 10
) => {
  try {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (sortBy) params.sortBy = sortBy;
    params.page = page;
    params.limit = limit;

    const response = await secureAxios.get("experts/list", { params });
    console.log("rsponse service", response.data);

    // ✅ Always return fallback if undefined
    return response.data || [];
  } catch (error) {
    console.error("Error fetching experts:", error);
    return []; // fallback to empty array instead of undefined
  }
};

export const fetchExpertDetails = async (id) => {
  try {
    const response = await secureAxios.get(`/experts/${id}`);

    return response;

    // ✅ Returns data on success
  } catch (error) {
    console.error("Error fetching expert details:", error);
    return null; // ⚠️ Return null (or empty object) instead of undefined
  }
};
