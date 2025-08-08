import apiClient from '@/lib/axiosInstance';
import { API_ENDPOINTS_ADMIN } from '@/lib/config';
import { PaginatedNotificationResponse , AdminNotification } from '@/types/admin/notification/notification';


interface NotificationQuery {
  page?: number;
  is_read?: string;
  type?: string;
  channel?: string;
  search?: string;
}

export async function fetchAdminNotifications(params: NotificationQuery) {
  const response = await apiClient.get<PaginatedNotificationResponse>(API_ENDPOINTS_ADMIN.notifications, {
    params,
  });
  return response.data;
}


export const createNotification = async (data: AdminNotification) => {
  const res = await apiClient.post(API_ENDPOINTS_ADMIN.notifications, data);
  return res.data;
};