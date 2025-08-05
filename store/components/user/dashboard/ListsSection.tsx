"use client";

import React from "react";

export interface ListItem {
  id: number;
  title: string;
}

interface ListsSectionProps {
  lists: ListItem[];
}

export default function ListsSection({ lists }: ListsSectionProps) {
  return (
    <section className="bg-white p-4 sm:p-5 rounded-md shadow">
      <h2 className="text-black text-lg sm:text-xl font-semibold mb-4">
        لیست‌های من
      </h2>
      {lists.length === 0 ? (
        <p className="text-neutral-500 text-sm">لیستی وجود ندارد.</p>
      ) : (
        <ul className="list-disc pr-5 space-y-2">
          {lists.map(({ id, title }) => (
            <li
              key={id}
              className="text-neutral-700 cursor-pointer hover:text-blue-600 text-sm"
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
