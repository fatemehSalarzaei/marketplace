import apiClient from "@/lib/axiosInstance";
import { Role } from "@/types/admin/roles/role";

export const getRoles = (page: number = 1, search: string = "") =>
  apiClient.get<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Role[];
  }>("/accounts/admin/roles/", {
    params: {
      page,
      search: search || undefined, // اگر خالی بود ارسال نشود
    },
  });

export const getRole = (id: number) =>
  apiClient.get<Role>(`/accounts/admin/roles/${id}/`);
export const createRole = (data: Role) =>
  apiClient.post(`/accounts/admin/roles/`, data);
export const updateRole = (id: number, data: Role) =>
  apiClient.put(`/accounts/admin/roles/${id}/`, data);
export const deleteRole = (id: number) =>
  apiClient.delete(`/accounts/admin/roles/${id}/`);
