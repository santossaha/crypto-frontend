import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./HomeSections.module.css";
import axiosInstance from "../Helper/Helper";
import Link from "next/link";

function truncateWords(text, numWords) {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > numWords ? words.slice(0, numWords).join(" ") + "..." : text;
}

const Section = ({ title, items, loading, categories, color, animationClass, type }) => (
  <div className={`${styles.section} ${animationClass}`}>
    <div className={styles.sectionHeader}>
      <h2 style={{ color }}>{title}</h2>
     
    </div>
    <div className={styles.cardGrid}>
      {loading
        ? Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className={styles.card}><Skeleton height={120} /></div>
          ))
        : items.map((item, idx) => {
            // Determine detail page path
            let detailPath = "/";
            if (type === "news") detailPath = `/news/${item.id || item.slug}`;
            else if (type === "blog") detailPath = `/blog/${item.id || item.slug}`;
            else if (type === "event") detailPath = `/event/${item.id || item.slug}`;
            // Description field
            let desc = item.short_description || item.description || item.content;
            return (
              <Link href={detailPath} key={item.id || idx} className={styles.card} style={{ textDecoration: "none" }}>
                {item.image && (
                  <div style={{ width: "100%", height: 120, marginBottom: 10, borderRadius: 10, overflow: "hidden", background: "#f0f0f0" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                )}
                <h4>{item.title}</h4>
                <p>{truncateWords(desc, 10)}</p>
                <span className={styles.date}>{item.created_at || item.date || item.publishedAt}</span>
              </Link>
            );
          })}
    </div>
  </div>
);

const CategoryPanel = ({ allCategories, loading }) => (
  <div className={styles.categoryPanel}>
    <h3>Categories</h3>
    {loading
      ? <Skeleton height={30} count={6} style={{ margin: "8px 0" }} />
      : Object.entries(allCategories).map(([section, cats]) => (
          <div key={section} className={styles.panelSection}>
            <div className={styles.panelSectionTitle}>{section}</div>
            <div className={styles.panelCatList}>
              {cats.map((cat, idx) => (
                <Link
                  key={cat.id || idx}
                  href={`/category/${cat.slug}`}
                  className={styles.panelCat}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
  </div>
);

const HomeSections = () => {
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({ news: [], blog: [], event: [] });

  useEffect(() => {
    setLoading(true);
    axiosInstance("/get-latest-date")
      .then((res) => {
        const data = res.data;
        setNews(data.latest_news || []);
        setBlogs(data.latest_blog || []);
        setEvents(data.latest_event || []);
        setCategories({
          news: data.news_categories || [],
          blog: data.blog_categories || [],
          event: data.event_categories || [],
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.homeSectionsWrapper}>
      <div className={styles.sectionsLeft}>
        <Section
          title="Latest News"
          items={news}
          loading={loading}
          categories={categories.news || []}
          color="#0070f3"
          animationClass={styles.slideInLeft}
          type="news"
        />
        <Section
          title="Latest Blog"
          items={blogs}
          loading={loading}
          categories={categories.blog || []}
          color="#e91e63"
          animationClass={styles.slideInLeftDelay}
          type="blog"
        />
        <Section
          title="Latest Event"
          items={events}
          loading={loading}
          categories={categories.event || []}
          color="#00b894"
          animationClass={styles.slideInLeftDelay2}
          type="event"
        />
      </div>
      <div className={styles.sectionsRight}>
        <CategoryPanel allCategories={categories} loading={loading} />
      </div>
    </div>
  );
};

export default HomeSections; 