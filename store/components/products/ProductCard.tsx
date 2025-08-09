import Image from "next/image";
import Products from "@/types/products/product_list";
import Link from "next/link";

export default function ProductCard({ product }: { product: Products }) {
  const imageSrc =
    product.main_image_url && product.main_image_url.trim() !== ""
      ? product.main_image_url
      : "/images/default-product.png";

  return (
    <Link href={`/product/${product.id}/${product.slug}`} className="block">
      <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden transition hover:shadow-lg h-full">
        {/* بخش تصویر */}
        <div className="relative w-full aspect-square bg-gray-50">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-contain rounded-t-lg"
          />
        </div>

        {/* اطلاعات محصول */}
        <div className="flex flex-col p-3 flex-1 justify-between">
          {/* عنوان */}
          <h3 className="text-sm font-semibold text-neutral-800 line-clamp-2 mb-1 leading-6">
            {product.name}
          </h3>

          {/* وضعیت موجودی و امتیاز */}
          <div className="flex items-center justify-between mb-2 text-xs">
            {product.availability_status === "in_stock" && (
              <span className="text-green-600 font-medium">موجود</span>
            )}
            {product.availability_status === "out_of_stock" && (
              <span className="text-red-500 font-medium">ناموجود</span>
            )}
            {product.availability_status === "limited" && (
              <span className="text-yellow-500 font-medium">
                تنها ۱ عدد باقی‌مانده
              </span>
            )}

            <div className="flex items-center gap-1">
              <span className="text-gray-700">
                {product.rating ? product.rating.toFixed(1) : "—"}
              </span>
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.007 3.104a1 1 0 00.95.69h3.259c.969 0 1.371 1.24.588 1.81l-2.636 1.918a1 1 0 00-.364 1.118l1.007 3.104c.3.921-.755 1.688-1.538 1.118l-2.636-1.918a1 1 0 00-1.175 0l-2.636 1.918c-.783.57-1.838-.197-1.538-1.118l1.007-3.104a1 1 0 00-.364-1.118L2.4 8.53c-.783-.57-.38-1.81.588-1.81h3.259a1 1 0 00.95-.69l1.007-3.104z" />
              </svg>
            </div>
          </div>

          {/* توضیح کوتاه با HTML */}
          <div
            className="text-gray-500 text-sm line-clamp-2 mb-2"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />

          {/* قیمت */}
          <div className="text-right mt-auto">
            <span className="text-base font-bold text-primary">
              {product.price} تومان
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
