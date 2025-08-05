"use client";

import { useEffect, useState } from "react";

interface Props {
  onFilterChange: (filters: { search: string }) => void;
}

export default function SupportCategoryFilters({ onFilterChange }: Props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange({ search });
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="mb-4 flex gap-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجوی دسته..."
        className="input px-4 py-2 border rounded w-full"
      />
    </div>
  );
}
