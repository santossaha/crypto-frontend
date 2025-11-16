import React from "react";
import { useHomeData } from "./useHomeData";
import HomeSectionsLeft from "./HomeSectionsLeft";
import HomeSectionsRight from "./HomeSectionsRight";

const HomeSections = () => {
  const { news, blogs, events, loading, categories } = useHomeData();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <HomeSectionsLeft 
            news={news}
            blogs={blogs}
            events={events}
            loading={loading}
            categories={categories}
          />
        </div>

        <div className="lg:col-span-1">
          <HomeSectionsRight 
            categories={categories}
            loading={loading}
            news={news}
            blogs={blogs}
            events={events}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSections; 