"use client";

import OrderInfo from "./OrderInfo";
import ShippingAddressCard from "./ShippingAddressCard";
import ShipmentInfo from "./ShipmentInfo";
import StatusTimeline from "./StatusTimeline";
import PaymentInfo from "./PaymentInfo";
import ProductCard from "./ProductCard";
import OrderActions from "./OrderActions";

export default function OrderDetailsBody({ order }: { order: any }) {
  return (
    <div className="flex flex-col gap-6">
      <OrderActions
        orderId={order.id.toString()}
        orderItems={order.items}
        orderStatus={order.status}
      />

      <OrderInfo order={order} />

      {order.shipping_address && (
        <ShippingAddressCard address={order.shipping_address} />
      )}

      {order.shipment && <ShipmentInfo shipment={order.shipment} />}

      {order.status_history && order.status_history.length > 0 && (
        <StatusTimeline statusHistory={order.status_history} />
      )}

      {order.invoice && <PaymentInfo invoice={order.invoice} />}

      <div className="grid gap-4">
        {order.items?.map((item: any) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
