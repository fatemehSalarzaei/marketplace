"use client";

import { Address } from "@/types/address/address";
import AddressDialog from "./AddressDialog";

interface Props {
  selected: Address | null;
  onSelect: (address: Address) => void;
  addresses: Address[];
  onAdd: (address: Address) => void;
}

export default function AddressSection({
  selected,
  onSelect,
  addresses,
  onAdd,
}: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-white">
      <h2 className="text-xl font-semibold mb-2">انتخاب آدرس</h2>
      {addresses.length === 0 ? (
        <p className="text-gray-500">شما هنوز هیچ آدرسی ثبت نکرده‌اید.</p>
      ) : (
        <div className="space-y-2">
          {addresses.map((addr) => (
            <div key={addr.id} className="flex items-center gap-2">
              <input
                type="radio"
                id={`address-${addr.id}`}
                name="address"
                checked={selected?.id === addr.id}
                onChange={() => onSelect(addr)}
                className="w-4 h-4"
              />
              <label
                htmlFor={`address-${addr.id}`}
                className="text-sm cursor-pointer"
              >
                {addr.first_name} {addr.last_name} - {addr.street_address}
                {addr.is_default && (
                  <span className="text-green-600 mx-2">(پیش‌فرض)</span>
                )}
              </label>
            </div>
          ))}
        </div>
      )}

      <div className="pt-2">
        <AddressDialog onSuccess={onAdd} />
      </div>
    </div>
  );
}
