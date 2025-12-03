"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Skeleton loader
const Skeleton = ({ width, height, borderRadius = 8 }) => (
  <div
    className="animate-pulse bg-gray-200"
    style={{ width, height, borderRadius }}
  />
);

const BannerSection = () => {
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState([]);
  const [bannerImage, setBannerImage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlides([
        { id: 1, image: "/images/b1.jpg" },
        { id: 2, image: "/images/b2.jpg" },
        { id: 3, image: "/images/b6.jpg" },
        { id: 4, image: "/images/b4.jpg" },
        { id: 5, image: "/images/banner-03.jpg" },
      ]);
      setBannerImage("/images/banner-02.jpg");
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT SIDE - IMAGE SLIDER (70%) */}
          <div className="w-full lg:w-[70%]">
            {loading ? (
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    width={"100%"}
                    height={300}
                    borderRadius={12}
                  />
                ))}
              </div>
            ) : (
              <div className="relative">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }, 
                  }}
                  pagination={{
                    clickable: true,
                    el: ".custom-pagination", // custom dot container
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  className="rounded-xl overflow-hidden shadow-xl pb-10" // extra padding for dots
                >
                  {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                      <div className="relative w-full h-[300px] md:h-[350px]">
                        <Image
                          src={slide.image}
                          alt={`Slide ${slide.id}`}
                          fill
                          className="object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-xl" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* ✅ Custom Pagination Dots with Extra Space */}
                <div className="custom-pagination !bottom-0 flex justify-center mt-4"></div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - STATIC BANNER (30%) */}
          <div className="w-full lg:w-[30%] flex justify-center lg:justify-end">
            {loading ? (
              <Skeleton width={400} height={350} borderRadius={12} />
            ) : (
              <div className="relative w-full max-w-md h-[300px] md:h-[350px]">
                <Image
                  src={bannerImage}
                  alt="Banner"
                  fill
                  className="rounded-xl shadow-lg border border-white/10 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
