"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Element } from "@/types/pageBuilder/pageBuilder";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";

export default function Slider({ element }: { element: Element }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative my-10">
      <h3 className="text-xl font-bold mb-4 text-center">
        {element.display_title}
      </h3>
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.params.navigation) {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }, 0);
        }}
      >
        {element.items.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.object.image}
              alt={item.object.title}
              className="w-full h-60 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        ref={prevRef}
        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-black bg-opacity-50 p-2 text-white rounded-full"
      >
        ‹
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-black bg-opacity-50 p-2 text-white rounded-full"
      >
        ›
      </button>
    </div>
  );
}
