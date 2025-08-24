import React from "react";
import Section from "./Section";
import styles from "./HomeSections.module.css";

const NewsSection = ({ news, loading, categories }) => (
  <Section
    title="Latest News"
    items={news}
    loading={loading}
    categories={categories || []}
    color="#0070f3"
    animationClass={styles.slideInLeft}
    type="news"
  />
);

export default NewsSection; 