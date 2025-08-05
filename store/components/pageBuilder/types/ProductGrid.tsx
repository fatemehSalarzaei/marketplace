import { Element } from "@/types/pageBuilder";

export default function ProductGrid({ element }: { element: Element }) {
  return (
    <section className="my-8">
      {element.display_title && (
        <h2 className="text-xl font-bold mb-4">{element.display_title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {element.items.map((item) => {
          const product = item.object;
          if (!product) return null;

          return (
            <div key={item.id} className="rounded p-2 bg-white shadow-sm">
              <img
                src={product.main_image}
                alt={product.name}
                className="w-full h-auto object-cover rounded mb-3"
              />
              <p className="text-sm font-semibold">{product.name}</p>
              <p className="text-yellow-700 font-bold">{product.price}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
