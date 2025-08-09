// services/dashboardService.ts
import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/config";
import { DashboardPayload } from "@/types/dashboard/dashboard";

export async function fetchUserDashboard(): Promise<DashboardPayload> {
  const res = await apiClient.get<DashboardPayload>(API_ENDPOINTS.dashboard);
  return res.data;
}
