"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import axiosInstance from "@/app/Helper/Helper";
import Card, { SkeletonCardLoading } from "../card/Card";

// Container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const RecentView = ({ showAsGrid = false }) => {
  const [recentViews, setRecentViews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentViews = async () => {
      try {
        const response = await axiosInstance("/recent-view");
        console.log("Recent View Response:", response.data);
        if (response.data.status === "success") {
          const views = response.data[0];
          console.log("Recent Views Data:", views);
          setRecentViews(views);
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

  const increaseView = async (viewId) => {
    try {
      await axiosInstance.get(`/blog/${viewId}/view`);
      setRecentViews((prev) =>
        prev.map((view) =>
          view.id === viewId
            ? { ...view, view_count: (view.view_count ?? 0) + 1 }
            : view
        )
      );
    } catch (err) {
      console.error("View API failed", err);
    }
  };

  const displayItems = showAsGrid ? recentViews.slice(0, 4) : recentViews;

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
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
            Recent View
          </h3>

          {/* Grid Cards */}
          {loading ? (
            <div className={showAsGrid ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "grid grid-cols-1 md:grid-cols-1 gap-6"}>
              {Array.from({ length: showAsGrid ? 4 : 6 }).map((_, i) => (
                <SkeletonCardLoading key={i} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.05 }}
              className={showAsGrid ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "grid grid-cols-1 md:grid-cols-1 gap-6"}
            >
              {displayItems.length > 0 ? (
                displayItems.map((view, index) => (
                  <Card
                    key={view.id}
                    item={view}
                    index={index}
                    onView={increaseView}
                  />
                ))
              ) : (
                <p className="text-gray-500">No recent views available</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentView;
