export interface SalesTrendItem {
  date: string;
  total_sales: number;
}

export interface SalesReportResponse {
  total_revenue: number;
  total_orders: number;
  total_paid_orders: number;
  total_refunded_amount: number;
  orders_by_status: Record<string, number>;
  payments_summary: {
    total_payments: number;
    successful: number;
    failed: number;
    pending: number;
    refunded: number;
    total_amount: number;
  };
  sales_trend: SalesTrendItem[];
}

export interface TopProduct {
  product_id: number;
  product_name: string;
  variant_sku: string;
  total_quantity_sold: number;
  total_revenue: number;
}

export interface LowStockProduct {
  variant_id: number;
  product_name: string;
  variant_sku: string;
  stock: number;
  low_stock_threshold: number;
}
