export interface RevenueData {
  total: number
  cash: number
  credit: number
}

export interface PaymentMethodData {
  method: string
  count: number
  successRate: number
}

export interface OrderStatusData {
  status: string
  count: number
}

export interface FinancialLogisticsResponse {
  total_order_count: number
  total_paid_orders: number
  total_revenue: number
  total_refunded: number
  total_invoices: number
  order_status_summary: Record<string, number>
  shipping_methods_summary: {
    shipping_method: string
    order_count: number
  }[]
  payment_methods_data: PaymentMethodData[]   // اضافه شده
}
