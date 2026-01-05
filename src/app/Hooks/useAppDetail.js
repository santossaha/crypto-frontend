"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../Helper/Helper";

const useAppData = () => {
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance("/app-detail");

      if (res.data?.status === "success") {
        setAppData(res.data.data || res.data);
      }
    } catch (err) {
      console.error("App data fetch error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  return { appData, loading, error };
};

export default useAppData;
