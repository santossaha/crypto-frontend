"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./SkeletonCard.module.css";

const SkeletonCard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0.5, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="col-md-12 col-lg-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className={styles.cardBox}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.3 }
        }}
        initial={{ scale: 1, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Image placeholder */}
        <motion.div
          className={styles.imageSkeleton}
          variants={itemVariants}
        />
        
        <div className={styles.contentWrapper}>
          {/* Date and views section */}
          <div className={styles.metaInfo}>
            <motion.div 
              className={styles.skeletonText}
              style={{ width: "40%" }}
              variants={itemVariants}
            />
            <motion.div 
              className={styles.skeletonText}
              style={{ width: "30%" }}
              variants={itemVariants}
            />
          </div>

          {/* Title */}
          <motion.div 
            className={styles.skeletonText}
            style={{ height: "28px", width: "90%" }}
            variants={itemVariants}
          />

          {/* Description */}
          <motion.div 
            className={styles.skeletonText}
            style={{ height: "16px", width: "100%", marginTop: "8px" }}
            variants={itemVariants}
          />
          <motion.div 
            className={styles.skeletonText}
            style={{ height: "16px", width: "80%", marginTop: "4px" }}
            variants={itemVariants}
          />

          {/* Read More button */}
          <motion.div 
            className={styles.buttonSkeleton}
            variants={itemVariants}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkeletonCard; 