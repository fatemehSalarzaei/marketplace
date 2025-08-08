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
  
  async submitReview(data: {
    product: number;
    rating: number;
    comment: string;
    parent?: number | null;
  }) {
    const res = await apiClient.post(API_ENDPOINTS.submitReview, data);
    return res.data;
  },
};
