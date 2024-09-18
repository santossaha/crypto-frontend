import Image from "next/image";
import Link from "next/link";
import React from "react";
import p1 from "../assets/images/p-1.jpg";
import p2 from "../assets/images/e-1.jpg";
import p3 from "../assets/images/e-2.jpg";
import e1 from "../assets/images/e-1.jpg";
import e2 from "../assets/images/e-2.jpg";
import e3 from "../assets/images/e-3.jpg";
import e4 from "../assets/images/e-4.jpg";
import e5 from "../assets/images/e-5.jpg";
import Eye from "../assets/images/eye.svg";
import Banner from "../components/banner/page";
import "./style.css";

const blog = () => {
  return (
    <div>
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2>Welcome to our Blog</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since
          </p>
          <ul>
            <li>
              <Link href="/" className="linkarea">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
      <section className="newsGroup mt-50">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-9">
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
            <div className="col-md-6 col-lg-3">
              <div className="newsCard">
                <div className="cardBox">
                  <div className="picArea">
                    <Image className="img" src={p1} alt="slider1" />
                  </div>
                  <div className="cardInfo">
                    <p>
                      March 20, 2024
                      <span>
                        {" "}
                        <Image className="img" src={Eye} alt="eye" /> 120 View
                      </span>
                    </p>
                    <h4>
                      Bitcoins wild ride: soaring highs and gut-wrenching lows.
                    </h4>
                    <h5>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Dolor fuga culpa optio laboriosam dolores voluptate vitae
                      itaque nihil illum accusantium.
                    </h5>
                    <p>
                      <Link className="btn" href="/blog/blog-details">
                        Read More
                      </Link>
                    </p>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-9">
              <div className="newsCard">
                <div className="subHeadline">
                  <h3>New Post</h3>
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
                          <Link className="btn" href="/blog/blog-details">
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
                          <Link className="btn" href="/blog/blog-details">
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
                          <Link className="btn" href="/blog/blog-details">
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
                          <Link className="btn" href="/blog/blog-details">
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
                          <Link className="btn" href="/blog/blog-details">
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
                          <Link className="btn" href="/blog/blog-details">
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
                <div className="category-group-area">
                  <div className="group-section">
                    <h4>Catagories</h4>
                    <ul>
                      <li>
                        <Link className="linkbtn active" href="/">
                          All Post
                        </Link>
                      </li>
                      <li>
                        <Link className="linkbtn" href="/">
                          News
                        </Link>
                      </li>
                      <li>
                        <Link className="linkbtn" href="/">
                          Latest News
                        </Link>
                      </li>
                      <li>
                        <Link className="linkbtn" href="/">
                          Top News
                        </Link>
                      </li>
                      <li>
                        <Link className="linkbtn" href="/">
                          New News
                        </Link>
                      </li>
                      <li>
                        <Link className="linkbtn" href="/">
                          Old News
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="blog-list">
                    <ul>
                      <li>
                        <Link className="postitem" href="/">
                          <div className="picarea">
                            <Image className="img" src={e3} alt="slider1" />
                          </div>
                          <div className="postinfo">
                            <h5>Bitcoin rally: a digital gold rush.</h5>
                            <p>March 12, 2024</p>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link className="postitem" href="/">
                          <div className="picarea">
                            <Image className="img" src={p1} alt="slider1" />
                          </div>
                          <div className="postinfo">
                            <h5>Bitcoin rally: a digital gold rush.</h5>
                            <p>March 12, 2024</p>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link className="postitem" href="/">
                          <div className="picarea">
                            <Image className="img" src={p2} alt="slider1" />
                          </div>
                          <div className="postinfo">
                            <h5>Bitcoin rally: a digital gold rush.</h5>
                            <p>March 12, 2024</p>
                          </div>
                        </Link>
                      </li>

                      <li>
                        <Link className="postitem" href="/">
                          <div className="picarea">
                            <Image className="img" src={p3} alt="slider1" />
                          </div>
                          <div className="postinfo">
                            <h5>Bitcoin rally: a digital gold rush.</h5>
                            <p>March 12, 2024</p>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="group-photo">
                    <h4>Catagories</h4>
                    <ul>
                      <li>
                        <Link className="picarea" href="/">
                          <Image className="img" src={e1} alt="slider2" />
                        </Link>
                      </li>
                      <li>
                        <Link className="picarea" href="/">
                          <Image className="img" src={e2} alt="slider2" />
                        </Link>
                      </li>
                      <li>
                        <Link className="picarea" href="/">
                          <Image className="img" src={e3} alt="slider2" />
                        </Link>
                      </li>
                      <li>
                        <Link className="picarea" href="/">
                          <Image className="img" src={e4} alt="slider2" />
                        </Link>
                      </li>
                      <li>
                        <Link className="picarea" href="/">
                          <Image className="img" src={e5} alt="slider2" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <div className="newpostarea">
          <div className="container">
            <div className="subHeadline">
              <h3>Recent View</h3>
            </div>
            <div className="post-area">
              <div className="row">
                <div className="col-md-6">
                  <Link href="/" className="postcard">
                    <div className="info-area">
                      <h6>
                        <span>DIGITAL MARKETING</span>March 20, 2024
                      </h6>
                      <h4>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Pariatur, optio tenetur alias nesciunt sint dolor?
                      </h4>
                    </div>
                    <div className="pic-area">
                      <Image className="img" src={p1} alt="detail picture" />
                    </div>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link href="/" className="postcard">
                    <div className="info-area">
                      <h6>
                        <span>DIGITAL MARKETING</span>March 20, 2024
                      </h6>
                      <h4>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Pariatur, optio tenetur alias nesciunt sint dolor?
                      </h4>
                    </div>
                    <div className="pic-area">
                      <Image className="img" src={e4} alt="detail picture" />
                    </div>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link href="/" className="postcard">
                    <div className="info-area">
                      <h6>
                        <span>DIGITAL MARKETING</span>March 20, 2024
                      </h6>
                      <h4>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Pariatur, optio tenetur alias nesciunt sint dolor?
                      </h4>
                    </div>
                    <div className="pic-area">
                      <Image className="img" src={e3} alt="detail picture" />
                    </div>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link href="/" className="postcard">
                    <div className="info-area">
                      <h6>
                        <span>DIGITAL MARKETING</span>March 20, 2024
                      </h6>
                      <h4>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Pariatur, optio tenetur alias nesciunt sint dolor?
                      </h4>
                    </div>
                    <div className="pic-area">
                      <Image className="img" src={e1} alt="detail picture" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default blog;
