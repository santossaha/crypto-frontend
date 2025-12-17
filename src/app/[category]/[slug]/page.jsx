"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../Helper/Helper";
import { formatImageUrl } from "../../Helper/imageUtils";
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

const CategoriesPage = ({ params }) => {
  const { slug } = params;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadBlogs = async (pageNo = 1) => {
    try {
      pageNo === 1 ? setLoading(true) : setMoreLoading(true);

      const res = await axiosInstance(`/get-blogs?page=${pageNo}`);

      if (res.data.status === "success") {
        const allBlogs = res.data[0];
        // Filter blogs by category on client side
        const filteredBlogs = allBlogs.filter(blog =>
          blog.category?.toLowerCase() === slug.toLowerCase() ||
          blog.categories?.some(cat => cat.toLowerCase() === slug.toLowerCase())
        );

        setBlogs((prev) =>
          pageNo === 1
            ? filteredBlogs
            : [...prev, ...filteredBlogs.filter((i) => !prev.some((p) => p.id === i.id))]
        );

        if (!filteredBlogs.length) setHasMore(false);
      }
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
          title={`${slug}`}
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={`skeleton-${i}`} />
                ))
              : blogs.map((blog, index) => (
                  <AnimatedCard key={blog.id} item={blog} index={index} />
                ))}
          </AnimatePresence>
        </motion.div>

        {moreLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={`more-skeleton-${i}`} />
            ))}
          </motion.div>
        )}

        {!loading && hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => {
                setPage((prev) => prev + 1);
                loadBlogs(page + 1);
              }}
              className="bg-gradient-to-r from-purple-400 to-orange-400 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Load More Posts
            </button>
          </motion.div>
        )}

        {!loading && !hasMore && blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500">No more posts to load</p>
          </motion.div>
        )}

        {!loading && blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className=" mt-6"
          ><h2 className="text-2xl font-bold text-gray-100 capitalize">{slug}</h2>
            <p className="text-gray-300 mt-1">
              There are currently no blog posts in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
