// app/tickets/[id]/page.tsx
import TicketDetailPage from "@/components/support/TicketDetailPage";

export default function Page({ params }: { params: { id: string } }) {
  return <TicketDetailPage ticketId={Number(params.id)} />;
}
