"use client";
import { useEffect, useState } from 'react';
import { Ticket } from '@/types/admin/support/ticket';
import { fetchAdminTickets, deleteAdminTicket } from '@/services/admin/support/ticketService';
import TicketFilters from './TicketFilters';
import TicketTable from './TicketTable';

export default function AdminTicketComponent() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = async (pg = page, sr = search) => {
    const res = await fetchAdminTickets(pg, sr);
    setTickets(res.data.results);
    setTotal(res.data.count);
  };

  useEffect(() => {
    load();
  }, [page, search]);

  const handleDelete = async (ticket: Ticket) => {
    if (confirm('آیا از حذف مطمئن هستید؟')) {
      await deleteAdminTicket(ticket.id);
      load();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">تیکت‌ها</h1>
      <TicketFilters onChange={(val) => { setSearch(val); setPage(1); }} />
      <TicketTable
        tickets={tickets}
        page={page}
        total={total}
        onPageChange={setPage}
        onDelete={handleDelete}
      />
    </div>
  );
}
