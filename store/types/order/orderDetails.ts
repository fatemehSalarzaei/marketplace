export interface OrderDetail {
  id: number;
  order_number: string;
  status: string;
  total_price: number;
  final_price: number;
  delivery_price: number;
  is_paid: boolean;
  created_at: string;
  items: OrderItem[];
  shipping_address: ShippingAddress;
}

export interface OrderItem {
  id: number;
  title_snapshot: string;
  variant: ProductVariant;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface ProductVariant {
  id: number;
  sku: string;
  price: number;
  stock: number;
  is_active: boolean;
  image: string;
  product: {
    id: number;
    name: string;
    slug: string;
    main_image: string;
  };
}

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  city_name: string;
  street_address: string;
  postal_code: string;
  phone_number: string;
}
