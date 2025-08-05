export interface ProductBasicInfo {
  id?: string
  name: string
  slug?: string
  short_description?: string
  long_description?: string
  price: number
  stock?: number
  category_id: string
  is_active: boolean
  attributes: ProductAttribute[]
  variants: ProductVariant[]
}

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

export interface Category {
  id: string
  name: string
}

export interface Attribute {
  id: string
  name: string
  options: { id: string; value: string }[]
  allows_free_text: boolean
}
