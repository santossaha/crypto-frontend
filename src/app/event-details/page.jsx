import React from "react";
import Banner from "../components/banner/page";
import p1 from "../assets/images/man.jpg";
import "./style.css";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <>
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2>Event Details</h2>
          <ul>
            <li>
              <Link href="/" className="linkarea">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/Event" className="linkarea">
                Event
              </Link>
            </li>
            <li>/</li>
            <li>Event Details</li>
          </ul>
        </div>
      </div>
      <div className="detail-main">
        <div className="container">
          <div className="detail-info-main">
            <div className="headarea">
              <div className="area1">
                <h4>FINNOVEX SOUTHERN AFRICA 2024 Conference </h4>
                <h5>23-Jul-2024 to 24-Jul-2024</h5>
                <p>
                  <span className="me-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-map-pin"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>{" "}
                  Johannesburg South Africa
                </p>
              </div>
              <div className="area2">
                <Link href="/event-form" className="btn">
                  <span className="me-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-plus-circle"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                  </span>
                  Submit Crypto Event
                </Link>
              </div>
            </div>
            <div className="about-area">
              <h4>About Event</h4>
              <h5>Finnovex Southern Africa | Crypto Conference 2024</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita tenetur amet accusantium laborum aperiam iusto ex unde
                dolor necessitatibus excepturi non voluptatum magni, vitae
                numquam omnis libero eos, modi rerum pariatur ullam earum in
                odio esse. Minus nesciunt molestias laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis est itaque, cumque illum soluta omnis autem blanditiis
                dolores ducimus mollitia laboriosam laborum officiis fugiat
                nulla atque fuga? Vero quis aliquam porro dicta iste ratione
                repellendus, culpa, placeat ducimus obcaecati error
                exercitationem harum sunt quam nihil? Ab inventore sequi
                reprehenderit at!
              </p>
            </div>
            <form action="">
              <div className="formbox">
                <h4>Discussion</h4>
                <div className="userarea">
                  <div className="picArea">
                    <Image className="img" src={p1} alt="slider1" />
                  </div>
                  <div className="form-group">
                    <textarea
                      name=""
                      id=""
                      rows="4"
                      className="form-control"
                      placeholder="write your comment..."
                    ></textarea>
                    <Link href="/" className="btn">
                      Submit
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
