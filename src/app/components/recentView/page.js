"use client";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/app/Helper/Helper";
import { useEffect, useState } from "react";
import Head from "next/head";
import { formatImageUrl } from "../../Helper/imageUtils";

const RecentView = ({ showAsGrid = false }) => {
  const [recentViews, setRecentViews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentViews = async () => {
      try {
        const response = await axiosInstance("/recent-view");
        if (response.data.status === "success") {
          setRecentViews(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching recent views:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentViews();
  }, []);

  const metadata = recentViews.length
    ? {
        title: recentViews[0].meta_title || "Recent View",
        description: recentViews[0].meta_description,
        keywords: recentViews[0].meta_keyword,
        canonical: recentViews[0].canonical,
      }
    : {};

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-700">Loading recent views...</div>
    );
  }

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={metadata.canonical} />
      </Head>

      {/* Main Container */}
      <div className="w-full bg-white py-10 rounded-xl">
        <div className="max-w-6xl mx-auto px-4">

          {/* Page Title */}
          <h3 className="text-lg md:text-xl  font-semibold text-gray-800 mb-6">
            Recent View
          </h3>

          {/* Grid Cards */}
          <div className={showAsGrid ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "grid grid-cols-1 md:grid-cols-1 gap-6"}>
            {(showAsGrid ? recentViews.slice(0, 4) : recentViews)?.map((view) => (
              <Link
                href={`/blog/${view.slug}`}
                key={view.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="rounded-lg overflow-hidden h-44">
                  <Image
                    src={formatImageUrl(view.image)}
                    alt={view.title || "recent view image"}
                    width={500}
                    height={300}
                    className="w-full h-full rounded-lg object-cover"
                  />
                  
                </div>
                {/* Info */}
                <div className="mb-4 p-2">                 

                  <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {view.title}
                  </h4>

                  <h6 className="text-sm text-gray-500 flex items-center gap-2">
                    {new Date().toLocaleDateString()}
                  </h6>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {view.short_description}
                  </p>
                </div>

                
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentView;
