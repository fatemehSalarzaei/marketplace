'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { Order } from '@/types/admin/orders/orders';
import { getAdminOrderById } from '@/services/admin/orders/ordersDetails';

import OrderGeneralInfo from './OrderGeneralInfo';
import OrderCustomerInfo from './OrderCustomerInfo';
import OrderItemList from './OrderItemDetail';
import OrderPaymentInfo from './OrderPaymentInfo';
import OrderShippingInfo from './OrderShippingInfo';
import OrderStatusHistory from './OrderStatusHistory';

const AdminOrderDetail: React.FC = () => {
  const params = useParams();
  const id = Number(params?.orderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getAdminOrderById(id);
      setOrder(data);
    } catch (error) {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!order) return <p>سفارشی یافت نشد.</p>;

  const renderOrNoData = (data: any, component: React.ReactNode) => {
    if (
      data === null ||
      data === undefined ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === 'object' && Object.keys(data).length === 0)
    ) {
      return <p className="text-gray-500 italic my-2">اطلاعات برای این بخش وجود ندارد.</p>;
    }
    return component;
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold border-b pb-3 mb-6">
        جزئیات سفارش #{order.order_number}
      </h1>

      {/* اطلاعات کلی سفارش */}
      {renderOrNoData(order, (
        <OrderGeneralInfo
          order={order}
          onStatusUpdated={() => window.location.reload()} // رفرش صفحه بعد از آپدیت
        />
      ))}

      {/* مشخصات مشتری */}
      {renderOrNoData(order.user, (
        <OrderCustomerInfo order={order} />
      ))}

      {/* لیست آیتم‌های سفارش */}
      {renderOrNoData(order.items, (
        <OrderItemList items={order.items} />
      ))}

      {/* اطلاعات پرداخت */}
      {renderOrNoData(order, (
        <OrderPaymentInfo order={order} />
      ))}

      {/* اطلاعات ارسال */}
      {renderOrNoData(order.shipping_address, (
        <OrderShippingInfo order={order} />
      ))}

      {/* تاریخچه وضعیت سفارش */}
      {renderOrNoData(order.status_history, (
        <OrderStatusHistory statusHistory={order.status_history} />
      ))}
    </div>
  );
};

export default AdminOrderDetail;
