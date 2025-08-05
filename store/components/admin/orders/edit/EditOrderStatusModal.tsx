'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';
import { updateOrderStatus } from '@/services/admin/orders/ordersDetails';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
  currentStatus: string;
  onStatusUpdated: () => void;
  shippingInfo?: {
    tracking_number: string;
  };
}

export default function EditOrderStatusModal({
  isOpen,
  onClose,
  orderId,
  currentStatus,
  onStatusUpdated,
  shippingInfo,
}: Props) {
  const [newStatus, setNewStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNewStatus(currentStatus);
      setTrackingNumber(shippingInfo?.tracking_number || '');
    }
  }, [isOpen, currentStatus, shippingInfo]);

  const handleSubmit = async () => {
    if (newStatus === currentStatus) {
      toast.error('وضعیت جدید باید با وضعیت فعلی متفاوت باشد.');
      return;
    }

    if (newStatus === 'shipped' && !trackingNumber.trim()) {
      toast.error('لطفاً کد رهگیری را وارد کنید.');
      return;
    }

    setIsLoading(true);

    try {
      const payload: any = {
        status: newStatus,
      };

      if (newStatus === 'shipped') {
        payload.tracking_number = trackingNumber.trim();
      }

      await updateOrderStatus(orderId, payload);
      toast.success('وضعیت سفارش با موفقیت بروزرسانی شد');
      
      onClose();        // اول دیالوگ بسته شود
      onStatusUpdated(); // سپس داده‌ها آپدیت شود
    } catch (error: any) {
      toast.error(error?.message || 'خطا در بروزرسانی وضعیت سفارش');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 space-y-4">
          <Dialog.Title className="text-lg font-semibold mb-2">
            تغییر وضعیت سفارش
          </Dialog.Title>

          <div>
            <label className="block text-sm font-medium">وضعیت جدید</label>
            <select
              className="mt-1 w-full border rounded p-2"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="pending" disabled={currentStatus === 'pending'}>
                در انتظار
              </option>
              <option value="processing" disabled={currentStatus === 'processing'}>
                در حال پردازش
              </option>
              <option value="shipped" disabled={currentStatus === 'shipped'}>
                ارسال شده
              </option>
              <option value="delivered" disabled={currentStatus === 'delivered'}>
                تحویل داده شده
              </option>
              <option value="cancelled" disabled={currentStatus === 'cancelled'}>
                لغو شده
              </option>
            </select>
          </div>

          {(newStatus === 'shipped' && currentStatus !== 'shipped') && (
            <div>
              <label className="block text-sm font-medium">کد رهگیری</label>
              <input
                type="text"
                className="mt-1 w-full border rounded p-2"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700"
              disabled={isLoading}
            >
              لغو
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'در حال ذخیره...' : 'ذخیره'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
