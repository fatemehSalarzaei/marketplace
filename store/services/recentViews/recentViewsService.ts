// services/recentViewsService.ts
import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/config";
import { RecentView, RecentViewsList } from "@/types/recentViews/recentViews";

export const fetchRecentViews = async (): Promise<RecentViewsList> => {
  const res = await apiClient.get(API_ENDPOINTS.recentViews);
  return res.data;
};

export const addRecentView = async (productId: number): Promise<RecentView> => {
  const res = await apiClient.post(API_ENDPOINTS.recentViews, {
    product_id: productId,
  });
  return res.data;
};
