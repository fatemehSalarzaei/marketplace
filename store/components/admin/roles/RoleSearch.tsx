"use client";

import { ChangeEvent } from "react";

interface RoleSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function RoleSearch({
  search,
  onSearchChange,
}: RoleSearchProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="جستجو بر اساس نام نقش..."
        value={search}
        onChange={handleInputChange}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
