"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AboutSection from "./components/aboutUs/page";
import CryptoSlider from "./components/CryptoSlider/CryptoSlider";
import axiosInstance from "./Helper/Helper";
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
  
      {/* Crypto ticker / slider placed after hero */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#1b1740] via-[#221a57] to-[#071129] text-white rounded-xl px-4 py-3">
          <CryptoSlider />
        </div>
      </div>
      <div className="bannerArea">
        <div className="container mx-auto px-4">
          <BannerSection />
        </div>
      </div>

      <AboutSection />
      <HomeSections />
      {/* <NewsGroup /> */}
    </div>
  );
};

export default Page;
