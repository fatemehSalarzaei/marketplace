export interface ShippingMethod {
  id: number;
  name: string;
  description: string;
  cost: string;
  min_estimated_days: number;
  max_estimated_days: number;
  active: boolean;
}
