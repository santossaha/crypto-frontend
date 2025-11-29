import React from "react";
import NewsSection from "./NewsSection";
import BlogSection from "./BlogSection";
import EventSection from "./EventSection";

const HomeSectionsLeft = ({ news, blogs, events, loading, categories }) => (
  <div className="space-y-8">
    <BlogSection 
      blogs={blogs} 
      loading={loading} 
      categories={categories.blog || []} 
    />
    
    <NewsSection 
      news={news} 
      loading={loading} 
      categories={categories.news || []} 
    />
    
    {/* <EventSection 
      events={events} 
      loading={loading} 
      categories={categories.event || []} 
    /> */}
  </div>
);

export default HomeSectionsLeft; 