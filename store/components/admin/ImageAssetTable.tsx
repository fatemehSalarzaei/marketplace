"use client";

import { ImageAsset } from "@/types/imageAsset";

interface Props {
  assets: ImageAsset[];
  onEdit: (asset: ImageAsset) => void;
  onDelete: (asset: ImageAsset) => void;
}

export default function ImageAssetTable({ assets, onEdit, onDelete }: Props) {
  return (
    <div className="space-y-4">
      {assets.map((item) => (
        <div
          key={item.id}
          className="border rounded p-2 flex items-center gap-4"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.short_description}</p>
          </div>
          <div className="flex gap-2">
            <button className="text-blue-600" onClick={() => onEdit(item)}>
              ویرایش
            </button>
            <button className="text-red-600" onClick={() => onDelete(item)}>
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
