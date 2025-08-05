"use client";

import ProductGallery from "./ProductGallery";
import ProductAttributes from "./ProductAttributes";
import ProductTabs from "./ProductTabs";
import ProductVariantSelector from "./ProductVariantSelector";
import { Product } from "@/types/products/product";

interface Props {
  product: Product;
}

const ProductDetailPage = ({ product }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
      {/* بخش تصاویر */}
      <div className="lg:col-span-5">
        <ProductGallery
          images={product.gallery_images}
          mainImage={product.main_image}
        />
      </div>

      {/* بخش اطلاعات و انتخاب خصوصیات */}
      <div className="lg:col-span-7 space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-700">{product.short_description}</p>

        {/* ویژگی‌های کلی محصول
        <ProductAttributes attributes={product.attributes} /> */}

        {/* انتخاب خصوصیات و نمایش قیمت/موجودی متناسب با انتخاب */}
        <ProductVariantSelector
          variants={product.variants}
          attributes={product.attributes}
        />
      </div>

      {/* بخش تب‌ها (توضیحات، ویدیو، خصوصیات و...) */}
      <div className="lg:col-span-12">
        <ProductTabs
          attributes={product.attributes}
          variants={product.variants}
          videos={product.videos}
          description={product.long_description}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
