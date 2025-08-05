"use client";

import React from "react";

interface UserInfoProps {
  fullName?: string;
  phone?: string;
}

export default function UserInfo({ fullName, phone }: UserInfoProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <p className="text-lg font-semibold text-neutral-800">
        {fullName || phone || "کاربر مهمان"}
      </p>
      {fullName && phone && <p className="text-sm text-neutral-500">{phone}</p>}
    </div>
  );
}
