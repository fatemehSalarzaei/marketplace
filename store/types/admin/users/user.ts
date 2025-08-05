// types/user.ts
import { Address } from "@/types/address/address";

export interface User {
  id: number;
  phone_number: string;
  national_code?: string | null;
  first_name: string;
  last_name: string;
  email?: string | null;
  birth_date?: string | null;
  avatar?: string | null;
  is_active: boolean;
  is_superuser: boolean;
  is_staff: boolean;
  date_joined: string;
  role?: number | null;
  role_name?: string | null;
  addresses: Address[];
}
