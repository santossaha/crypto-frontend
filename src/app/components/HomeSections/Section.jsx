import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./HomeSections.module.css";
import { formatImageUrl } from "../../Helper/imageUtils";

function truncateWords(text, numWords) {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > numWords ? words.slice(0, numWords).join(" ") + "..." : text;
}

const Section = ({ title, items, loading, categories, color, animationClass, type }) => {
  return (
    <div className={`${styles.section} ${animationClass}`}>
      <div className={styles.sectionHeader}>
        <h2 style={{ color }}>{title}</h2>
      </div>
      <div className={styles.cardGrid}>
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className={styles.skeletonCard}>
                <div className={styles.skeletonShimmer}></div>
              </div>
            ))
          : items.map((item, idx) => {
              // Determine detail page path
              let detailPath = "/";
              if (type === "news") detailPath = `/news/${item.id || item.slug}`;
              else if (type === "blog") detailPath = `/blog/${item.id || item.slug}`;
              else if (type === "event") detailPath = `/event/${item.id || item.slug}`;
              
              // Description field
              let desc = item.short_description || item.description || item.content;
              
              // Date formatting
              let date = item.created_at || item.date || item.publishedAt;
              let formattedDate = date ? new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "";
              
              return (
                <div key={item.id || idx} className={styles.card} style={{ textDecoration: "none" }}>
                  {item.image && (
                    <div style={{ width: "100%", height: 160, marginBottom: 0, borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: "hidden", background: "#f0f0f0" }}>
                      <Image
                        src={formatImageUrl(item.image)}
                        alt={item.title}
                        width={400}
                        height={160}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  )}
                  <div className={styles.cardInfo}>
                    <div className={styles.cardDateViews}>
                      <span>{formattedDate}</span>
                      <span>120 Views</span>
                    </div>
                    <div className={styles.cardTitle}>{item.title}</div>
                    <Link href={detailPath} className={styles.cardReadMore} style={{ textDecoration: "none" }}>
                      Read More &gt;
                    </Link>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Section; 