import { Element } from "@/types/pageBuilder/pageBuilder";

export default function CategoryList({ element }: { element: Element }) {
  return (
    <div className="my-14">
      {/* عنوان دسته‌بندی‌ها */}
      <h3 className="text-xl font-bold text-center mb-8">
        {element.display_title}
      </h3>

      {/* لیست دسته‌بندی‌ها */}
      <div className="grid gap-6 justify-center grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] max-w-6xl mx-auto text-center">
        {element.items.map((item) => (
          <div key={item.id}>
            <img
              src={item.object.image}
              alt={item.object.name}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
            />
            <p className="text-sm font-medium">{item.object.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
