"use client";
import React from "react";
import { motion } from "framer-motion";
import Card, { SkeletonCardLoading } from "../card/Card";

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
              <SkeletonCardLoading key={idx} index={idx} />
            ))
          : (items || []).map((item, idx) => {
              // Create a modified item object with slug for navigation
              const modifiedItem = {
                ...item,
                slug: item.slug || `${type}/${item.id}`,
              };
              
              return (
                <Card 
                  key={item.id || idx} 
                  item={modifiedItem}
                  index={idx}
                />
              );
            })}
      </motion.div>
    </section>
  );
};

export default Section; 