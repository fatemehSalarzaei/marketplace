import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, API_ENDPOINTS } from "./config";
import { toastCallback } from "./toastCallback"; // ماژول برای اتصال Context به apiClient

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if ((config as any).skipAuth) return config;

  const accessToken = Cookies.get("access_token");
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // نمایش خطا با Toast
    if (toastCallback) {
      const message = error.response?.data?.detail || "خطای نامشخص رخ داد.";
      toastCallback({ message, type: "error" });
    }

    // رفتار refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== API_ENDPOINTS.refreshTokenUrl
    ) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refresh_token");
      if (refreshToken) {
        try {
          const res = await apiClient.post(
            API_ENDPOINTS.refreshTokenUrl,
            { refresh: refreshToken },
            { skipAuth: true }
          );
          const newAccessToken = res.data.access;
          Cookies.set("access_token", newAccessToken, { expires: 1 });

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return apiClient(originalRequest);
        } catch {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          const currentPath = window.location.pathname + window.location.search;
          localStorage.setItem("redirect_after_login", currentPath);
          window.location.href = `/auth/login?redirect=${encodeURIComponent(currentPath)}`;
        }
      } else {
        const currentPath = window.location.pathname + window.location.search;
        localStorage.setItem("redirect_after_login", currentPath);
        window.location.href = `/auth/login?redirect=${encodeURIComponent(currentPath)}`;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
