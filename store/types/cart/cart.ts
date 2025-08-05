// types/cart.ts

import { ProductVariant } from "./products/product";

export interface CartProduct {
  id: number;
  name: string;
  slug: string;
  main_image: string;
  short_description: string;
}

export interface CartProductVariant extends Omit<ProductVariant, "product"> {
  product: CartProduct;
}

export interface CartItem {
  id: number;
  product_variant: CartProductVariant;
  quantity: number;
  price_at_time: string;
  get_total_price: number;
}

export interface Cart {
  id: number;
  user: number | null;
  session_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  items: CartItem[];
}
