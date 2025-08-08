"use client";

import { useEffect, useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductTabs from "./ProductTabs";
import ProductVariantSelector from "./ProductVariantSelector";
import { Product } from "@/types/products/product";
import { Heart, Share2 } from "lucide-react";
import { favoriteService } from "@/services/favorites/favoriteService";

interface Props {
  product: Product;
}

const ProductDetailPage = ({ product }: Props) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const status = await favoriteService.checkFavorite({ product: product.id });
        setIsFavorited(status);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };
    checkFavoriteStatus();
  }, [product.id]);

  const handleShare = () => {
    const cleanDescription = product.short_description.replace(/<[^>]+>/g, "");
    const shareText = `${product.name}\n\n${cleanDescription}\n\n${window.location.href}`;

    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("متن و لینک محصول کپی شد!");
    }
  };

  const handleWishlist = async () => {
    try {
      if (isFavorited) {
        await favoriteService.removeFavorite({ product: product.id });
        setIsFavorited(false);
        alert("❌ محصول از علاقه‌مندی‌ها حذف شد!");
      } else {
        await favoriteService.addFavorite({ product: product.id });
        setIsFavorited(true);
        alert("✅ محصول به علاقه‌مندی‌ها اضافه شد!");
      }
    } catch (error) {
      console.error(error);
      alert("خطا در تغییر وضعیت علاقه‌مندی");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
      {/* بخش تصاویر */}
      <div className="lg:col-span-5 relative">
        {/* دکمه‌ها سمت چپ بالا */}
        <div className="absolute top-2 left-2 flex gap-2 z-10">
          <button
            onClick={handleShare}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <Share2 size={20} className="text-gray-600" />
          </button>
          <button
            onClick={handleWishlist}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <Heart
              size={20}
              className={isFavorited ? "text-red-500" : "text-gray-600"}
              fill={isFavorited ? "red" : "none"}
            />
          </button>
        </div>

        <ProductGallery
          images={product.gallery_images}
          mainImage={product.main_image.image_url}
        />
      </div>

      {/* بخش اطلاعات */}
      <div className="lg:col-span-7 space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        />

        <ProductVariantSelector
          variants={product.variants}
          attributes={product.attributes}
        />
      </div>

      {/* تب‌ها */}
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
