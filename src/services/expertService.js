import { secureAxios } from "./authAxios";

export const fetchExperts = async (
  search,
  category,
  sortBy,
  page = 1,
  limit = 10
) => {
  const params = {};
  if (search) params.search = search;
  if (category) params.category = category;
  if (sortBy) params.sortBy = sortBy;
  params.page = page;
  params.limit = limit;

  const response = await secureAxios.get("experts/list", { params });
  return response.data.data;
};
