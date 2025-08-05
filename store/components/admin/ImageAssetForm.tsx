"use client";

import { useEffect, useState } from "react";
import { ImageAsset, ImageAssetFormValues } from "@/types/imageAsset";

interface Props {
  selected: ImageAsset | null;
  onSubmit: (data: FormData) => void;
}

export default function ImageAssetForm({ selected, onSubmit }: Props) {
  const [form, setForm] = useState<ImageAssetFormValues>({
    title: "",
    short_description: "",
    long_description: "",
    image: null,
  });

  useEffect(() => {
    if (selected) {
      setForm({
        title: selected.title,
        short_description: selected.short_description,
        long_description: selected.long_description,
        image: null,
      });
    }
  }, [selected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("short_description", form.short_description);
    data.append("long_description", form.long_description);
    if (form.image) data.append("image", form.image);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="عنوان"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="input"
      />
      <input
        type="text"
        placeholder="توضیح کوتاه"
        value={form.short_description}
        onChange={(e) =>
          setForm({ ...form, short_description: e.target.value })
        }
        className="input"
      />
      <textarea
        placeholder="توضیح بلند"
        value={form.long_description}
        onChange={(e) => setForm({ ...form, long_description: e.target.value })}
        className="textarea"
      />
      <input
        type="file"
        onChange={(e) =>
          setForm({ ...form, image: e.target.files?.[0] || null })
        }
      />
      <button type="submit" className="btn btn-primary w-full">
        {selected ? "ویرایش" : "افزودن"}
      </button>
    </form>
  );
}
