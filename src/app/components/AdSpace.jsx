"use client";

import React from "react";

const AdSpace = () => {
  return (
    <div className="space-y-4">
      {/* Ad 1 - Text Based */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center hover:shadow-lg transition">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Premium Listing
          </h3>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            Get your project featured here. Boost visibility and reach thousands of investors.
          </p>
        </div>
        <button className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition text-base">
          Learn More
        </button>
      </div>

      {/* Ad 2 - Image Banner */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
        <div className="p-8 text-white text-center min-h-60 flex flex-col justify-center items-center">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3">Fast & Secure</h3>
          <p className="text-sm mb-6 leading-relaxed">
            Trade crypto with lightning speed on our secure platform
          </p>
          <button className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition text-sm">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdSpace;
