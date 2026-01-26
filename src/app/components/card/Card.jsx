"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { formatImageUrl } from "../../Helper/imageUtils";
import formatDate from "../../Helper/helperUtils";

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

// Skeleton Loading Card
export const SkeletonCardLoading = ({ index }) => (
  <motion.article
    custom={index}
    variants={cardVariants}
    className="bg-white rounded-xl shadow-sm overflow-hidden"
  >
    {/* Image Skeleton */}
    <div className="bg-gray-300 h-40 w-full animate-pulse" />
    
    <div className="p-4 space-y-3">
      {/* Date & View Count Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
      </div>

      {/* Title Skeleton (2 lines) */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
      </div>

      {/* Description Skeleton (2 lines) */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse" />
      </div>

      {/* Read More Button Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mt-2" />
    </div>
  </motion.article>
);

// Main Card Component
const Card = ({ item, index = 0, onView, isLoading = false }) => {
  const router = useRouter();

  if (isLoading) {
    return <SkeletonCardLoading index={index} />;
  }

  const handleClick = async () => {
    if (onView) {
      await onView(item.id);
    }
    setTimeout(() => router.push(`/blog/${item.slug}`), 500);
  };

  const formattedDate = formatDate(item.created_at);

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer h-full hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="w-full h-40 relative bg-gray-100 overflow-hidden">
        <Image
          src={formatImageUrl(item.image)}
          alt={item.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-2 flex items-center justify-between">
          <span>{formattedDate}</span>
          {item.view_count ? <span>{item.view_count} views</span> : null}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {(item.short_description || item.description || item.content)?.slice(
            0,
            120
          )}
        </p>

        <span className="inline-block text-sm text-indigo-600 font-medium hover:text-indigo-700">
          Read More →
        </span>
      </div>
    </motion.article>
  );
};

export default Card;