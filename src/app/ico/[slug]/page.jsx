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
        const response = await axios.get("https://admin.bitfynance.com/api/ico-list");
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
      const [startDay, startMonth, startYear] = startDateStr.split('-').map(Number);
      const [endDay, endMonth, endYear] = endDateStr.split('-').map(Number);

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
        <HeroSection title="ICO / IDO Details" subtitle="Loading project details...">
          <ul className="flex items-center justify-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-violet-200 hover:text-white hover:underline font-semibold">
                Home
              </Link>
            </li>
            <li className="text-violet-200 font-semibold">/</li>
            <li>
              <Link href="/ico" className="text-violet-200 hover:text-white hover:underline font-semibold">
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
              <Link href="/" className="text-violet-200 hover:text-white hover:underline font-semibold">
                Home
              </Link>
            </li>
            <li className="text-violet-200 font-semibold">/</li>
            <li>
              <Link href="/ico" className="text-violet-200 hover:text-white hover:underline font-semibold">
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
      <HeroSection title={icoDetail.name} subtitle={icoDetail.short_description}>
        <ul className="flex items-center justify-center gap-2 text-sm flex-wrap">
          <li>
            <Link href="/" className="text-violet-200 hover:text-white hover:underline font-semibold">
              Home
            </Link>
          </li>
          <li className="text-violet-200 font-semibold">/</li>
          <li>
            <Link href="/ico" className="text-violet-200 hover:text-white hover:underline font-semibold">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Project Image */}
              <div className="md:col-span-1">
                {icoDetail.image ? (
                  <img
                    src={icoDetail.image}
                    alt={icoDetail.name}
                    className="w-full h-auto rounded-xl object-cover shadow-md"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-64 rounded-xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center text-white text-4xl font-bold">
                    {icoDetail.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="md:col-span-2">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{icoDetail.name}</h1>
                <p className="text-gray-600 mb-6">{icoDetail.short_description}</p>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span
                    className={`px-4 py-2 rounded-full font-semibold text-sm ${
                      icoDetail.ico_status?.toLowerCase() === 'ongoing'
                        ? 'bg-green-100 text-green-800'
                        : icoDetail.ico_status?.toLowerCase() === 'upcoming'
                        ? 'bg-yellow-100 text-yellow-800'
                        : icoDetail.ico_status?.toLowerCase() === 'ended'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {icoDetail.ico_status}
                  </span>
                  <span className="px-4 py-2 rounded-full font-semibold text-sm bg-blue-100 text-blue-800">
                    {icoDetail.stage}
                  </span>
                  <span className="px-4 py-2 rounded-full font-semibold text-sm bg-purple-100 text-purple-800">
                    {icoDetail.project_category}
                  </span>
                  <span className="px-4 py-2 rounded-full font-semibold text-sm bg-indigo-100 text-indigo-800">
                    {icoDetail.blockchain_network}
                  </span>
                  <span className="px-4 py-2 rounded-full font-semibold text-sm bg-orange-100 text-orange-800">
                    {daysRemaining} Days
                  </span>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">ICO Price</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {icoDetail.ico_price} <span className="text-lg">{icoDetail.ico_price_currency}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Fundraising Goal</p>
                    <p className="text-2xl font-bold text-gray-800">${icoDetail.fundraising_goal}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-8" />

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold mb-2">Launchpad</p>
                <p className="text-gray-800 font-bold">{icoDetail.launchpad || "N/A"}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold mb-2">Start Date</p>
                <p className="text-gray-800 font-bold">{icoDetail.start_date || "N/A"}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold mb-2">End Date</p>
                <p className="text-gray-800 font-bold">{icoDetail.end_date || "N/A"}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold mb-2">Duration</p>
                <p className="text-gray-800 font-bold">{daysRemaining} Days</p>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Supply & Tokens */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Supply & Tokens</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Total Supply</span>
                  <span className="font-bold text-gray-800">{icoDetail.total_supply_qty || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Tokens for Sale</span>
                  <span className="font-bold text-gray-800">{icoDetail.tokens_for_sale || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Supply Percentage</span>
                  <span className="font-bold text-gray-800">{icoDetail.supply_percentage || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fundraising Goal</span>
                  <span className="font-bold text-gray-800">{icoDetail.fundraising_goal || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Caps & Dates */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Caps & Timeline</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Soft Cap</span>
                  <span className="font-bold text-gray-800">{icoDetail.soft_cap || "TBA"}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Hard Cap</span>
                  <span className="font-bold text-gray-800">{icoDetail.hard_cap || "TBA"}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-bold text-gray-800">{icoDetail.start_date || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">End Date</span>
                  <span className="font-bold text-gray-800">{icoDetail.end_date || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Project</h2>
            <p className="text-gray-700 leading-relaxed">{icoDetail.short_description}</p>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Category</h3>
              <p className="text-gray-600 text-lg">{icoDetail.project_category || "N/A"}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Blockchain Network</h3>
              <p className="text-gray-600 text-lg">{icoDetail.blockchain_network || "N/A"}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Price Currency</h3>
              <p className="text-gray-600 text-lg">{icoDetail.ico_price_currency || "N/A"}</p>
            </div>
          </div>

          {/* Back to List Button */}
          <div className="mt-12 text-center">
            <Link href="/ico">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition text-lg">
                ← Back to ICO List
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default IcoDetailPage;
