export interface OrderItem {
  title_snapshot: string;
  variant: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  is_returnable: boolean;
  returned_quantity: number;
}

export interface UserSimple {
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface Order {
  id: number;
  order_number: string;
  user: UserSimple;
  status: string;
  total_price: number;
  final_price: number;
  delivery_price: number;
  is_paid: boolean;
  has_return_request: boolean;
  is_refunded: boolean;
  created_at: string;
  items: OrderItem[];
}