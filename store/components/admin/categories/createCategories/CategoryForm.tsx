"use client";

import { useState, useEffect, FormEvent } from "react";
import { Category } from "@/types/admin/categories/category";
import { getAllCategories } from "@/services/admin/categories/categoryService";

interface Props {
  initialData?: Partial<Category>;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

export default function CategoryForm({
  initialData,
  onSubmit,
  loading,
}: Props) {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setParentId(initialData.parent_id ?? null);
      setDescription(initialData.description || "");
      setIsActive(initialData.is_active ?? true);
      setMetaTitle(initialData.meta_title || "");
      setMetaDescription(initialData.meta_description || "");
    }
  }, [initialData]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("خطا در دریافت دسته‌بندی‌ها", err);
      }
    }

    fetchCategories();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (parentId !== null) {
      formData.append("parent_id", parentId.toString());
    }
    formData.append("description", description);
    formData.append("is_active", isActive ? "true" : "false");
    formData.append("meta_title", metaTitle);
    formData.append("meta_description", metaDescription);
    if (imageFile) formData.append("image", imageFile);
    if (iconFile) formData.append("icon", iconFile);
    onSubmit(formData);
  };

  const inputClass =
    "border border-gray-300 h-12 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500";
  const textareaClass =
    "border border-gray-300 h-28 px-3 py-2 rounded-md w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500";
  const selectClass =
    "border border-gray-300 h-12 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-48 overflow-y-auto";

  return (
    <div className="w-full mt-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6 bg-white rounded-md p-6 shadow"
      >
        {/* نام */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">نام</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="نام دسته‌بندی"
          />
        </div>

        {/* توضیحات */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={textareaClass}
            placeholder="توضیحات دسته‌بندی"
          />
        </div>

        {/* تصویر */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">تصویر دسته‌بندی</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            }
            className="file-input file-input-bordered w-full bg-gray-100 h-12"
          />
        </div>

        {/* آیکون */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">آیکون دسته‌بندی</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setIconFile(e.target.files ? e.target.files[0] : null)
            }
            className="file-input file-input-bordered w-full bg-gray-100 h-12"
          />
        </div>

        {/* والد */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">دسته والد</label>
          <select
            value={parentId ?? ""}
            onChange={(e) =>
              setParentId(e.target.value ? Number(e.target.value) : null)
            }
            className={selectClass}
          >
            <option value="">بدون والد</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* فعال بودن */}
        <div className="flex items-center gap-2 mt-7">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="checkbox"
          />
          <span className="font-semibold">فعال باشد</span>
        </div>

        {/* عنوان متا */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">عنوان متا</label>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className={inputClass}
            placeholder="عنوان متا"
          />
        </div>

        {/* توضیحات متا */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">توضیحات متا</label>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className={textareaClass}
            placeholder="توضیحات متا"
          />
        </div>

        {/* دکمه ثبت */}
        <div className="col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "در حال ارسال..." : "ذخیره دسته‌بندی"}
          </button>
        </div>
      </form>
    </div>
  );
}
