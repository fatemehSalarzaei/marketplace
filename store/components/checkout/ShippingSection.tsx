"use client";

import { useEffect, useState } from "react";
import { ShippingMethod } from "@/types/checkout/checkout";
import { getShippingMethods } from "@/services/checkout/checkout";

interface Props {
  selected: ShippingMethod | null;
  onSelect: (shipping: ShippingMethod) => void;
}

export default function ShippingSection({ selected, onSelect }: Props) {
  const [methods, setMethods] = useState<ShippingMethod[]>([]);

  useEffect(() => {
    getShippingMethods().then(setMethods);
  }, []);

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-2 bg-white">
      <h2 className="text-xl font-semibold">شیوه ارسال</h2>
      {methods.map((method) => (
        <div key={method.id} className="flex items-center gap-2">
          <input
            type="radio"
            name="shipping"
            checked={selected?.id === method.id}
            onChange={() => onSelect(method)}
            className="w-4 h-4"
          />
          <div>
            <div>{method.name}</div>
            <div className="text-sm text-gray-600">{method.description}</div>
            <div className="text-sm text-green-700">
              {Number(method.cost).toLocaleString()} تومان
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
