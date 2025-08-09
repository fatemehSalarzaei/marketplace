import Link from "next/link";
import Image from "next/image";
import { RecentView } from "@/types/recentViews/recentViews";

export default function RecentViewItem({ view }: { view: RecentView }) {
  return (
    <Link
      href={`/product/${view.product.id}`}
      className="flex items-center gap-3 p-3 border-b hover:bg-gray-50 transition"
    >
      <div className="relative w-40 h-40 bg-gray-100 rounded">
        <Image
          src={view.product.main_image_url || "/images/default-product.png"}
          alt={view.product.name}
          fill
          className="object-contain rounded"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-800">
          {view.product.name}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(view.viewed_at).toLocaleString("fa-IR")}
        </span>
      </div>
    </Link>
  );
}
