'use client';

import React, { useEffect, useState, useRef } from 'react';

interface Props {
  filters: {
    search: string;
    is_read: string;
    channel: string;
    type: string;
  };
  onChange: (key: string, value: string) => void;
  onReset: () => void;
}

function NotificationFilters({ filters, onChange, onReset }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localSearch, setLocalSearch] = useState(filters.search);

  // فقط وقتی props.filters.search تغییر کرد، مقدار محلی را بروزرسانی کن
  useEffect(() => {
    if (filters.search !== localSearch) {
      setLocalSearch(filters.search);
    }
  }, [filters.search]);

  // debounce با useRef برای تایمر
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      if (value !== filters.search) {
        onChange('search', value);
      }
    }, 500);
  };

  return (
    <div className="flex flex-wrap items-end gap-6 bg-white p-4 rounded shadow-sm">
      <div className="flex flex-col w-64">
        <label className="mb-1 text-sm font-medium text-gray-700">جستجو</label>
        <input
          ref={inputRef}
          type="text"
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="عنوان یا پیام را جستجو کنید"
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {/* بقیه فیلترها بدون تغییر */}
      <div className="flex flex-col w-40">
        <label className="mb-1 text-sm font-medium text-gray-700">وضعیت</label>
        <select
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filters.is_read}
          onChange={(e) => onChange('is_read', e.target.value)}
        >
          <option value="">همه</option>
          <option value="true">خوانده شده</option>
          <option value="false">خوانده نشده</option>
        </select>
      </div>

      <div className="flex flex-col w-40">
        <label className="mb-1 text-sm font-medium text-gray-700">کانال</label>
        <select
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filters.channel}
          onChange={(e) => onChange('channel', e.target.value)}
        >
          <option value="">همه</option>
          <option value="site">درون سایت</option>
          <option value="email">ایمیل</option>
          <option value="sms">پیامک</option>
        </select>
      </div>

      <div className="flex flex-col w-40">
        <label className="mb-1 text-sm font-medium text-gray-700">نوع اعلان</label>
        <select
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filters.type}
          onChange={(e) => onChange('type', e.target.value)}
        >
          <option value="">همه</option>
          <option value="order_status">وضعیت سفارش</option>
          <option value="discount">تخفیف</option>
          <option value="review_reply">پاسخ به نظر</option>
          <option value="custom">سفارشی</option>
        </select>
      </div>

      <button
        onClick={onReset}
        className="self-center px-5 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded shadow-sm transition"
        type="button"
      >
        ریست فیلترها
      </button>
    </div>
  );
}

export default React.memo(NotificationFilters);
