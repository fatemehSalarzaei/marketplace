"use client";

import { useEffect, useState } from "react";
import AddressSection from "./AddressSection";
import ShippingSection from "./ShippingSection";
import SummaryBox from "./SummaryBox";
import DeliveryTimeSection from "./DeliveryTimeSection";
import { ShippingMethod } from "@/types/checkout/checkout";
import { Address } from "@/types/address/address";
import { getCart } from "@/services/cart/getCart";
import { createOrder } from "@/services/order/createOrder";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingMethod | null>(null);

  const [deliveryTime, setDeliveryTime] = useState<string>("");

  const [cartTotal, setCartTotal] = useState<number>(0);
  const [loadingCart, setLoadingCart] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await (
          await import("@/services/user/address/getAddresses")
        ).getMyAddresses();

        const results = res.data.results;
        setAddresses(results);

        const defaultAddress = results.find((addr) => addr.is_default);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      } catch (err) {
        console.error("خطا در دریافت آدرس‌ها", err);
      }
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();

        const total = cart.items.reduce(
          (sum, item) => sum + Number(item.get_total_price),
          0
        );

        setCartTotal(total);
      } catch (err) {
        console.error("خطا در دریافت سبد خرید", err);
        setCartTotal(0);
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCart();
  }, []);

  const handleAddSuccess = (newAddress: Address) => {
    setAddresses((prev) => [...prev, newAddress]);
  };

  const handleSubmitOrder = async () => {
    if (!selectedAddress || !selectedShipping) {
      toast.error("لطفا آدرس و شیوه ارسال را انتخاب کنید.");
      return;
    }

    const payload: any = {
      address_id: selectedAddress.id,
      shipping_method_id: selectedShipping.id,
      coupon_code: "", // در صورت داشتن کوپن مقدار بده
    };

    if (deliveryTime) {
      payload.delivery_time = new Date(
        deliveryTime + "T00:00:00"
      ).toISOString();
    }

    setSubmitting(true);
    try {
      await createOrder(payload);
      toast.success("سفارش با موفقیت ثبت شد.");
      router.push("/payment");
    } catch (error) {
      console.error(error);
      toast.error("خطا در ثبت سفارش. لطفا دوباره تلاش کنید.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold">تکمیل فرآیند خرید</h1>

        <AddressSection
          selected={selectedAddress}
          onSelect={setSelectedAddress}
          addresses={addresses}
          onAdd={handleAddSuccess}
        />

        <ShippingSection
          selected={selectedShipping}
          onSelect={setSelectedShipping}
        />
      </div>

      <div className="space-y-4">
        <DeliveryTimeSection
          deliveryDate={deliveryTime}
          onChange={setDeliveryTime}
        />

        <SummaryBox
          cartTotal={cartTotal}
          selectedAddress={selectedAddress}
          selectedShipping={selectedShipping}
          loading={loadingCart}
          onSubmit={handleSubmitOrder}
          submitting={submitting}
        />
      </div>
    </div>
  );
}
