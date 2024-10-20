"use client";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import p1 from "./assets/images/p-1.jpg";
import p2 from "./assets/images/p-2.jpg";
import p3 from "./assets/images/p-4.jpg";
import p5 from "./assets/images/p-5.jpg";
import e1 from "./assets/images/e-1.jpg";
import e2 from "./assets/images/e-2.jpg";
import e3 from "./assets/images/e-3.jpg";
import e4 from "./assets/images/e-4.jpg";
import e5 from "./assets/images/e-5.jpg";
// import e6 from "./assets/images/e-6.jpg";
// import e7 from "./assets/images/e-7.jpg";
// import e8 from "./assets/images/e-8.jpg";
// import e9 from "./assets/images/e-9.jpg";
// import e10 from "./assets/images/e-10.jpg";

import Eye from "./assets/images/eye.svg";
import Ellipse1 from "./assets/images/Ellipse-1.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Categories from "./components/categories/page";
import CoinSlider from "./components/coinslider/coinslider"

const Slider = dynamic(() => import("./components/slider/SimpleSlider"), {
  ssr: false,
});

const page = () => {
  return (
    <div>
      <div className="bannerArea">
        <div className="container">
          <div className="priceSlider py-2">
            <Slider />
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
                  <Image className="img" src={p5} alt="banner-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
      <CoinSlider/>
      </div>
      <section className="aboutArea">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-7">
              <div className="infoArea">
                <h1>About Us</h1>
                <div className="backshapeIcon">
                  <Image className="img" src={Ellipse1} alt="elp" />
                </div>
                <h3>Welcome You In The Crypto World</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis natus labore quia suscipit nobis et laudantium
                  maxime neque voluptate voluptas. Alias ex quod obcaecati
                  earum. Veniam natus nam dignissimos eligendi iste, optio quia
                  dolorum cum nihil asperiores. dolores amet dolorem. Tenetur
                  beatae quae labore suscipit nulla fuga nesciunt.
                </p>
                <ul>
                  <li>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-check-circle"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                    Bitcoins rise: digital gold in the making.
                  </li>
                  <li>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-check-circle"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                    Ethereum&apos;s smart contracts: coding the future.
                  </li>
                  <li>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-check-circle"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                    Altcoins surge, diversify your digital portfolio.
                  </li>
                  <li>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-check-circle"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                    NFTs: making digital art collectible.
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-5">
              <div
                className="aboutPic"
                data-aos="fade-up-right"
                data-aos-duration="1000"
              >
                <span className="topBox"></span>
                <Image className="img" src={p1} alt="slider1" />
                <span className="bottomBox"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="newsGroup">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-9">
              <div className="newsCard">
                <div className="subHeadline">
                  <h3>Latest News</h3>
                  <p>
                    <Link className="btn" href="/">
                      View All
                    </Link>
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-4">
                    <div className="cardBox">
                      <div className="picArea">
                        <Image className="img" src={p1} alt="slider1" />
                      </div>
                      <div className="cardInfo">
                        <p>
                          March 20, 2024
                          <span>
                            {" "}
                            <Image className="img" src={Eye} alt="eye" /> 120
                            View
                          </span>
                        </p>
                        <h4>
                          Bitcoins wild ride: soaring highs and gut-wrenching
                          lows.
                        </h4>
                        <h5>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Dolor fuga culpa optio laboriosam dolores
                          voluptate vitae itaque nihil illum accusantium.
                        </h5>
                        <p>
                          <Link className="btn" href="/blog">
                            Read More
                          </Link>
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4">
                    <div className="cardBox">
                      <div className="picArea">
                        <Image className="img" src={e1} alt="event" />
                      </div>
                      <div className="cardInfo">
                        <p>
                          March 20, 2024
                          <span>
                            {" "}
                            <Image className="img" src={Eye} alt="eye" /> 120
                            View
                          </span>
                        </p>
                        <h4>
                          Bitcoins wild ride: soaring highs and gut-wrenching
                          lows.
                        </h4>
                        <h5>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Dolor fuga culpa optio laboriosam dolores
                          voluptate vitae itaque nihil illum accusantium.
                        </h5>
                        <p>
                          <Link className="btn" href="/blog">
                            Read More
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4">
                    <div className="cardBox">
                      <div className="picArea">
                        <Image className="img" src={e2} alt="event" />
                      </div>
                      <div className="cardInfo">
                        <p>
                          March 20, 2024
                          <span>
                            {" "}
                            <Image className="img" src={Eye} alt="eye" /> 120
                            View
                          </span>
                        </p>
                        <h4>
                          Bitcoins wild ride: soaring highs and gut-wrenching
                          lows.
                        </h4>
                        <h5>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Dolor fuga culpa optio laboriosam dolores
                          voluptate vitae itaque nihil illum accusantium.
                        </h5>
                        <p>
                          <Link className="btn" href="/blog">
                            Read More
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4">
                    <div className="cardBox">
                      <div className="picArea">
                        <Image className="img" src={e3} alt="event" />
                      </div>
                      <div className="cardInfo">
                        <p>
                          March 20, 2024
                          <span>
                            {" "}
                            <Image className="img" src={Eye} alt="eye" /> 120
                            View
                          </span>
                        </p>
                        <h4>
                          Bitcoins wild ride: soaring highs and gut-wrenching
                          lows.
                        </h4>
                        <h5>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Dolor fuga culpa optio laboriosam dolores
                          voluptate vitae itaque nihil illum accusantium.
                        </h5>
                        <p>
                          <Link className="btn" href="/blog">
                            Read More
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4">
                    <div className="cardBox">
                      <div className="picArea">
                        <Image className="img" src={e4} alt="event" />
                      </div>
                      <div className="cardInfo">
                        <p>
                          March 20, 2024
                          <span>
                            {" "}
                            <Image className="img" src={Eye} alt="eye" /> 120
                            View
                          </span>
                        </p>
                        <h4>
                          Bitcoins wild ride: soaring highs and gut-wrenching
                          lows.
                        </h4>
                        <h5>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Dolor fuga culpa optio laboriosam dolores
                          voluptate vitae itaque nihil illum accusantium.
                        </h5>
                        <p>
                          <Link className="btn" href="/blog">
                            Read More
                          </Link>
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4">
                    <div className="cardBox">
                      <div className="picArea">
                        <Image className="img" src={e5} alt="event" />
                      </div>
                      <div className="cardInfo">
                        <p>
                          March 20, 2024
                          <span>
                            {" "}
                            <Image className="img" src={Eye} alt="eye" /> 120
                            View
                          </span>
                        </p>
                        <h4>
                          Bitcoins wild ride: soaring highs and gut-wrenching
                          lows.
                        </h4>
                        <h5>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Dolor fuga culpa optio laboriosam dolores
                          voluptate vitae itaque nihil illum accusantium.
                        </h5>
                        <p>
                          <Link className="btn" href="/blog">
                            Read More
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="category-group">
                <div className="subHeadline">
                  <h3>Latest News</h3>
                </div>
                <Categories />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
