"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../Helper/Helper";
import { formatImageUrl } from "../Helper/imageUtils";
import formatDate from "../Helper/helperUtils";

import Categories from "../components/categories/page";
import RecentView from "../components/recentView/page";
import HeroSection from "../components/hero/HeroSection";

// Animation Variants
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

// Skeleton UI
const SkeletonCard = () => (
  <motion.article className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="bg-gray-200 h-40 w-full animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
      <div
        className="h-3 bg-gray-200 rounded w-full animate-pulse"
        style={{ height: 36 }}
      />
    </div>
  </motion.article>
);

// CARD COMPONENT (UPDATED)
const AnimatedCard = ({ item, index }) => {
   // Date formatting (use reusable helper)
   let formattedDate = formatDate(item.created_at);
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer h-full hover:shadow-lg"
    >
      <Link href={`/blog/${item.slug}`} className="block">
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
            <span>{item.views ?? 0} views</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {item.title}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {(
              item.short_description ||
              item.description ||
              item.content
            )?.slice(0, 120)}
          </p>

          <span className="inline-block text-sm text-indigo-600 font-medium hover:text-indigo-700">
            Read More →
          </span>
        </div>
      </Link>
    </motion.article>
  );
};

// MAIN PAGE
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const loadBlogs = async (pageNo = 1) => {
    try {
      setLoading(true);
      const res = await axiosInstance(`/get-blogs?page=${pageNo}`);

      if (res.data.status === "success") {
        const list = res.data[0];
        setBlogs(list);

        // If we got blogs, assume there might be more pages
        // If we got empty results, we've reached the end
        if (list.length === 0 && pageNo > 1) {
          setCurrentPage(pageNo - 1); // Go back to previous page
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs(currentPage);
  }, [currentPage]);

  useEffect(() => {
    document.title = "Blog - Crypto Frontend";
  }, []);

  return (
    <div className="w-full">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HeroSection
          title="Welcome to our Blog"
          subtitle="Lorem Ipsum is simply dummy text"
        >
          <ul className="flex justify-center gap-2 text-gray-600 mt-3">
            <li>
              <Link
                href="/"
                className="text-violet-200 font-semibold hover:text-violet-300"
              >
                Home
              </Link>
            </li>
            <li className="text-violet-200">/</li>
            <li className="font-bold text-white">Blog</li>
          </ul>
        </HeroSection>
        {/* <BannerSection /> */}
      </motion.header>

      <div className="container mx-auto px-4 py-12 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE LIST */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">New Posts</h2>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.05 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                {blogs.map((item) => (
                  <AnimatedCard key={item.id} item={item} />
                ))}
              </motion.div>
            )}

            
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1">
            <Categories />
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 my-8">
        <RecentView showAsGrid={true} />
      </section>
    </div>
  );
};

export default Blog;
