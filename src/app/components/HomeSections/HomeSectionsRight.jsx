import React from "react";
import CategoryPanel from "./CategoryPanel";
import styles from "./HomeSections.module.css";

const HomeSectionsRight = ({ categories, loading }) => (
  <div className={styles.sectionsRight}>
    <CategoryPanel allCategories={categories} loading={loading} />
  </div>
);

export default HomeSectionsRight; 