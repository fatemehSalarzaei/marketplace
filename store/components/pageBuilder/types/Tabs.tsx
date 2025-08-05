"use client";

import { useState } from "react";
import { Element } from "@/types/pageBuilder/pageBuilder";

export default function Tabs({ element }: { element: Element }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="my-10 max-w-screen-md mx-auto">
      <h3 className="text-xl font-bold mb-4">{element.display_title}</h3>
      <div className="flex border-b mb-4">
        {element.items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 font-semibold ${
              activeIndex === index
                ? "border-b-2 border-yellow-500 text-yellow-600"
                : "text-gray-500"
            }`}
          >
            {item.object.title}
          </button>
        ))}
      </div>
      <div className="p-4 border rounded bg-white">
        <h4 className="font-semibold mb-2">
          {element.items[activeIndex]?.object.title}
        </h4>
        <p>{element.items[activeIndex]?.object.description}</p>
      </div>
    </div>
  );
}
