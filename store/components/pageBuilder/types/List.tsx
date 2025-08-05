import { Element } from "@/types/pageBuilder/pageBuilder";

export default function List({ element }: { element: Element }) {
  return (
    <div className="my-10 max-w-screen-md mx-auto">
      <h3 className="text-xl font-bold mb-4">{element.display_title}</h3>
      <ul className="list-disc list-inside space-y-2">
        {element.items.map((item) => (
          <li key={item.id} className="text-gray-700">
            {item.object.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
