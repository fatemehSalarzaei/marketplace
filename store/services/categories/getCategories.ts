import apiClient from '@/lib/axiosInstance'
import { Category } from '@/types/category/getCategories'

export async function fetchCategoriesTree(): Promise<Category[]> {
  try {
    const response = await apiClient.get<Category[]>('/categories/categories/tree/')
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}
