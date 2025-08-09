// components/support/TicketDetailPage.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchTicketDetail } from "@/services/support/ticketDetailService";
import { TicketDetail } from "@/types/support/ticketDetail";
import TicketInfo from "./TicketInfo";
import TicketMessagesList from "./TicketMessagesList";
import TicketMessageForm from "./TicketMessageForm";

interface Props {
  ticketId: number;
}

export default function TicketDetailPage({ ticketId }: Props) {
  const [ticket, setTicket] = useState<TicketDetail | null>(null);

  const loadTicket = async () => {
    const data = await fetchTicketDetail(ticketId);
    setTicket(data);
  };

  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  if (!ticket) return <p>در حال بارگذاری...</p>;

return (
  <div className="max-w-4xl mx-auto p-4">
    <h1 className="text-2xl font-bold mb-6">جزئیات تیکت</h1>
    <TicketInfo ticket={ticket} />
    <TicketMessagesList messages={ticket.messages} />
    {ticket.status === "open" && (
      <TicketMessageForm ticketId={ticket.id} onMessageSent={loadTicket} />
    )}
  </div>
);
}