"use client";

export default function ShippingAddressCard({ address }: { address: any }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">آدرس تحویل</h2>
      <div className="text-sm leading-relaxed">
        <p>
          {address.first_name} {address.last_name}
        </p>
        <p>شهر: {address.city_name}</p>
        <p>{address.street_address}</p>
        <p>کد پستی: {address.postal_code}</p>
        <p>تلفن: {address.phone_number}</p>
      </div>
    </div>
  );
}
