"use client";

import { Element } from "@/types/pageBuilder/pageBuilder";
import Masonry from "react-masonry-css";
import "@/styles/masonry.css";

export default function MasonryBlock({ element }: { element: Element }) {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="my-10 px-4">
      <h3 className="text-xl font-bold mb-6 text-center">
        {element.display_title}
      </h3>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {element.items.map((item) => (
          <div key={item.id} className="mb-4">
            <img
              src={item.object.image}
              alt={item.object.title}
              className="rounded w-full object-cover"
            />
            <p className="mt-2 text-center font-medium">{item.object.title}</p>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
