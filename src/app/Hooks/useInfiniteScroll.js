"use client";
import { useState, useEffect, useCallback } from 'react';

const useInfiniteScroll = (fetchData, initialData = [], pageSize = 6) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [processedIds, setProcessedIds] = useState(new Set(initialData.map(item => item.id)));

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newData = await fetchData(page + 1);
      
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        // Filter out any duplicates based on IDs
        const uniqueNewData = newData.filter(item => !processedIds.has(item.id));
        
        if (uniqueNewData.length > 0) {
          setData(prev => [...prev, ...uniqueNewData]);
          setProcessedIds(prev => new Set([...prev, ...uniqueNewData.map(item => item.id)]));
        setPage(prev => prev + 1);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, fetchData, processedIds]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 10
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return { data, loading, hasMore, loadMore };
};

export default useInfiniteScroll; 