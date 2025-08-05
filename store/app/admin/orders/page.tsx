"use client";

import React from 'react'
import OrderList from '@/components/admin/orders/OrderList'

const AdminOrdersPage: React.FC = () => {
  return (
    <main style={{ padding: 20 }}>
      <h1>لیست سفارش‌ها</h1>
      <OrderList />
    </main>
  )
}

export default AdminOrdersPage
