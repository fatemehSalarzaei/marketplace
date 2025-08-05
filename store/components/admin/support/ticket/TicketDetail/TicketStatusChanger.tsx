interface Props {
  currentStatus: string;
  onChange: (status: string) => void;
}

const statuses = [
  { value: "open", label: "باز" },
  { value: "in_progress", label: "در حال بررسی" },
  { value: "answered", label: "پاسخ داده شده" },
  { value: "closed", label: "بسته شده" },
];

export default function TicketStatusChanger({ currentStatus, onChange }: Props) {
  return (
    <div className="bg-white p-4 rounded">
      <h2 className="text-lg font-bold mb-2">تغییر وضعیت</h2>
      <select
        value={currentStatus}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded w-full"
      >
        {statuses.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
}
