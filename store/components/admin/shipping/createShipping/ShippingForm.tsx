"use client";

import { FormEvent, useEffect, useState } from "react";

interface ShippingFormData {
  name: string;
  description?: string;
  cost: string;
  min_estimated_days?: string | number;
  max_estimated_days?: string | number;
  active: boolean;
}

interface ShippingFormProps {
  initialData?: Partial<ShippingFormData>;
  onSubmit: (data: ShippingFormData) => void | Promise<void>;
  loading?: boolean;
}

export default function ShippingForm({ initialData, onSubmit, loading }: ShippingFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [minDays, setMinDays] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setCost(initialData.cost || "");
      setMinDays(initialData.min_estimated_days?.toString() || "");
      setMaxDays(initialData.max_estimated_days?.toString() || "");
      setActive(initialData.active ?? true);
    }
  }, [initialData]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      cost,
      min_estimated_days: minDays,
      max_estimated_days: maxDays,
      active,
    });
  };

  const inputClass =
    "border border-gray-300 h-12 px-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="max-w-xl mx-auto mt-6 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow grid gap-6">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">نام روش ارسال</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="نام روش ارسال"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} resize-y`}
            rows={3}
            placeholder="توضیحات"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">هزینه (تومان)</label>
          <input
            type="number"
            required
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className={inputClass}
            placeholder="هزینه روش ارسال"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-semibold">حداقل روز</label>
            <input
              type="number"
              value={minDays}
              onChange={(e) => setMinDays(e.target.value)}
              className={inputClass}
              placeholder="مثلاً 1"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-semibold">حداکثر روز</label>
            <input
              type="number"
              value={maxDays}
              onChange={(e) => setMaxDays(e.target.value)}
              className={inputClass}
              placeholder="مثلاً 3"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="checkbox"
          />
          <span className="font-semibold">فعال باشد</span>
        </div>

        <button
          disabled={loading}
          className="btn bg-blue-600 text-white w-full h-12 text-lg hover:bg-blue-700"
          type="submit"
        >
          {loading ? "در حال ارسال..." : "ذخیره"}
        </button>
      </form>
    </div>
  );
}
