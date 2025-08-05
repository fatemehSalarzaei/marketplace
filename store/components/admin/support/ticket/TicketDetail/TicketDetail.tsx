'use client';
import { useEffect, useState } from 'react';
import { Ticket, TicketMessage } from '@/types/admin/support/ticket';
import {
  fetchAdminTicketDetail,
  sendAdminTicketMessage,
  updateAdminTicketStatus,
} from '@/services/admin/support/ticketService';

import TicketInfo from './TicketInfo';
import TicketMessages from './TicketMessages';
import TicketReplyForm from './TicketReplyForm';
import TicketStatusChanger from './TicketStatusChanger';

export default function TicketDetail({ ticketId }: { ticketId: number }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);

  const load = async () => {
    const res = await fetchAdminTicketDetail(ticketId);
    setTicket(res.data);
    setMessages(res.data.messages);
  };

  useEffect(() => {
    load();
  }, [ticketId]);

  const handleReply = async (message: string, attachment?: File) => {
    await sendAdminTicketMessage({ ticket: ticketId, message, attachment });
    load();
  };

  const handleStatusChange = async (status: string) => {
    await updateAdminTicketStatus(ticketId, status);
    load();
  };

  if (!ticket) return <p>در حال بارگذاری...</p>;

  return (
    <div className="space-y-6 p-4">
      {/* سطر اول: اطلاعات و تغییر وضعیت */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TicketInfo ticket={ticket} />
        <TicketStatusChanger currentStatus={ticket.status} onChange={handleStatusChange} />
      </div>

      {/* سطر دوم: فرم پاسخ و لیست پیام‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TicketReplyForm onSubmit={handleReply} />
        <TicketMessages messages={messages} />
      </div>
    </div>
  );
}
