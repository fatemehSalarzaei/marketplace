'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { getAdminOrderById } from '@/services/admin/orders/ordersDetails';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Product {
  id: number;
  name: string;
  slug: string;
  main_image_url: string | null;
}

interface Variant {
  id: number;
  sku: string;
  price: string;
  stock: number;
  is_active: boolean;
  product: Product;
}

interface OrderItem {
  id: number;
  title_snapshot: string;
  variant: Variant | null;
  quantity: number;
  unit_price: string;
  total_price: string;
}

interface Invoice {
  id: number;
  total_amount: string;
  created_at: string;
}

interface ShippingAddress {
  first_name: string;
  last_name: string;
  city_name: string;
  province_name: string;
  street_address: string;
  postal_code: string;
  phone_number: string;
}

interface User {
  id: string;
  email: string | null;
  full_name: string;
  phone_number: string;
}

interface OrderData {
  id: number;
  order_number: string;
  total_price: string;
  final_price: string;
  delivery_price: string;
  is_paid: boolean;
  created_at: string;
  user: User;
  items: OrderItem[];
  shipping_address: ShippingAddress;
}

const InvoiceContent = React.forwardRef<HTMLDivElement, { order: OrderData }>(
  ({ order }, ref) => {
    return (
      <div
        ref={ref}
        id="invoice-content"
        className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-gray-900"
        style={{ direction: 'rtl', fontFamily: 'Tahoma, Arial, sans-serif' }}
      >
        <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700">
          فاکتور سفارش #{order.order_number}
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-700">
            مشخصات مشتری
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-base">
            <p><span className="font-semibold">نام:</span> {order.user.full_name}</p>
            <p><span className="font-semibold">ایمیل:</span> {order.user.email || '—'}</p>
            <p><span className="font-semibold">شماره تماس:</span> {order.user.phone_number || '—'}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-700">
            آیتم‌های سفارش
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-right">عنوان</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">SKU متغیر</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">نام محصول</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">تعداد</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">قیمت واحد (تومان)</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">قیمت کل (تومان)</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr
                    key={item.id}
                    className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <td className="border border-gray-300 px-4 py-2 text-right">{item.title_snapshot}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{item.variant?.sku || '—'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{item.variant?.product.name || '—'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{item.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{parseFloat(item.unit_price).toLocaleString()}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{parseFloat(item.total_price).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-700">
            مبالغ سفارش
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-lg text-right">
            <div><span className="font-semibold">مبلغ کل:</span> {parseFloat(order.total_price).toLocaleString()} تومان</div>
            <div><span className="font-semibold">هزینه ارسال:</span> {parseFloat(order.delivery_price).toLocaleString()} تومان</div>
            <div className="text-blue-800 font-extrabold"><span>مبلغ نهایی:</span> {parseFloat(order.final_price).toLocaleString()} تومان</div>
            <div><span className="font-semibold">وضعیت پرداخت:</span> {order.is_paid ? 'پرداخت شده' : 'پرداخت نشده'}</div>
            <div><span className="font-semibold">تاریخ سفارش:</span> {new Date(order.created_at).toLocaleDateString('fa-IR')}</div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2 text-gray-700">
            آدرس ارسال
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-base text-right">
            <div><span className="font-semibold">نام و نام خانوادگی:</span> {order.shipping_address.first_name} {order.shipping_address.last_name}</div>
            <div><span className="font-semibold">شماره تماس:</span> {order.shipping_address.phone_number || '—'}</div>
            <div><span className="font-semibold">کدپستی:</span> {order.shipping_address.postal_code}</div>
            <div className="sm:col-span-2"><span className="font-semibold">آدرس:</span> {order.shipping_address.street_address}</div>
            <div><span className="font-semibold">شهر و استان:</span> {order.shipping_address.city_name} - {order.shipping_address.province_name}</div>
          </div>
        </section>

        <footer className="text-center mt-12 text-xs text-gray-500">
          <p>این فاکتور به صورت خودکار توسط سیستم تولید شده است.</p>
        </footer>
      </div>
    );
  }
);
InvoiceContent.displayName = 'InvoiceContent';

export default function InvoicePage() {
  const params = useParams();
  const orderId = Number(params?.orderId);

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orderId) return;

    async function fetchOrder() {
      setLoading(true);
      try {
        const data = await getAdminOrderById(orderId);
        setOrder(data);
        setError(null);
      } catch {
        setError('خطا در دریافت اطلاعات سفارش');
        setOrder(null);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  const handleDownloadPdf = async () => {
    if (!componentRef.current) return;

    const element = componentRef.current;
    const canvas = await html2canvas(element, { scale: 2, scrollY: -window.scrollY });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${order?.order_number || 'unknown'}.pdf`);
  };

  if (loading) return <p className="text-center mt-20 text-gray-600">در حال بارگذاری فاکتور...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
  if (!order) return <p className="text-center mt-20 text-gray-600">سفارشی یافت نشد.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <InvoiceContent ref={componentRef} order={order} />

      <div className="text-center mt-8">
        <button
          onClick={handleDownloadPdf}
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          دانلود فاکتور به صورت PDF
        </button>
      </div>
    </div>
  );
}
