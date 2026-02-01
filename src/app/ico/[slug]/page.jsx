"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import HeroSection from "../../components/hero/HeroSection";
import AdSpace from "../../components/AdSpace";

const IcoDetailPage = () => {
  const params = useParams();
  const slug = params.slug;

  const [icoDetail, setIcoDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ICO details by slug
  useEffect(() => {
    const fetchIcoDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://admin.bitfynance.com/api/ico-detail/${slug}`,
        );

        // API returns object in response.data.data (single item)
        const detail = response.data?.data || response.data;

        if (detail && (detail.id || detail.slug)) {
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
                            {icoDetail.date_range || "N/A"}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-full font-semibold text-[12px]
                          ${
                            icoDetail.ico_status?.toLowerCase() === "ongoing"
                              ? "bg-green-100 text-green-800"
                              : icoDetail.ico_status?.toLowerCase() ===
                                  "upcoming"
                                ? "bg-yellow-100 text-yellow-800"
                                : icoDetail.ico_status?.toLowerCase() ===
                                    "ended"
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

                {/* ICO Details Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-purple-600 to-orange-300 px-4 sm:px-6 md:px-4 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <h2 className="text-xl sm:text-2xl mb-0 font-bold text-white">
                      ICO Details
                    </h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-white text-sm sm:text-base w-full sm:w-auto">
                      <span className="text-xs sm:text-sm font-medium">
                        {icoDetail.date_range || "N/A"}
                      </span>
                      <span
                        className={`px-3 sm:px-4 py-1 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap ${
                          icoDetail.ico_status?.toLowerCase() === "ongoing"
                            ? "bg-green-400 text-gray-900"
                            : icoDetail.ico_status?.toLowerCase() === "upcoming"
                              ? "bg-yellow-400 text-gray-900"
                              : icoDetail.ico_status?.toLowerCase() === "ended"
                                ? "bg-red-400 text-gray-900"
                                : "bg-gray-400 text-gray-900"
                        }`}
                      >
                        {icoDetail.ico_status}
                      </span>
                    </div>
                  </div>

                  {/* Table Content */}
                  <div className="p-4 sm:p-6 md:p-8 max-w-full overflow-x-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Launchpad
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm text-left sm:text-right mb-1">
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Stage
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Total Supply Qty.
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {icoDetail.total_supply_qty_formatted ||
                                icoDetail.total_supply_qty ||
                                "N/A"}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Tokens for Sale
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {icoDetail.tokens_for_sale_formatted ||
                                icoDetail.tokens_for_sale ||
                                "N/A"}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              % of Supply
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {icoDetail.supply_percentage_formatted ||
                                icoDetail.supply_percentage ||
                                "N/A"}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              ICO Price
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {icoDetail.ico_price}{" "}
                              {icoDetail.ico_price_currency}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              1 USDT
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {icoDetail.one_usdt_value ||
                                icoDetail.conversion_rate ||
                                "TBA"}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Soft Cap
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {icoDetail.soft_cap || "TBA"}
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
                              {icoDetail.start_date || "TBA"}
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
                              {icoDetail.end_date || "TBA"}
                            </p>
                          </div>
                        </div>
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Category
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Hard Cap
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {icoDetail.hard_cap || "TBA"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-2">
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Personal Cap
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {icoDetail.personal_cap || "TBA"}
                            </p>
                          </div>
                        </div>
                        {/* By Now URL Row */}
                        {icoDetail.buy_link && (
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
                                Buy Link
                              </p>
                              <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 sm:mb-0 sm:text-right">
                                <Link
                                  href={icoDetail.buy_link || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-600 hover:underline ml-2"
                                >
                                  <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-purple-600"
                                  >
                                    <path
                                      d="M15.7285 3.88396C17.1629 2.44407 19.2609 2.41383 20.4224 3.57981C21.586 4.74798 21.5547 6.85922 20.1194 8.30009L17.6956 10.7333C17.4033 11.0268 17.4042 11.5017 17.6976 11.794C17.9911 12.0863 18.466 12.0854 18.7583 11.7919L21.1821 9.35869C23.0934 7.43998 23.3334 4.37665 21.4851 2.5212C19.6346 0.663551 16.5781 0.905664 14.6658 2.82536L9.81817 7.69182C7.90688 9.61053 7.66692 12.6739 9.51519 14.5293C9.80751 14.8228 10.2824 14.8237 10.5758 14.5314C10.8693 14.2391 10.8702 13.7642 10.5779 13.4707C9.41425 12.3026 9.44559 10.1913 10.8809 8.75042L15.7285 3.88396Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M14.4851 9.47074C14.1928 9.17728 13.7179 9.17636 13.4244 9.46868C13.131 9.76101 13.1301 10.2359 13.4224 10.5293C14.586 11.6975 14.5547 13.8087 13.1194 15.2496L8.27178 20.1161C6.83745 21.556 4.73937 21.5863 3.57791 20.4203C2.41424 19.2521 2.44559 17.1408 3.88089 15.6999L6.30473 13.2667C6.59706 12.9732 6.59614 12.4984 6.30268 12.206C6.00922 11.9137 5.53434 11.9146 5.24202 12.2081L2.81818 14.6413C0.906876 16.5601 0.666916 19.6234 2.51519 21.4789C4.36567 23.3365 7.42221 23.0944 9.33449 21.1747L14.1821 16.3082C16.0934 14.3895 16.3334 11.3262 14.4851 9.47074Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </Link>
                              </p>
                            </div>
                          </div>
                        )}

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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Fundraising Goal
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {icoDetail.fundraising_goal_formatted ||
                                icoDetail.fundraising_goal ||
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Blockchain Network
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
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
                              <circle
                                cx="12"
                                cy="12"
                                r="1.5"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Price Currency
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                              {icoDetail.ico_price_display || "TBA"}
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                            <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                              Personal Cap
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
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
                            <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                              <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                                Min Investment
                              </p>
                              <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
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
                            <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                              <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                                Max Investment
                              </p>
                              <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
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
                            <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                              <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                                Token Symbol
                              </p>
                              <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
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
                            <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                              <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                                Token Decimals
                              </p>
                              <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
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
                            <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                              <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                                Whitelist
                              </p>
                              <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
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
                            <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 gap-2">
                              <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                                KYC
                              </p>
                              <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 text-right">
                                {icoDetail.kyc_required
                                  ? "Required"
                                  : "Not Required"}
                              </p>
                            </div>
                          </div>
                        )}
                        {/* Website URL Row */}
                        {icoDetail.website_url && (
                          <div className="flex items-center gap-4 border-b pb-1 border-gray-200">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              {/* Web / Globe Icon */}
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-purple-600"
                              >
                                <path
                                  d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M2 12H22M12 2C15 6 15 18 12 22M12 2C9 6 9 18 12 22"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                              <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                                Website Link
                              </p>
                              <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 sm:mb-0 sm:text-right">
                                <Link
                                  href={icoDetail.website_url || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-600 hover:underline ml-2"
                                >
                                  <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-purple-600"
                                  >
                                    <path
                                      d="M15.7285 3.88396C17.1629 2.44407 19.2609 2.41383 20.4224 3.57981C21.586 4.74798 21.5547 6.85922 20.1194 8.30009L17.6956 10.7333C17.4033 11.0268 17.4042 11.5017 17.6976 11.794C17.9911 12.0863 18.466 12.0854 18.7583 11.7919L21.1821 9.35869C23.0934 7.43998 23.3334 4.37665 21.4851 2.5212C19.6346 0.663551 16.5781 0.905664 14.6658 2.82536L9.81817 7.69182C7.90688 9.61053 7.66692 12.6739 9.51519 14.5293C9.80751 14.8228 10.2824 14.8237 10.5758 14.5314C10.8693 14.2391 10.8702 13.7642 10.5779 13.4707C9.41425 12.3026 9.44559 10.1913 10.8809 8.75042L15.7285 3.88396Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M14.4851 9.47074C14.1928 9.17728 13.7179 9.17636 13.4244 9.46868C13.131 9.76101 13.1301 10.2359 13.4224 10.5293C14.586 11.6975 14.5547 13.8087 13.1194 15.2496L8.27178 20.1161C6.83745 21.556 4.73937 21.5863 3.57791 20.4203C2.41424 19.2521 2.44559 17.1408 3.88089 15.6999L6.30473 13.2667C6.59706 12.9732 6.59614 12.4984 6.30268 12.206C6.00922 11.9137 5.53434 11.9146 5.24202 12.2081L2.81818 14.6413C0.906876 16.5601 0.666916 19.6234 2.51519 21.4789C4.36567 23.3365 7.42221 23.0944 9.33449 21.1747L14.1821 16.3082C16.0934 14.3895 16.3334 11.3262 14.4851 9.47074Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </Link>
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Whitepaper URL Row */}
                        {icoDetail.whitepaper_url && (
                          <div className="flex items-center gap-4 border-b pb-1 border-gray-200">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              {/* Web / Globe Icon */}
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-purple-600"
                              >
                                <path
                                  d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M2 12H22M12 2C15 6 15 18 12 22M12 2C9 6 9 18 12 22"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                              <p className="text-gray-700 font-semibold mb-0 text-sm sm:text-base">
                                Whitepaper Link
                              </p>
                              <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 sm:mb-0 sm:text-right">
                                <Link
                                  href={icoDetail.whitepaper_url || "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-600 hover:underline ml-2"
                                >
                                  <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-purple-600"
                                  >
                                    <path
                                      d="M15.7285 3.88396C17.1629 2.44407 19.2609 2.41383 20.4224 3.57981C21.586 4.74798 21.5547 6.85922 20.1194 8.30009L17.6956 10.7333C17.4033 11.0268 17.4042 11.5017 17.6976 11.794C17.9911 12.0863 18.466 12.0854 18.7583 11.7919L21.1821 9.35869C23.0934 7.43998 23.3334 4.37665 21.4851 2.5212C19.6346 0.663551 16.5781 0.905664 14.6658 2.82536L9.81817 7.69182C7.90688 9.61053 7.66692 12.6739 9.51519 14.5293C9.80751 14.8228 10.2824 14.8237 10.5758 14.5314C10.8693 14.2391 10.8702 13.7642 10.5779 13.4707C9.41425 12.3026 9.44559 10.1913 10.8809 8.75042L15.7285 3.88396Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M14.4851 9.47074C14.1928 9.17728 13.7179 9.17636 13.4244 9.46868C13.131 9.76101 13.1301 10.2359 13.4224 10.5293C14.586 11.6975 14.5547 13.8087 13.1194 15.2496L8.27178 20.1161C6.83745 21.556 4.73937 21.5863 3.57791 20.4203C2.41424 19.2521 2.44559 17.1408 3.88089 15.6999L6.30473 13.2667C6.59706 12.9732 6.59614 12.4984 6.30268 12.206C6.00922 11.9137 5.53434 11.9146 5.24202 12.2081L2.81818 14.6413C0.906876 16.5601 0.666916 19.6234 2.51519 21.4789C4.36567 23.3365 7.42221 23.0944 9.33449 21.1747L14.1821 16.3082C16.0934 14.3895 16.3334 11.3262 14.4851 9.47074Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </Link>
                              </p>
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
                            <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
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
                            <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
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
                          <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2">
                            <p className="text-gray-700 font-semibold mb-0">
                              Price Currency
                            </p>
                            <p className="text-gray-900 font-bold text-sm mb-1">
                              {icoDetail.ico_price_currency || "TBA"}
                            </p>
                          </div>
                        </div>

                        {/* Contract Address Row */}
                        {icoDetail.contract_address && (
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
                                  d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between w-full items-start sm:items-center gap-2 break-all">
                              <p className="text-gray-700 font-semibold mb-0 text-sm">
                                Contract Address
                              </p>
                              <p className="text-gray-900 font-mono text-xs mb-1">
                                {icoDetail.contract_address}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resources & Links */}

                {(icoDetail.twitter_url ||
                  icoDetail.telegram_url ||
                  icoDetail.discord_url) && (
                  <div className="mt-8">
                    {/* Follow Us */}
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Follow Us
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {icoDetail.twitter_url && (
                          <a
                            href={icoDetail.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition"
                            title="Twitter"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="text-blue-600"
                            >
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                            </svg>
                          </a>
                        )}

                        {icoDetail.telegram_url && (
                          <a
                            href={icoDetail.telegram_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition"
                            title="Telegram"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="text-sky-500"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1.01-.68 1.04-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.02-.14-.07-.2-.08-.06-.2-.04-.28-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1.01.53-1.47.52-.48-.01-1.4-.27-2.08-.49-.84-.27-1.5-.42-1.44-.88.03-.2.27-.4.72-.6 2.84-1.24 4.73-2.06 5.68-2.45 2.71-1.16 3.28-1.36 3.65-1.41.08-.01.27 0 .39.12.10.08.13.2.15.32z" />
                            </svg>
                          </a>
                        )}

                        {icoDetail.discord_url && (
                          <a
                            href={icoDetail.discord_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition"
                            title="Discord"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 127.14 96.36"
                              fill="currentColor"
                              className="text-indigo-600"
                            >
                              <path d="M107.7,8.07A105.15,105.15,0,0,0,62.03,0h-.07a105.59,105.59,0,0,0-45.64,8.15A107.9,107.9,0,0,0,1.94,78.16Q0,83.66,0,89.21v6.27a8.26,8.26,0,0,0,8.26,8.26h0l5.98-1.98a104.38,104.38,0,0,0,8.95,1.45,106.55,106.55,0,0,0,13.62-.54,130.86,130.86,0,0,0,12.19-1.63,8.17,8.17,0,0,0,6.27-8v-5.33a20.55,20.55,0,0,0-.45-4.45A19.52,19.52,0,0,0,32.6,52.2a19.64,19.64,0,0,0,13.74-2.6,8.27,8.27,0,0,0,3-2.81A20.57,20.57,0,0,0,54,36.18a19.52,19.52,0,0,0,.2-4.35V20.71a8.2,8.2,0,0,0-6.27-8,106.55,106.55,0,0,0-13.62.54A130.86,130.86,0,0,0,22.12,14.58,8.17,8.17,0,0,0,16.85,22.6v5.33a20.55,20.55,0,0,0,.45,4.45A19.52,19.52,0,0,0,39,54.8a19.64,19.64,0,0,0-13.74,2.6A8.27,8.27,0,0,0,22.24,60.21a20.57,20.57,0,0,0-1.63,7.84A19.52,19.52,0,0,0,20.81,72.4Z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* About Section */}
                <div className="bg-white rounded-xl  overflow-hidden">
                  {/* Content */}
                  <div className="py-4">
                    {icoDetail.short_description && (
                      <div className="mt-8">
                        <div
                          className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: icoDetail.short_description,
                          }}
                        />
                      </div>
                    )}

                    {icoDetail.description && (
                      <div className="mt-8">
                        <div
                          className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: icoDetail.description,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Right Sidebar */}
            <div className="md:col-span-1">
              <AdSpace />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IcoDetailPage;
