export interface UserInfo {
  id: number;
  email: string;
}

export interface ProductInfo {
  id: number;
  name: string;
  slug: string;
  main_image_url: string | null;
}

export interface Review {
  id: number;
  product: ProductInfo;
  user: UserInfo;
  rating: number;
  comment: string;
  created_at: string;
}
