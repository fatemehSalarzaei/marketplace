import apiClient from "@/lib/axiosInstance"; // همان فایلی که شما دادی
import { API_ENDPOINTS } from "@/lib/config";
import { Favorite } from "@/types/favorites/favorite";

interface AddFavoritePayload {
  product?: number;
  variant?: number;
}

export const favoriteService = {
  addFavorite: async (payload: AddFavoritePayload) => {
    const { data } = await apiClient.post<Favorite>(
      `${API_ENDPOINTS.favorites}add/`,
      payload
    );
    return data;
  },

  removeFavorite: async (payload: AddFavoritePayload) => {
    const { data } = await apiClient.post(
      `${API_ENDPOINTS.favorites}remove/`,
      payload
    );
    return data;
  },
   checkFavorite: async (payload: AddFavoritePayload) => {
        const { data } = await apiClient.post<{ is_favorited: boolean }>(
        `${API_ENDPOINTS.check_favorite}`,
        payload
        );
        return data.is_favorited;
    },
};
 