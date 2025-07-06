"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import p1 from "./assets/images/p-1.jpg";
import p2 from "./assets/images/p-2.jpg";
import p3 from "./assets/images/p-4.jpg";
import p5 from "./assets/images/p-5.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsGroup from "./components/newsGroup/page";
import AboutSection from "./components/aboutUs/page";
import axiosInstance from "./Helper/Helper";
import SplideAutoScroll from "./components/slider/SplideAutoScroll";

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
          <div className="priceSlider py-2">
            {" "}
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  color: "white",
                }}
              >
               
              </div>
            ) : (
              <Slider />
            )}
          </div>
          <div className="postSlider">
            <div className="row">
              <div className="col-md-12 col-lg-8">
               <SplideAutoScroll/>
              </div>

              <div className="col-md-12 col-lg-8">
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
                    <p>Error: No image available</p> 
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AboutSection />
      <NewsGroup />
    </div>
  );
};

export default Page;
