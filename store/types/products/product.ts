export interface ProductGalleryImage {
  id: number;
  image_url: string;
  alt_text: string;
}

export interface ProductVideo {
  id: number;
  video_url: string;
  title: string;
  description: string;
  uploaded_at: string;
}

export interface ProductAttribute {
  attribute_name: string;
  value: string;
}

export interface ProductVariantAttribute {
  attribute: string;
  value: string;
}

export interface ProductVariant {
  id: number;
  sku: string;
  price: number;
  stock: number;
  is_active: boolean;
  image?: string;
  attributes: ProductVariantAttribute[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  min_order_quantity: number;
  max_order_quantity: number;
  main_image: string;
  gallery_images: ProductGalleryImage[];
  videos: ProductVideo[];
  availability_status: string;
  attributes: ProductAttribute[];
  variants: ProductVariant[];
}
