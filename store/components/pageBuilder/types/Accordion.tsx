"use client";

import { useState } from "react";
import { Element } from "@/types/pageBuilder";

export default function Accordion({ element }: { element: Element }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="my-10 max-w-screen-md mx-auto">
      <h3 className="text-xl font-bold mb-4">{element.display_title}</h3>
      <div className="space-y-3">
        {element.items.map((item, index) => (
          <div key={item.id} className="border rounded">
            <button
              className="w-full p-4 text-left font-semibold bg-gray-100 hover:bg-gray-200"
              onClick={() =>
                setActiveIndex(index === activeIndex ? null : index)
              }
            >
              {item.object.title}
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-white text-gray-700">
                {item.object.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
