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
    console.log("Fetching from API:", process.env.NEXT_PUBLIC_API_URL);
    axiosInstance("/get-latest-date")
      .then((res) => {
        console.log('working....');

        console.log("API  Response: ", res.data);
        const data = res.data;
        setNews(data.latest_news || []);
        setBlogs(data.latest_blog || []);
      //  setEvents(data.latest_event || []);
        setCategories({
          news: data.news_categories || [],
          blog: data.blog_categories || [],
         // event: data.event_categories || [],
        });
      })
      .catch((error) => {
        console.error("Failed to fetch home data:", error);
      })
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