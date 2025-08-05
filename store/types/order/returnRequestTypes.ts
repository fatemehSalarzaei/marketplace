export interface ReturnRequest {
  id: number;
  order: number;
  order_item: number;
  reason: string;
  status: string;
  requested_at: string;
}

export interface ReturnRequestFormData {
  order: number;
  order_item: number;
  reason: string;
  return_quantity: number;
}
