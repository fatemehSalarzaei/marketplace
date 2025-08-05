import apiClient from "@/lib/axiosInstance"

export interface ProductAttribute {
  attribute_id: string
  value: string
}

export interface ProductVariant {
  id?: string
  sku: string
  price: number
  stock?: number
  is_active: boolean
  attributes: ProductAttribute[]
}

export async function fetchCategories() {
  const res = await apiClient.get('/admin/categories/')
  return res.data.results
}

export async function fetchAttributes() {
  const res = await apiClient.get('/admin/product-attributes/')
  return res.data.results
}

export async function createProduct(data: any) {
  const res = await apiClient.post('/admin/products/', data, {
    headers: { 'Content-Type': 'application/json' },
  })
  return res.data
}

export async function updateProduct(id: string, data: any) {
  const res = await apiClient.put(`/admin/products/${id}/`, data, {
    headers: { 'Content-Type': 'application/json' },
  })
  return res.data
}


export async function fetchProduct(id: string) {
  const res = await apiClient.get(`/admin/products/${id}/`)
  return res.data
}
