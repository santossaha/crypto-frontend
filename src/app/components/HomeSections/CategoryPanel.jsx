import React from "react";
import Link from "next/link";

const CategoryPanel = ({ allCategories = {}, loading }) => {
  const sections = Object.entries(allCategories || {});

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded w-full animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {sections.map(([section, cats]) => (
            <div key={section}>
              <div className="text-sm font-medium text-gray-700 mb-2">{section}</div>
              <div className="flex flex-col gap-2">
                {(cats || []).map((cat, idx) => (
                  <Link
                    key={cat.id || idx}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-50"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-pink-500 text-white rounded-md text-xs font-bold">{(cat.name || "").slice(0,2).toUpperCase()}</span>
                    <span>{cat.name}</span>
                    <span className="ml-auto text-xs text-gray-400">{cat.count ? `${cat.count}` : ""}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPanel;