"use client";

import React, { useEffect, useState } from "react";
import { fetchUserTickets, createTicket, fetchSupportCategories } from "@/services/support/supportService";
import { Ticket, SupportCategory, TicketPriority } from "@/types/support/support";
import TicketItem from "@/components/support/TicketItem";
import AddTicketModal from "@/components/support/AddTicketModal";

interface SupportTicketsProps {}

export default function SupportTickets(props: SupportTicketsProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [categories, setCategories] = useState<SupportCategory[]>([]);

  useEffect(() => {
    // بارگذاری دسته‌بندی‌ها از API
    async function loadCategories() {
      try {
        const data = await fetchSupportCategories();
        setCategories(data);
      } catch (error) {
        console.error("خطا در بارگذاری دسته‌بندی‌ها:", error);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    loadTickets(page);
  }, [page]);

  async function loadTickets(page: number) {
    try {
      const data = await fetchUserTickets(page);
      setTickets(data.results);
      setTotalCount(data.count);
    } catch (error) {
      console.error("خطا در بارگذاری تیکت‌ها:", error);
    }
  }

  async function handleAddTicket(data: {
    subject: string;
    categoryId: number;
    description: string;
    priority: TicketPriority;
  }) {
    try {
      await createTicket({
        subject: data.subject,
        category: data.categoryId,
        description: data.description,
        priority: data.priority,
      });
      setIsAddModalOpen(false);
      loadTickets(page); // بارگذاری مجدد پس از افزودن
    } catch (error) {
      console.error("خطا در ایجاد تیکت:", error);
    }
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">تیکت‌های پشتیبانی</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          افزودن تیکت جدید
        </button>
      </div>

      {tickets.length === 0 ? (
        <p>هیچ تیکتی وجود ندارد.</p>
      ) : (
        <>
          {tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))}

          <div className="flex justify-center space-x-2 mt-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              قبلی
            </button>
            <span className="px-3 py-1 border rounded">{page}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              بعدی
            </button>
          </div>
        </>
      )}

      {isAddModalOpen && (
        <AddTicketModal
          categories={categories}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddTicket}
        />
      )}
    </div>
  );
}
