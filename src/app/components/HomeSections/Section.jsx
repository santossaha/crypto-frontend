import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatImageUrl } from "../../Helper/imageUtils";

function truncateWords(text, numWords) {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > numWords ? words.slice(0, numWords).join(" ") + "..." : text;
}

const Section = ({ title, items, loading, categories, color, animationClass, type }) => {
  return (
    <section className={`mb-8`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold" style={{ color }}>{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <article key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="bg-gray-200 h-40 w-full" />
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-full" style={{height:36}} />
                </div>
              </article>
            ))
          : (items || []).map((item, idx) => {
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
                <article key={item.id || idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  {item.image ? (
                    <div className="w-full h-40 relative bg-gray-100">
                      <Image
                        src={formatImageUrl(item.image)}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-r from-gray-100 to-gray-200" />
                  )}

                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-2 flex items-center justify-between">
                      <span>{formattedDate}</span>
                      <span>120 views</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{truncateWords(item.short_description || item.description || item.content, 24)}</p>
                    <Link href={detailPath} className="inline-block text-sm text-indigo-600 font-medium">Read More →</Link>
                  </div>
                </article>
              );
            })}
      </div>
    </section>
  );
};

export default Section; 