"use client";

import { motion, AnimatePresence } from "framer-motion";
import useInfiniteScroll from "@/app/Hooks/useInfiniteScroll";
import AnimatedCard from "../AnimatedCard/page";
import SkeletonCard from "../skeleton/SkeletonCard";
import axiosInstance from "../../Helper/Helper";

const NewsCard = ({ initialBlogs }) => {
  const fetchMoreBlogs = async (page) => {
    try {
      const response = await axiosInstance(`/get-blogs?page=${page}`);
      if (response.data.status === "success") {
        const newBlogs = response.data[0];
        // Filter out any duplicate blogs by ID
        return newBlogs.filter(newBlog => 
          !initialBlogs.some(initialBlog => initialBlog.id === newBlog.id)
        );
      }
      return [];
    } catch (error) {
      console.error("Error fetching more blogs:", error);
      return [];
    }
  };

  const { data: blogs, loading, hasMore } = useInfiniteScroll(fetchMoreBlogs, initialBlogs || []);

  if (!blogs || blogs.length === 0) {
    return (
      <div className="newsCard">
        <div className="subHeadline">
          <h3>New Post</h3>
        </div>
        <div className="text-center mt-4">
          <p>No posts available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="newsCard">
      <div className="subHeadline">
        <h3>New Post</h3>
      </div>
      <motion.div 
        className="row"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <AnimatePresence>
          {blogs.map((blog, index) => (
            <AnimatedCard key={`${blog.id}-${index}`} item={blog} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
      
      {loading && (
        <div className="row">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}
      
      {!hasMore && !loading && (
        <div className="text-center mt-4">
          <p>No more posts to load</p>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
