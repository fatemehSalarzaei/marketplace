"use client";
import { useState, useEffect } from 'react';

interface Props {
  onChange: (search: string) => void;
}

export default function TicketFilters({ onChange }: Props) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => onChange(search), 500);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="جستجوی تیکت..."
      className="input w-full px-4 py-2 border rounded"
    />
  );
}
