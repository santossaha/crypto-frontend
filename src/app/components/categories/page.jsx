"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import e1 from "../../assets/images/e-1.jpg";
import e2 from "../../assets/images/e-2.jpg";
import e3 from "../../assets/images/e-3.jpg";
import e4 from "../../assets/images/e-4.jpg";
import e5 from "../../assets/images/e-5.jpg";

import axiosInstance from "@/app/Helper/Helper";

// Animation variants
const listVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// Image skeleton wrapper
const ImageWithSkeleton = ({ src, alt, width, height }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative" style={{ width, height }}>
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full" />}

      <motion.div
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.4 } },
        }}
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

  // Fetch categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance("/latest-news-category");
        if (res?.data?.status === "success") {
          setCategories(res.data.data || []);
        }
      } catch (error) {
        console.error("Category error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <aside className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      {/* Heading */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Categories</h3>

      {/* Categories List */}
      {loading ? (
        <ul className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <li key={i}>
              <Skeleton height={18} width="70%" />
            </li>
          ))}
        </ul>
      ) : (
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={listVariant}
          className="flex flex-wrap gap-3"
        >
          {categories.map((cat) => (
            <motion.li key={cat.id} variants={itemVariant}>
              <Link
                href={`/${cat.slug}`}
                className="
                px-4 py-2
                bg-gray-100 
                text-gray-700 
                rounded-full 
                text-sm
                hover:bg-violet-100 
                transition 
              ">
                {cat.name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {/* Popular Posts */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular Posts</h3>

        <motion.ul initial="hidden" animate="visible" variants={listVariant} className="space-y-4">
          {[e3, e4, e1, e2].map((img, idx) => (
            <motion.li key={idx} variants={itemVariant}>
              <Link
                href="/blog-details"
                className="flex items-center gap-3 group"
              >
                <ImageWithSkeleton src={img} alt="post" width={80} height={60} />

                <div>
                  <h5 className="text-gray-800 font-medium text-sm group-hover:text-blue-600">
                    Sample Popular Blog Title
                  </h5>
                  <p className="text-gray-500 text-xs">March 12, 2024</p>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Images Grid */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Images</h3>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={listVariant}
           className="flex flex-wrap gap-4"
        >
          {[e1, e2, e3, e4, e5].map((img, i) => (
            <motion.div key={i} variants={itemVariant}>
              <ImageWithSkeleton src={img} alt="gallery" width={100} height={80} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </aside>
  );
};

export default Categories;
