// services/support/ticketDetailService.ts
import apiClient from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/config";
import { TicketDetail, TicketMessage } from "@/types/support/ticketDetail";

export async function fetchTicketDetail(id: number): Promise<TicketDetail> {
  const res = await apiClient.get(`${API_ENDPOINTS.myTickets}${id}/`);
  return res.data;
}

export async function sendTicketMessage(
  data: { ticket: number; message: string; attachment?: File }
): Promise<TicketMessage> {
  const formData = new FormData();
  formData.append("ticket", String(data.ticket));
  formData.append("message", data.message);
  if (data.attachment) {
    formData.append("attachment", data.attachment);
  }

  const res = await apiClient.post(API_ENDPOINTS.ticketMessages, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}
