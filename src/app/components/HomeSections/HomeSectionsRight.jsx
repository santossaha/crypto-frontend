"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CategoryPanel from "./CategoryPanel";
import { formatImageUrl } from "../../Helper/imageUtils";
import formatDate from "@/app/Helper/helperUtils";

const SmallPost = ({ item }) => {
  const date = item?.created_at || item?.date || item?.publishedAt;
  const formatted = formatDate(item.created_at);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "tween", duration: 0.5 }}
    >
      <Link href={`/blog/${item.slug}`} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md">
        <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
          {item.image ? (
            <Image src={formatImageUrl(item.image)} alt={item.title} width={48} height={48} style={{ objectFit: 'cover' }} />
          ) : null}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900">{item.title}</div>
          <div className="text-xs text-gray-500">{formatted}</div>
        </div>
      </Link>
    </motion.div>
  );
};

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: "easeOut",
    },
  },
};

const skeletonVariants = {
  loading: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const HomeSectionsRight = ({ categories = {}, loading, news = [], blogs = [], events = [] }) => {
  const latest = blogs && blogs.length ? blogs.slice(0,3) : [];
  
  // Flatten categories into a single array for the pills
  //const flattened = Object.values(categories || {}).flat() || [];
  const blogCategory =  categories.blog || [];
  const newsCategory =  categories.news || [];
  //const popularTags = flattened.slice(0,8).map(c => c.slug || c.name).filter(Boolean);

  return (
    <motion.aside 
      className="sticky top-24 space-y-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* Latest Posts */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
        <h4 className="text-lg font-semibold mb-3">Latest Post</h4>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_,i) => (
              <motion.div key={i} animate="loading" variants={skeletonVariants} className="flex items-center gap-3">
                <motion.div className="w-12 h-12 bg-gray-200 rounded-md" />
                <div className="flex-1 space-y-2">
                  <motion.div className="h-3 bg-gray-200 rounded w-3/4" />
                  <motion.div className="h-2 bg-gray-200 rounded w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div className="space-y-3">
            {latest.map((it, idx) => (
              <SmallPost key={it.id || idx} item={it} />
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Categories */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
        <h4 className="text-lg font-semibold mb-3">Categories</h4>
        {loading ? (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_,i) => (
              <motion.div key={i} animate="loading" variants={skeletonVariants} className="h-8 bg-gray-200 rounded-full px-3 w-20" />
            ))}
          </div>
        ) : (
          <motion.div className="flex flex-wrap gap-2">
            {blogCategory.slice(0,12).map((cat, i) => (
              <motion.div
                key={cat.id || i}
              >
                <Link href={`/category/${cat.slug}`} className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-700 inline-block">{cat.name}</Link>
              </motion.div> 
            ))}

            {newsCategory.slice(0,12).map((cat, i) => (
              <motion.div
                key={cat.id || i}
              >
                <Link href={`/category/${cat.slug}`} className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-700 inline-block">{cat.name}</Link>
              </motion.div> 
            ))}

          </motion.div>

          
        )}
      </motion.div>




      {/* Social Media */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
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

export default HomeSectionsRight;