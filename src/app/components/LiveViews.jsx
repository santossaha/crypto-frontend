"use client";
import { useState, useEffect } from "react";

const LiveViews = ({ initialViews }) => {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    setViews(v => v + 1);
  }, []);

  return <span>{views} views</span>;
};

export default LiveViews;
