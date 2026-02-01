"use client";

import React from "react";

const AdSpace = () => {
  return (
    <div className="space-y-3">
      {/* Ad 1 - Simple Card */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white shadow-md hover:shadow-lg transition">
        <h3 className="text-base font-bold mb-1">Premium Listing</h3>
        <p className="text-xs text-white/90 mb-3">Get featured & boost visibility</p>
        <button className="w-full bg-white text-purple-600 font-semibold py-2 rounded-md hover:bg-gray-100 transition text-xs">
          Learn More
        </button>
      </div>

      {/* Ad 2 - Simple Card */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-4 text-white shadow-md hover:shadow-lg transition">
        <h3 className="text-base font-bold mb-1">Verified Projects</h3>
        <p className="text-xs text-white/90 mb-3">KYC verified & secure trading</p>
        <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-md hover:bg-gray-100 transition text-xs">
          Explore
        </button>
      </div>

      {/* Ad 3 - Simple Card */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white shadow-md hover:shadow-lg transition">
        <h3 className="text-base font-bold mb-1">Community Rewards</h3>
        <p className="text-xs text-white/90 mb-3">Earn exclusive rewards & perks</p>
        <button className="w-full bg-white text-orange-600 font-semibold py-2 rounded-md hover:bg-gray-100 transition text-xs">
          Join Now
        </button>
      </div>

      {/* Banner Ad - Minimal */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 text-center">
        <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">Advertisement</p>
        <div className="h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md flex items-center justify-center">
          <span className="text-gray-600 text-xs font-medium">Your Ad Space</span>
        </div>
      </div>
    </div>
  );
};

export default AdSpace;
