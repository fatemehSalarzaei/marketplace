export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface PaymentData {
  id: number
  invoice_id: number
  user_first_name: string
  user_last_name: string
  payment_gateway_name: string | null
  payment_method: string
  status: string
  amount: number
  currency: string
  transaction_id: string | null
  payment_date: string
  order_number : string
  // ... سایر فیلدها در صورت نیاز
}
