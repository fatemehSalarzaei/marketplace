// services/orders.ts
import apiClient from '@/lib/axiosInstance';
import { API_ENDPOINTS_ADMIN } from '@/lib/config';
import { PaginatedOrders } from '@/types/admin/orders/orders';

interface GetOrdersParams {
  page?: number;
  status?: string;
  is_paid?: boolean;
  has_return_request?: boolean;
  is_refunded?: boolean;
  search?: string;
  ordering?: string;
}

export async function fetchAdminOrders(params: GetOrdersParams) {
  const response = await apiClient.get<PaginatedOrders>(API_ENDPOINTS_ADMIN.orders, {
    params,
  })
  return response.data
}