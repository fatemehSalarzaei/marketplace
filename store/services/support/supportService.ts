import apiClient from '@/lib/axiosInstance';
import { API_ENDPOINTS } from '@/lib/config';
import { PaginatedTickets, Ticket, SupportCategory } from '@/types/support/support';

export async function fetchUserTickets(page = 1): Promise<PaginatedTickets> {
  const res = await apiClient.get(`${API_ENDPOINTS.myTickets}?page=${page}`);
  return res.data;
}

export async function createTicket(data: Partial<Ticket>): Promise<Ticket> {
  const res = await apiClient.post(API_ENDPOINTS.myTickets, data);
  return res.data;
}

export async function fetchTicketDetail(id: number): Promise<Ticket> {
  const res = await apiClient.get(`${API_ENDPOINTS.myTickets}${id}/`);
  return res.data;
}

// اضافه شده: دریافت لیست دسته‌بندی پشتیبانی (بدون صفحه‌بندی)
export async function fetchSupportCategories(): Promise<SupportCategory[]> {
  const res = await apiClient.get(API_ENDPOINTS.supportCategories);
  return res.data;
}
