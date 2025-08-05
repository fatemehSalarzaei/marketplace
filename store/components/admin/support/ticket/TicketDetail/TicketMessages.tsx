import { TicketMessage } from "@/types/admin/support/ticket";
import moment from "moment-jalaali";

export default function TicketMessages({ messages }: { messages: TicketMessage[] }) {
  return (
    <div className="bg-white px-4 py-6 rounded shadow-sm">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">پیام‌ها</h2>
      <div className="space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-800">
                {msg.sender.first_name} {msg.sender.last_name}
              </p>
              <small className="text-gray-500">
                {moment(msg.created_at).format("jYYYY/jMM/jDD HH:mm")}
              </small>
            </div>
            <p className="text-gray-700">{msg.message}</p>
            {msg.attachment && (
              <div className="mt-2">
                <a
                  href={msg.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  دانلود فایل
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
