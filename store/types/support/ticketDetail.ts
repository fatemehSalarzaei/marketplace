// types/support/ticketDetail.ts
import { SupportCategory } from "./support";

export interface TicketMessage {
  id: number;
  ticket: number;
  sender: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  message: string;
  attachment?: string;
  created_at: string;
}

export interface TicketDetail {
  id: number;
  subject: string;
  category: SupportCategory;
  description: string;
  priority: string;
  status: string;
  order_number?: string;
  created_at: string;
  messages: TicketMessage[];
}
