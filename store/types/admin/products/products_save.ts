export interface Product {
  id?: number
  product_code: string
  category: number
  brand?: number
  tags?: number[]
  name: string
  slug?: string
  short_description?: string
  long_description?: string
  status?: string
  availability_status?: string
  main_image?: File | string | null
  min_order_quantity?: number
  max_order_quantity?: number
  is_active?: boolean
  gallery_images?: ProductGalleryImage[]
  videos?: ProductVideo[]
  variants?: ProductVariant[]
  attribute_values?: ProductAttributeValue[]
}

export interface ProductGalleryImage {
  id?: number
  image_asset: File | string
  alt_text?: string
}

export interface ProductVideo {
  id?: number
  video_asset: File | string
  title?: string
  description?: string
}

export interface ProductVariant {
  id?: number
  sku: string
  price: number
  stock?: number
  is_active?: boolean
  image?: File | string | null
  gallery_images?: ProductVariantGalleryImage[]
  variant_attributes?: ProductVariantAttribute[]
}

export interface ProductVariantGalleryImage {
  id?: number
  image_asset: File | string
  alt_text?: string
}

export interface ProductVariantAttribute {
  id?: number
  attribute_value: number
}

export interface ProductAttributeValue {
  id?: number
  attribute: number
  predefined_value?: number
  value?: string
}