// components/dashboard/ListsSection.tsx
"use client";

import React from "react";

export type ListItem = { id: number; title: string };

export default function ListsSection({ lists }: { lists: ListItem[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      {/* <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">لیست‌های شما</h3>
        <button className="text-sm text-blue-600">مدیریت</button>
      </div> */}

      {lists.length === 0 ? (
        <p className="text-gray-500">هیچ لیستی وجود ندارد.</p>
      ) : (
        <ul className="space-y-2">
          {lists.map((l) => (
            <li key={l.id} className="p-2 bg-gray-50 rounded">{l.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
