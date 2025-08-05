import { Ticket } from "@/types/admin/support/ticket";
import moment from "moment-jalaali";

export default function TicketInfo({ ticket }: { ticket: Ticket }) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "باز";
      case "pending":
        return "در انتظار پاسخ";
      case "closed":
        return "بسته شده";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 mt-6 space-y-4">
      <h2 className="text-xl font-bold border-b pb-2 mb-4">اطلاعات تیکت</h2>
      <div>
        <span className="font-semibold text-gray-600">عنوان:</span>{" "}
        <span className="text-gray-800">{ticket.subject}</span>
      </div>
      <div>
        <span className="font-semibold text-gray-600">کاربر:</span>{" "}
        <span className="text-gray-800">
          {ticket.user.first_name} {ticket.user.last_name}
        </span>
      </div>
      <div>
        <span className="font-semibold text-gray-600">وضعیت:</span>{" "}
        <span className="text-gray-800">{getStatusLabel(ticket.status)}</span>
      </div>
      <div>
        <span className="font-semibold text-gray-600">تاریخ:</span>{" "}
        <span className="text-gray-800">
          {moment(ticket.created_at).format("jYYYY/jMM/jDD HH:mm")}
        </span>
      </div>
    </div>
  );
}
