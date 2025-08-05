"use client";

import { useState } from "react";
import { createReturnRequest } from "@/services/order/returnRequestService";

interface ReturnRequestFormProps {
  orderId: number;
  orderItems: {
    id: number;
    title_snapshot: string;
    variant: { sku: string };
  }[];
  onClose: () => void; // برای بستن فرم
  onSuccess?: () => void; // کال‌بک در صورت موفقیت ارسال
}

export default function ReturnRequestForm({
  orderId,
  orderItems,
  onClose,
  onSuccess,
}: ReturnRequestFormProps) {
  const [orderItemId, setOrderItemId] = useState<number | "">("");
  const [reason, setReason] = useState("");
  const [returnQuantity, setReturnQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderItemId) {
      setError("لطفا آیتم سفارش را انتخاب کنید");
      return;
    }
    if (!reason.trim()) {
      setError("لطفا دلیل بازگشت را وارد کنید");
      return;
    }
    if (returnQuantity < 1) {
      setError("تعداد برگشت باید حداقل ۱ باشد");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await createReturnRequest({
        order: orderId,
        order_item: orderItemId,
        reason,
        return_quantity: returnQuantity,
      });
      setLoading(false);
      if (onSuccess) onSuccess();
      alert("درخواست بازگشت با موفقیت ثبت شد.");
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(
        err.response?.data?.detail ||
          "خطا در ارسال درخواست بازگشت، دوباره تلاش کنید"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow max-w-md mx-auto"
    >
      <h2 className="text-lg font-semibold mb-4">درخواست بازگشت سفارش</h2>

      <label className="block mb-2 font-medium">
        انتخاب آیتم سفارش:
        <select
          value={orderItemId}
          onChange={(e) => setOrderItemId(Number(e.target.value))}
          className="w-full mt-1 p-2 border rounded"
          required
        >
          <option value="">انتخاب کنید</option>
          {orderItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.variant.sku}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2 font-medium">
        تعداد بازگشت:
        <input
          type="number"
          min={1}
          value={returnQuantity}
          onChange={(e) => setReturnQuantity(Number(e.target.value))}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>

      <label className="block mb-2 font-medium">
        دلیل بازگشت:
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          rows={4}
          required
        />
      </label>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "در حال ارسال..." : "ارسال درخواست"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
        >
          بستن فرم
        </button>
      </div>
    </form>
  );
}
