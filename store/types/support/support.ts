// types/support.ts
export interface SupportCategory {
  id: number;
  name: string;
  description?: string;
}

export type TicketPriority = 'normal' | 'important' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'answered' | 'closed';

export interface Ticket {
  id: number;
  subject: string;
  category: SupportCategory | null;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  order_number?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  count: number;
  next?: string | null;
  previous?: string | null;
}

export interface PaginatedTickets {
  results: Ticket[];
  count: number;
  next?: string | null;
  previous?: string | null;
}


export interface SupportCategory {
  id: number;
  name: string;
  description: string;
}
