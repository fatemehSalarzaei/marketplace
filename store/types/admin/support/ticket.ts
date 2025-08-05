export interface Ticket {
  id: number;
  subject: string;
  phone_number: string;
  order_number?: string | null;
  description: string;
  priority: 'normal' | 'important' | 'urgent';
  status: 'open' | 'in_progress' | 'answered' | 'closed';
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string | null;
  };
  category: {
    id: number;
    name: string;
    description: string;
  };
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email?: string | null;
}

export interface SupportCategory {
  id: number;
  name: string;
  description: string;
}

export interface TicketMessage {
  id: number;
  ticket: number;
  sender: User;
  message: string;
  attachment?: string | null;
  created_at: string;
}

export interface Ticket {
  id: number;
  user: User;
  phone_number: string;
  category: SupportCategory;
  subject: string;
  description: string;
  priority: 'normal' | 'important' | 'urgent';
  status: 'open' | 'in_progress' | 'answered' | 'closed';
  order_number?: string | null;
  created_at: string;
  updated_at: string;
  messages: TicketMessage[];
}
