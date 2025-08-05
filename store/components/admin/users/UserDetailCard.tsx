import { User } from "@/types/user";
import Image from "next/image";
import UserAddressCard from "./UserAddressCard";

import provinces from "@/constants/provinces.json";
import cities from "@/constants/cities.json";

interface Props {
  user: User;
}

export default function UserDetailCard({ user }: Props) {
  return (
    <div className=" bg-white font-iranyekan ">
      {/* هدر با آواتار و نام و نقش */}
      <div className="flex items-center space-x-6 mb-6">
        {user.avatar && (
          <Image
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-2xl font-bold">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            نقش: {user.role_name || "---"}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            شماره تماس: {user.phone_number}
          </p>
        </div>
      </div>

      {/* اطلاعات دو ستونه */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-gray-700 text-sm">
        <div>
          <span className="font-semibold">کد ملی: </span>
          {user.national_code || "---"}
        </div>
        <div>
          <span className="font-semibold">ایمیل: </span>
          {user.email || "---"}
        </div>
        <div>
          <span className="font-semibold">تاریخ تولد: </span>
          {user.birth_date || "---"}
        </div>
        <div>
          <span className="font-semibold">تاریخ عضویت: </span>
          {new Date(user.date_joined).toLocaleDateString("fa-IR")}
        </div>
        <div>
          <span className="font-semibold">وضعیت: </span>
          {user.is_active ? "فعال" : "غیرفعال"}
        </div>
      </div>

      {/* بخش آدرس‌ها */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">آدرس‌ها</h3>
        <div className="grid gap-4">
          {user.addresses.map((address) => (
            <UserAddressCard
              key={address.id}
              address={address}
              cities={cities}
              provinces={provinces}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
