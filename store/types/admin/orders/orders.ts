// types/orders.ts
export interface UserSimple {
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface OrderItem {
  title_snapshot: string;
  variant: number | null;  // اگر بخواهیم جزئیات variant اضافه شود، مدل آن را گسترش دهیم
  quantity: number;
  unit_price: string;  // decimal به صورت رشته از API میاد
  total_price: string;
  is_returnable: boolean;
  returned_quantity: number;
}

export interface Order {
  id: number;
  order_number: string;
  user: UserSimple;
  status: string;
  total_price: string;
  final_price: string;
  delivery_price: string;
  is_paid: boolean;
  has_return_request: boolean;
  is_refunded: boolean;
  created_at: string;
  items: OrderItem[];
}

export interface PaginatedOrders {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
}
