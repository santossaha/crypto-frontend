import React from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryPanel from "./CategoryPanel";
import { formatImageUrl } from "../../Helper/imageUtils";

const SmallPost = ({ item }) => {
  const date = item?.created_at || item?.date || item?.publishedAt;
  const formatted = date ? new Date(date).toLocaleDateString() : "";
  return (
    <Link href={`/news/${item.id || item.slug}`} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md">
      <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        {item.image ? (
          <Image src={formatImageUrl(item.image)} alt={item.title} width={48} height={48} style={{ objectFit: 'cover' }} />
        ) : null}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{item.title}</div>
        <div className="text-xs text-gray-500">{formatted}</div>
      </div>
    </Link>
  );
};

const HomeSectionsRight = ({ categories = {}, loading, news = [], blogs = [], events = [] }) => {
  const latest = (news && news.length) ? news.slice(0,3) : (blogs && blogs.length ? blogs.slice(0,3) : events.slice(0,3));

  // Flatten categories into a single array for the pills
  const flattened = Object.values(categories || {}).flat() || [];
  const popularTags = flattened.slice(0,8).map(c => c.slug || c.name).filter(Boolean);

  return (
    <aside className="sticky top-24 space-y-6">
      {/* Latest Posts */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h4 className="text-lg font-semibold mb-3">Latest Post</h4>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_,i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse" />
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-2 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {latest.map((it, idx) => (
              <SmallPost key={it.id || idx} item={it} />
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h4 className="text-lg font-semibold mb-3">Categories</h4>
        {loading ? (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_,i) => (
              <div key={i} className="h-8 bg-gray-200 rounded-full px-3 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {flattened.slice(0,12).map((cat, i) => (
              <Link key={cat.id || i} href={`/category/${cat.slug}`} className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-700 hover:bg-indigo-50">{cat.name}</Link>
            ))}
          </div>
        )}
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h4 className="text-lg font-semibold mb-3">Popular Tags</h4>
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_,i) => (
              <div key={i} className="h-3 bg-gray-200 rounded w-full animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {popularTags.map((tag, i) => (
              <div key={i} className="text-sm text-gray-600">#{tag}</div>
            ))}
          </div>
        )}
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h4 className="text-lg font-semibold mb-3">Social Media</h4>
        <div className="flex items-center gap-3">
          <a href="#" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">f</a>
          <a href="#" className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white">ig</a>
          <a href="#" className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white">in</a>
          <a href="#" className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white">t</a>
        </div>
      </div>
    </aside>
  );
};

export default HomeSectionsRight;