import React from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./HomeSections.module.css";

const CategoryPanel = ({ allCategories, loading }) => (
  <div className={styles.categoryPanel + ' ' + styles.categoryPanelWhiteBg}>
    <h3 className={styles.categoryHeading}>Categories</h3>
    {loading
      ? <Skeleton height={30} count={6} style={{ margin: "8px 0" }} />
      : Object.entries(allCategories).map(([section, cats]) => (
          <div key={section} className={styles.panelSection}>
            <div className={styles.panelSectionTitle + ' ' + styles[section + 'Bg']}>
              {section}
            </div>
            <div className={styles.panelCatList}>
              {cats.map((cat, idx) => (
                <Link
                  key={cat.id || idx}
                  href={`/category/${cat.slug}`}
                  className={styles.panelCat}
                >
                  <span className={styles.catIcon}>
                    {/* Example SVG icon, replace as needed */}
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="7" stroke="#888" strokeWidth="2" fill="none"/>
                    </svg>
                  </span>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
  </div>
);

export default CategoryPanel; 