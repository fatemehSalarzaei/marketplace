"use client";

import { ChangeEvent } from "react";
import { Input } from "@/components/ui/Input";

interface UserSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function UserSearch({
  search,
  onSearchChange,
}: UserSearchProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="mb-4 w-full">
      <Input
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder="جستجو بر اساس نام، شماره، ایمیل، کد ملی..."
        className="w-full"
      />
    </div>
  );
}
