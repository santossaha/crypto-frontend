import React from "react";
import styles from "./HomeSections.module.css";
import { useHomeData } from "./useHomeData";
import HomeSectionsLeft from "./HomeSectionsLeft";
import HomeSectionsRight from "./HomeSectionsRight";

const HomeSections = () => {
  const { news, blogs, events, loading, categories } = useHomeData();

  return (
    <div className={styles.homeSectionsWrapper}>
      <HomeSectionsLeft 
        news={news}
        blogs={blogs}
        events={events}
        loading={loading}
        categories={categories}
      />
      <HomeSectionsRight 
        categories={categories}
        loading={loading}
      />
    </div>
  );
};

export default HomeSections; 