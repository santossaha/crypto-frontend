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
                         {/* Participate Link Row */}
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
                              Participate Link
                            </p>
                            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 sm:mb-0 sm:text-right">
                              
                              <Link
                                href={airdropDetail.participate_link || "#"}
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
                      </div>

                      {/* Right Column */}
                      <div className="space-y-2">
                          
                         

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

                        {/* web Row */}
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
                                href={airdropDetail.website_url || "#"}
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

                         {/* whitepaper Row */}
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
                                href={airdropDetail.whitepaper_url || "#"}
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
                      </div>
                    </div>
                  </div>
                </div>
                 {/* External Links Section */}
                <div className="mt-8">
                  

                  {/* Social Media Links */}
                  
                 {(airdropDetail.twitter_url ||
                    airdropDetail.telegram_url ||
                    airdropDetail.discord_url) && (

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Follow Us
                      </h4>

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
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1.01-.68 1.04-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59z" />
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
                              <path d="M107.7,8.07A105.15,105.15,0,0,0,62.03,0h-.07a105.59,105.59,0,0,0-45.64,8.15Z" />
                            </svg>
                          </a>
                        )}

                      </div>
                    </div>
                  )}


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
                       

                        <div
                          className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: airdropDetail.description,
                            }}
                          />
                        </div>
                      )}

                     {airdropDetail.how_to_participate && (
                      <div className="mt-8">
                       

                        <div
                          className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: airdropDetail.how_to_participate,
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
