"use client";

import { useEffect, useState } from "react";

interface Props {
  onFilterChange: (filters: { search: string; is_active?: string }) => void;
}

export default function BrandFilters({ onFilterChange }: Props) {
  const [search, setSearch] = useState("");
  const [is_active, setIsActive] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onFilterChange({ search, is_active: is_active });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, is_active]);

  return (
    <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="جستجوی برند..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="mr-10 text-gray-700">وضعیت:</label>
        <select
          value={is_active}
          onChange={(e) => setIsActive(e.target.value)}
          className="select px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">همه</option>
          <option value="true">فعال</option>
          <option value="false">غیرفعال</option>
        </select>
      </div>
    </div>
  );
}
