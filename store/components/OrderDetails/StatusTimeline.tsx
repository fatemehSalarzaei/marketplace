"use client";

import { ORDER_STATUS_LABELS } from "@/constants/orderStatus";
export default function StatusTimeline({
  statusHistory,
}: {
  statusHistory: any[];
}) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">تاریخچه وضعیت سفارش</h2>
      <ol className="relative border-s border-gray-200">
        {statusHistory.map((entry, index) => (
          <li key={index} className="mb-4 ms-4">
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full -start-1.5 border border-white"></div>
            <time className="text-xs text-gray-500">
              {new Date(entry.changed_at).toLocaleString("fa-IR")}
            </time>
            <p className="text-sm font-medium">
              {ORDER_STATUS_LABELS[entry.status] || entry.status}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
