"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import HeroSection from "../components/hero/HeroSection";

const Page = () => {
  // State for data fetching
  const [allIco, setAllIco] = useState([]);
  const [filteredIco, setFilteredIco] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    stages: {},
    ico_statuses: {},
    categories: {},
    networks: {},
  });

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedNetwork, setSelectedNetwork] = useState("All");
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch all ICO data with filters
  useEffect(() => {
    const fetchIcoList = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://admin.bitfynance.com/api/ico-list");
        const icoData = response.data.data.data || [];
        const filtersData = response.data.filters || {};
        
        setAllIco(icoData);
        setFilteredIco(icoData);
        setFilters(filtersData);
        setError(null);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch ICO data. Please try again later.");
        setAllIco([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIcoList();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = allIco;

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.stage?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.launchpad?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.project_category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter((item) => item.ico_status === selectedStatus);
    }

    // Stage filter
    if (selectedStage !== "All") {
      filtered = filtered.filter((item) => item.stage === selectedStage);
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.project_category === selectedCategory);
    }

    // Network filter
    if (selectedNetwork !== "All") {
      filtered = filtered.filter((item) => item.blockchain_network === selectedNetwork);
    }

    setFilteredIco(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedStatus, selectedStage, selectedCategory, selectedNetwork, allIco]);

  // Pagination logic
  const totalPages = Math.ceil(filteredIco.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentRows = filteredIco.slice(firstIndex, lastIndex);

  const goToPage = (pageNum) => {
    if (pageNum > 0 && pageNum <= totalPages) setCurrentPage(pageNum);
  };
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Function to calculate days between start and end date
  const calculateDays = (startDateStr, endDateStr) => {
    try {
      if (!startDateStr || !endDateStr) return 0;
      // Parse dates in DD-MM-YYYY format
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

  return (
    <>
      {/* HERO SECTION */}
      <HeroSection
        title="ICO / IDO"
        subtitle="Discover the best ICO/IDO listings, token sales, and early investment opportunities."
      >
        <ul className="flex items-center justify-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-violet-200 hover:text-white hover:underline font-semibold">
              Home
            </Link>
          </li>
          <li className="text-violet-200 font-semibold hover:text-violet-300">/</li>
          <li className="text-white font-bold">ICO / IDO</li>
        </ul>
      </HeroSection>

      {/* MAIN CONTENT */}
      <div className="py-12">
        <div className="container mx-auto px-4">

          {/* Heading */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-100">Upcoming ICO / IDO</h3>
            <p className="text-gray-300 mt-1">
              Explore high-potential projects and participate early in token launches.
            </p>
          </div>

          {/* FILTERS + TABLE */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">

            {/* FILTER SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
              {/* Search */}
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-white outline-none focus:border-purple-500 text-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Status Filter */}
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-white focus:border-purple-500 text-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                {Object.entries(filters.ico_statuses || {}).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>

              {/* Stage Filter */}
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-white focus:border-purple-500 text-sm"
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
              >
                <option value="All">All Stages</option>
                {Object.entries(filters.stages || {}).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-white focus:border-purple-500 text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {Object.entries(filters.categories || {}).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>

              {/* Network Filter */}
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-white focus:border-purple-500 text-sm"
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
              >
                <option value="All">All Networks</option>
                {Object.entries(filters.networks || {}).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>

              {/* Reset Filters */}
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStatus("All");
                  setSelectedStage("All");
                  setSelectedCategory("All");
                  setSelectedNetwork("All");
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition text-sm whitespace-nowrap"
              >
                Reset All
              </button>
            </div>

            {/* Results Info */}
            <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">{filteredIco.length}</span> results found
              </p>
            </div>

            {/* TABLE SECTION */}
            <div className="mt-8 overflow-x-auto">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              ) : currentRows.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No ICO/IDO found matching your filters.</p>
                </div>
              ) : (
                <>
                  <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="p-3 text-left font-semibold">Project</th>
                        <th className="p-3 text-center font-semibold">Stage</th>
                        <th className="p-3 text-center font-semibold">Status</th>
                        <th className="p-3 text-center font-semibold">Category</th>
                        <th className="p-3 text-center font-semibold">launchpad</th>
                        <th className="p-3 text-center font-semibold">Price</th>
                        <th className="p-3 text-center font-semibold">Goal</th>
                        <th className="p-3 text-center font-semibold">End In</th>
                        <th className="p-3 text-center font-semibold">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentRows.map((item, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50 transition">
                          {/* Project Name with Image */}
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 rounded-lg object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-gray-300 flex items-center justify-center text-gray-600">
                                  <span className="text-xs font-bold">{item.name.charAt(0)}</span>
                                </div>
                              )}
                              <p className="text-gray-800 font-medium">{item.name}</p>
                            </div>
                          </td>

                          {/* Stage */}
                          <td className="text-center">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">{item.stage}</span>
                          </td>

                          {/* Status */}
                          <td className="text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.ico_status?.toLowerCase() === 'ongoing' ? 'bg-green-100 text-green-800' :
                              item.ico_status?.toLowerCase() === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                              item.ico_status?.toLowerCase() === 'ended' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {item.ico_status}
                            </span>
                          </td>

                          {/* Category */}
                          <td className="text-center">
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">{item.project_category || "N/A"}</span>
                          </td>

                          {/* Network */}
                          <td className="text-center">
                            <span className="text-gray-700 text-xs">{item.launchpad || "N/A"}</span>
                          </td>

                          {/* Price */}
                          <td className="text-center">
                            <span className="text-gray-800 font-medium text-xs">{item.ico_price} {item.ico_price_currency}</span>
                          </td>

                          {/* Goal */}
                          <td className="text-center">
                            <span className="text-gray-800 font-medium text-xs">{item.fundraising_goal}</span>
                          </td>

                          {/* Duration Days */}
                          <td className="text-center">
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
                              {calculateDays(item.start_date, item.end_date)} days
                            </span>
                          </td>

                          {/* Action */}
                          <td className="text-center">
                            <Link href={`/ico/${item.slug}`}>
                              <button className="inline-block cursor-pointer bg-gradient-to-r from-purple-600 to-orange-500 text-white border-purple-600 p-2 rounded-lg hover:bg-purple-700 transition">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* PAGINATION */}
                  <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
                    <div className="text-sm text-gray-600">
                      Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span> | 
                      Showing <span className="font-semibold">{firstIndex + 1}-{Math.min(lastIndex, filteredIco.length)}</span> of <span className="font-semibold">{filteredIco.length}</span> results
                    </div>

                    <ul className="flex items-center gap-2">
                      <li>
                        <button
                          onClick={prevPage}
                          disabled={currentPage === 1}
                          className={`px-3 py-2 border rounded-lg font-semibold transition ${
                            currentPage === 1 
                              ? "text-gray-400 border-gray-300 cursor-not-allowed" 
                              : "text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          ← Previous
                        </button>
                      </li>

                      {/* Page numbers */}
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return pageNum;
                      }).map((pageNum) => (
                        <li key={pageNum}>
                          <button
                            onClick={() => goToPage(pageNum)}
                            className={`px-3 py-2 border rounded-lg font-semibold transition ${
                              currentPage === pageNum
                                ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white border-purple-600"
                                : "text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {pageNum}
                          </button>
                        </li>
                      ))}

                      <li>
                        <button
                          onClick={nextPage}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-2 border rounded-lg font-semibold transition ${
                            currentPage === totalPages
                              ? "text-gray-400 border-gray-300 cursor-not-allowed"
                              : "text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          Next →
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
