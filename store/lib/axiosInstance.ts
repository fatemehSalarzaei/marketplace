import axios from 'axios'
import Cookies from 'js-cookie'
import { API_BASE_URL, API_ENDPOINTS } from './config'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  // اگر skipAuth مشخص شده بود، توکن نزن
  if ((config as any).skipAuth) return config

  const accessToken = Cookies.get('access_token')
  if (accessToken) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // اگر 401 و قبلاً تلاش نکرده، و این درخواست خود refresh نیست
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== API_ENDPOINTS.refreshTokenUrl
    ) {
      originalRequest._retry = true

      const refreshToken = Cookies.get('refresh_token')
      if (refreshToken) {
        try {
          // درخواست refresh بدون توکن ارسال شود
          const res = await apiClient.post(
            API_ENDPOINTS.refreshTokenUrl,
            { refresh: refreshToken },
            { skipAuth: true } // interceptor بالایی از آن عبور می‌کند
          )

          const newAccessToken = res.data.access
          Cookies.set('access_token', newAccessToken, { expires: 1 })

          originalRequest.headers = originalRequest.headers || {}
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

          return apiClient(originalRequest)
        } catch (refreshError) {
          // اگر رفرش هم شکست خورد
          Cookies.remove('access_token')
          Cookies.remove('refresh_token')

          // مسیر فعلی رو ذخیره کن
          const currentPath = window.location.pathname + window.location.search
          localStorage.setItem('redirect_after_login', currentPath)

          // هدایت به صفحه لاگین با redirect query
          window.location.href = `/auth/login?redirect=${encodeURIComponent(currentPath)}`

          return Promise.reject(refreshError)
        }
      } else {
        // هیچ رفرش توکنی نیست → مستقیم به لاگین
        const currentPath = window.location.pathname + window.location.search
        localStorage.setItem('redirect_after_login', currentPath)
        window.location.href = `/auth/login?redirect=${encodeURIComponent(currentPath)}`
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
