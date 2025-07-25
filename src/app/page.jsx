"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsGroup from "./components/newsGroup/page";
import AboutSection from "./components/aboutUs/page";
import axiosInstance from "./Helper/Helper";
import SplideAutoScroll from "./components/slider/SplideAutoScroll";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"
import HomeSections from "./components/HomeSections";


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
    <div>
      <div className="bannerArea">
        <div className="container">
          <div className="priceSlider py-2"
            style={loading ? { display: "flex", alignItems: "center" } : undefined}
          >
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 220,
                    height: 50,
                    borderRadius: 40,
                    margin: "0 12px",
                    overflow: "hidden",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Skeleton height={32} width={160} borderRadius={20} />
                </div>
              ))
            ) : (
              <Slider />
            )}
          </div>
          <div className="postSlider">
            <div className="row">
              <div className="col-md-12 col-lg-8">
               <SplideAutoScroll/>
              </div>

              <div className="col-md-12 col-lg-4">
                <div className="postBanner1">
                  {bannerImage ? (
                    <Image
                      className="img"
                      src={bannerImage}
                      alt="banner-1"
                      width={800}
                      height={300}
                    />
                  ) : (
                    <Skeleton width={800} height={500} borderRadius={12} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AboutSection />
      <HomeSections />
      {/* <NewsGroup /> */}
    </div>
  );
};

export default Page;
