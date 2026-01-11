"use client";

import { useEffect } from "react";

const ViewCounter = ({ id, type = "blog" }) => {
  useEffect(() => {
    if (!id) return;

    console.log(`Incrementing view for ${type} id:`, id);
    // direct fetch – no axiosInstance
    fetch(`https://admin.bitfynance.com/api/${type}/${id}/view`, {
      method: "POST",
      cache: "no-store",
    }).then(response => {
      console.log(`${type} view API status:`, response.status);
    }).catch((err) => {
      console.error(`${type} view API failed:`, err);
    });
  }, [id]);

  return null;
};

export default ViewCounter;
