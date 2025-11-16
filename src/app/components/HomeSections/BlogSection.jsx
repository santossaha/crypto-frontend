import React from "react";
import Section from "./Section";
import styles from "./HomeSections.module.css";

const BlogSection = ({ blogs, loading, categories }) => (
  <Section
    title="Latest Blog"
    items={blogs}
    loading={loading}
    categories={categories || []}
    color="#ffffff"
    animationClass={styles.slideInLeftDelay}
    type="blog"
  />
);

export default BlogSection; 