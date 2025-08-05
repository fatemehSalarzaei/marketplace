export interface ShippingMethod {
  id: number;
  name: string;
  description: string | null;
  cost: string;
  min_estimated_days: number | null;
  max_estimated_days: number | null;
  active: boolean;
}
