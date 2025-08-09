// components/support/TicketItem.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Ticket } from "@/types/support/support";

interface Props {
  ticket: Ticket;
}

const priorityMap = {
  normal: "عادی",
  important: "مهم",
  urgent: "فوری",
};

const statusMap = {
  open: "باز",
  in_progress: "در حال بررسی",
  answered: "پاسخ داده شده",
  closed: "بسته شده",
};

export default function TicketItem({ ticket }: Props) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/user/support/${ticket.id}`);
  };

  return (
    <div className="p-4 mb-2 border rounded shadow flex flex-col md:flex-row md:items-center justify-between">
      <div className="flex-1 flex flex-col md:flex-row md:items-center md:space-x-4">
        <h4 className="font-semibold">{ticket.subject}</h4>
        <span className="text-sm text-gray-600 whitespace-nowrap">
          دسته‌بندی: {ticket.category?.name ?? "نامشخص"}
        </span>
        <span className="text-sm whitespace-nowrap">
          اولویت: {priorityMap[ticket.priority]}
        </span>
        <span className="text-sm whitespace-nowrap">
          وضعیت: {statusMap[ticket.status]}
        </span>
        <span className="text-sm text-gray-400 whitespace-nowrap">
          {new Date(ticket.created_at).toLocaleDateString("fa-IR")}
        </span>
      </div>
      <button
        onClick={handleViewDetails}
        className="mt-2 md:mt-0 px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
      >
        مشاهده جزئیات
      </button>
    </div>
  );
}
