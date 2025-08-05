"use client";

import { Address } from "@/types/address/address";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import provincesData from "@/constants/provinces.json";
import citiesData from "@/constants/cities.json";

interface Props {
  address?: Address | null;
  onSubmit: (data: Partial<Address & { province_id?: number }>) => void;
}

interface Province {
  id: number;
  name: string;
}

interface City {
  id: number;
  province_id: number;
  name: string;
}

type FormType = Partial<Address & { province_id?: number }>;

export default function AddressForm({ address, onSubmit }: Props) {
  const [form, setForm] = useState<FormType>(
    address ? { ...address, province_id: undefined } : {}
  );
  const [errors, setErrors] = useState<{ [key in keyof FormType]?: string }>(
    {}
  );

  const [provincesList] = useState<Province[]>(provincesData);
  const [citiesList] = useState<City[]>(citiesData);

  useEffect(() => {
    if (address) {
      const city = citiesList.find((c) => c.id === address.city);
      setForm({ ...address, province_id: city?.province_id });
    } else {
      setForm({});
    }
    setErrors({});
  }, [address, citiesList]);

  const filteredCities = form.province_id
    ? citiesList.filter((c) => c.province_id === form.province_id)
    : [];

  const handleChange = (key: keyof FormType, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const isValidPhone = (phone?: string) => {
    if (!phone) return false;
    return /^\d{10,11}$/.test(phone);
  };

  const isValidPostalCode = (postal_code?: string) => {
    if (!postal_code) return false;
    return /^\d{10}$/.test(postal_code);
  };

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleBlur = (field: keyof FormType) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    switch (field) {
      case "phone_number":
        if (!isValidPhone(form.phone_number)) {
          setErrors((prev) => ({
            ...prev,
            phone_number: "شماره تماس معتبر نیست",
          }));
        } else {
          setErrors((prev) => ({ ...prev, phone_number: undefined }));
        }
        break;
      case "postal_code":
        if (!isValidPostalCode(form.postal_code)) {
          setErrors((prev) => ({ ...prev, postal_code: "کد پستی معتبر نیست" }));
        } else {
          setErrors((prev) => ({ ...prev, postal_code: undefined }));
        }
        break;
      default:
        if (!form[field]) {
          setErrors((prev) => ({ ...prev, [field]: "این فیلد الزامی است" }));
        } else {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors: typeof errors = {};

    if (!form.first_name) newErrors.first_name = "نام الزامی است";
    if (!form.last_name) newErrors.last_name = "نام خانوادگی الزامی است";
    if (!form.province_id) newErrors.province_id = "استان را انتخاب کنید";
    if (!form.city) newErrors.city = "شهر را انتخاب کنید";
    if (!form.street_address) newErrors.street_address = "آدرس الزامی است";
    if (!isValidPostalCode(form.postal_code))
      newErrors.postal_code = "کد پستی معتبر نیست";
    if (!isValidPhone(form.phone_number))
      newErrors.phone_number = "شماره تماس معتبر نیست";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit(form);
  };

  const inputBaseClass =
    "peer block w-full appearance-none border rounded-md py-2 px-3 text-right text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 font-iranyekan"
    >
      {/* نام */}
      <div className="relative z-0">
        <input
          type="text"
          id="first_name"
          value={form.first_name || ""}
          onChange={(e) => handleChange("first_name", e.target.value)}
          onBlur={() => handleBlur("first_name")}
          className={`${inputBaseClass} ${
            errors.first_name ? "border-red-500" : "border-gray-300"
          }`}
          dir="rtl"
          placeholder=" "
        />
        <label
          htmlFor="first_name"
          className="absolute top-2 right-3 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
          dir="rtl"
        >
          نام
        </label>
        {errors.first_name && (
          <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
        )}
      </div>

      {/* نام خانوادگی */}
      <div className="relative z-0">
        <input
          type="text"
          id="last_name"
          value={form.last_name || ""}
          onChange={(e) => handleChange("last_name", e.target.value)}
          onBlur={() => handleBlur("last_name")}
          className={`${inputBaseClass} ${
            errors.last_name ? "border-red-500" : "border-gray-300"
          }`}
          dir="rtl"
          placeholder=" "
        />
        <label
          htmlFor="last_name"
          className="absolute top-2 right-3 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
          dir="rtl"
        >
          نام خانوادگی
        </label>
        {errors.last_name && (
          <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
        )}
      </div>

      {/* استان */}
      <div className="relative z-0">
        <select
          id="province"
          value={form.province_id ?? ""}
          onChange={(e) => {
            const val = Number(e.target.value) || undefined;
            handleChange("province_id", val);
            handleChange("city", undefined);
          }}
          onBlur={() => handleBlur("province_id")}
          className={`${inputBaseClass} ${
            errors.province_id ? "border-red-500" : "border-gray-300"
          }`}
          dir="rtl"
          required
        >
          <option value="" disabled>
            استان را انتخاب کنید
          </option>
          {provincesList.map((prov) => (
            <option key={prov.id} value={prov.id}>
              {prov.name}
            </option>
          ))}
        </select>
        <label
          htmlFor="province"
          className="absolute top-2 right-3 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-focus:-translate-y-6 peer-focus:scale-75"
          dir="rtl"
        >
          استان
        </label>
        {errors.province_id && (
          <p className="text-red-500 text-xs mt-1">{errors.province_id}</p>
        )}
      </div>

      {/* شهر */}
      <div className="relative z-0">
        <select
          id="city"
          value={form.city ?? ""}
          onChange={(e) => handleChange("city", Number(e.target.value))}
          onBlur={() => handleBlur("city")}
          disabled={!form.province_id}
          className={`${inputBaseClass} ${
            errors.city ? "border-red-500" : "border-gray-300"
          } disabled:opacity-50`}
          dir="rtl"
          required
        >
          <option value="" disabled>
            شهر را انتخاب کنید
          </option>
          {filteredCities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        <label
          htmlFor="city"
          className="absolute top-2 right-3 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-focus:-translate-y-6 peer-focus:scale-75"
          dir="rtl"
        >
          شهر
        </label>
        {errors.city && (
          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
        )}
      </div>

      {/* آدرس */}
      <div className="relative z-0 sm:col-span-2">
        <input
          type="text"
          id="street_address"
          value={form.street_address || ""}
          onChange={(e) => handleChange("street_address", e.target.value)}
          onBlur={() => handleBlur("street_address")}
          className={`${inputBaseClass} ${
            errors.street_address ? "border-red-500" : "border-gray-300"
          }`}
          dir="rtl"
          placeholder=" "
          required
        />
        <label
          htmlFor="street_address"
          className="absolute top-2 right-3 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
          dir="rtl"
        >
          آدرس
        </label>
        {errors.street_address && (
          <p className="text-red-500 text-xs mt-1">{errors.street_address}</p>
        )}
      </div>

      {/* کد پستی */}
      <div className="relative z-0 sm:col-span-2">
        <input
          type="text"
          id="postal_code"
          value={form.postal_code || ""}
          onChange={(e) => handleChange("postal_code", e.target.value)}
          onBlur={() => handleBlur("postal_code")}
          className={`${inputBaseClass} ${
            errors.postal_code ? "border-red-500" : "border-gray-300"
          }`}
          dir="rtl"
          placeholder=" "
          required
        />
        <label
          htmlFor="postal_code"
          className="absolute top-2 right-3 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
          dir="rtl"
        >
          کد پستی
        </label>
        {errors.postal_code && (
          <p className="text-red-500 text-xs mt-1">{errors.postal_code}</p>
        )}
      </div>

      {/* شماره تماس */}
      <div className="relative z-0 sm:col-span-2">
        <input
          type="tel"
          id="phone_number"
          value={form.phone_number || ""}
          onChange={(e) => handleChange("phone_number", e.target.value)}
          onBlur={() => handleBlur("phone_number")}
          className={`${inputBaseClass} ${
            errors.phone_number ? "border-red-500" : "border-gray-300"
          }`}
          dir="rtl"
          placeholder=" "
          required
        />
        <label
          htmlFor="phone_number"
          className="absolute top-2 right-3 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
          dir="rtl"
        >
          شماره تماس
        </label>
        {errors.phone_number && (
          <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>
        )}
      </div>

      {/* چک‌باکس آدرس پیش‌فرض */}
      <div className="flex items-center gap-2 sm:col-span-2">
        <CheckboxPrimitive.Root
          id="is_default"
          checked={!!form.is_default}
          onCheckedChange={(checked) =>
            handleChange("is_default", checked === true)
          }
          className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <CheckboxPrimitive.Indicator>
            <Check className="w-4 h-4 text-blue-600" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label
          htmlFor="is_default"
          className="select-none cursor-pointer"
          dir="rtl"
        >
          آدرس پیش‌فرض
        </label>
      </div>

      {/* دکمه ذخیره */}
      <div className="sm:col-span-2">
        <Button type="submit" className="w-full">
          ذخیره
        </Button>
      </div>
    </form>
  );
}
