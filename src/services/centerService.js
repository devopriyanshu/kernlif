import { publicAxios, secureAxios } from "./authAxios";
import { APIENDPOINT } from "./api";

export const fetchCenters = async (search, category, sortBy, page = 1, limit = 10) => {
  try {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (sortBy) params.sortBy = sortBy;
    params.page = page;
    params.limit = limit;

    const response = await publicAxios.get(APIENDPOINT.CENTERS_LIST, { params });
    const centers = response.data || [];
    
    // Transform the API response to match frontend expectations
    return centers.map(center => ({
      ...center,
      image: center.centerImage || center.image || 'https://via.placeholder.com/400',
      location: center.address || center.location || 'Location not specified',
      reviewCount: center.totalReviews || center.reviewCount || 0,
      amenities: center.amenities || [],
      distance: center.distance || 'N/A',
      openHours: center.openHours || 'See schedule',
    }));
  } catch (error) {
    console.error("Error fetching centers:", error);
    return [];
  }
};

export const fetchCenterDetails = async (id) => {
  try {
    const response = await publicAxios.get(`${APIENDPOINT.CENTERS_DETAIL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching center details:", error);
    return null;
  }
};

export const registerCenter = async (formData) => {
  try {
    const response = await secureAxios.post(APIENDPOINT.CENTERS_REGISTER, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};
