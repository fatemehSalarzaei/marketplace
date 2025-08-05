export interface Order {
  id: number;
  order_number: string;
  status: string;
  total_price: string;
  final_price: string;
  delivery_price: string;
  is_paid: boolean;
  created_at: string;
}

export interface PaginatedOrders {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
}
