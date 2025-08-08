import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/config";
import { FavoriteItem } from "@/types/favorites/favorite";

interface AddFavoritePayload {
  product?: number;
  variant?: number;
}

interface FavoriteListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FavoriteItem[];
}

export const favoriteService = {
  getFavorites: async (page: number = 1) => {
    const { data } = await apiClient.get<FavoriteListResponse>(
      `${API_ENDPOINTS.favorites}?page=${page}`
    );
    return data;
  },

  addFavorite: async (payload: AddFavoritePayload) => {
    const { data } = await apiClient.post<FavoriteItem>(
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
