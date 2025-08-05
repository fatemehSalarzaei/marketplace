"use client";

import { useEffect, useState } from "react";

interface Props {
  onFilterChange: (filters: { search?: string }) => void;
}

export default function AttributeFilters({ onFilterChange }: Props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange({ search: search.trim() });
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="جستجو بر اساس نام..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
