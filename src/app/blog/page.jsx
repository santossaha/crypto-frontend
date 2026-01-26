"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import axiosInstance from "../Helper/Helper";

import Categories from "../components/categories/page";
import RecentView from "../components/recentView/page";
import HeroSection from "../components/hero/HeroSection";
import Card, { SkeletonCardLoading } from "../components/card/Card";

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
      console.log('Get blogs response:', res.data);

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
  const increaseView = async (blogId) => {
    try {
      await axiosInstance.get(`/blog/${blogId}/view`);
      setBlogs((prev) =>
        prev.map((blog) =>
          blog.id === blogId
            ? { ...blog, views: (blog.views ?? 0) + 1 }
            : blog
        )
      );
    } catch (err) {
      console.error("View API failed", err);
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
                  <SkeletonCardLoading key={i} index={i} />
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
                {blogs.map((item, index) => (
                  <Card 
                    key={item.id} 
                    item={item} 
                    index={index}
                    onView={increaseView} 
                  />
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
