'use client';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function ChannelSelect({ value, onChange }: Props) {
  return (
    <div>
      <label className="block mb-1 font-medium">کانال ارسال</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="site">درون سایت</option>
        <option value="email">ایمیل</option>
        <option value="sms">پیامک</option>
      </select>
    </div>
  );
}
