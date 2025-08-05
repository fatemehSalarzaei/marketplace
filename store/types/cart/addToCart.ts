export interface AddToCartPayload {
  variant_id: number;
  quantity: number;
}

export interface AddToCartResponse {
  message: string;
}

export interface CartItem {
  id: number;
  variant: {
    id: number;
    sku: string;
    price: number;
    product_name: string;
  };
  quantity: number;
  total_price: number;
}
