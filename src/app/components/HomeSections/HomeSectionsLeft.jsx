import React from "react";
import NewsSection from "./NewsSection";
import BlogSection from "./BlogSection";
import EventSection from "./EventSection";
import styles from "./HomeSections.module.css";

const HomeSectionsLeft = ({ news, blogs, events, loading, categories }) => (
  <div className={styles.sectionsLeft}>
    <NewsSection 
      news={news} 
      loading={loading} 
      categories={categories.news || []} 
    />
    <BlogSection 
      blogs={blogs} 
      loading={loading} 
      categories={categories.blog || []} 
    />
    <EventSection 
      events={events} 
      loading={loading} 
      categories={categories.event || []} 
    />
  </div>
);

export default HomeSectionsLeft; 