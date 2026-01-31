"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import HeroSection from "../../components/hero/HeroSection";

const IcoDetailPage = () => {
  const params = useParams();
  const slug = params.slug;

  const [icoDetail, setIcoDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ICO details
  useEffect(() => {
    const fetchIcoDetail = async () => {
      try {
        setLoading(true);
        // Fetch all ICO data and find the matching slug
        const response = await axios.get(
          "https://admin.bitfynance.com/api/ico-list",
        );
        const allIcos = response.data.data.data || [];
        const detail = allIcos.find((item) => item.slug === slug);

        if (detail) {
          setIcoDetail(detail);
          setError(null);
        } else {
          setError("ICO project not found.");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch ICO details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchIcoDetail();
    }
  }, [slug]);

  const calculateDays = (startDateStr, endDateStr) => {
    try {
      if (!startDateStr || !endDateStr) return 0;
      const [startDay, startMonth, startYear] = startDateStr
        .split("-")
        .map(Number);
      const [endDay, endMonth, endYear] = endDateStr.split("-").map(Number);

      const startDate = new Date(startYear, startMonth - 1, startDay);
      const endDate = new Date(endYear, endMonth - 1, endDay);

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
          title="ICO / IDO Details"
          subtitle="Loading project details..."
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
                href="/ico"
                className="text-violet-200 hover:text-white hover:underline font-semibold"
              >
                ICO / IDO
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

  if (error || !icoDetail) {
    return (
      <>
        <HeroSection title="ICO / IDO Details" subtitle="Project not found">
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
                href="/ico"
                className="text-violet-200 hover:text-white hover:underline font-semibold"
              >
                ICO / IDO
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
            <Link href="/ico">
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition">
                ← Back to ICO List
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const daysRemaining = calculateDays(icoDetail.start_date, icoDetail.end_date);

  return (
    <>
      {/* HERO SECTION */}
      <HeroSection title={icoDetail.name}>
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
              href="/ico"
              className="text-violet-200 hover:text-white hover:underline font-semibold"
            >
              ICO / IDO
            </Link>
          </li>
          <li className="text-violet-200 font-semibold">/</li>
          <li className="text-white font-bold">{icoDetail.name}</li>
        </ul>
      </HeroSection>

      {/* MAIN CONTENT */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link href="/ico" className="inline-block mb-6">
            <button className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition">
              ← Back to ICO List
            </button>
          </Link>

          {/* Project Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Project Info */}
              <div className="md:col-span-4 flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                  {/* Image / Avatar */}
                  {icoDetail.image ? (
                    <img
                      src={icoDetail.image}
                      alt={icoDetail.name}
                      className="w-[100px] h-[100px] rounded-full object-cover shadow-md"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-purple-600 to-orange-300 flex items-center justify-center text-white text-4xl font-bold">
                      {icoDetail.name?.charAt(0)}
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                      {icoDetail.name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                      <span className="font-bold text-gray-800">
                        {icoDetail.start_date || "N/A"}
                      </span>

                      <span className="text-gray-800">-</span>

                      <span className="font-bold text-gray-800">
                        {icoDetail.end_date || "N/A"}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full font-semibold text-[12px]
                          ${
                            icoDetail.ico_status?.toLowerCase() === "ongoing"
                              ? "bg-green-100 text-green-800"
                              : icoDetail.ico_status?.toLowerCase() === "upcoming"
                              ? "bg-yellow-100 text-yellow-800"
                              : icoDetail.ico_status?.toLowerCase() === "ended"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {icoDetail.ico_status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Divider */}
            <hr className="my-8" />

            {/* ICO Details Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-orange-300 px-4 py-2 flex justify-between items-center">
                <h2 className="text-2xl mb-0 font-bold text-white">ICO Details</h2>
                <div className="flex items-center gap-4 text-white">
                  <span className="text-sm font-medium">
                    {icoDetail.start_date || "N/A"} to{" "}
                    {icoDetail.end_date || "N/A"}
                  </span>
                  <span
                    className={`px-4 py-1 rounded-full font-bold text-sm ${
                      icoDetail.ico_status?.toLowerCase() === "ongoing"
                        ? "bg-green-400 text-gray-900"
                        : icoDetail.ico_status?.toLowerCase() === "upcoming"
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-gray-400 text-gray-900"
                    }`}
                  >
                    {icoDetail.ico_status}
                  </span>
                </div>
              </div>

              {/* Table Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-2">
                    {/* Launchpad Row */}
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
                          Launchpad
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.launchpad || "On Website"}
                        </p>
                      </div>
                    </div>

                    {/* Stage Row */}
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
                            d="M8 12H16M12 8V16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Stage
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.stage || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Total Supply Qty Row */}
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
                          Total Supply Qty.
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.total_supply_qty || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Tokens for Sale Row */}
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
                            d="M16 12H8M12 8V16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Tokens for Sale
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.tokens_for_sale || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* % of Supply Row */}
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
                          <text
                            x="12"
                            y="13"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fill="currentColor"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            %
                          </text>
                          <path
                            d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          % of Supply
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.supply_percentage || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* $AMFI ICO Price Row */}
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
                            d="M12 7V17M15 10H9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          ICO Price
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.ico_price} {icoDetail.ico_price_currency}
                        </p>
                      </div>
                    </div>

                    {/* 1 USDT Row */}
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
                          <text
                            x="12"
                            y="13"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fill="currentColor"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            $
                          </text>
                          <path
                            d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          1 USDT
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.conversion_rate || "TBA"}
                        </p>
                      </div>
                    </div>

                    {/* Soft Cap Row */}
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
                            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M8 12H16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Soft Cap
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.soft_cap || "TBA"}
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
                          {icoDetail.project_category || "N/A"}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hard Cap Row */}
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
                            d="M8 12H16M12 8V16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Hard Cap
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.hard_cap || "TBA"}
                        </p>
                      </div>
                    </div>

                    {/* Fundraising Goal Row */}
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
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Fundraising Goal
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.fundraising_goal || "N/A"}
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
                          {icoDetail.blockchain_network || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Price Currency Row */}
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
                            d="M3 9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V15C21 16.1046 20.1046 17 19 17H5C3.89543 17 3 16.1046 3 15V9Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Price Currency
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.ico_price_currency || "TBA"}
                        </p>
                      </div>
                    </div>

                   

                    {/* Personal Cap Row */}
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
                          Personal Cap
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.personal_cap || "TBA"}
                        </p>
                      </div>
                    </div>

                    {/* Min Investment Row */}
                    {icoDetail.min_investment && (
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
                              d="M8 12H16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="flex justify-between w-full items-center">
                          <p className="text-gray-700 font-semibold mb-0">
                            Min Investment
                          </p>
                          <p className="text-gray-900 font-bold text-sm mb-1">
                            {icoDetail.min_investment}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Max Investment Row */}
                    {icoDetail.max_investment && (
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
                              d="M8 12H16M12 8V16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="flex justify-between w-full items-center">
                          <p className="text-gray-700 font-semibold mb-0">
                            Max Investment
                          </p>
                          <p className="text-gray-900 font-bold text-sm mb-1">
                            {icoDetail.max_investment}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Token Symbol Row */}
                    {icoDetail.token_symbol && (
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
                            <text
                              x="12"
                              y="13"
                              dominantBaseline="middle"
                              textAnchor="middle"
                              fill="currentColor"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              $
                            </text>
                            <path
                              d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                        <div className="flex justify-between w-full items-center">
                          <p className="text-gray-700 font-semibold mb-0">
                            Token Symbol
                          </p>
                          <p className="text-gray-900 font-bold text-sm mb-1">
                            {icoDetail.token_symbol}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Token Decimals Row */}
                    {icoDetail.token_decimals && (
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
                              d="M6 9H18M6 15H18M9 3V21M15 3V21"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="flex justify-between w-full items-center">
                          <p className="text-gray-700 font-semibold mb-0">
                            Token Decimals
                          </p>
                          <p className="text-gray-900 font-bold text-sm mb-1">
                            {icoDetail.token_decimals}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Whitelist Required Row */}
                    {icoDetail.whitelist_required && (
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
                              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex justify-between w-full items-center">
                          <p className="text-gray-700 font-semibold mb-0">
                            Whitelist
                          </p>
                          <p className="text-gray-900 font-bold text-sm mb-1">
                            {icoDetail.whitelist_required
                              ? "Required"
                              : "Not Required"}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* KYC Required Row */}
                    {icoDetail.kyc_required && (
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
                              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex justify-between w-full items-center">
                          <p className="text-gray-700 font-semibold mb-0">
                            KYC
                          </p>
                          <p className="text-gray-900 font-bold text-sm mb-1">
                            {icoDetail.kyc_required
                              ? "Required"
                              : "Not Required"}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Website URL Row */}
                    {icoDetail.website_url && (
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
                              d="M10 13C10.4295 13.5741 11.0066 14.0291 11.6575 14.3249C12.3084 14.6208 13.0219 14.7496 13.7368 14.6995C14.4517 14.6495 15.1404 14.4218 15.7575 14.0347C16.3747 13.6476 16.8955 13.1158 17.2821 12.4856M13.5057 9.46629C13.0509 8.70998 12.3367 8.1737 11.4892 8.04791C10.6418 7.92213 9.7725 8.20801 9.1572 8.8233C8.5419 9.4386 8.2560 10.3079 8.3818 11.1553C8.5076 12.0027 9.0439 12.7169 9.8002 13.1717"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                        <div className="flex justify-between w-full items-center">
                          <p className="text-gray-700 font-semibold mb-0">
                            Website
                          </p>
                          <a
                            href={icoDetail.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 font-bold text-sm mb-1 hover:underline break-all inline-block"
                          >
                            {icoDetail.website_url}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Listing Date Row */}
                    {icoDetail.listing_date && (
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
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="17"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M16 2V6M8 2V6M3 10H21"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="flex justify-between w-full items-center">
                          <p className="text-gray-700 font-semibold mb-0">
                            Listing Date
                          </p>
                          <p className="text-gray-900 font-bold text-sm mb-1">
                            {icoDetail.listing_date}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Presale Date Row */}
                    {icoDetail.presale_date && (
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-purple-600"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="17"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M16 2V6M8 2V6M3 10H21"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="flex justify-between w-full items-center">
                          <p className="text-gray-700 font-semibold mb-0">
                            Presale Date
                          </p>
                          <p className="text-gray-900 font-bold text-sm mb-1">
                            {icoDetail.presale_date}
                          </p>
                        </div>
                      </div>
                    )}

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
                          <rect
                            x="4"
                            y="4"
                            width="7"
                            height="7"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <rect
                            x="13"
                            y="4"
                            width="7"
                            height="7"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <rect
                            x="4"
                            y="13"
                            width="7"
                            height="7"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <rect
                            x="13"
                            y="13"
                            width="7"
                            height="7"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Category
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.project_category || "N/A"}
                        </p>
                      </div>
                    </div>

                  

                    {/* Price Currency Row */}
                    <div className="flex items-center gap-4">
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
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M12 6V18M7 10H17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <p className="text-gray-700 font-semibold mb-0">
                          Price Currency
                        </p>
                        <p className="text-gray-900 font-bold text-sm mb-1">
                          {icoDetail.ico_price_currency || "TBA"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl  overflow-hidden">
              {/* Content */}
              <div className="py-4">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-800">{icoDetail?.name || ''}</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {icoDetail?.short_description || "No description available for this project."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IcoDetailPage;
