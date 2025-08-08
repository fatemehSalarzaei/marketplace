import apiClient from "@/lib/axiosInstance";
import { Review } from "@/types/reviews/review";
import { API_ENDPOINTS } from "@/lib/config"; // این مسیر رو با توجه به محل فایل config اصلاح کن

export const reviewService = {
  async getReviews(params?: { product?: number; page?: number }) {
    const res = await apiClient.get<{
      count: number;
      next: string | null;
      previous: string | null;
      results: Review[];
    }>(API_ENDPOINTS.getReviews, { params });

    return res.data;
  },
};
