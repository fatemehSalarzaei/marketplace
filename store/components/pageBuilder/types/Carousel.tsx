"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Element } from "@/types/pageBuilder/pageBuilder";
import "swiper/css";
import "swiper/css/pagination";

export default function Carousel({ element }: { element: Element }) {
  return (
    <div className="my-10 max-w-screen-lg mx-auto">
      <h3 className="text-xl font-bold mb-4">{element.display_title}</h3>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
      >
        {element.items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="p-4 bg-white rounded shadow">
              <img
                src={item.object.image}
                alt={item.object.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <p className="text-center font-semibold">{item.object.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
