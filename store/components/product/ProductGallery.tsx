"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductGalleryImage } from "@/types/products/product";

const ProductGallery = ({
  images,
  mainImage,
}: {
  images: ProductGalleryImage[];
  mainImage: string;
}) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  const allImages: ProductGalleryImage[] = mainImage
    ? [
        { id: "main", image_url: mainImage, alt_text: "تصویر اصلی" },
        ...images.filter((img) => img.image_url !== mainImage),
      ]
    : images;

  return (
    <div>
      {/* باکس ثابت برای نمایش تصویر انتخاب شده */}
      <div className="w-[400px] h-[400px] relative rounded-lg overflow-hidden bg-white ">
        <Image
          src={selectedImage}
          alt="Main image"
          fill
          className="object-contain"
          quality={100}
        />
      </div>

      {/* گالری تصاویر کوچک */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {allImages.map((img) => (
          <div
            key={img.id}
            className={`border rounded p-1 cursor-pointer ${
              selectedImage === img.image_url
                ? "border-blue-500"
                : "border-transparent"
            }`}
            onClick={() => setSelectedImage(img.image_url)}
          >
            <Image
              src={img.image_url}
              alt={img.alt_text}
              width={80}
              height={80}
              className="rounded object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
