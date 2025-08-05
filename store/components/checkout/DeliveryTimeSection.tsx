"use client";

interface Props {
  deliveryDate: string;
  onChange: (value: string) => void;
}

export default function DeliveryTimeSection({ deliveryDate, onChange }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <label htmlFor="deliveryDate" className="block mb-1 font-semibold">
        تاریخ ارسال (اختیاری)
      </label>
      <input
        type="date"
        id="deliveryDate"
        value={deliveryDate}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-2 py-1"
      />
    </div>
  );
}
