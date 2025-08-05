import { useState } from "react";

interface Props {
  onSubmit: (message: string, attachment?: File) => void;
}

export default function TicketReplyForm({ onSubmit }: Props) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSubmit(message, file || undefined);
    setMessage("");
    setFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 rounded-xl p-5 space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-700">پاسخ جدید</h2>
      <textarea
        className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 p-3 text-sm"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="متن پاسخ..."
      />
      <input
        type="file"
        className="block text-sm text-gray-600"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm transition"
      >
        ارسال پاسخ
      </button>
    </form>
  );
}
