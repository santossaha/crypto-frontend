"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./SkeletonCard.module.css";

const SkeletonCard = () => {
  return (
    <div className="col-md-12 col-lg-4">
      <div className={styles.cardBox}>
        {/* Image placeholder */}
        <motion.div
          className={styles.imageSkeleton}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <div className={styles.contentWrapper}>
          {/* Date and views section */}
          <div className={styles.metaInfo}>
            <motion.div 
              className={styles.skeletonText}
              style={{ width: "40%" }}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div 
              className={styles.skeletonText}
              style={{ width: "30%" }}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>

          {/* Title */}
          <motion.div 
            className={styles.skeletonText}
            style={{ height: "28px", width: "90%" }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />

          {/* Description */}
          <motion.div 
            className={styles.skeletonText}
            style={{ height: "16px", width: "100%", marginTop: "8px" }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div 
            className={styles.skeletonText}
            style={{ height: "16px", width: "80%", marginTop: "4px" }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />

          {/* Read More button */}
          <motion.div 
            className={styles.buttonSkeleton}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard; 