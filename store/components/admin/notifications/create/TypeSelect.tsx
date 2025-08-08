'use client';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function TypeSelect({ value, onChange }: Props) {
  return (
    <div>
      <label className="block mb-1 font-medium">نوع اعلان</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="order_status">وضعیت سفارش</option>
        <option value="discount">تخفیف</option>
        <option value="review_reply">پاسخ به نظر</option>
        <option value="custom">سفارشی</option>
      </select>
    </div>
  );
}
