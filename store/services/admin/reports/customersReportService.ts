import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS_ADMIN } from "@/lib/config";
import { CustomersReportResponse } from "@/types/admin/report/customersReportTypes";

export async function getCustomersReport(params: {
  start_date?: string;
  end_date?: string;
  top_n?: number;
}): Promise<CustomersReportResponse> {
  const { data } = await apiClient.get(API_ENDPOINTS_ADMIN.customers, { params });
  return data;
}
