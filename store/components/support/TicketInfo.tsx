"use client";

import { TicketDetail } from "@/types/support/ticketDetail";

interface Props {
  ticket: TicketDetail;
}

const priorityMap: Record<string, string> = {
  normal: "عادی",
  important: "مهم",
  urgent: "فوری",
};

const statusMap: Record<string, string> = {
  open: "باز",
  in_progress: "در حال بررسی",
  answered: "پاسخ داده شده",
  closed: "بسته شده",
};

export default function TicketInfo({ ticket }: Props) {
  return (
    <div className="mb-6 rounded-lg bg-gray-50 p-4 shadow-sm">
      <h2 className="text-xl font-bold mb-4">{ticket.subject}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
        <div>
          <span className="font-medium text-gray-600">دسته‌بندی:</span>{" "}
          <span>{ticket.category?.name || "—"}</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">اولویت:</span>{" "}
          <span>{priorityMap[ticket.priority] || ticket.priority}</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">وضعیت:</span>{" "}
          <span>{statusMap[ticket.status] || ticket.status}</span>
        </div>
        {ticket.order_number && (
          <div>
            <span className="font-medium text-gray-600">شماره سفارش:</span>{" "}
            <span>{ticket.order_number}</span>
          </div>
        )}
        <div className="sm:col-span-2">
          <span className="font-medium text-gray-600">توضیحات:</span>
          <p className="mt-1">{ticket.description}</p>
        </div>
        <div className="sm:col-span-2 text-xs text-gray-400">
          <span className="font-medium">ثبت شده در:</span>{" "}
          {new Date(ticket.created_at).toLocaleString("fa-IR")}
        </div>
      </div>
    </div>
  );
}
