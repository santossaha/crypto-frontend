import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import axios from "axios";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import "./style.css";

export default function SimpleSlider() {
  const [sliderData, setSliderData] = useState([]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 1500,
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

  useEffect(() => {
    
    const fetchTrendingCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        const coins = response.data.coins.map((coin) => ({
          imgSrc: coin.item.thumb,
          title: coin.item.name.split(" ")[0],
          price: `$${coin.item.price_btc.toFixed(3)}`, 
          value: coin.item.market_cap_rank, 
          isDown: Math.random() >= 0.5, 
        }));
        setSliderData(coins);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };

    fetchTrendingCoins();
  }, []);

  return (
    <Slider {...settings}>
      {sliderData.length > 0 ? (
        sliderData?.map((item, index) => (
          <div key={index}>
            <div className="priceBox mx-1">
              <div className="picArea">
                <Image className="img" src={item.imgSrc} alt={`slider${index + 1}`} width={50} height={50} />
              </div>
              <div className="infoArea">
                <h5>{item.title}</h5>
                <p>
                  ${item.price}{" "}
                  <span className={`upValue ${item.isDown ? "down" : ""}`}>
                    {item.isDown ? "▼" : "▲"} {item.value}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Slider>
  );
}
