"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Element } from "@/types/pageBuilder/pageBuilder";

export default function BannerCarousel({ element }: { element: Element }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative my-6 w-full max-w-screen-xl mx-auto">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ clickable: true }}
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
        style={{ height: "450px" }}
        className="rounded-lg overflow-hidden"
      >
        {element.items.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.object.image}
              alt={item.object.title}
              className="w-full h-[450px] object-cover"
              loading="lazy"
            />
          </SwiperSlide>
        ))}

        {/* دکمه قبلی */}
        <button
          ref={prevRef}
          className="absolute top-1/2 left-3 z-20 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-70 transition"
          aria-label="Previous slide"
        >
          ‹
        </button>

        {/* دکمه بعدی */}
        <button
          ref={nextRef}
          className="absolute top-1/2 right-3 z-20 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-70 transition"
          aria-label="Next slide"
        >
          ›
        </button>
      </Swiper>
    </div>
  );
}
