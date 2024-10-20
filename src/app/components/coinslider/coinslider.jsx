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
import p8 from "../../assets/images/caret-down-fill.svg";
import p9 from "../../assets/images/caret-up-fill.svg";
import './slider.css';

export default function SimpleSlider() {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
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
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
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
            <Image className="img" src={p1} alt="slider7" />
          </div>
          <div className="infoArea">
            <h5>Title here</h5>
            <div className="velueNo d-flex">
            <p>$130.00</p>
              <div className="custom_img_type1">
              <Image className="img" src={p9} alt="slider7" />
              </div>
            <p><span className="upValue">$35.00</span></p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p2} alt="slider7" />
          </div>
          <div className="infoArea">
            <h5>Title here</h5>
            <div className="velueNo d-flex">
            <p>$130.00</p>
              <div className="custom_img_type1">
              <Image className="img" src={p9} alt="slider7" />
              </div>
            <p><span className="upValue">$35.00</span></p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p3} alt="slider7" />
          </div>
          <div className="infoArea">
            <h5>Title here</h5>
            <div className="velueNo d-flex">
            <p>$130.00</p>
              <div className="custom_img_type1">
              <Image className="img" src={p9} alt="slider7" />
              </div>
            <p><span className="upValue">$35.00</span></p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p4} alt="slider7" />
          </div>
          <div className="infoArea">
            <h5>Title here</h5>
            <div className="velueNo d-flex">
            <p>$130.00</p>
              <div className="custom_img_type1">
              <Image className="img" src={p8} alt="slider7" />
              </div>
            <p><span className="upValue down">$35.00</span></p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p5} alt="slider7" />
          </div>
          <div className="infoArea">
            <h5>Title here</h5>
            <div className="velueNo d-flex">
            <p>$130.00</p>
              <div className="custom_img_type1">
              <Image className="img" src={p9} alt="slider7" />
              </div>
            <p><span className="upValue">$35.00</span></p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p6} alt="slider7" />
          </div>
          <div className="infoArea">
            <h5>Title here</h5>
            <div className="velueNo d-flex">
            <p>$130.00</p>
              <div className="custom_img_type1">
              <Image className="img" src={p8} alt="slider7" />
              </div>
            <p><span className="upValue down">$35.00</span></p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="priceBox mx-1">
          <div className="picArea">
            <Image className="img" src={p7} alt="slider7" />
          </div>
          <div className="infoArea">
            <h5>Title here</h5>
            <div className="velueNo d-flex">
            <p>$130.00</p>
              <div className="custom_img_type1">
              <Image className="img" src={p8} alt="slider7" />
              </div>
            <p><span className="upValue down">$35.00</span></p>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  );
}