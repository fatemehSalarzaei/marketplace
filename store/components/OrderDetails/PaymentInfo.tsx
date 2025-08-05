"use client";

export default function PaymentInfo({ invoice }: { invoice: any }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">اطلاعات پرداخت</h2>
      <p>
        جمع کل فاکتور:{" "}
        <span className="font-medium">
          {invoice.total_amount.toLocaleString()} تومان
        </span>
      </p>
      <div className="mt-4 space-y-2">
        {invoice.payments.map((payment: any) => (
          <div key={payment.id} className="p-3 border rounded text-sm">
            <p>روش پرداخت: {payment.payment_method}</p>
            <p>وضعیت: {payment.status}</p>
            <p>
              مبلغ: {payment.amount.toLocaleString()} {payment.currency}
            </p>
            <p>شماره تراکنش: {payment.transaction_id}</p>
            <p>
              تاریخ پرداخت:{" "}
              {new Date(payment.payment_date).toLocaleString("fa-IR")}
            </p>
            {payment.refunded && (
              <>
                <p className="text-red-600">
                  بازپرداخت شده در:{" "}
                  {new Date(payment.refunded_date).toLocaleString("fa-IR")}
                </p>
                <p>علت بازپرداخت: {payment.refund_reason}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
