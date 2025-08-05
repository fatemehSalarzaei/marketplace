import Link from "next/link";
import { Element } from "@/types/pageBuilder/pageBuilder";

export default function ProductHighlight({ element }: { element: Element }) {
  return (
    <div className="my-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">{element.display_title}</h3>
        <Link
          href="/products/special"
          className="inline-block px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition"
        >
          مشاهده بیشتر
        </Link>
      </div>

      <div className="flex flex-wrap gap-6">
        {element.items.map((item) => {
          const product = item.object;
          if (!product) return null;
          return (
            <Link
              key={item.id}
              href={`/products/${product.slug}`}
              className="w-48 p-3 bg-white rounded shadow hover:shadow-lg cursor-pointer transition"
            >
              <img
                src={product.main_image}
                alt={product.name}
                className="w-full h-48 object-cover mb-3 rounded"
              />
              <p className="font-semibold text-lg">{product.name}</p>
              <p className="text-yellow-700 font-bold text-md">
                {product.price}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
