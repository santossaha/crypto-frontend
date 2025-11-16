"use client";
import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-white/80 animate-spin" style={{ borderColor: 'rgba(255,255,255,0.85)', borderTopColor: 'transparent' }} />
        <div className="text-lg font-medium text-gray-700">{message}</div>
      </div>
    </div>
  );
};

export default Loader;
