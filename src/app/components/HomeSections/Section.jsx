"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatImageUrl } from "../../Helper/imageUtils";
import formatDate from "../../Helper/helperUtils";

function truncateWords(text, numWords) {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > numWords ? words.slice(0, numWords).join(" ") + "..." : text;
}

const Section = ({ title, items, loading, categories, color, animationClass, type }) => {
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

  return (
    <section className={`mb-8`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold" style={{ color }}>{title}</h2>
      </div>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <motion.article 
                key={idx} 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <motion.div 
                  animate="loading"
                  variants={skeletonVariants}
                  className="bg-gray-200 h-40 w-full"
                />
                <div className="p-4 space-y-3">
                  <motion.div 
                    animate="loading"
                    variants={skeletonVariants}
                    className="h-4 bg-gray-200 rounded w-3/4"
                  />
                  <motion.div 
                    animate="loading"
                    variants={skeletonVariants}
                    className="h-3 bg-gray-200 rounded w-1/2"
                  />
                  <motion.div 
                    animate="loading"
                    variants={skeletonVariants}
                    style={{height: 36}}
                    className="h-3 bg-gray-200 rounded w-full"
                  />
                </div>
              </motion.article>
            ))
          : (items || []).map((item, idx) => {
              // Determine detail page path
              
              let detailPath = "/";
              if (type === "news") detailPath = `/news/${item.slug}`;
              else if (type === "blog") detailPath = `/blog/${item.slug}`;
              else if (type === "event") detailPath = `/event/${item.slug}`;
              
              // Description field
              let desc = item.short_description || item.description || item.content;
              
              // Date formatting (use reusable helper)
              let formattedDate = formatDate(item.created_at);
              
              return (
                <motion.article 
                  key={item.id || idx} 
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer h-full hover:shadow-lg"
                >
                  {item.image ? (
                    <div className="w-full h-40 relative bg-gray-100 overflow-hidden">
                      <Image
                        src={formatImageUrl(item.image)}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-r from-gray-100 to-gray-200" />
                  )}

                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-2 flex items-center justify-between">
                      <span>{formattedDate}</span>
                      <span>120 views</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{truncateWords(item.short_description || item.description || item.content, 24)}</p>
                    <Link href={detailPath} className="inline-block text-sm text-indigo-600 font-medium hover:text-indigo-700">Read More →</Link>
                  </div>
                </motion.article>
              );
            })}
      </motion.div>
    </section>
  );
};

export default Section; 