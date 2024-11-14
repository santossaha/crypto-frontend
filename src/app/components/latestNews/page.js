"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/Helper/Helper";

const fetchLatestNews = async () => {
  try {
    const response = await axiosInstance("/latest-news");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }
};

const LatestNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchLatestNews();
      setNews(data);
    };
    loadNews();
  }, []);

  return (
    <div className="col-md-6 col-lg-4">
      <div className="newpostarea">
        <div className="subHeadline">
          <h3>Latest News</h3>
        </div>
        <div className="post-area">
          {news.map((item) => (
            <Link
              href={`/news/${item.slug}`}
              key={item.id}
              className="postcard"
            >
              <div className="info-area">
                <h6>
                  <span>DIGITAL MARKETING</span>{" "}
                  {new Date(item.created_at).toLocaleDateString()}
                </h6>
                <h4>{item.title}</h4>
                <p>{item.short_description}</p>
              </div>
              <div className="pic-area">
                <Image
                  className="img"
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={120}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
