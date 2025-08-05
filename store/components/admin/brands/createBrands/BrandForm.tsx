"use client";

import { FormEvent, useEffect, useState } from "react";
import { Brand } from "@/types/admin/brands/brand";

interface Props {
  initialData?: Partial<Brand>;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

export default function BrandForm({ initialData, onSubmit, loading }: Props) {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [removeLogo, setRemoveLogo] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setWebsite(initialData.website || "");
      setIsActive(initialData.is_active ?? true);
    }
  }, [initialData]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("website", website);
    formData.append("is_active", isActive ? "true" : "false");

    if (logo) {
      formData.append("logo", logo);
    }

    // اگر درخواست حذف لوگو وجود داشت
    if (removeLogo) {
      formData.append("remove_logo", "true");
    }

    onSubmit(formData);
  };

  const inputClass =
    "border border-gray-300 h-12 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 bg-white rounded-md p-6 shadow"
      >
        {/* نام برند */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">نام برند</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="نام برند"
          />
        </div>

        {/* وبسایت */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">وبسایت</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className={inputClass}
            placeholder="https://example.com"
          />
        </div>

        {/* نمایش لوگوی فعلی + حذف */}
        {initialData?.logo && !removeLogo && (
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-600">
              لوگوی فعلی:
            </label>
            <img
              src={
                initialData.logo.startsWith("http")
                  ? initialData.logo
                  : `${process.env.NEXT_PUBLIC_BASE_URL}${initialData.logo}`
              }
              alt="لوگوی برند"
              className="h-16 w-16 border rounded-md p-2 mb-2"
            />
            <button
              type="button"
              onClick={() => setRemoveLogo(true)}
              className="text-red-600 underline text-sm w-fit"
            >
              حذف لوگو
            </button>
          </div>
        )}

        {/* آپلود لوگوی جدید */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">لوگو برند</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files?.[0] || null)}
            className="file-input file-input-bordered w-full bg-gray-100 h-12"
          />
        </div>

        {/* وضعیت */}
        <div className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="checkbox"
          />
          <span className="font-semibold">فعال باشد</span>
        </div>

        {/* دکمه ذخیره */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "در حال ارسال..." : "ذخیره برند"}
          </button>
        </div>
      </form>
    </div>
  );
}
