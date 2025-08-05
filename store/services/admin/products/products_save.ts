import apiClient from '@/lib/axiosInstance'
import { API_ENDPOINTS_ADMIN  , API_ENDPOINTS} from '@/lib/config'
import { Product } from '@/types/admin/products/products_save'

export const createProduct = async (data: Partial<Product>) => {
  return apiClient.post(API_ENDPOINTS_ADMIN.product_save, data)
}

export const updateProduct = async (id: number, data: Partial<Product>) => {
  return apiClient.post(API_ENDPOINTS_ADMIN.product_save, {
    ...data,
    id: id, // یا pk: id بسته به backend
  })
}

export const getProduct = async (id: number) => {
  return apiClient.get(API_ENDPOINTS.getProductById(id.toString()))
}

export const getProducts = async (params = {}) => {
  return apiClient.get(API_ENDPOINTS_ADMIN.getFilteredProducts, { params })
}

export const deleteProduct = async (id: number) => {
  return apiClient.delete(`${API_ENDPOINTS_ADMIN.getFilteredProducts}${id}/`)
}
