"use client";

import { Element } from "@/types/pageBuilder/pageBuilder";

export default function Banner({ element }: { element: Element }) {
  const banner = element.items[0]?.object;

  if (!banner) return null;

  return (
    <div className="my-10 w-full px-4">
      <div className="relative w-full overflow-hidden rounded-xl bg-white p-4 shadow-md">
        <img
          src={banner.image}
          alt={banner.title || "بنر تبلیغاتی"}
          className="w-full h-[450px] object-cover rounded-xl"
        />
        {banner.title && (
          <div className="absolute bottom-4 w-full flex justify-center pointer-events-none">
            <h2 className="text-black text-2xl font-bold bg-white bg-opacity-70 px-6 py-3 rounded-md mb-6">
              {banner.title}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
