export interface CustomerActivity {
  date?: string;
  period?: string;
  newCustomers: number;
  activeCustomers: number;
}

export interface TopCustomer {
  user_id: number;
  name: string;
  orders: number;
  total_spent: number;
}

export interface CustomersReportResponse {
  new_customers_count: number;
  active_customers_count: number;
  top_customers: TopCustomer[];
}
