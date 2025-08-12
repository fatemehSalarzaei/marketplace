import React from "react";
import { TopCustomer } from "@/types/admin/report/customersReportTypes";

interface Props {
  topCustomers: TopCustomer[];
}

export default function TopCustomersTable({ topCustomers }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">مشتریان برتر</h2>
      <table className="w-full text-right table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">نام مشتری</th>
            <th className="border border-gray-300 px-4 py-2">تعداد سفارشات</th>
            <th className="border border-gray-300 px-4 py-2">مجموع خرید (تومان)</th>
          </tr>
        </thead>
        <tbody>
          {topCustomers.map((customer) => (
            <tr key={customer.user_id}>
              <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
              <td className="border border-gray-300 px-4 py-2">{customer.orders}</td>
              <td className="border border-gray-300 px-4 py-2">
                {customer.total_spent.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
