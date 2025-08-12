import React from "react";

interface Props {
  totalNewCustomers: number;
  totalActiveCustomers: number;
}

export default function CustomerStats({ totalNewCustomers, totalActiveCustomers }: Props) {
  return (
    <div className="flex gap-8 text-center">
      <div className="bg-blue-100 p-4 rounded flex-1">
        <p className="text-blue-700 font-semibold">مشتریان جدید</p>
        <p className="text-3xl font-bold">{totalNewCustomers}</p>
      </div>
      <div className="bg-green-100 p-4 rounded flex-1">
        <p className="text-green-700 font-semibold">مشتریان فعال</p>
        <p className="text-3xl font-bold">{totalActiveCustomers}</p>
      </div>
    </div>
  );
}
