// components/support/AddTicketModal.tsx
"use client";

import React, { useState } from "react";
import { SupportCategory, TicketPriority } from "@/types/support/support";

interface Props {
  categories: SupportCategory[];
  onClose: () => void;
  onSubmit: (data: { subject: string; categoryId: number; description: string; priority: TicketPriority }) => void;
}

export default function AddTicketModal({ categories, onClose, onSubmit }: Props) {
  const [subject, setSubject] = useState("");
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 0);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("normal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ subject, categoryId, description, priority });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">افزودن تیکت جدید</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            required
            type="text"
            placeholder="موضوع"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <textarea
            required
            placeholder="توضیحات"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TicketPriority)}
            className="border p-2 rounded"
          >
            <option value="normal">عادی</option>
            <option value="important">مهم</option>
            <option value="urgent">فوری</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              ثبت تیکت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
