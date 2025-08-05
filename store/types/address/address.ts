export interface Address {
  id: number;
  first_name: string;
  last_name: string;
  street_address: string;
  postal_code: string;
  phone_number: string;
  is_default: boolean;
  created_at: string;
  city: number;
}

export interface AddressListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Address[];
}

export interface CreateAddressPayload {
  first_name: string;
  last_name: string;
  street_address: string;
  postal_code: string;
  phone_number: string;
  is_default: boolean;
  city: number;
}
