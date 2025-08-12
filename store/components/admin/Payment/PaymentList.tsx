const statusMap: Record<string, string> = {
  pending: 'در انتظار',
  success: 'موفق',
  failed: 'ناموفق',
  refunded: 'بازگشت داده شده',
}

export default function PaymentList({ payments }: Props) {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300 text-right">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">شماره سفارش</th>
          <th className="border border-gray-300 px-4 py-2">نام کاربر</th>
          <th className="border border-gray-300 px-4 py-2">درگاه پرداخت</th>
          <th className="border border-gray-300 px-4 py-2">روش پرداخت</th>
          <th className="border border-gray-300 px-4 py-2">وضعیت</th>
          <th className="border border-gray-300 px-4 py-2">مبلغ</th>
          <th className="border border-gray-300 px-4 py-2">تاریخ پرداخت</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(p => (
          <tr key={p.id}>
            <td className="border border-gray-300 px-4 py-2">{p.order_number}</td>
            <td className="border border-gray-300 px-4 py-2">{p.user.first_name} {p.user.last_name}</td>
            <td className="border border-gray-300 px-4 py-2">{p.payment_gateway_name || '-'}</td>
            <td className="border border-gray-300 px-4 py-2">{p.payment_method_display}</td>
            <td className="border border-gray-300 px-4 py-2">{statusMap[p.status] || p.status}</td>
            <td className="border border-gray-300 px-4 py-2">{p.amount.toLocaleString()} تومان</td>
            <td className="border border-gray-300 px-4 py-2">{new Date(p.payment_date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
