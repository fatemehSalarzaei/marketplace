"use client";

import { ProductVideo } from "@/types/products/product";

const ProductVideos = ({ videos }: { videos: ProductVideo[] }) => {
  if (!videos || videos.length === 0) return null;
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">ویدیوها</h2>
      {videos.map((video) => (
        <div key={video.id} className="mb-4">
          <video controls className="w-full rounded">
            <source src={video.video_url} type="video/mp4" />
          </video>
          <p className="text-sm mt-1">{video.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductVideos;
