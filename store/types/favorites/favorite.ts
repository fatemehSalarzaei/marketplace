export interface Favorite {
  id: number;
  user: number;
  product?: number;
  variant?: number;
  created_at: string;
}

export interface FavoriteProductImage {
  image_url: string;
}

export interface FavoriteProduct {
  id: number;
  name: string;
  slug: string;
  short_description?: string;
  main_image_url?: string;
}

export interface FavoriteVariant {
  id: number;
  sku: string;
  price: string;
}

export interface FavoriteItem {
  id: number;
  product?: FavoriteProduct;
  variant?: FavoriteVariant;
  created_at: string;
}
