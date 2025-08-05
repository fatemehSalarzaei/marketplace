import TicketDetail from "@/components/admin/support/ticket/TicketDetail/TicketDetail";

export default function AdminTicketDetailPage({ params }: { params: { id: string } }) {
  const ticketId = parseInt(params.id, 10);
  return <TicketDetail ticketId={ticketId} />;
}
