"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsGroup from "./components/newsGroup/page";
import AboutSection from "./components/aboutUs/page";
import HeroSection from "./components/hero/HeroSection";
import CryptoSlider from "./components/CryptoSlider/CryptoSlider";
import axiosInstance from "./Helper/Helper";
import SplideAutoScroll from "./components/slider/SplideAutoScroll";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"
import HomeSections from "./components/HomeSections";
import BannerSection from "./components/✅ BannerSection";


const Slider = dynamic(() => import("./components/slider/SimpleSlider"), {
  ssr: false,
});

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
   
    const fetchBannerImage = async () => {
      try {
        const response = await axiosInstance("/get-adds");
        
        if (response.data.status === "success") {
          setBannerImage(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching banner image:", error);
      }
    };

    fetchBannerImage();
    
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1b1740] via-[#221a57] to-[#071129] text-gray-800">
      {/* Hero inserted directly after header */}
      <HeroSection />
      {/* Crypto ticker / slider placed after hero */}
      <div className="container mx-auto px-4 mt-8">
        <div className="bg-gradient-to-r from-[#1b1740] via-[#221a57] to-[#071129] text-white rounded-xl px-4 py-3">
          <CryptoSlider />
        </div>
      </div>
      <div className="bannerArea">
        <div className="container mx-auto px-4">
          <BannerSection />
          {/* <div className="priceSlider py-4 flex items-center overflow-x-auto gap-4">
            <Slider />
          </div> */}

          {/* <div className="postSlider mt-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/3">
               <SplideAutoScroll/>
              </div>

              <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
                <div className="postBanner1 w-full max-w-md lg:mr-8">
                  {bannerImage ? (
                    <Image
                      className="rounded-lg shadow-lg"
                      src={bannerImage}
                      alt="banner-1"
                      width={800}
                      height={300}
                    />
                  ) : (
                    <Skeleton width={800} height={300} borderRadius={12} />
                  )}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <AboutSection />
      <HomeSections />
      {/* <NewsGroup /> */}
    </div>
  );
};

export default Page;
