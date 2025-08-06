"use client";

import React from 'react'
import InvoiceList from '@/components/admin/invoice/InvoiceList';
const AdminOrdersPage: React.FC = () => {
  return (
    <main style={{ padding: 20 }}>
      <h1>لیست سفارش‌ها</h1>
      <InvoiceList />
    </main>
  )
}

export default AdminOrdersPage
