import apiClient from '@/lib/axiosInstance';
import { API_ENDPOINTS_ADMIN } from '@/lib/config';
import { SalesReportResponse, TopProduct, LowStockProduct } from '@/types/admin/report/salesReportTypes';

export const getSalesReport = (start_date?: string, end_date?: string) => {
  return apiClient.get<SalesReportResponse>(API_ENDPOINTS_ADMIN.salesReport, {
    params: { start_date, end_date }
  });
};

export const getTopProducts = (start_date?: string, end_date?: string, limit = 10) => {
  return apiClient.get<TopProduct[]>(API_ENDPOINTS_ADMIN.topProducts, {
    params: { start_date, end_date, limit }
  });
};

export const getLowStockProducts = (limit = 10) => {
  return apiClient.get<LowStockProduct[]>(API_ENDPOINTS_ADMIN.lowStockProducts, {
    params: { limit }
  });
};
