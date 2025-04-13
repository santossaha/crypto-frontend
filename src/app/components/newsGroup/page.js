"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Categories from "../categories/page";
import axiosInstance from "@/app/Helper/Helper";
import Eye from "../../assets/images/eye.svg";
import SkeletonCard from "../skeleton/SkeletonCard";
import { motion } from "framer-motion";

const NewsGroup = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await axiosInstance("/latest-news");
        
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

  const totalPages = Math.ceil(news.length / newsPerPage);
  const currentNews = news.slice(
    (currentPage - 1) * newsPerPage,
    currentPage * newsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

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
                {loading ? (
                  // Show skeleton loaders while loading....
                  Array.from({ length: newsPerPage }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                ) : (
                  // Show actual news cards when data is loaded....
                  currentNews.map((newsItem) => (
                    <div className="col-md-12 col-lg-4" key={newsItem.id}>
                      <motion.div
                        className="cardBox"
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                          transition: { duration: 0.3 }
                        }}
                        initial={{ scale: 1, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
                        transition={{ duration: 0.3 }}
                      >
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
                      </motion.div>
                    </div>
                  ))
                )}
              </div>
              {/* Pagination */}
              {!loading && (
                <nav aria-label="..." className="d-flex justify-content-end me-3 mb-5">
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>

                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
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
