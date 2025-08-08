'use client';

interface Props {
  value: number | null;
  onChange: (val: number | null) => void;
}

export default function UserSelect({ value, onChange }: Props) {
  return (
    <div>
      <label className="block mb-1 font-medium">انتخاب کاربر</label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">یک کاربر انتخاب کنید</option>
        <option value={1}>کاربر ۱</option>
        <option value={2}>کاربر ۲</option>
      </select>
    </div>
  );
}
