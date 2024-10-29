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
                Loading...
              </div>
            ) : (
              <Slider />
            )}
          </div>
          <div className="postSlider">
            <div className="row">
              <div className="col-md-12 col-lg-3">
                <div className="postSlider1 area1">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="true"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <Image className="img" src={p1} alt="slider1" />
                      </div>
                      <div className="carousel-item">
                        <Image className="img" src={p2} alt="slider2" />
                      </div>
                      <div className="carousel-item">
                        <Image className="img" src={p3} alt="slider3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-3">
                <div className="postSlider1">
                  <div
                    id="carouselExampleIndicators2"
                    className="carousel slide"
                    data-bs-ride="true"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators2"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators2"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators2"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <Image className="img" src={p3} alt="slider4" />
                      </div>
                      <div className="carousel-item">
                        <Image className="img" src={p2} alt="slider5" />
                      </div>
                      <div className="carousel-item">
                        <Image className="img" src={p1} alt="slider6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="postBanner1">
                  {bannerImage ? (
                    <Image
                      className="img"
                      src={bannerImage}
                      alt="banner-1"
                      width={500}
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
