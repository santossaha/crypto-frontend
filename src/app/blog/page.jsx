"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../Helper/Helper";
import Categories from "../components/categories/page";
import RecentView from "../components/recentView/page";
import Skeleton from "react-loading-skeleton";

import p1 from "../assets/images/p-1.jpg";
import p2 from "../assets/images/e-1.jpg";
import p3 from "../assets/images/e-2.jpg";
import Eye from "../assets/images/eye.svg";
import HeroSection from "../components/hero/HeroSection";
import BannerSection from "../components/✅ BannerSection";

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  hover: { scale: 1.02, y: -4, transition: { type: "spring", stiffness: 240 } },
};

// Image Skeleton Loader
const ImageWithSkeleton = ({ src, alt, width = 400, height = 240, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full" style={{ height }}>
      {!loaded && <Skeleton height={height} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          onLoadingComplete={() => setLoaded(true)}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

// Blog Card (Article)
const AnimatedCard = ({ item }) => {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className="w-full p-4 rounded-lg bg-white shadow-sm border border-gray-200"
    >
      <Link href={`/blog-details/${item.slug}`} className="flex gap-4">
        <div className="w-[180px] rounded-lg overflow-hidden">
          <ImageWithSkeleton src={item.image} width={180} height={120} alt={item.title} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <span>{new Date(item.created_at).toLocaleDateString()}</span>
            <span className="flex items-center gap-1">
              <Image src={Eye} width={14} height={14} alt="view" />
              {item.views ?? "—"}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-1">{item.title}</h3>
          <p className="text-gray-600 mt-1">{item.short_description?.slice(0, 150)}...</p>

          <div className="mt-2">
            <span className="text-purple-600 font-semibold">Read more</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

// Skeleton card
const SkeletonCard = () => (
  <div className="w-full p-4 rounded-lg bg-white shadow-sm border border-gray-200">
    <div className="flex gap-4">
      <div className="w-[180px]">
        <Skeleton height={120} />
      </div>
      <div className="flex-1">
        <Skeleton width="40%" height={18} />
        <Skeleton width="70%" height={22} className="mt-2" />
        <Skeleton count={2} height={16} className="mt-3" />
      </div>
    </div>
  </div>
);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadBlogs = async (pageNo = 1) => {
    try {
      pageNo === 1 ? setLoading(true) : setMoreLoading(true);

      const res = await axiosInstance(`/get-blogs?page=${pageNo}`);
      if (res.data.status === "success") {
        const list = res.data[0];

        setBlogs((prev) =>
          pageNo === 1 ? list : [...prev, ...list.filter((i) => !prev.some((p) => p.id === i.id))]
        );

        if (!list.length) setHasMore(false);
      }
    } finally {
      setLoading(false);
      setMoreLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs(1);
  }, []);

  return (
    <div className="w-full">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
      <HeroSection title="Welcome to our Blog" subtitle="Lorem Ipsum is simply dummy text">

        <ul className="flex justify-center gap-2 text-gray-600 mt-3">
          <li><Link href="/" className="text-violet-200 font-semibold hover:text-violet-300">Home</Link></li>
          <li className="text-violet-200">/</li>
          <li className="font-bold text-white">Blog</li>
        </ul>
      </HeroSection>
      
       <BannerSection/> 
      </motion.header>

      {/* GRID LAYOUT — LEFT CONTENT + RIGHT SIDEBAR */}
      <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 my-8">
        
        {/* LEFT SIDE */}
        <main>

          {/* BLOG LIST */}
          <h2 className="text-2xl font-bold text-white mb-3">New Posts</h2>

          {loading ? (
            [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {blogs.map((item) => (
                  <AnimatedCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* LOAD MORE */}
          <div className="text-center mt-6">
            {moreLoading ? (
              <button className="px-6 py-2 bg-purple-500 text-white rounded-lg cursor-not-allowed">
                Loading...
              </button>
            ) : hasMore ? (
              <button
                className="common-btn"
                onClick={() => {
                  setPage(page + 1);
                  loadBlogs(page + 1);
                }}
              >
                Load more
              </button>
            ) : (
              <p className="text-gray-600">No more posts</p>
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="sticky top-6 space-y-6">
          <Categories />
          <RecentView />
        </aside>
      </section>
    </div>
  );
};

export default Blog;
