export interface AdminUser {
  first_name: string
  last_name: string
  phone_number: string
}

export interface ProductVariant {
  id: number
  sku: string
  price: string
  is_active: boolean
}

export interface OrderItem {
  id: number
  title_snapshot: string
  variant: ProductVariant
  quantity: number
  unit_price: string
  total_price: string
}

export interface OrderSummary {
  id: number
  order_number: string
  status: string
  total_price: string
  final_price: string
  delivery_price: string
  is_paid: boolean
  created_at: string
}

export interface ReturnRequestSummary {
  id: number
  order_id: number
  item_title: string
  user: AdminUser
  status: string
  requested_at: string
}

export interface ReturnRequestDetail {
  id: number
  status: string
  reason: string
  requested_at: string
  processed_at: string | null
  user: AdminUser
  order: OrderSummary
  order_items: OrderItem[]
  order_item: number
}
