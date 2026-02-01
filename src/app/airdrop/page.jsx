"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from "axios";
import HeroSection from "../components/hero/HeroSection";

const Airdrop = () => {
  // State for data fetching
  const [allAirdrop, setAllAirdrop] = useState([]);
  const [filteredAirdrop, setFilteredAirdrop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    airdrop_statuses: {},
    categories: {},
    networks: {},
  });

  // Filter and search state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedNetwork, setSelectedNetwork] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Router + toast
  const router = useRouter();
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success', duration = 3500) => {
    setToast({ message, type });
    try {
      setTimeout(() => setToast(null), duration);
    } catch (e) {
      setToast(null);
    }
  };

  // Add Airdrop modal + form state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const initialForm = {
    name: "",
    platform: "",
    image: "",
    total_supply: "",
    total_airdrop_qty: "",
    airdrop_value: "",
    supply_percentage: "",
    winner_count: "",
    project_category: "",
    blockchain_network: "",
    start_date: "",
    end_date: "",
    winner_announcement_date: "",
    description: "",
    how_to_participate: "",
    participate_link: "",
    website_url: "",
    whitepaper_url: "",
    twitter_url: "",
    telegram_url: "",
    discord_url: "",
    airdrop_status: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const openAdd = () => {
    setSubmitError(null);
    setSubmitSuccess(null);
    setIsAddOpen(true);
  };
  const closeAdd = () => {
    setIsAddOpen(false);
    setFormData(initialForm);
    setSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const handleFormChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      setFormData((p) => ({ ...p, [name]: files?.[0] || null }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const formDataPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        const val = formData[key];
        if (key === 'start_date' || key === 'end_date' || key === 'winner_announcement_date') {
          formDataPayload.append(key, toDDMMYYYY(val));
        } else if (val instanceof File) {
          formDataPayload.append(key, val);
        } else if (val !== null && val !== undefined && val !== '') {
          formDataPayload.append(key, val);
        }
      });

      // Debug: Log what's being sent
      console.log("📤 Sending form data:");
      for (let pair of formDataPayload.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

      try {
        if (!formDataPayload.get('status')) formDataPayload.append('status', 'Active');
      } catch (e) {
        console.warn('Could not append status fields to FormData', e);
      }

      const res = await axios.post("https://admin.bitfynance.com/api/create-airdrop", formDataPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('create response raw:', res);
      console.log('create response data:', res?.data);

      if (res.status === 201 || res.status === 200) {
        console.log("✓ Airdrop Created with status:", res.status);
        console.log("✓ Response data:", res?.data);
        
        setSubmitSuccess("✓ Airdrop created successfully!");
        setFormData(initialForm);
        
        const createdItem = res?.data?.data || null;
        
        if (createdItem && (createdItem.id || createdItem.slug)) {
          console.log("✓ Created Airdrop details received:", createdItem);
          
          const enrichedItem = {
            ...createdItem,
            id: createdItem.id || createdItem.slug,
            name: createdItem.name || formData.name,
            slug: createdItem.slug || formData.slug,
            status: createdItem.status || formData.status || 'Upcoming',
          };
          
          setAllAirdrop((prev) => {
            const exists = prev.some((p) => p.id === enrichedItem.id || p.slug === enrichedItem.slug);
            return exists ? prev : [enrichedItem, ...prev];
          });
          
          setFilteredAirdrop((prev) => {
            const exists = prev.some((p) => p.id === enrichedItem.id || p.slug === enrichedItem.slug);
            return exists ? prev : [enrichedItem, ...prev];
          });
          
          setCurrentPage(1);
        }
        
        const successMsg = res?.data?.message || '✓ Airdrop created successfully!';
        showToast(successMsg, 'success', 4000);
        
        setTimeout(() => {
          closeAdd();
          setSearchTerm("");
          setSelectedStatus("All");
          setSelectedCategory("All");
          setSelectedNetwork("All");
          setCurrentPage(1);
        }, 600);
        
        setTimeout(async () => {
          console.log("⟳ Refreshing Airdrop list from server...");
          await fetchAirdropList();
          console.log("✓ List refreshed");
        }, 1000);
      }
    } catch (err) {
      console.error("❌ Create Airdrop Error:", err?.response?.data || err?.message);
      setSubmitting(false);
        
      const resp = err?.response?.data;
      let errorMsg = "Failed to create Airdrop.";
        
      try {
        if (err?.response?.status === 422 && resp?.errors && typeof resp.errors === 'object') {
          const msgs = [];
          Object.entries(resp.errors).forEach(([field, errors]) => {
            if (Array.isArray(errors)) {
              msgs.push(`${field}: ${errors.join(', ')}`);
            } else {
              msgs.push(`${field}: ${String(errors)}`);
            }
          });
          errorMsg = msgs.length > 0 ? msgs.join('\n') : JSON.stringify(resp);
        } else if (resp?.message && typeof resp.message === 'string') {
          errorMsg = resp.message;
        } else if (err?.response?.status >= 500) {
          errorMsg = `Server Error (${err.response.status}): ${resp?.error || 'Please try again later.'}`;
        } else if (err?.message && typeof err.message === 'string') {
          errorMsg = `Error: ${err.message}`;
        } else if (resp && Object.keys(resp).length > 0) {
          errorMsg = JSON.stringify(resp);
        }
      } catch (parseErr) {
        console.error("Error parsing error response:", parseErr);
        errorMsg = "Failed to create Airdrop. Check console for details.";
      }
        
      setSubmitError(errorMsg);
      showToast(errorMsg, 'error', 5000);
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch Airdrop list
  const fetchAirdropList = async () => {
    try {
      setLoading(true);
      console.log("📥 Fetching Airdrop list...");
      const cacheParam = new Date().getTime();
      const response = await axios.get(`https://admin.bitfynance.com/api/airdrop-list?_t=${cacheParam}`);
      
      const airdropData = response.data?.data?.data || response.data?.data || [];

      console.log("📊 Fetched Airdrop count:", airdropData.length);
      console.log("📋 Airdrop Data sample:", airdropData.slice(0, 2));
      
      setAllAirdrop(airdropData);
      setFilteredAirdrop(airdropData);
      setError(null);
      return airdropData;
    } catch (err) {
      console.error("❌ API Error:", err);
      setError("Failed to fetch Airdrop data. Please try again later.");
      setAllAirdrop([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch Airdrop filters
  const fetchAirdropFilters = async () => {
    try {
      console.log("📥 Fetching Airdrop filters...");
      const response = await axios.get("https://admin.bitfynance.com/api/get-airdrop-filters");
      const filtersData = response.data?.filters || response.data?.data || {};
      console.log("📋 Filters Data:", filtersData);
      setFilters(filtersData);
    } catch (err) {
      console.error("❌ Filters API Error:", err);
    }
  };

  useEffect(() => {
    fetchAirdropList();
    fetchAirdropFilters();
    document.title = "Airdrops - Crypto Frontend";
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = allAirdrop;

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter((item) => item.status === selectedStatus);
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Network filter
    if (selectedNetwork !== "All") {
      filtered = filtered.filter((item) => item.network === selectedNetwork);
    }

    setFilteredAirdrop(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedCategory, selectedNetwork, allAirdrop]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAirdrop.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentRows = filteredAirdrop.slice(firstIndex, lastIndex);

  const goToPage = (pageNum) => {
    if (pageNum > 0 && pageNum <= totalPages) setCurrentPage(pageNum);
  };
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Calculate days between start and end date
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

  // Normalize date strings to DD-MM-YYYY
  const toDDMMYYYY = (s) => {
    if (!s) return "";
    if (/^\d{2}-\d{2}-\d{4}$/.test(s)) return s;
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      const [y, m, d] = s.split('-');
      return `${d}-${m}-${y}`;
    }
    const parsed = Date.parse(s);
    if (!isNaN(parsed)) {
      const dt = new Date(parsed);
      const d = String(dt.getDate()).padStart(2, '0');
      const m = String(dt.getMonth() + 1).padStart(2, '0');
      const y = dt.getFullYear();
      return `${d}-${m}-${y}`;
    }
    return s;
  };


  return (
    <>
      {/* HERO SECTION */}
      <HeroSection
        title="Airdrop"
        subtitle="Discover the best crypto airdrops and earn free tokens from promising projects."
      >
        <ul className="flex items-center justify-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-violet-200 hover:text-white hover:underline font-semibold">
              Home
            </Link>
          </li>
          <li className="text-violet-200 font-semibold hover:text-violet-300">/</li>
          <li className="text-white font-bold">Airdrop</li>
        </ul>
      </HeroSection>

      {/* MAIN CONTENT */}

      {/* Add Airdrop Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-lg max-h-[500px] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Create New Airdrop</h3>
              <button onClick={closeAdd} className="text-gray-500 hover:text-gray-800">✕</button>
            </div>

            {submitError && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm whitespace-pre-wrap">
                {submitError}
              </div>
            )}
            {submitSuccess && (
              <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded text-green-700 font-semibold text-center">
                {submitSuccess}
              </div>
            )}

            <form onSubmit={handleCreate} className="grid grid-cols-1 gap-3 pr-2">
              {/* Row 1: Basic Info */}
              <div className="grid grid-cols-2 gap-3">
                <input name="name" value={formData.name} onChange={handleFormChange} placeholder="Airdrop Name" className="border px-3 py-2 rounded text-sm" required />
                <input name="platform" value={formData.platform} onChange={handleFormChange} placeholder="Platform" className="border px-3 py-2 rounded text-sm" />
              </div>

              {/* Row 2: Image Upload */}
              <div>
                <label className="text-sm text-gray-600 block mb-1">Airdrop Image (JPEG/PNG/GIF/SVG)</label>
                <input type="file" name="image" onChange={handleFormChange} accept="image/*" className="border px-3 py-2 rounded w-full text-sm" />
                {formData.image && <p className="text-xs text-green-600 mt-1">✓ {formData.image.name}</p>}
              </div>

              {/* Row 3: Supply Info */}
              <div className="grid grid-cols-2 gap-3">
                <input name="total_supply" value={formData.total_supply} onChange={handleFormChange} placeholder="Total Supply" className="border px-3 py-2 rounded text-sm" type="number" step="0.01" />
                <input name="total_airdrop_qty" value={formData.total_airdrop_qty} onChange={handleFormChange} placeholder="Total Airdrop Qty" className="border px-3 py-2 rounded text-sm" type="number" step="0.01" />
              </div>

              {/* Row 4: Value Info */}
              <div className="grid grid-cols-2 gap-3">
                <input name="airdrop_value" value={formData.airdrop_value} onChange={handleFormChange} placeholder="Airdrop Value" className="border px-3 py-2 rounded text-sm" type="number" step="0.01" />
                <input name="supply_percentage" value={formData.supply_percentage} onChange={handleFormChange} placeholder="Supply Percentage (%)" className="border px-3 py-2 rounded text-sm" type="number" step="0.01" />
              </div>

              {/* Row 5: Winners & Categories */}
              <div className="grid grid-cols-2 gap-3">
                <input name="winner_count" value={formData.winner_count} onChange={handleFormChange} placeholder="Winner Count" className="border px-3 py-2 rounded text-sm" type="number" />
                <select name="project_category" value={formData.project_category} onChange={handleFormChange} className="border px-3 py-2 rounded text-sm">
                  <option value="">Select Category</option>
                  {Object.entries(filters.categories || {}).map(([key, val]) => (
                    <option key={key} value={key}>{val}</option>
                  ))}
                </select>
              </div>

              {/* Row 6: Network & Status */}
              <div className="grid grid-cols-2 gap-3">
                <select name="blockchain_network" value={formData.blockchain_network} onChange={handleFormChange} className="border px-3 py-2 rounded text-sm">
                  <option value="">Select Network</option>
                  {Object.entries(filters.networks || {}).map(([key, val]) => (
                    <option key={key} value={key}>{val}</option>
                  ))}
                </select>
                <select name="airdrop_status" value={formData.airdrop_status} onChange={handleFormChange} className="border px-3 py-2 rounded text-sm" required>
                  <option value="">Select Status *</option>
                  {Object.entries(filters.airdrop_statuses || {}).map(([key, val]) => (
                    <option key={key} value={val}>{val}</option>
                  ))}
                </select>
              </div>

              {/* Row 7: Dates */}
              <div className="grid grid-cols-3 gap-3">
                <input type="date" name="start_date" value={formData.start_date} onChange={handleFormChange} placeholder="Start Date" className="border px-3 py-2 rounded text-sm" />
                <input type="date" name="end_date" value={formData.end_date} onChange={handleFormChange} placeholder="End Date" className="border px-3 py-2 rounded text-sm" />
                <input type="date" name="winner_announcement_date" value={formData.winner_announcement_date} onChange={handleFormChange} placeholder="Winner Announcement Date" className="border px-3 py-2 rounded text-sm" />
              </div>

              {/* Row 8: Description */}
              <textarea name="description" value={formData.description} onChange={handleFormChange} placeholder="Description" className="border px-3 py-2 rounded text-sm" rows={2} />

              {/* Row 9: How to Participate */}
              <textarea name="how_to_participate" value={formData.how_to_participate} onChange={handleFormChange} placeholder="How to Participate" className="border px-3 py-2 rounded text-sm" rows={2} />

              {/* Row 10: Links */}
              <div className="grid grid-cols-2 gap-3">
                <input name="participate_link" value={formData.participate_link} onChange={handleFormChange} placeholder="Participate Link" className="border px-3 py-2 rounded text-sm" type="url" />
                <input name="website_url" value={formData.website_url} onChange={handleFormChange} placeholder="Website URL" className="border px-3 py-2 rounded text-sm" type="url" />
              </div>

              {/* Row 11: More Links */}
              <div className="grid grid-cols-2 gap-3">
                <input name="whitepaper_url" value={formData.whitepaper_url} onChange={handleFormChange} placeholder="Whitepaper URL" className="border px-3 py-2 rounded text-sm" type="url" />
                <input name="twitter_url" value={formData.twitter_url} onChange={handleFormChange} placeholder="Twitter URL" className="border px-3 py-2 rounded text-sm" type="url" />
              </div>

              {/* Row 12: Social Links */}
              <div className="grid grid-cols-2 gap-3">
                <input name="telegram_url" value={formData.telegram_url} onChange={handleFormChange} placeholder="Telegram URL" className="border px-3 py-2 rounded text-sm" type="url" />
                <input name="discord_url" value={formData.discord_url} onChange={handleFormChange} placeholder="Discord URL" className="border px-3 py-2 rounded text-sm" type="url" />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t  bg-white">
                <button type="button" onClick={closeAdd} className="px-4 py-2 border rounded text-sm font-medium">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded text-sm font-medium hover:opacity-90">
                  {submitting ? 'Creating...' : 'Create Airdrop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="py-12">
        <div className="container mx-auto px-4">

          {/* Heading */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl shadow-lg border border-gray-200">
            <div>
              <h3 className="text-2xl font-bold text-zinc-950">Crypto Ongoing Airdrop</h3>
              <p className="text-gray-500 mt-1 mb-0">
                Participate in coin airdrops and earn free tokens from promising projects.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={openAdd}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                + Add Airdrop
              </button>
            </div>
          </div>

          {/* FILTERS + TABLE */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">

            {/* FILTER SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
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
                {Object.entries(filters.airdrop_statuses || {}).map(([key, value]) => (
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
                  setSelectedCategory("All");
                  setSelectedNetwork("All");
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition text-sm whitespace-nowrap"
              >
                Reset All
              </button>
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
                  <p className="text-gray-500 text-lg">No Airdrop found matching your filters.</p>
                </div>
              ) : (
                <>
                  <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                    <thead className="bg-gradient-to-r from-purple-600 to-orange-300 text-white">
                      <tr>
                        <th className="p-3 text-left font-semibold">Project</th>
                        <th className="p-3 text-center font-semibold">Platform</th>
                        <th className="p-3 text-center font-semibold">Status</th>
                        <th className="p-3 text-center font-semibold">Project Category</th>
                        <th className="p-3 text-center font-semibold">Blockchain Network</th>
                        <th className="p-3 text-center font-semibold">Airdrop Value</th>
                        <th className="p-3 text-center font-semibold">Total Supply</th>
                        <th className="p-3 text-center font-semibold">Winners</th>
                        <th className="p-3 text-center font-semibold">End In</th>
                        <th className="p-3 text-center font-semibold">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentRows.map((item, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50 transition">
                          {/* Project Name with Image */}
                          <td className="p-3">
                            <Link href={`/airdrop/${item.slug || item.id}`}>
                            <div className="flex items-center gap-3">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                                  <span className="text-xs font-bold">{item.name?.charAt(0) || 'A'}</span>
                                </div>
                              )}
                              <p className="text-gray-800 font-medium">{item.name}</p>
                            </div>
                            </Link>
                          </td>

                          {/* Platform */}
                          <td className="text-center">
                            <span className="text-gray-700 font-semibold text-xs">{item.platform || "N/A"}</span>
                          </td>

                          {/* Status */}
                          <td className="text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              (item.airdrop_status || item.status)?.toLowerCase() === 'ongoing' ? 'bg-green-100 text-green-800' :
                              (item.airdrop_status || item.status)?.toLowerCase() === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                              (item.airdrop_status || item.status)?.toLowerCase() === 'ended' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {item.airdrop_status || item.status || "Upcoming"}
                            </span>
                          </td>

                          {/* Category */}
                          <td className="text-center">
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">{item.project_category || item.category || "N/A"}</span>
                          </td>

                          {/* Network */}
                          <td className="text-center">
                            <span className="text-gray-700 text-xs">{item.blockchain_network || item.network || "N/A"}</span>
                          </td>

                         

                          {/* Amount */}
                          <td className="text-center">
                            <span className="text-gray-800 font-medium text-xs">${item.airdrop_value || item.total_airdrop_qty || "N/A"}</span>
                          </td>
                             {/* Total Supply */}
                          <td className="text-center">
                            <span className="text-gray-800 font-medium text-xs">${item.total_supply || item.total_supply || "N/A"}</span>
                          </td>

                           {/* Winners */}
                          <td className="text-center">
                            <span className="text-gray-800 font-medium text-xs">{item.winner_count || item.winners || "0"}</span>
                          </td>
                          {/* Duration Days */}
                          <td className="text-center">
                            <span className="max-w-[100px] truncate px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
                              {calculateDays(item.start_date, item.end_date)} days
                            </span>
                          </td>

                          {/* Action */}
                          <td className="text-center">
                            {item.participate_link ? (
                              <a href={item.participate_link} target="_blank" rel="noopener noreferrer" className="inline-block">
                                <button className="inline-block cursor-pointer bg-gradient-to-r from-purple-600 to-orange-300 text-white border-purple-600 p-2 rounded-lg hover:bg-purple-700 transition">
                                  <svg xmlns="http://www.w3.org/2000/svg"
                                      className="w-4 h-4"
                                      fill="none" viewBox="0 0 24 24"
                                      stroke="currentColor" strokeWidth="2">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </button>
                              </a>
                            ) : (
                              <Link href={`/airdrop/${item.slug || item.id}`}>
                                <button className="inline-block cursor-pointer bg-gradient-to-r from-purple-600 to-orange-300 text-white border-purple-600 p-2 rounded-lg hover:bg-purple-700 transition">
                                  <svg xmlns="http://www.w3.org/2000/svg"
                                      className="w-4 h-4"
                                      fill="none" viewBox="0 0 24 24"
                                      stroke="currentColor" strokeWidth="2">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </button>
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* PAGINATION */}
                  <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
                    <div className="text-sm text-gray-600">
                      Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span> | 
                      Showing <span className="font-semibold">{firstIndex + 1}-{Math.min(lastIndex, filteredAirdrop.length)}</span> of <span className="font-semibold">{filteredAirdrop.length}</span> results
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
                                ? "bg-gradient-to-r from-purple-600 to-orange-300 text-white border-purple-600"
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
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 max-w-sm w-full shadow-lg rounded-lg ${toast.type === 'success' ? 'bg-green-600 text-white' : toast.type === 'info' ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-white'}`}>
          <div className="p-3">
            <div className="text-sm font-medium">{toast.message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Airdrop;
