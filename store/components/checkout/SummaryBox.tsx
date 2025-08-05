"use client";

import { ShippingMethod } from "@/types/checkout/checkout";
import { Address } from "@/types/address/address";

interface Props {
  cartTotal: number;
  selectedAddress: Address | null;
  selectedShipping: ShippingMethod | null;
  loading: boolean;
  submitting?: boolean;
  onSubmit?: () => void;
}

export default function SummaryBox({
  cartTotal,
  selectedAddress,
  selectedShipping,
  loading,
  submitting = false,
  onSubmit,
}: Props) {
  const totalCost =
    cartTotal + (selectedShipping ? Number(selectedShipping.cost) : 0);

  return (
    <div className="bg-white shadow p-4 rounded-lg h-fit space-y-4">
      <h2 className="text-lg font-semibold">صورتحساب</h2>

      {loading ? (
        <p className="text-gray-500">در حال دریافت سبد خرید...</p>
      ) : (
        <>
          <div className="text-md">
            مجموع سبد خرید:
            <span className="text-gray-700 mx-2">
              {cartTotal.toLocaleString()} تومان
            </span>
          </div>
          <div className="text-md">
            هزینه ارسال:
            <span className="text-gray-700 mx-2">
              {selectedShipping
                ? Number(selectedShipping.cost).toLocaleString()
                : "۰"}{" "}
              تومان
            </span>
          </div>
          <div className="text-md font-semibold">
            مجموع نهایی:
            <span className="text-green-600 mx-2">
              {totalCost.toLocaleString()} تومان
            </span>
          </div>
        </>
      )}

      <button
        className={`w-full py-2 rounded text-white ${
          selectedAddress && selectedShipping && !loading && !submitting
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={
          !selectedAddress || !selectedShipping || loading || submitting
        }
        onClick={onSubmit}
      >
        {submitting ? "در حال ثبت سفارش..." : "ثبت و پرداخت سفارش"}
      </button>
    </div>
  );
}
