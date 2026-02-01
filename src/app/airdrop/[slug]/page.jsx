"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import HeroSection from "../../components/hero/HeroSection";

const AirdropDetailPage = () => {
  const params = useParams();
  const slug = params.slug;

  const [airdropDetail, setAirdropDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Airdrop details
  useEffect(() => {
    const fetchAirdropDetail = async () => {
      try {
        setLoading(true);
        // Try to fetch specific airdrop detail first
        try {
          const response = await axios.get(
            `https://admin.bitfynance.com/api/airdrop-detail/${slug}`
          );
          const detail = response.data?.data || response.data;
          
          if (detail && detail.id) {
            setAirdropDetail(detail);
            setError(null);
            return;
          }
        } catch (e) {
          console.log("Specific endpoint failed, trying list endpoint...");
        }

        // Fallback: Fetch all airdrop data and find the matching slug
        const response = await axios.get(
          "https://admin.bitfynance.com/api/airdrop-list"
        );
        const allAirdrops = response.data.data.data || response.data.data || [];
        const detail = allAirdrops.find((item) => item.slug === slug);

        if (detail) {
          setAirdropDetail(detail);
          setError(null);
        } else {
          setError("Airdrop project not found.");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch Airdrop details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchAirdropDetail();
    }
  }, [slug]);

  const calculateDays = (startDateStr, endDateStr) => {
    try {
      if (!startDateStr || !endDateStr) return 0;
      
      const normalize = (s) => {
        if (!s) return null;
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
          const [y, m, d] = s.split('-').map(Number);
          return new Date(y, m - 1, d);
        }
        if (/^\d{2}-\d{2}-\d{4}$/.test(s)) {
          const [d, m, y] = s.split('-').map(Number);
          return new Date(y, m - 1, d);
        }
        const parsed = Date.parse(s);
        if (!isNaN(parsed)) return new Date(parsed);
        return null;
      };

      const startDate = normalize(startDateStr);
      const endDate = normalize(endDateStr);
      if (!startDate || !endDate) return 0;
      
      const timeDiff = endDate.getTime() - startDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
      return Math.max(0, daysDiff);
    } catch (e) {
      return 0;
    }
  };

  if (loading) {
    return (
      <>
        <HeroSection
          title="Airdrop Details"
          subtitle="Loading airdrop details..."
        >
          <ul className="flex items-center justify-center gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-violet-200 hover:text-white hover:underline font-semibold"
              >
                Home
              </Link>
            </li>
            <li className="text-violet-200 font-semibold">/</li>
            <li>
              <Link
                href="/airdrop"
                className="text-violet-200 hover:text-white hover:underline font-semibold"
              >
                Airdrop
              </Link>
            </li>
            <li className="text-violet-200 font-semibold">/</li>
            <li className="text-white font-bold">Details</li>
          </ul>
        </HeroSection>
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !airdropDetail) {
    return (
      <>
        <HeroSection title="Airdrop Details" subtitle="Project not found">
          <ul className="flex items-center justify-center gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-violet-200 hover:text-white hover:underline font-semibold"
              >
                Home
              </Link>
            </li>
            <li className="text-violet-200 font-semibold">/</li>
            <li>
              <Link
                href="/airdrop"
                className="text-violet-200 hover:text-white hover:underline font-semibold"
              >
                Airdrop
              </Link>
            </li>
            <li className="text-violet-200 font-semibold">/</li>
            <li className="text-white font-bold">Details</li>
          </ul>
        </HeroSection>
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
              {error || "Project not found."}
            </div>
            <Link href="/airdrop">
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition">
                ← Back to Airdrop List
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const daysRemaining = calculateDays(airdropDetail.start_date, airdropDetail.end_date);

  return (
    <>
      {/* HERO SECTION */}
      <HeroSection title={airdropDetail.name}>
        <ul className="flex items-center justify-center gap-2 text-sm flex-wrap">
          <li>
            <Link
              href="/"
              className="text-violet-200 hover:text-white hover:underline font-semibold"
            >
              Home
            </Link>
          </li>
          <li className="text-violet-200 font-semibold">/</li>
          <li>
            <Link
              href="/airdrop"
              className="text-violet-200 hover:text-white hover:underline font-semibold"
            >
              Airdrop
            </Link>
          </li>
          <li className="text-violet-200 font-semibold">/</li>
          <li className="text-white font-bold">{airdropDetail.name}</li>
        </ul>
      </HeroSection>

      {/* MAIN CONTENT */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link href="/airdrop" className="inline-block mb-6">
            <button className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition">
              ← Back to Airdrop List
            </button>
          </Link>

          {/* Project Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Project Info */}
              <div className="md:col-span-4 flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                  {/* Image / Avatar */}
                  {airdropDetail.image ? (
                    <img
                      src={airdropDetail.image}
                      alt={airdropDetail.name}
                      className="w-[100px] h-[100px] rounded-full object-cover shadow-md"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-purple-600 to-orange-300 flex items-center justify-center text-white text-4xl font-bold">
                      {airdropDetail.name?.charAt(0)}
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                      {airdropDetail.name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                      <span className="font-bold text-gray-800">
                        {airdropDetail.symbol || "Token"}
                      </span>

                      <span className="text-gray-800">-</span>

                      <span className="font-bold text-gray-800">
                        {airdropDetail.type || "Token"}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full font-semibold text-[12px]
                          ${
                            airdropDetail.status?.toLowerCase() === "ongoing"
                              ? "bg-green-100 text-green-800"
                              : airdropDetail.status?.toLowerCase() === "upcoming"
                              ? "bg-yellow-100 text-yellow-800"
                              : airdropDetail.status?.toLowerCase() === "ended"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {airdropDetail.status || "Upcoming"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Divider */}
            <hr className="my-8" />

            {/* Airdrop Details Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-orange-300 px-4 py-2 flex justify-between items-center">
                <h2 className="text-2xl mb-0 font-bold text-white">Airdrop Details</h2>
                <div className="flex items-center gap-4 text-white">
                  <span className="text-sm font-medium">
                    {airdropDetail.start_date || "N/A"} to{" "}
                    {airdropDetail.end_date || "N/A"}
                  </span>
                  <span
                    className={`px-4 py-1 rounded-full font-bold text-sm ${
                      airdropDetail.status?.toLowerCase() === "ongoing"
                        ? "bg-green-400 text-gray-900"
                        : airdropDetail.status?.toLowerCase() === "upcoming"
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-gray-400 text-gray-900"
                    }`}
                  >
                    {airdropDetail.status || "Upcoming"}
                  </span>
                </div>
              </div>

              {/* Table Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-2">
                    {/* Symbol Row */}
                    <div className="flex items-center gap-4 border-b pb-1 border-gray-200">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-purple-600"
                        >
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M7 12H17M12 7V17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Symbol
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {airdropDetail.symbol || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Type Row */}
                    <div className="flex items-center gap-4 border-b border-gray-200 pb-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-purple-600"
                        >
                          <path
                            d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M12 7V17M7 12H17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Type
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {airdropDetail.type || "Token"}
                        </p>
                      </div>
                    </div>

                    {/* Winners Row */}
                    <div className="flex items-center gap-4 border-b border-gray-200 pb-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-purple-600"
                        >
                          <path
                            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M12 14C8.67 14 3 15.34 3 18.5V20H21V18.5C21 15.34 15.33 14 12 14Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Total Winners
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {airdropDetail.winners || "0"}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Row */}
                    <div className="flex items-center gap-4 border-b border-gray-200 pb-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-purple-600"
                        >
                          <path
                            d="M3 4C3 2.89543 3.89543 2 5 2H19C20.1046 2 21 2.89543 21 4V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V4Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 7H17M7 12H17M7 17H12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Token Quantity
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {airdropDetail.quantity || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Number of Tasks Row */}
                    <div className="flex items-center gap-4  pb-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-purple-600"
                        >
                          <path
                            d="M9 11L12 14L22 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20 12V19C20 20.1046 19.1046 21 18 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Number of Tasks
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {airdropDetail.tasks || "0"}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Right Column */}
                  <div className="space-y-2">
                    {/* Category Row */}
                    <div className="flex items-center gap-4 border-b border-gray-200 pb-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-purple-600"
                        >
                          <path
                            d="M3 7C3 5.89543 3.89543 5 5 5H10L12 2H19C20.1046 2 21 2.89543 21 4V7M3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Category
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {airdropDetail.category || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Blockchain Network Row */}
                    <div className="flex items-center gap-4 border-b border-gray-200 pb-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-purple-600"
                        >
                          <circle
                            cx="6"
                            cy="6"
                            r="2"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <circle
                            cx="18"
                            cy="6"
                            r="2"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <circle
                            cx="12"
                            cy="18"
                            r="2"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M8 6H10M14 6H16M11 8V16M13 8V16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Blockchain Network
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {airdropDetail.network || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Start Date Row */}
                    <div className="flex items-center gap-4 border-b border-gray-200 pb-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-purple-600"
                        >
                          <path
                            d="M3 9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Start Date
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {airdropDetail.start_date || "TBA"}
                        </p>
                      </div>
                    </div>

                    {/* End Date Row */}
                    <div className="flex items-center gap-4 border-b border-gray-200 pb-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-purple-600"
                        >
                          <path
                            d="M3 9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          End Date
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {airdropDetail.end_date || "TBA"}
                        </p>
                      </div>
                    </div>

                    {/* Duration Row */}
                    <div className="flex items-center gap-4 border-b border-gray-200 pb-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-purple-600"
                        >
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                          <path
                            d="M12 6V12L16 16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Duration
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {daysRemaining} days
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Short Description Section */}
            {airdropDetail.short_description && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">About</h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {airdropDetail.short_description}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default AirdropDetailPage;
