import apiClient from '@/lib/axiosInstance';
import { API_ENDPOINTS_ADMIN } from '@/lib/config';

export const fetchAdminTickets = (page = 1, search = '') => {
  const params = new URLSearchParams({ page: page.toString() });
  if (search) params.append('search', search);
  return apiClient.get(`${API_ENDPOINTS_ADMIN.tickets}?${params.toString()}`);
};

export const deleteAdminTicket = (id: number) => {
  return apiClient.delete(`${API_ENDPOINTS_ADMIN.tickets}${id}/`);
};

export const fetchAdminTicketDetail = (ticketId: number) => {
  return apiClient.get(`${API_ENDPOINTS_ADMIN.tickets}${ticketId}/`);
};

export const updateAdminTicketStatus = (ticketId: number, status: string) => {
  return apiClient.patch(`${API_ENDPOINTS_ADMIN.tickets}${ticketId}/`, { status });
};

export const sendAdminTicketMessage = (data: {
  ticket: number;
  message: string;
  attachment?: File;
}) => {
  const formData = new FormData();
  formData.append('ticket', String(data.ticket));
  formData.append('message', data.message);
  if (data.attachment) {
    formData.append('attachment', data.attachment);
  }
  return apiClient.post(API_ENDPOINTS_ADMIN.ticketMessages, formData);
};
