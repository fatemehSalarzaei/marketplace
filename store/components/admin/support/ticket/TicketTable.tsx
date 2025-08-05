"use client";

import { Ticket } from "@/types/admin/support/ticket";
import moment from "moment-jalaali";
import "moment/locale/fa";
import Link from "next/link";

interface Props {
  tickets: Ticket[];
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function TicketTable({ tickets, page, total, onPageChange }: Props) {
  const totalPages = Math.ceil(total / 10);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-separate border-spacing-y-2">
        <thead className="bg-gray-100">
          <tr className="text-gray-700">
            <th className="px-4 py-2 text-right">عنوان</th>
            <th className="px-4 py-2 text-right">کاربر</th>
            <th className="px-4 py-2 text-right">شماره تماس</th>
            <th className="px-4 py-2 text-right">دسته‌بندی</th>
            <th className="px-4 py-2 text-right">تاریخ</th>
            <th className="px-4 py-2 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="bg-white border hover:bg-gray-50">
              <td className="px-4 py-2">{ticket.subject}</td>
              <td className="px-4 py-2">
                {ticket.user.first_name} {ticket.user.last_name}
              </td>
              <td className="px-4 py-2">{ticket.phone_number}</td>
              <td className="px-4 py-2">{ticket.category.name}</td>
              <td className="px-4 py-2">
                {moment(ticket.created_at).format("jYYYY/jMM/jDD HH:mm")}
              </td>
              <td className="px-4 py-2 text-center">
                <Link
                  href={`/admin/support/tickets/${ticket.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  مشاهده
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`mx-1 px-3 py-1 rounded-md text-sm border transition ${
                page === i + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
