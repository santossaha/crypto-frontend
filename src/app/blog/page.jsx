"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import p1 from "../assets/images/p-1.jpg";
import p2 from "../assets/images/e-1.jpg";
import p3 from "../assets/images/e-2.jpg";
import Eye from "../assets/images/eye.svg";

import "react-loading-skeleton/dist/skeleton.css"
import "./style.css";
import Categories from "../components/categories/page";
import axiosInstance from "../Helper/Helper";
import RecentView from "../components/recentView/page";
import NewsCard from "../components/NewsCard/page";
import SkeletonCard from "../components/skeleton/SkeletonCard";
import HeroSection from "../components/hero/HeroSection";

const Blog = () => {
  const [initialBlogs, setInitialBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance("/get-blogs?page=1");
        if (response.data.status === "success") {
          setInitialBlogs(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialBlogs();
  }, []);

  return (
    <div>
      <HeroSection title="Welcome to our Blog" subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting">
       

           <ul className="flex items-center justify-center gap-2 text-white/80 text-sm">
          <li>
            <Link href="/" className="text-violet-200 font-semibold hover:text-violet-300">Home</Link>
          </li>
          <li className="text-violet-200">/</li>
          <li className="text-white font-bold">Blog</li>
        </ul>
      </HeroSection>
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
                      <Link className="btn" href="/blog-details">
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
              {isLoading ? (
                <div className="row">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : (
              <NewsCard initialBlogs={initialBlogs} />
              )}
            </div>
            <div className="col-md-6 col-lg-3">
              <Categories />
            </div>
          </div>
        </div>
      </section>
      <RecentView />
    </div>
  );
};

export default Blog;
