import { Element } from "@/types/pageBuilder";

export default function GalleryBlock({ element }: { element: Element }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
      {element.items.map((item) => (
        <img
          key={item.id}
          src={item.object.image}
          alt={item.object.title}
          className="rounded shadow"
        />
      ))}
    </div>
  );
}
