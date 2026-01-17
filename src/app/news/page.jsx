"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axiosInstance from "@/app/Helper/Helper";
import { formatImageUrl } from "../Helper/imageUtils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const loadNews = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance("/get-latest-data");
      const list = response.data.latest_news || [];
      setNews(list);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const increaseView = async (newsId) => {
    try {
      await axiosInstance.get(`/news/${newsId}/view`);
      setNews((prev) =>
        prev.map((item) =>
          item.id === newsId
            ? { ...item, views: (item.views ?? 0) + 1 }
            : item
        )
      );
    } catch (err) {
      console.error("View API failed", err);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleClick = async (item) => {
    await increaseView(item.id);
    setTimeout(() => router.push(`/news/${item.slug}`), 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest News</h1>
          <p className="text-lg text-gray-600">Stay updated with the latest cryptocurrency and blockchain news</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-gray-500 text-center col-span-full">Loading...</p>
          ) : news.length > 0 ? (
            news.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleClick(item)}>
                <div className="relative h-48">
                  <Image
                    src={formatImageUrl(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = "/p-1.jpg";
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-2">
                    <span>{item.views ?? 0} views</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.short_description }} />
                  <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Read More →
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">No news available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default page