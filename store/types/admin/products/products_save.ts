export interface Product {
  id?: number
  product_code: string
  category: number               // فقط id
  brand?: number                 // فقط id
  tags?: number[]                // آرایه id ها
  name: string
  slug?: string
  short_description?: string
  long_description?: string
  status?: string
  availability_status?: string
  main_image_id?: number | null  // فقط id برای ارسال (از main_image به main_image_id تغییر کرد)
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
  image_asset: number | string    // id عددی یا در فرم ممکن فایل (string)
  alt_text?: string
}

export interface ProductVideo {
  id?: number
  video_asset: number | string    // id عددی یا در فرم ممکن فایل (string)
  title?: string
  description?: string
}

export interface ProductVariant {
  id?: number
  sku: string
  price: number
  stock?: number
  is_active?: boolean
  gallery_images?: ProductVariantGalleryImage[]
  variant_attributes?: ProductVariantAttribute[]
}

export interface ProductVariantGalleryImage {
  id?: number
  image_asset: number | string
  alt_text?: string
}

export interface ProductVariantAttribute {
  id?: number
  attribute_value: number   // فقط id
}

export interface ProductAttributeValue {
  id?: number
  attribute: number          // فقط id
  predefined_value?: number  // فقط id یا null
  value?: string
}
