import React, { useEffect, useRef, useState } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import p1 from "../../assets/images/p-1.jpg";
import p2 from "../../assets/images/p-2.jpg";
import p3 from "../../assets/images/p-4.jpg";
import p5 from "../../assets/images/p-5.jpg";
import "@splidejs/splide/dist/css/splide.min.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SplideAutoScroll.module.css";

const images = [p1, p2, p3, p5];

const SplideAutoScroll = () => {
  const splideRef = useRef(null);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    // Preload all images
    let loadedCount = 0;
    const total = images.length;
    const imgArr = images.map((img) => {
      const image = new window.Image();
      image.src = img.src;
      image.onload = () => {
        loadedCount++;
        if (loadedCount === total) setAllLoaded(true);
      };
      image.onerror = () => {
        loadedCount++;
        if (loadedCount === total) setAllLoaded(true);
      };
      return image;
    });
    // Cleanup
    return () => {
      imgArr.forEach((img) => { img.onload = null; img.onerror = null; });
    };
  }, []);

  useEffect(() => {
    if (allLoaded && splideRef.current) {
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
  }, [allLoaded]);

  if (!allLoaded) {
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

  return (
    <div className="splide" ref={splideRef}>
      <div className="splide__track">
        <ul className="splide__list">
          {images.concat(images).map((img, idx) => (
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
                  src={img.src} 
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