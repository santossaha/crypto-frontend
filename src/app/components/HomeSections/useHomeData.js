import { useState, useEffect } from "react";
import axiosInstance from "../../Helper/Helper";

export const useHomeData = () => {
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

  return {
    news,
    blogs,
    events,
    loading,
    categories,
  };
}; 