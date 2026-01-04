"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import axiosInstance from "@/app/Helper/Helper";
import { formatImageUrl } from "@/app/Helper/imageUtils";
import formatDate from "@/app/Helper/helperUtils";

// Parent container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

// Child item animation
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

// Skeleton fade animation
const skeletonVariants = {
  loading: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
  },
};

// Image loading with fade-in
const ImageWithSkeleton = ({ src, alt, width, height }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative" style={{ width, height }}>
      {!loaded && (
        <motion.div
          variants={skeletonVariants}
          animate="loading"
          className="absolute inset-0 bg-gray-200 rounded-md"
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-md object-cover"
          onLoadingComplete={() => setLoaded(true)}
        />
      </motion.div>
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestPosts, setLatestPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  // Load categories and latest posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryRes = await axiosInstance("/latest-news-category");
        if (categoryRes?.data?.status === "success") {
          setCategories(categoryRes.data.data || []);
        }
      } catch (error) {
        console.error("Category Fetch Error:", error);
      } finally {
        setLoading(false);
      }

      try {
        // Fetch latest posts
        const postsRes = await axiosInstance("/get-blogs?page=1");
        if (postsRes?.data?.status === "success") {
          const posts = postsRes.data[0] || [];
          // Take only first 4 posts
          setLatestPosts(posts.slice(0, 4));
        }
      } catch (error) {
        console.error("Latest Posts Fetch Error:", error);
      } finally {
        setPostsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-8"
    >
     


      {/* Popular Posts */}
      <motion.div variants={itemVariants} 
      whileHover={{ y: -4 }}
      transition={{ type: "tween", duration: 0.5 }} className=" bg-white rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Latest Post</h3>

        {postsLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex items-center gap-3">
                <motion.div
                  variants={skeletonVariants}
                  animate="loading"
                  className="w-20 h-15 bg-gray-200 rounded-md"
                />
                <div className="flex-1 space-y-2">
                  <motion.div
                    variants={skeletonVariants}
                    animate="loading"
                    className="h-4 bg-gray-200 rounded w-3/4"
                  />
                  <motion.div
                    variants={skeletonVariants}
                    animate="loading"
                    className="h-3 bg-gray-200 rounded w-1/2"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.ul variants={containerVariants} className="space-y-4">
            {latestPosts.map((post, idx) => (
              <motion.li key={post.id || idx} variants={itemVariants}>
                <Link href={`/blog/${post.slug}`} className="flex items-center gap-3 group">
                  
                  <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                            {post.image ? (
                              <Image
                                src={formatImageUrl(post.image)}
                                alt={post.title}
                                width={48}
                                height={48}
                                style={{ objectFit: "cover" }}
                              />
                            ) : null}
                          </div>
                  <div>
                    <h5 className="text-gray-800 font-medium text-sm group-hover:text-indigo-600 transition line-clamp-2">
                      {post.title}
                    </h5>
                    <p className="text-gray-500 text-xs">
                      {formatDate(post.created_at)}
                    </p>
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
      
      {/* Category List */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6">
         {/* Header */}
        <motion.h3 variants={itemVariants} className="text-xl font-semibold text-gray-800 mb-4">
          Categories
        </motion.h3>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                variants={skeletonVariants}
                animate="loading"
                className="h-4 bg-gray-200 rounded-md w-2/3"
              />
            ))}
          </div>
        ) : (
          <motion.ul variants={containerVariants} className="flex flex-wrap gap-3">
            {categories.map((cat, i) => (
              <motion.li key={i} variants={itemVariants}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-indigo-100 transition-all"
                >
                  {cat.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
      {/* Social Media */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition"
      >
        <h4 className="text-lg font-semibold mb-3">Social Media</h4>
        <div className="flex items-center gap-3">
          {[
            { href: "#", bg: "bg-blue-600", label: "f" },
            { href: "#", bg: "bg-pink-500", label: "ig" },
            { href: "#", bg: "bg-sky-500", label: "in" },
            { href: "#", bg: "bg-rose-500", label: "t" },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              className={`w-8 h-8 rounded-full ${social.bg} flex items-center justify-center text-white text-xs font-semibold`}
              whileHover={{ scale: 1.1, y: -4 }}
              transition={{ type: "tween", duration: 0.4 }}
            >
              {social.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.aside>

    
  );
};

export default Categories;
