// services/auth/logout.ts
"use client";

import apiClient from "@/lib/axiosInstance";
import Cookies from "js-cookie";
import { API_ENDPOINTS } from "@/lib/config";

export async function logoutUser() {
  const refresh = Cookies.get("refresh_token");

  if (refresh) {
    try {
      await apiClient.post(
        API_ENDPOINTS.logout,
        { refresh },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("خطا هنگام خروج از حساب:", error);
    }
  }

  // پاک کردن اطلاعات
  // Cookies.removeItem('access_token')
  localStorage.removeItem("full_name");
  localStorage.removeItem("phone_number");
  Cookies.remove("access_token", { path: "/" });
  Cookies.remove("refresh_token", { path: "/" });
}
