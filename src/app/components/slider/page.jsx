import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";


const SimpleSlider = dynamic(() => import("react-slick"), { ssr: false });

// Import your image assets
import p1 from "../../assets/images/p-3.png";
import p2 from "../../assets/images/icon-ticker-2.svg";
import p3 from "../../assets/images/icon-ticker-4.svg";
import p4 from "../../assets/images/icon-ticker-6.svg";
import p5 from "../../assets/images/icon-ticker-10.svg";
import p6 from "../../assets/images/icon-ticker-11.svg";
import p7 from "../../assets/images/icon-ticker-14.svg";

const Slider = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000, // Adjusted for a smoother transition speed
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <SimpleSlider {...settings}>
      {/* Slide 1 */}
      <div key={p1.src}>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p1} alt="slider1" priority />
          </div>
          <div className="infoArea">
            <h5>Title One</h5>
            <p>
              $130.00{" "}
              <span className="upValue down">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14l-4.796-5.481a1 1 0 0 1 .753-1.659h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
                - $35.00
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Slide 2 */}
      <div key={p2.src}>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p2} alt="slider2" priority />
          </div>
          <div className="infoArea">
            <h5>Title Two</h5>
            <p>
              $150.00{" "}
              <span className="upValue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-up-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                </svg>
                + $25.00
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Slide 3 */}
      <div key={p3.src}>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p3} alt="slider3" priority />
          </div>
          <div className="infoArea">
            <h5>Title Three</h5>
            <p>
              $170.00{" "}
              <span className="upValue down">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14l-4.796-5.481a1 1 0 0 1 .753-1.659h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
                - $45.00
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Slide 4 */}
      <div key={p4.src}>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p4} alt="slider4" priority />
          </div>
          <div className="infoArea">
            <h5>Title Four</h5>
            <p>
              $180.00{" "}
              <span className="upValue down">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14l-4.796-5.481a1 1 0 0 1 .753-1.659h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
                - $55.00
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Slide 5 */}
      <div key={p5.src}>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p5} alt="slider5" priority />
          </div>
          <div className="infoArea">
            <h5>Title Five</h5>
            <p>
              $190.00{" "}
              <span className="upValue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-up-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                </svg>
                + $65.00
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Slide 6 */}
      <div key={p6.src}>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p6} alt="slider6" priority />
          </div>
          <div className="infoArea">
            <h5>Title Six</h5>
            <p>
              $200.00{" "}
              <span className="upValue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-up-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                </svg>
                + $75.00
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Slide 7 */}
      <div key={p7.src}>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p7} alt="slider7" priority />
          </div>
          <div className="infoArea">
            <h5>Title Seven</h5>
            <p>
              $210.00{" "}
              <span className="upValue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-up-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                </svg>
                + $85.00
              </span>
            </p>
          </div>
        </div>
      </div>
    </SimpleSlider>
  );
};

export default Slider;
