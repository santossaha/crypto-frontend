"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import axiosInstance from "../Helper/Helper";
import { formatImageUrl } from "../Helper/imageUtils";
import HeroSection from "../components/hero/HeroSection";

const Page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventType, setEventType] = useState("Upcoming");
  const [location, setLocation] = useState("India");
  const [openModal, setOpenModal] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryError, setGalleryError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [bannerImage, setBannerImage] = useState(null);
  
  const [submitting, setSubmitting] = useState(false);
const [formData, setFormData] = useState({
  title: "",
  content: "",
  from_date: "",
  to_date: "",
  start_time: "",
  to_time: "",
  location: "",
  contact_detail: "",
  email: "",
  website_url: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  description: "",
  meta_title: "",
  meta_description: "",
  meta_keyword: "",
  canonical: "",
});



  // 🔹 handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors(prev => ({...prev, [e.target.name]: ""}));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  const errors = {};
  if (!formData.title.trim()) errors.title = "Title is required";
  if (!formData.content.trim()) errors.content = "Event details are required";
  if (!formData.from_date) errors.from_date = "Start date is required";
  if (!formData.location.trim()) errors.location = "Location is required";
  if (!bannerImage) errors.banner = "Banner image is required";
  if (galleryImages.length === 0) errors.gallery = "At least one gallery image is required";

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

  setFormErrors({});
  setSubmitting(true);

  try {
    const fd = new FormData();

    // Format dates to DD-MM-YYYY
    const formatDate = (date) => {
      if (!date) return '';
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'from_date' || key === 'to_date') {
        fd.append(key, formatDate(value));
      } else {
        fd.append(key, value);
      }
    });

    // ✅ banner image (VERY IMPORTANT)
    if (bannerImage) {
      fd.append("image", bannerImage);
    }

    // gallery images
    galleryImages.forEach((img) => {
      fd.append("gallery_images", img.file);
    });

    // Debug: log FormData contents
    console.log("FormData being sent:");
    for (let [key, value] of fd.entries()) {
      console.log(key, value);
    }

    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create-event`, fd);

    alert("✅ Event added successfully");
    setOpenModal(false);

    // reset
    setFormData({
      title: "",
      content: "",
      from_date: "",
      to_date: "",
      start_time: "",
      to_time: "",
      location: "",
      contact_detail: "",
      email: "",
      website_url: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      description: "",
      meta_title: "",
      meta_description: "",
      meta_keyword: "",
      canonical: "",
    });
    setBannerImage(null);
    setGalleryImages([]);
  } catch (err) {
    console.log("Full error:", err);
    console.log("Error response:", err.response);
    alert("❌ Failed to add event");
  } finally {
    setSubmitting(false);
  }
};




  useEffect(() => {
    const fetchEvents = async () => {
      const start = Date.now();
      try {
        const response = await axiosInstance("/get-events");
        // Debug/log the raw response to help diagnose shape issues
        console.log("/get-events response:", response);

        const resData = response?.data;
        let eventsList = [];

        if (Array.isArray(resData)) {
          // If API returns an array of events or nested [events, ...]
          if (resData.length && Array.isArray(resData[0]))
            eventsList = resData[0];
          else eventsList = resData;
        } else if (resData && typeof resData === "object") {
          // Common shapes: { events: [...] } or { data: [...] } or { items: [...] }
          eventsList = resData.events || resData.data || resData.items || [];
        } else {
          eventsList = [];
        }

        setEvents(eventsList);
        console.log("Total events fetched:", eventsList.length);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        // Ensure skeleton shows for at least 300ms for smoother UX
        const elapsed = Date.now() - start;
        const minDelay = 300;
        if (elapsed < minDelay) {
          setTimeout(() => setLoading(false), minDelay - elapsed);
        } else {
          setLoading(false);
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    fetchEvents();
  }, []);

  // 📌 Events List (showing all events)
  const eventsList = Array.isArray(events)
    ? events
    : events && Array.isArray(events.data)
    ? events.data
    : [];

  React.useEffect(() => {
    document.title = "Events - Crypto Frontend";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Skeleton card used while loading (plain div so it's visible immediately)
  const SkeletonCard = ({ idx }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md h-80">
      <div className="w-full h-40 bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(eventsList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedEvents = eventsList.slice(startIndex, endIndex);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Our Upcoming Events"
        subtitle="Lorem ipsum dolor sit amet illo nobis consequuntur."
      >
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center justify-center gap-2 text-gray-200">
          <Link
            href="/"
            className="text-violet-100 hover:text-violet-300 transition font-semibold"
          >
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="text-white font-bold">
            Event
          </Link>
        </nav>
      </HeroSection>

      {/* Event Main Section */}
      <div className="eventMain py-10 bg-">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="subHeadline mb-6 flex justify-between">
            <h3 className="text-2xl font-bold text-gray-100">Events List</h3>
            {/* Add Event Button */}

            <button
              onClick={() => setOpenModal(true)}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
            >
              + Add Event
            </button>
          </div>

          {/* Event Cards Grid (search form removed per request) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <SkeletonCard key={idx} idx={idx} />
                ))
              : paginatedEvents.map((event) => (
                  <motion.div
                    key={event.slug}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    transition={{ type: "tween", duration: 0.4 }}
                    className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer h-80"
                  >
                    <Link
                      href={`/event-details/${event.slug}`}
                      className="block absolute inset-0 z-20"
                    />

                    {/* Background Image */}
                    <div className="w-full h-full relative">
                      <Image
                        src={formatImageUrl(event.image)}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                        className="transform transition-transform duration-500 hover:scale-105"
                      />

                      {/* Overlay gradient to improve text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                      {/* Category Badge (top-left) */}

                      {/* White Info Card (bottom-left) */}
                      <div className="absolute left-4 right-4 bottom-4 z-30 bg-white rounded-2xl shadow-lg p-3">
                        <h4 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                          {event.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">
                          By {event.organizer || "Admin"}
                        </p>

                        <div className="mt-6 space-y-3 text-gray-700">
                          <div className="flex items-center justify-between gap-3 text-xs font-semibold text-gray-700">
                            {/* Start Date & Time */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <span className="p-2 bg-violet-100 rounded-xl flex items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-purple-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 8v4l3 3m2-13H7m1 3h8M12 21a9 9 0 100-18 9 9 0 000 18z"
                                    />
                                  </svg>
                                </span>
                                <div className="flex justify-start flex-col">
                                  <span className="font-bold text-[11px]">
                                    Start Date-Time:
                                  </span>
                                  <span className="text-[10px] text-gray-600">
                                    {" "}
                                    {event.from_date || "Sat Feb 10 2025"}{" "}
                                    <bladge className="text-[8px] text-purple-500">
                                      {event.start_time || "10:00AM"}
                                    </bladge>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="w-px h-8 bg-gray-300"></div>
                            {/* End Date & Time */}

                            <div className="flex items-center gap-1">
                              <span className="p-2 bg-violet-100 rounded-xl flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4 text-purple-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 8v4l3 3m2-13H7m1 3h8M12 21a9 9 0 100-18 9 9 0 000 18z"
                                  />
                                </svg>
                              </span>
                              <div className="flex justify-start flex-col">
                                <span className="font-bold text-[11px]">
                                  End Date-Time:
                                </span>
                                <span className="text-[10px] text-gray-600">
                                  {" "}
                                  {event.to_date || "Sat Feb 10 2025"}{" "}
                                  <bladge className="text-[8px] text-orange-500">
                                    {event.to_time || "5:00PM"}
                                  </bladge>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 items-center">
                            <span className="px-2  py-1 bg-violet-100 rounded-xl">
                              <i class="ri-map-pin-line text-purple-400 text-sm"></i>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-purple-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 11.5a3 3 0 100-6 3 3 0 000 6zm0 9.5s7-5 7-11a7 7 0 10-14 0c0 6 7 11 7 11z"
                                />
                              </svg>
                            </span>
                            <span className="text-xs font-semibold text-gray-700">
                              {event.location ||
                                event.address ||
                                "5323 Gilroy St Gilroy, CA"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-end">
                          <Link href={`/event-details/${event.slug}`}>
                            <div className="relative w-32 h-10 bg-gradient-to-r from-purple-600 to-orange-500 text-white border-transparent rounded-lg overflow-hidden group cursor-pointer select-none">
                              {/* Flash Shine Effect */}
                              <span
                                className="absolute inset-0 w-1/2 h-full bg-white/30 opacity-0 group-hover:opacity-100
                              translate-x-[-150%] group-hover:translate-x-[200%]
                              skew-x-[20deg] transition-all duration-700 ease-out"
                              ></span>

                              {/* Default State (icon only) */}
                              <div
                                className="absolute inset-0 flex items-center justify-center gap-2 text-white 
                              transition-all duration-300 group-hover:-translate-y-full"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4 text-white"
                                  style={{ transform: "rotate(-45deg)" }}
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M3.4 20.6L22 12 3.4 3.4 3 10l12 2-12 2z" />
                                </svg>
                              </div>

                              {/* Hover State - Slide up from bottom */}
                              <div
                                className="absolute inset-0 flex items-center justify-center gap-2 text-white 
                              translate-y-full transition-all duration-300 group-hover:translate-y-0"
                              >
                                <span className="text-sm font-medium">
                                  View Details
                                </span>

                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4 text-white"
                                  style={{ transform: "rotate(-45deg)" }}
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M3.4 20.6L22 12 3.4 3.4 3 10l12 2-12 2z" />
                                </svg>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>
          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-white font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-7 relative">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-5 text-gray-800">
              Add New Event
            </h2>

            {/* Event Form */}
            <form onSubmit={handleSubmit} className="space-y-4">


               {/* Banner Image */}
              <label className="block border-dashed border-2 p-4 rounded-lg cursor-pointer">
                Upload Banner Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setBannerImage(e.target.files[0]);
                    setFormErrors(prev => ({...prev, banner: ""}));
                  }}
                />
              </label>
              {formErrors.banner && <p className="text-red-500 text-sm mt-1">{formErrors.banner}</p>}
              {/* Gallery Images */}
              <label className="block border-dashed border-2 p-4 rounded-lg cursor-pointer">
                Upload Gallery Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const previews = files.map((file) => ({
                      url: URL.createObjectURL(file),
                      file,
                    }));
                    setGalleryImages((prev) => [...prev, ...previews]);
                    setFormErrors(prev => ({...prev, gallery: ""}));
                  }}
                />
              </label>
              {formErrors.gallery && <p className="text-red-500 text-sm mt-1">{formErrors.gallery}</p>}

              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((img, i) => (
                  <img key={i} src={img.url} className="h-20 w-full object-cover rounded" />
                ))}
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                type="text"
                 name="title" value={formData.title} onChange={handleChange}
                  className="w-full px-3 input py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter event title"
                />
                {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
              </div>

                 {/* Start Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date" name="from_date" value={formData.from_date} onChange={handleChange}
                    className="w-full px-3 input py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  />
                  {formErrors.from_date && <p className="text-red-500 text-sm mt-1">{formErrors.from_date}</p>}
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time" name="start_time" value={formData.start_time} onChange={handleChange}
                    className="w-full px-3 input py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                   type="date" name="to_date" value={formData.to_date} onChange={handleChange}
                    className="w-full px-3 input py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="time" name="to_time" value={formData.to_time} onChange={handleChange} 
                    className="w-full px-3 input py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>


             

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                type="text"
                 name="location" value={formData.location} onChange={handleChange}
                  className="w-full px-3 py-2 input border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter location"
                />
                {formErrors.location && <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>}
              </div>

              {/* Event Details */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Event Details
                </label>
                <textarea
                  rows="2" name="content" value={formData.content} onChange={handleChange}
                  className="w-full px-3 py-2 border input rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter full event details"
                />
                {formErrors.content && <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email ID
                </label>
                <input
                type="email"
                  name="email" value={formData.email} onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg mt-1 input"
                  placeholder="example@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                type="tel"
                  name="contact_detail" value={formData.contact_detail} onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg mt-1 input"
                  placeholder="+91 9876543210"
                />
              </div>
                 {/*  Event Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Event Description
                </label>
                <textarea
                  rows="3" name="description" value={formData.description} onChange={handleChange}
                  className="w-full px-3 py-2 border input rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter full Event Description"
                />
              </div>
              {/* Website */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                type="url"
                  name="website_url" value={formData.website_url} onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg mt-1 input"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Instagram
                  </label>
                  <input
                  type="url"
                   name="instagram" value={formData.instagram} onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg mt-1 input"
                    placeholder="https://instagram.com/yourpage"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Facebook
                  </label>
                  <input
                  type="url"
                  name="facebook" value={formData.facebook} onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg mt-1 input"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    LinkedIn
                  </label>
                  <input
                  type="url"
                    name="linkedin" value={formData.linkedin} onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg mt-1 input"
                    placeholder="https://linkedin.com/yourpage"
                  />
                </div>
              </div>

              {/* Meta Fields */}
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="meta_title" value={formData.meta_title} onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg mt-1 input"
                    placeholder="Enter meta title"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Meta Description
                  </label>
                  <textarea
                    rows="2"
                    name="meta_description" value={formData.meta_description} onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg mt-1 input"
                    placeholder="Enter meta description"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    name="meta_keyword" value={formData.meta_keyword} onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg mt-1 input"
                    placeholder="Enter meta keywords"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    name="canonical" value={formData.canonical} onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg mt-1 input"
                    placeholder="https://yourwebsite.com/canonical"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={submitting}
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
              >
                {submitting ? "Adding..." : "Add Event"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
