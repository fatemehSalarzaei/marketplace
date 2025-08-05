export interface IUser {
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface IReturnRequestSummary {
  id: number;
  order_id: number;
  item_title: string;
  user: IUser;
  status: string;
  requested_at: string;
}

export interface IReturnRequestDetail {
  id: number;
  status: string;
  reason: string;
  requested_at: string;
  processed_at?: string;
  user: IUser;
  order: number;
  order_item: number;
  order_items: {
    id: number;
    title_snapshot: string;
    variant: {
      id: number;
      sku: string;
      price: number;
      is_active: boolean;
    };
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
}
