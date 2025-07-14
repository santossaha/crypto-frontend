import React, { useEffect, useRef, useState } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import axiosInstance from "../../Helper/Helper";
import "@splidejs/splide/dist/css/splide.min.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SplideAutoScroll.module.css";

const SplideAutoScroll = () => {
  const splideRef = useRef(null);
  const [sliderImages, setSliderImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await axiosInstance("/get-sliders");
        // Expecting response.data.data to be an array of image URLs
        if (response.data.status === "success") {
          const data = response.data.data;
          setSliderImages(Array.isArray(data) ? data : [data]);
        }
      } catch (error) {
        console.error("Error fetching slider images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSliderImages();
  }, []);

  useEffect(() => {
    if (!loading && sliderImages.length > 0 && splideRef.current) {
      const splide = new Splide(splideRef.current, {
        type: "loop",
        drag: "free",
        focus: "center",
        perPage: 3,
        gap: "20px",
        autoScroll: {
          speed: 1,
        },
      });
      splide.mount({ AutoScroll });
      return () => splide.destroy();
    }
  }, [loading, sliderImages]);

  if (loading) {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonRow}>
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className={styles.skeletonCard}>
              <Skeleton height={320} width="100%" borderRadius={12} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // if (sliderImages.length === 0) {
  //   return <div>No images found.</div>;
  // }

  return (
    <div className="splide" ref={splideRef}>
      <div className="splide__track">
        <ul className="splide__list">
          {sliderImages.concat(sliderImages).map((img, idx) => (
            <li className="splide__slide" key={idx}>
              <div 
                className="slide-inner" 
                style={{ 
                  width: "100%", 
                  height: "320px", 
                  overflow: "hidden", 
                  borderRadius: 12, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center" 
                }}
              >
                <img 
                  src={img.image} 
                  alt={`slide-${idx}`} 
                  style={{ 
                    width: "90%", 
                    height: "100%", 
                    objectFit: "cover", 
                    borderRadius: 12, 
                    display: "block", 
                    margin: "0 auto" 
                  }} 
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SplideAutoScroll; 