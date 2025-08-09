"use client";

import { TicketMessage } from "@/types/support/ticketDetail";

interface Props {
  messages: TicketMessage[];
}

export default function TicketMessagesList({ messages }: Props) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
      <h3 className="text-lg font-bold mb-4 border-b pb-2">پیام‌ها</h3>
      {messages.length === 0 && (
        <p className="text-gray-500">هیچ پیامی وجود ندارد.</p>
      )}
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="mb-4 p-4 bg-gray-50 rounded-md shadow-sm"
        >
          <div className="text-sm text-gray-700 mb-2 font-semibold">
            {msg.sender.first_name} {msg.sender.last_name} -{" "}
            <time dateTime={msg.created_at}>
              {new Date(msg.created_at).toLocaleString("fa-IR")}
            </time>
          </div>
          <div
            className="prose max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: msg.message }}
          />
          {msg.attachment && (
            <a
              href={msg.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm mt-2 inline-block"
            >
              دانلود فایل
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
