import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import p1 from "../../assets/images/p-3.png";
import p2 from "../../assets/images/icon-ticker-2.svg";
import p3 from "../../assets/images/icon-ticker-4.svg";
import p4 from "../../assets/images/icon-ticker-6.svg";
import p5 from "../../assets/images/icon-ticker-10.svg";
import p6 from "../../assets/images/icon-ticker-11.svg";
import p7 from "../../assets/images/icon-ticker-14.svg";

export default function SimpleSlider() {
  var settings = {
    dots: false,
    arrows: false, 
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p1} alt="slider1" />
          </div>
          <div className="infoArea">
            <h5>Title One</h5>
            <p>$130.00 <span className="upValue down">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
              $.35.00</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p2} alt="slider2" />
          </div>
          <div className="infoArea">
            <h5>Title Two</h5>
            <p>$130.00 <span className="upValue">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
              $.35.00</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p3} alt="slider3" />
          </div>
          <div className="infoArea">
            <h5>Title Three</h5>
            <p>$130.00 <span className="upValue down">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
              $.35.00</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p4} alt="slider4" />
          </div>
          <div className="infoArea">
            <h5>Title Four</h5>
            <p>$130.00 <span className="upValue down">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
              $.35.00</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p5} alt="slider5" />
          </div>
          <div className="infoArea">
            <h5>Title Five</h5>
            <p>$130.00 <span className="upValue">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
              $.35.00</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p6} alt="slider6" />
          </div>
          <div className="infoArea">
            <h5>Title Six</h5>
            <p>$130.00 <span className="upValue">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
              $.35.00</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p7} alt="slider7" />
          </div>
          <div className="infoArea">
            <h5>Title Seven</h5>
            <p>$130.00 <span className="upValue down">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
              $.35.00</span>
            </p>
          </div>
        </div>
      </div>
    </Slider>
  );
}
