"use client";

import { SHIPMENT_STATUS_LABELS } from "@/constants/shipmentStatus";

export default function ShipmentInfo({ shipment }: { shipment: any }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">اطلاعات ارسال</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <p>روش ارسال: {shipment?.shipping_method?.name || "---"}</p>
        <p>هزینه ارسال: {shipment?.cost?.toLocaleString() || 0} تومان</p>
        <p>شماره پیگیری: {shipment?.tracking_number || "---"}</p>
        <p>
          وضعیت ارسال:{" "}
          {shipment
            ? SHIPMENT_STATUS_LABELS[shipment.status] || shipment.status
            : "---"}
        </p>
        <p>
          تاریخ ارسال:{" "}
          {shipment?.shipped_at
            ? new Date(shipment.shipped_at).toLocaleDateString("fa-IR")
            : "---"}
        </p>
        <p>
          تاریخ تحویل:{" "}
          {shipment?.delivered_at
            ? new Date(shipment.delivered_at).toLocaleDateString("fa-IR")
            : "---"}
        </p>
      </div>
    </div>
  );
}
