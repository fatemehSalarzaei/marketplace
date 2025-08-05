import { Address } from "@/types/address/address";
import provinces from "@/constants/provinces.json";
import cities from "@/constants/cities.json";

interface Props {
  address: Address;
}

export default function UserAddressCard({ address }: Props) {
  const city = cities.find((c) => c.id === address.city);
  const province = provinces.find((p) => p.id === city?.province_id);

  return (
    <div
      className="
        border-2 border-blue-400
        rounded-xl
        shadow-lg
        bg-white
        space-y-2
        p-6
        font-iranyekan
        m-4
      "
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="text-sm text-gray-700">
          <span className="font-medium">نام و نام خانوادگی: </span>
          {address.first_name} {address.last_name}
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium">شماره تماس: </span>
          {address.phone_number}
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium">استان: </span>
          {province?.name || "---"}
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium">شهر: </span>
          {city?.name || "---"}
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium">آدرس: </span>
          {address.street_address}
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium">کد پستی: </span>
          {address.postal_code}
        </div>
      </div>

      {address.is_default && (
        <div className="text-green-600 text-sm mt-3">آدرس پیش‌فرض</div>
      )}
    </div>
  );
}
