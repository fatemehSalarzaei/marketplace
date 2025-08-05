import { Element } from "@/types/pageBuilder";

export default function TextBlock({ element }: { element: Element }) {
  return (
    <div className="my-4 text-lg text-gray-700">
      {element.display_title && (
        <h3 className="text-xl font-semibold mb-2">{element.display_title}</h3>
      )}
      <p>{element.html_content}</p>
    </div>
  );
}
