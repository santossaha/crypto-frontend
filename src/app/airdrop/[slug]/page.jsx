"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import HeroSection from "../../components/hero/HeroSection";
import AdSpace from "../../components/AdSpace";

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
            `https://admin.bitfynance.com/api/airdrop-detail/${slug}`,
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
          "https://admin.bitfynance.com/api/airdrop-list",
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
          const [y, m, d] = s.split("-").map(Number);
          return new Date(y, m - 1, d);
        }
        if (/^\d{2}-\d{2}-\d{4}$/.test(s)) {
          const [d, m, y] = s.split("-").map(Number);
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

  const daysRemaining = calculateDays(
    airdropDetail.start_date,
    airdropDetail.end_date,
  );

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

          {/* Main Content with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - 2/3 width */}
            <div className="lg:col-span-2">
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
                            {airdropDetail.date_range || "N/A"}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-full font-semibold text-[12px]
                          ${
                            (
                              airdropDetail.airdrop_status ||
                              airdropDetail.status
                            )?.toLowerCase() === "ongoing"
                              ? "bg-green-100 text-green-800"
                              : (
                                    airdropDetail.airdrop_status ||
                                    airdropDetail.status
                                  )?.toLowerCase() === "upcoming"
                                ? "bg-yellow-100 text-yellow-800"
                                : (
                                      airdropDetail.airdrop_status ||
                                      airdropDetail.status
                                    )?.toLowerCase() === "ended"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                          >
                            {airdropDetail.airdrop_status ||
                              airdropDetail.status ||
                              "Upcoming"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <hr className="my-8" />

                {/* Divider */}

                {/* Airdrop Details Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-purple-600 to-orange-300 px-4 sm:px-6 md:px-4 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <h2 className="text-xl sm:text-2xl mb-0 font-bold text-white">
                      Airdrop Details
                    </h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-white text-sm sm:text-base w-full sm:w-auto">
                      <span className="text-xs sm:text-sm font-medium">
                        {airdropDetail.date_range || "N/A"}
                      </span>
                      <span
                        className={`px-3 sm:px-4 py-1 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap ${
                          (
                            airdropDetail.airdrop_status || airdropDetail.status
                          )?.toLowerCase() === "ongoing"
                            ? "bg-green-400 text-gray-900"
                            : (
                                  airdropDetail.airdrop_status ||
                                  airdropDetail.status
                                )?.toLowerCase() === "upcoming"
                              ? "bg-yellow-400 text-gray-900"
                              : (
                                    airdropDetail.airdrop_status ||
                                    airdropDetail.status
                                  )?.toLowerCase() === "ended"
                                ? "bg-red-400 text-gray-900"
                                : "bg-gray-400 text-gray-900"
                        }`}
                      >
                        {airdropDetail.airdrop_status ||
                          airdropDetail.status ||
                          "Upcoming"}
                      </span>
                    </div>
                  </div>

                  {/* Table Content */}
                  <div className="p-4 sm:p-6 md:p-8 max-w-full overflow-x-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {/* Left Column */}
                      <div className="space-y-2">
                        {/* Platform Row */}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Platform
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 sm:mb-0 sm:text-right">
                              {airdropDetail.platform || "N/A"}
                            </p>
                          </div>

                        </div>

                        {/* Total Supply Row */}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Total Supply
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {airdropDetail.total_supply_formatted || "N/A"}
                            </p>
                          </div>
                        </div>
                        

                        {/* Total Airdrop Quantity Row */}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Total Airdrop Qty
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {airdropDetail.total_airdrop_qty || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Airdrop Value Row */}
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
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <path
                                d="M12.5 7V17M9 10H15C15.55 10 16 10.45 16 11V13C16 13.55 15.55 14 15 14H9C8.45 14 8 13.55 8 13V11C8 10.45 8.45 10 9 10Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Airdrop Value
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {airdropDetail.airdrop_value || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Supply Percentage Row */}
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
                                d="M13 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V9L13 2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13 2V9H20"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Supply Percentage
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {airdropDetail.supply_percentage_formatted || "N/A"}
                            </p>
                          </div>
                        </div>
                           {/* Winner Count Row */}
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
                                d="M12 2L15.09 8.26H22L17.46 12.74L19.54 19.26L12 14.77L4.46 19.26L6.54 12.74L2 8.26H8.91L12 2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Winner Count
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {airdropDetail.winner_count ||
                                airdropDetail.winners ||
                                "0"}
                            </p>
                          </div>
                        </div>

                        
                      </div>

                      {/* Right Column */}
                      <div className="space-y-2">
                          
                         {/* winner_announcement_date Row */}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                            <p className="text-gray-700 font-semibold mb-0">
                              Winner Announcement
                            </p>
                            <p className="text-gray-900 font-bold text-sm mb-1">
                              {airdropDetail.winner_announcement_date || "TBA"}
                            </p>
                          </div>
                        </div>

                        {/* Project Category Row */}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Project Category
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {airdropDetail.project_category ||
                                airdropDetail.category ||
                                "N/A"}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Blockchain Network
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {airdropDetail.blockchain_network ||
                                airdropDetail.network ||
                                "N/A"}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                            <p className="text-gray-700 font-semibold mb-0">
                              End Date
                            </p>
                            <p className="text-gray-900 font-bold text-sm mb-1">
                              {airdropDetail.end_date || "TBA"}
                            </p>
                          </div>
                        </div>

                        {/* Status Row */}
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
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <path
                                d="M12 6V12L16 14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 ">
                            <p className="text-gray-700 font-semibold mb-0">
                              Status
                            </p>
                            <p
                              className={`px-3 py-1  rounded-full font-semibold text-[12px] ${
                                (
                                  airdropDetail.airdrop_status ||
                                  airdropDetail.status
                                )?.toLowerCase() === "ongoing"
                                  ? "bg-green-100 text-green-800"
                                  : (
                                        airdropDetail.airdrop_status ||
                                        airdropDetail.status
                                      )?.toLowerCase() === "upcoming"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : (
                                          airdropDetail.airdrop_status ||
                                          airdropDetail.status
                                        )?.toLowerCase() === "ended"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {airdropDetail.airdrop_status ||
                                airdropDetail.status ||
                                "Upcoming"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                 {/* External Links Section */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Resources & Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Participate Link */}
                    {airdropDetail.participate_link && (
                      <a
                        href={airdropDetail.participate_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-200 rounded-lg hover:shadow-lg transition"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                            <path d="M10 5H8C6.89543 5 6 5.89543 6 7V16C6 17.1046 6.89543 18 8 18H16C17.1046 18 18 17.1046 18 16V14M14 5H16C17.1046 5 18 5.89543 18 7V9M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-700 font-semibold text-sm">Participate</p>
                          <p className="text-gray-500 text-xs truncate">Join the airdrop</p>
                        </div>
                      </a>
                    )}

                    {/* Website URL */}
                    {airdropDetail.website_url && (
                      <a
                        href={airdropDetail.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:shadow-lg transition"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM13 7H11V13H13V7ZM13 15H11V17H13V15Z" fill="currentColor" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-700 font-semibold text-sm">Website</p>
                          <p className="text-gray-500 text-xs truncate">Official website</p>
                        </div>
                      </a>
                    )}

                    {/* Whitepaper URL */}
                    {airdropDetail.whitepaper_url && (
                      <a
                        href={airdropDetail.whitepaper_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-300 rounded-lg hover:shadow-lg transition"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                            <path d="M13 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-700 font-semibold text-sm">Whitepaper</p>
                          <p className="text-gray-500 text-xs truncate">Read whitepaper</p>
                        </div>
                      </a>
                    )}
                  </div>

                  {/* Social Media Links */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h4>
                    <div className="flex flex-wrap gap-3">
                      {/* Twitter */}
                      {airdropDetail.twitter_url && (
                        <a
                          href={airdropDetail.twitter_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition"
                          title="Twitter"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                          </svg>
                        </a>
                      )}

                      {/* Telegram */}
                      {airdropDetail.telegram_url && (
                        <a
                          href={airdropDetail.telegram_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition"
                          title="Telegram"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-sky-500">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1.01-.68 1.04-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.02-.14-.07-.2-.08-.06-.2-.04-.28-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1.01.53-1.47.52-.48-.01-1.4-.27-2.08-.49-.84-.27-1.5-.42-1.44-.88.03-.2.27-.4.72-.6 2.84-1.24 4.73-2.06 5.68-2.45 2.71-1.16 3.28-1.36 3.65-1.41.08-.01.27 0 .39.12.1.08.13.2.15.32z" />
                          </svg>
                        </a>
                      )}

                      {/* Discord */}
                      {airdropDetail.discord_url && (
                        <a
                          href={airdropDetail.discord_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition"
                          title="Discord"
                        >
                          <svg width="24" height="24" viewBox="0 0 127.14 96.36" fill="currentColor" className="text-indigo-600">
                            <path d="M107.7,8.07A105.15,105.15,0,0,0,62.03,0h-.07a105.59,105.59,0,0,0-45.64,8.15A107.9,107.9,0,0,0,1.94,78.16Q0,83.66,0,89.21v6.27a8.26,8.26,0,0,0,8.26,8.26h0l5.98-1.98a104.38,104.38,0,0,0,8.95,1.45,106.55,106.55,0,0,0,13.62-.54,130.86,130.86,0,0,0,12.19-1.63,8.17,8.17,0,0,0,6.27-8v-5.33a20.55,20.55,0,0,0-.45-4.45A19.52,19.52,0,0,0,32.6,52.2a19.64,19.64,0,0,0,13.74-2.6,8.27,8.27,0,0,0,3-2.81A20.57,20.57,0,0,0,54,36.18a19.52,19.52,0,0,0,.2-4.35V20.71a8.2,8.2,0,0,0-6.27-8,106.55,106.55,0,0,0-13.62.54A130.86,130.86,0,0,0,22.12,14.58,8.17,8.17,0,0,0,16.85,22.6v5.33a20.55,20.55,0,0,0,.45,4.45A19.52,19.52,0,0,0,39,54.8a19.64,19.64,0,0,0-13.74,2.6A8.27,8.27,0,0,0,22.24,60.21a20.57,20.57,0,0,0-1.63,7.84A19.52,19.52,0,0,0,20.81,72.4Z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Other Links Section */}
                  {airdropDetail.other && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Other Links</h4>
                      <div className="space-y-2">
                        {airdropDetail.other.participate_link && (
                          <a href={airdropDetail.other.participate_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold">
                            <span>🔗</span> Participate Link
                          </a>
                        )}
                        {airdropDetail.other.website_url && (
                          <a href={airdropDetail.other.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold">
                            <span>🌐</span> Website
                          </a>
                        )}
                        {airdropDetail.other.whitepaper_url && (
                          <a href={airdropDetail.other.whitepaper_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold">
                            <span>📄</span> Whitepaper
                          </a>
                        )}
                        {airdropDetail.other.twitter_url && (
                          <a href={airdropDetail.other.twitter_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sky-600 hover:text-sky-800 font-semibold">
                            <span>𝕏</span> Twitter
                          </a>
                        )}
                        {airdropDetail.other.telegram_url && (
                          <a href={airdropDetail.other.telegram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-semibold">
                            <span>✈️</span> Telegram
                          </a>
                        )}
                        {airdropDetail.other.discord_url && (
                          <a href={airdropDetail.other.discord_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold">
                            <span>💬</span> Discord
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* Short Description Section */}
                {airdropDetail.description && (
                      <div className="mt-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          About
                        </h3>

                        <div
                          className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: airdropDetail.description,
                          }}
                        />
                      </div>
                    )}
              </div>
            </div>

            {/* Right Sidebar - 1/3 width */}
            <div className="lg:col-span-1">
              {/* Action Button */}
              {airdropDetail.participate_link ? (
                <a
                  href={airdropDetail.participate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block mb-6"
                >
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-400 text-white font-bold rounded-lg hover:shadow-lg transition">
                    🎉 Participate Now
                  </button>
                </a>
              ) : null}
              <AdSpace />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AirdropDetailPage;
