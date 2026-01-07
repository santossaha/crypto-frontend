import Link from 'next/link'
import React from 'react'
import axiosInstance from "@/app/Helper/Helper";
import { formatImageUrl } from "../Helper/imageUtils";
import Image from "next/image";

export const metadata = {
  title: "News - Crypto Frontend",
  description: "Latest news and updates in cryptocurrency and blockchain.",
};

async function getNews() {
  try {
    const response = await axiosInstance("/get-latest-data");
    return response.data.latest_news || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

const page = async () => {
  const news = await getNews();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest News</h1>
          <p className="text-lg text-gray-600">Stay updated with the latest cryptocurrency and blockchain news</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.length > 0 ? (
            news.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.short_description }} />
                  <Link
                    href={`/news/${item.slug}`}
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Read More →
                  </Link>
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