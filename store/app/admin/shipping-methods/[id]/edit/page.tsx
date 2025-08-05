"use client";

import { useParams } from "next/navigation";
import ShippingEdit from "@/components/admin/shipping/createShipping/ShippingEditPage";

export default function ShippingEditPage() {
  const { id } = useParams();
  return <ShippingEdit shippingId={Number(id)} />;
}
