"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Categories from "../categories/page";
import axiosInstance from "@/app/Helper/Helper";
import Eye from "../../assets/images/eye.svg";

const NewsGroup = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await axiosInstance.get("/latest-news");
        if (response.data.status === "success") {
          setNews(response.data.data);
        } else {
          console.error("Failed to fetch news:", response);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) return <p>Loading news...</p>;

  return (
    <section className="newsGroup">
      <div className="container">
        <div className="row">
          {/* Left section: Latest News */}
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
                {news.map((newsItem) => (
                  <div className="col-md-12 col-lg-4" key={newsItem.id}>
                    <div className="cardBox">
                      <div className="picArea">
                        <Image
                          className="img"
                          src={newsItem.image}
                          alt={newsItem.title}
                          width={300}
                          height={200}
                          objectFit="cover"
                        />
                      </div>
                      <div className="cardInfo">
                        <p>
                          {new Date(newsItem.created_at).toLocaleDateString()}
                          <span>
                            {" "}
                            <Image
                              className="img"
                              src={Eye}
                              alt="eye"
                              width={16}
                              height={16}
                            />{" "}
                            120 Views
                          </span>
                        </p>
                        <h4>{newsItem.title}</h4>
                        <h5>{newsItem.short_description}</h5>
                        <p>
                          <Link className="btn" href={`/blog/${newsItem.slug}`}>
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

          {/* Right section: Categories */}
          <div className="col-md-6 col-lg-3">
            <div className="category-group">
              <div className="subHeadline">
                <h3>Categories</h3>
              </div>
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsGroup;
