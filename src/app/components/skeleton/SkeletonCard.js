"use client";
import React from "react";
import { motion } from "framer-motion";

const SkeletonCard = () => {
  return (
    <div className="col-md-12 col-lg-4">
      <div className="cardBox">
        <motion.div
          className="picArea skeleton"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="cardInfo">
          <motion.div
            className="skeleton-text"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            style={{ height: "20px", width: "60%", marginBottom: "10px" }}
          />
          <motion.div
            className="skeleton-text"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            style={{ height: "24px", width: "80%", marginBottom: "10px" }}
          />
          <motion.div
            className="skeleton-text"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            style={{ height: "16px", width: "90%", marginBottom: "10px" }}
          />
          <motion.div
            className="skeleton-text"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            style={{ height: "16px", width: "40%", marginBottom: "10px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard; 