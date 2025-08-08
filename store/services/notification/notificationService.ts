import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/config";
import { Notification } from "@/types/notification/notification";
export interface NotificationListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Notification[];
}

export const notificationService = {
  async getNotifications(page: number = 1) {
    const res = await apiClient.get<NotificationListResponse>(
      API_ENDPOINTS.userNotifications,
      { params: { page } }
    );
    return res.data;
  },

  async markAsRead(id: number) {
    return await apiClient.patch(`${API_ENDPOINTS.userNotifications}${id}/mark-as-read/`);
  },

  async markAllAsRead() {
    return await apiClient.post(`${API_ENDPOINTS.userNotifications}mark-all-as-read/`);
  },
};
