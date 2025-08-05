import { Address } from "@/types/address/address";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import provinces from "@/constants/provinces.json";
import cities from "@/constants/cities.json";

interface Props {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
}

export default function AddressCard({ address, onEdit, onDelete }: Props) {
  const city = cities.find((c) => c.id === address.city);
  const province = provinces.find((p) => p.id === city?.province_id);

  return (
    <div
      className="
        relative
        border-2 border-blue-400
        rounded-xl
        shadow-lg
        bg-white
        space-y-2
        p-6
        font-iranyekan
        hover:border-blue-600
        hover:shadow-xl
        transition-all duration-300
        m-4
      "
    >
      {/* آیکن‌ها */}
      <div
        className="
          flex gap-2 mb-2
          sm:absolute sm:top-2 sm:left-2 sm:mb-0
          pl-2
        "
      >
        <Button variant="ghost" size="icon" onClick={() => onEdit(address)}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(address.id)}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>

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
