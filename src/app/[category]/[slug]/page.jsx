"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../Helper/Helper";
import { formatImageUrl } from "../../Helper/imageUtils";
import formatDate from "../../Helper/helperUtils";
import HeroSection from "../../components/hero/HeroSection";

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

        <div className="px-4 py-3.5">
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

const CategoriesPage = ({ params }) => {
  const { slug } = params;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  React.useEffect(() => {
    document.title = "Blog Post - Crypto Frontend";
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance(`/category-wise-details/${slug}`);

      if (res.data.status === "success") {
        // 👇 API me blogs "0" key ke andar aa rahe hain
        setBlogs(res.data[0] || []);
        setHasMore(false); // pagination backend me nahi hai
      }
    } catch (error) {
      console.error("Category fetch error:", error);
    } finally {
      setLoading(false);
      setMoreLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs(1);
  }, [slug]);

  return (
    <div className="w-full">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HeroSection
          title={slug}
          subtitle="Discover the best premium listings curated specially for you."
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
            <li>
              <Link href="/blog" className="text-violet-200">
                Blog
              </Link>
            </li>
            <li className="text-violet-200">/</li>
            <li className="font-bold text-white capitalize">{slug}</li>
          </ul>
        </HeroSection>
      </motion.header>

      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-100 capitalize mb-5">
          {slug}
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <AnimatedCard key={blog.id} item={blog} className="bg-white" />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center mt-6"
              >
                
                <p className="text-gray-300 mt-1">
                  There are currently no blog posts in this category.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoriesPage;
