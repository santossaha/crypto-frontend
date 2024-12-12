// import "./style.css"
"use client";
import React, { useEffect, useState } from "react";
import Banner from "@/app/components/banner/page";
import Image from "next/image";
import Link from "next/link";
import Eye from "../assets/images/eye.svg";
import axiosInstance from "../Helper/Helper";

const CategoriesPage = ({ params }) => {
  const { categories: slug } = params;
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance("/service-details/news");
        if (response.data.status === "success") {
          setBlogs(response.data["0"]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2 style={{ textTransform: "capitalize" }}>Welcome to our {slug}</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
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
              <Link href="#" className="linkarea">
                Categories
              </Link>
            </li>
            <li>/</li>
            <li>Categories Details</li>
          </ul>
        </div>
      </div>
      <section className="newsGroup mt-50">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-9">
              <div className="newsCard">
                <div className="subHeadline">
                  <h3>New Post</h3>
                </div>
                <div className="row">
                  {blogs?.map((blog) => (
                    <div key={blog.id} className="col-md-6 col-lg-4">
                      <div className="cardBox">
                        <div className="picArea">
                          <Image
                            className="img"
                            src={blog.image}
                            alt={blog.title}
                            width={500}
                            height={300}
                          />
                        </div>
                        <div className="cardInfo">
                          <p>
                            March 20, 2024
                            <span>
                              <Image className="img" src={Eye} alt="eye" />
                              120 View
                            </span>
                          </p>
                          <h4>{blog.title}</h4>
                          <h5>{blog.short_description}</h5>
                          <p>
                            <Link className="btn" href={`/blog/${blog.slug}`}>
                              Read More
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesPage;
