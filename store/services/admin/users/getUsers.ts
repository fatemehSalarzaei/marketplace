import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS_ADMIN } from "@/lib/config";
import { Role } from "@/types/admin/roles/role";

type UserType = "admin" | "regular";
interface GetAdminUsersParams {
  page?: number;
  search?: string;
  is_active?: string;
  is_superuser?: string;
  is_staff?: string;
}

export const getAdminUsers = (params: GetAdminUsersParams) =>
  apiClient.get<{
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
  }>(API_ENDPOINTS_ADMIN.adminUsers, {
    params,
  });

export const getRegularUsers = (page: number = 1, search: string = "") =>
  apiClient.get<{
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
  }>(API_ENDPOINTS_ADMIN.regularUsers, {
    params: {
      page,
      search: search || undefined,
    },
  });

export const getUserById = (id: string, userType: UserType) => {
  const baseUrl =
    userType === "admin"
      ? API_ENDPOINTS_ADMIN.adminUsers
      : API_ENDPOINTS_ADMIN.regularUsers;

  return apiClient.get(`${baseUrl}${id}/`);
};

// جدید: ایجاد کاربر جدید (POST)
export const createUser = (data: any) =>
  apiClient.post(API_ENDPOINTS_ADMIN.adminUsers, data);

// جدید: ویرایش کاربر (PATCH)
export const updateUser = (id: string, data: any) =>
  apiClient.put(`${API_ENDPOINTS_ADMIN.adminUsers}${id}/`, data);
