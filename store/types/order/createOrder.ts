export interface CreateOrderPayload {
  address_id: number;
  shipping_method_id: number;
  coupon_code?: string;
  delivery_time: string; // ISO8601 string
}
