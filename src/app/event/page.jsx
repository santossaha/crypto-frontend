"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axiosInstance from "../Helper/Helper";
import { formatImageUrl } from "../Helper/imageUtils";
import HeroSection from "../components/hero/HeroSection";
import { MdShareLocation, MdUpdate } from "react-icons/md";
import { FaLocationArrow  } from "react-icons/fa6";
const Page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventType, setEventType] = useState("Upcoming");
  const [location, setLocation] = useState("India");
  const [openModal, setOpenModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // 🚀 Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    };
    fetchEvents();
  }, []);

  // 📌 Pagination Logic
  const totalPages = Math.ceil((events?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  // Ensure we only call slice on an actual array to avoid runtime errors
  const eventsList = Array.isArray(events)
    ? events
    : events && Array.isArray(events.data)
    ? events.data
    : [];
  const paginatedEvents =
    eventsList.slice(startIndex, startIndex + itemsPerPage) || [];

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
                    key={event.id}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    transition={{ type: "tween", duration: 0.4 }}
                    className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer h-80"
                  >
                    <Link
                      href={`/event-details/${event.slug}`}
                      className="block absolute inset-0 z-30"
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
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {event.category || "Science"}
                      </div>

                      {/* Favorite / action icon (top-right) */}
                      <div className="absolute top-3 right-3 bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                        <FaLocationArrow />
                      </div>

                      {/* White Info Card (bottom-left) */}
                      <div className="absolute left-4 right-4 bottom-4 z-10 bg-white rounded-2xl shadow-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                          {event.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">
                          By John Doe
                        </p>

                        <div className="mt-6 space-y-3 text-gray-700">
                          <div className="flex gap-2 items-center">
                            <span className="p-1 bg-violet-100 rounded-xl">
                              <MdUpdate className="text-purple-400 text-sm" />
                            </span>
                            <span className="text-xs font-semibold text-gray-700">
                              Saturday, Feb 23 2019
                            </span>
                            <span className="text-xs font-semibold text-gray-700"> 5:00 PM – 11:00 PM</span>
                          </div>
                          <div className="flex gap-2 items-center">
                            <span className="p-1 bg-violet-100 rounded-xl">
                              <MdShareLocation className="text-purple-400 text-sm" />
                            </span>
                            <span className="text-xs font-semibold text-gray-700">
                              {" "}
                              5323 Gilroy St Gilroy, CA
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-7 h-7 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">+50 others are going</span>
                      </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <ul className="flex items-center gap-2">
              {/* Prev */}
              <li>
                <button
                  onClick={goToPrev}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg border transition ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed border-gray-200"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Previous
                </button>
              </li>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      currentPage === index + 1
                        ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white border-transparent"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              {/* Next */}
              <li>
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg border transition ${
                    currentPage === totalPages
                      ? "text-gray-100 cursor-not-allowed border-gray-200"
                      : "px-5 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
                  }`}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
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
            <form className="space-y-4">
              {/* Image Upload */}
              {/* Image Upload (Modern UI) */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Event Image
                </label>

                <div className="mt-2">
                  <label
                    htmlFor="imageUpload"
                    className="
        flex flex-col items-center justify-center 
        border-2 border-dashed border-gray-300 
        bg-gray-50 hover:bg-gray-100
        rounded-xl p-6 cursor-pointer 
        transition-all
      "
                  >
                    {/* Preview */}
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg shadow"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-500">
                        <div className="w-14 h-14 bg-white border shadow rounded-full flex items-center justify-center mb-3">
                          <span className="text-3xl">📷</span>
                        </div>
                        <p className="text-sm font-semibold">
                          Click to upload or drag & drop
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG, JPEG up to 5MB
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setPreviewImage(url);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter event title"
                />
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Venue */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Venue
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter venue"
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter location"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter description"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
              >
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
