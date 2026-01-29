"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
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

  // Filter and search state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
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

  // Fetch ICO list
  const fetchIcoList = async () => {
    try {
      setLoading(true);
      console.log("📥 Fetching ICO list...");
      const response = await axios.get(`https://admin.bitfynance.com/api/ico-list?_ts=${Date.now()}`);
      const icoData = response.data.data.data || [];
      const filtersData = response.data.filters || {};

      console.log("📊 Fetched ICO count:", icoData.length);
      
      setAllIco(icoData);
      setFilteredIco(icoData);
      setFilters(filtersData);
      setError(null);
      return icoData;
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch ICO data. Please try again later.");
      setAllIco([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIcoList();
  }, []);

  // Add ICO modal + form state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const initialForm = {
    name: "",
    slug: "",
    image: "",
    launchpad: "",
    stage: "ICO",
    total_supply_qty: "",
    tokens_for_sale: "",
    supply_percentage: "",
    ico_price: "",
    ico_price_currency: "",
    fundraising_goal: "",
    project_category: "",
    blockchain_network: "",
    soft_cap: "",
    hard_cap: "",
    start_date: "",
    end_date: "",
    ico_status: "Upcoming",
    short_description: "",
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
      // Build FormData for multipart upload
      const formDataPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        const val = formData[key];
        if (key === 'start_date' || key === 'end_date') {
          formDataPayload.append(key, toDDMMYYYY(val));
        } else if (val instanceof File) {
          formDataPayload.append(key, val);
        } else if (val !== null && val !== undefined && val !== '') {
          formDataPayload.append(key, val);
        }
      });

      // POST as multipart/form-data
      // Ensure server-visible status fields are included (force Active if desired)
      try {
        if (!formDataPayload.get('status')) formDataPayload.append('status', 'Active');
        if (!formDataPayload.get('ico_status')) formDataPayload.append('ico_status', formData.ico_status || 'Ongoing');
      } catch (e) {
        console.warn('Could not append status fields to FormData', e);
      }

      const res = await axios.post("https://admin.bitfynance.com/api/create-ico", formDataPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Log full response to help debug whether server returns created object
      console.log('create response raw:', res);
      console.log('create response data:', res?.data);

      if (res.status === 201 || res.status === 200) {
        console.log("✓ ICO Created with status:", res.status);
        setSubmitSuccess("✓ ICO created successfully!");
        setFormData(initialForm);
        // show toast with server message (or default)
        try {
          const serverMsg = res?.data?.message || 'ICO created successfully';
          showToast(serverMsg, 'success', 4000);
        } catch (e) {
          showToast('ICO created successfully', 'success', 4000);
        }
        // If server returned the created ICO object, add it to local list immediately
        try {
          const createdItem = res?.data?.data || res?.data;
          if (createdItem && (createdItem.id || createdItem.slug)) {
            // keep server-returned status or default to form value
            try {
              createdItem.ico_status = createdItem.ico_status || formData.ico_status || 'Upcoming';
            } catch (e) {
              // ignore
            }
            setAllIco((prev) => {
              const exists = prev.some((p) => p.id === createdItem.id || p.slug === createdItem.slug);
              if (exists) return prev;
              return [createdItem, ...prev];
            });
            setFilteredIco((prev) => {
              const exists = prev.some((p) => p.id === createdItem.id || p.slug === createdItem.slug);
              if (exists) return prev;
              return [createdItem, ...prev];
            });
            setCurrentPage(1);
            // Also attempt an immediate refetch (cache-busted) to ensure backend data is returned
            try {
              await fetchIcoList();
            } catch (e) {
              console.warn('Immediate refetch failed:', e);
            }

            // Show success toast; created item already inserted into list (no polling)
            try {
              showToast(res?.data?.message || 'ICO created and shown in list', 'success', 3500);
            } catch (e) {
              // ignore
            }
          }
        } catch (e) {
          console.warn('Could not insert created item locally:', e);
        }
        // If API didn't return the created object in response, build a local placeholder
        try {
          const maybeCreated = res?.data?.data || res?.data;
          if (!maybeCreated || !(maybeCreated.id || maybeCreated.slug)) {
            const sd = toDDMMYYYY(formData.start_date);
            const ed = toDDMMYYYY(formData.end_date);
            const localItem = {
              id: (res?.data?.id) || `tmp-${Date.now()}`,
              name: formData.name,
              slug: formData.slug || `tmp-${Date.now()}`,
              image: res?.data?.data?.image || null,
              launchpad: formData.launchpad || "N/A",
              stage: formData.stage || "ICO",
              total_supply_qty: formData.total_supply_qty || null,
              tokens_for_sale: formData.tokens_for_sale || null,
              supply_percentage: formData.supply_percentage || null,
              ico_price: formData.ico_price || null,
              ico_price_currency: formData.ico_price_currency || null,
              fundraising_goal: formData.fundraising_goal || null,
              project_category: formData.project_category || null,
              blockchain_network: formData.blockchain_network || null,
              soft_cap: formData.soft_cap || null,
              hard_cap: formData.hard_cap || null,
              start_date: sd || null,
              end_date: ed || null,
              date_range: sd && ed ? `${sd} to ${ed}` : null,
              ico_status: formData.ico_status || "Upcoming",
              short_description: formData.short_description || "",
            };

            setAllIco((prev) => {
              const exists = prev.some((p) => p.id === localItem.id || p.slug === localItem.slug);
              if (exists) return prev;
              return [localItem, ...prev];
            });
            setFilteredIco((prev) => {
              const exists = prev.some((p) => p.id === localItem.id || p.slug === localItem.slug);
              if (exists) return prev;
              return [localItem, ...prev];
            });
            setCurrentPage(1);

            // show toast for pending placeholder
            try {
              const msg = res?.data?.message || 'ICO submitted and pending review';
              showToast(msg, 'info', 4500);
            } catch (e) {
              showToast('ICO submitted and pending review', 'info', 4500);
            }
          }
        } catch (ex) {
          console.warn('Could not insert local placeholder item:', ex);
        }
        // Close modal, reset filters, and refresh list with delay for server processing
        setTimeout(() => {
          closeAdd();
          console.log("Modal closed, resetting filters...");
          // Reset filters to show all items
          setSearchTerm("");
          setSelectedStatus("All");
          setSelectedStage("All");
          setSelectedCategory("All");
          setSelectedNetwork("All");
          setCurrentPage(1);
        }, 500);
        
        // Fetch fresh list after server processes (2 sec delay)
        setTimeout(async () => {
          console.log("Fetching updated ICO list...");
          await fetchIcoList();
          console.log("List refreshed");
        }, 2000);
      }
    } catch (err) {
      console.error("Create ICO Error:", err?.response?.data || err?.message);
      console.log('Create error response raw:', err?.response);
        setSubmitting(false);
        
        const resp = err?.response?.data;
        let errorMsg = "Failed to create ICO.";
        
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
          errorMsg = "Failed to create ICO. Check console for details.";
        }
        
        setSubmitError(errorMsg);
    }
  };

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
      // Accept either DD-MM-YYYY or ISO YYYY-MM-DD; normalize to Date objects
      const normalize = (s) => {
        if (!s) return null;
        // ISO format: 2026-11-22
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
          const [y, m, d] = s.split('-').map(Number);
          return new Date(y, m - 1, d);
        }
        // DD-MM-YYYY
        if (/^\d{2}-\d{2}-\d{4}$/.test(s)) {
          const [d, m, y] = s.split('-').map(Number);
          return new Date(y, m - 1, d);
        }
        // Fallback: try Date.parse
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

  // Normalize date strings to DD-MM-YYYY (API expects DD-MM-YYYY in examples)
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

      {/* Add ICO Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-lg max-h-[500px] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Create New ICO</h3>
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

            <form onSubmit={handleCreate} className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-2 gap-3">
                <input name="name" value={formData.name} onChange={handleFormChange} placeholder="Project Name" className="border px-3 py-2 rounded" required />
                <input name="slug" value={formData.slug} onChange={handleFormChange} placeholder="Slug (url)" className="border px-3 py-2 rounded" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600">Image (JPEG/PNG/GIF/SVG)</label>
                  <input type="file" name="image" onChange={handleFormChange} accept="image/*" className="border px-3 py-2 rounded w-full" />
                  {formData.image && <p className="text-xs text-green-600 mt-1">✓ {formData.image.name}</p>}
                </div>
                <input name="launchpad" value={formData.launchpad} onChange={handleFormChange} placeholder="Launchpad" className="border px-3 py-2 rounded" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <select name="stage" value={formData.stage} onChange={handleFormChange} className="border px-3 py-2 rounded">
                  <option value="">Select Stage</option>
                  {Object.entries(filters.stages || {}).map(([key, val]) => (
                    <option key={key} value={key}>{val}</option>
                  ))}
                </select>

                <select name="ico_status" value={formData.ico_status} onChange={handleFormChange} className="border px-3 py-2 rounded">
                  <option value="">Select Status</option>
                  {Object.entries(filters.ico_statuses || {}).map(([key, val]) => (
                    <option key={key} value={key}>{val}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <select name="project_category" value={formData.project_category} onChange={handleFormChange} className="border px-3 py-2 rounded">
                  <option value="">Select Category</option>
                  {Object.entries(filters.categories || {}).map(([key, val]) => (
                    <option key={key} value={key}>{val}</option>
                  ))}
                </select>

                <select name="blockchain_network" value={formData.blockchain_network} onChange={handleFormChange} className="border px-3 py-2 rounded">
                  <option value="">Select Network</option>
                  {Object.entries(filters.networks || {}).map(([key, val]) => (
                    <option key={key} value={key}>{val}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input type="date" name="start_date" value={formData.start_date} onChange={handleFormChange} placeholder="Start Date" className="border px-3 py-2 rounded" />
                <input type="date" name="end_date" value={formData.end_date} onChange={handleFormChange} placeholder="End Date" className="border px-3 py-2 rounded" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input name="ico_price" value={formData.ico_price} onChange={handleFormChange} placeholder="ICO Price" className="border px-3 py-2 rounded" />
                <input name="ico_price_currency" value={formData.ico_price_currency} onChange={handleFormChange} placeholder="Currency" className="border px-3 py-2 rounded" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input name="tokens_for_sale" value={formData.tokens_for_sale} onChange={handleFormChange} placeholder="Tokens For Sale" className="border px-3 py-2 rounded" />
                <input name="total_supply_qty" value={formData.total_supply_qty} onChange={handleFormChange} placeholder="Total Supply" className="border px-3 py-2 rounded" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input name="supply_percentage" value={formData.supply_percentage} onChange={handleFormChange} placeholder="Supply %" className="border px-3 py-2 rounded" />
                <input name="fundraising_goal" value={formData.fundraising_goal} onChange={handleFormChange} placeholder="Fundraising Goal" className="border px-3 py-2 rounded" />
              </div>

              <textarea name="short_description" value={formData.short_description} onChange={handleFormChange} placeholder="Short Description" className="border px-3 py-2 rounded" rows={4} />

              <div className="flex items-center justify-end gap-3 mt-2">
                <button type="button" onClick={closeAdd} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded">
                  {submitting ? 'Creating...' : 'Create ICO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="py-12">
        <div className="container mx-auto px-4">

          {/* Heading */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-100">Upcoming ICO / IDO</h3>
              <p className="text-gray-300 mt-1">
                Explore high-potential projects and participate early in token launches.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={openAdd}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                + Add ICO
              </button>
            </div>
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

export default Page;
