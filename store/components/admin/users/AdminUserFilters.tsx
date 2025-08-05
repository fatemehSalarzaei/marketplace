"use client";

import { ChangeEvent } from "react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  filters: {
    isActive?: string;
    isSuperuser?: string;
    isStaff?: string;
  };
  onFiltersChange: (name: string, value: string) => void;
}

export default function AdminUserFilters({
  search,
  onSearchChange,
  filters,
  onFiltersChange,
}: Props) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange(e.target.name, e.target.value);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      <input
        type="text"
        placeholder="جستجو..."
        value={search}
        onChange={handleSearchChange}
        className="border rounded px-3 py-2 text-sm flex-grow min-w-[200px]"
      />

      <select
        name="isActive"
        value={filters.isActive || ""}
        onChange={handleFilterChange}
        className="border rounded px-3 py-2 text-sm w-40"
      >
        <option value="">فعال / غیرفعال</option>
        <option value="true">فقط فعال</option>
        <option value="false">فقط غیرفعال</option>
      </select>

      <select
        name="isSuperuser"
        value={filters.isSuperuser || ""}
        onChange={handleFilterChange}
        className="border rounded px-3 py-2 text-sm w-40"
      >
        <option value="">سوپر ادمین</option>
        <option value="true">بله</option>
        <option value="false">خیر</option>
      </select>

      <select
        name="isStaff"
        value={filters.isStaff || ""}
        onChange={handleFilterChange}
        className="border rounded px-3 py-2 text-sm w-40"
      >
        <option value="">کاربر ادمین</option>
        <option value="true">بله</option>
        <option value="false">خیر</option>
      </select>
    </div>
  );
}
