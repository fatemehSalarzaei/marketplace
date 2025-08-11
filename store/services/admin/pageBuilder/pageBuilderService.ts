import apiClient from '@/lib/axiosInstance'
import { API_ENDPOINTS_ADMIN } from '@/lib/config'
import { Element, ElementItem, RelatedObject } from '@/types/admin/pageBuilder/pageBuilder'
import { ElementType } from '@/types/admin/pageBuilder/pageBuilder'; // اگر تعریفش داری

export const getElementTypes = async (): Promise<ElementType[]> => {
  const res = await apiClient.get(API_ENDPOINTS_ADMIN.elementtypes);
  return res.data;
};

export const getElements = async (): Promise<Element[]> => {
  const res = await apiClient.get(API_ENDPOINTS_ADMIN.elements)
  return res.data
}

export const getElementById = async (id: number): Promise<Element> => {
  const res = await apiClient.get(`${API_ENDPOINTS_ADMIN.elements}${id}/`)
  return res.data
}

export const createElement = async (data: Partial<Element>): Promise<Element> => {
  const res = await apiClient.post(API_ENDPOINTS_ADMIN.elements, data)
  return res.data
}

export const updateElement = async (id: number, data: Partial<Element>): Promise<Element> => {
  const res = await apiClient.put(`${API_ENDPOINTS_ADMIN.elements}${id}/`, data)
  return res.data
}

export const getElementItems = async (elementId: number): Promise<ElementItem[]> => {
  const res = await apiClient.get(`${API_ENDPOINTS_ADMIN.elementitems}?element=${elementId}`)
  return res.data
}

export const createElementItem = async (data: Partial<ElementItem>): Promise<ElementItem> => {
  const res = await apiClient.post(API_ENDPOINTS_ADMIN.elementitems, data)
  return res.data
}

export const updateElementItem = async (id: number, data: Partial<ElementItem>): Promise<ElementItem> => {
  const res = await apiClient.put(`${API_ENDPOINTS_ADMIN.elementitems}${id}/`, data)
  return res.data
}

export const deleteElementItem = async (id: number): Promise<void> => {
  await apiClient.delete(`${API_ENDPOINTS_ADMIN.elementitems}${id}/`)
}

export const searchRelatedObjects = async (elementType: string, query: string): Promise<RelatedObject[]> => {
  switch (elementType) {
    case 'product':
      return (await apiClient.get(`/products/products/?search=${query}`)).data.results
    case 'category':
      return (await apiClient.get(`/categories/categories-all/?search=${query}`)).data.results
    case 'banner':
      return (await apiClient.get(`/banner/admin/banners/?search=${query}`)).data.results
    default:
      return []
  }
}

export const updateElementsPositions = async (elements: Partial<Element>[]) => {
  // فقط id و position را ارسال می‌کنیم
  const payload = elements.map(({ id, position }) => ({ id, position }));
  const res = await apiClient.post(API_ENDPOINTS_ADMIN.update_positions, payload);
  return res.data;
};