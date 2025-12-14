"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

  // 🚀 Pagination States (removed for showing all events)
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5;

  useEffect(() => {
    const fetchEvents = async () => {
      const start = Date.now();
      try {
        const response = await axiosInstance("/event-list");
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
        console.log('Total events fetched:', eventsList.length);
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

  // 📌 Events List (showing all events)
  const eventsList = Array.isArray(events)
    ? events
    : events && Array.isArray(events.data)
    ? events.data
    : [];

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
              : eventsList.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    transition={{ type: "tween", duration: 0.4 }}
                    className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer h-80"
                  >
                    <Link
                      href={`/event-details/${event.id}`}
                      className="block absolute inset-0 z-20"
                    />

                    {/* Background Image */}
                    <div className="w-full h-full relative">
                      <Image
                        src="/p-1.jpg"
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
                          By John Doe
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
                                    Sat Feb 10 2025{" "}
                                    <bladge className="text-[8px] text-purple-500">
                                      10:00AM
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
                                  Sat Feb 10 2025{" "}
                                  <bladge className="text-[8px] text-orange-500">
                                    5:00PM
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
                            <span className="text-xs font-semibold text-gray-700">{event.location || event.address || "5323 Gilroy St Gilroy, CA"}</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-end">
                          <Link href={`/event-details/${event.id}`}>
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
              

              {/* Gallery Images */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Event Gallery
                  </label>

                  {/* Placeholder Upload Box */}
                  <label
                    htmlFor="galleryUpload"
                    className="
                      mt-2 flex flex-col items-center justify-center 
                      border-2 border-dashed border-gray-300 
                      bg-gray-50 hover:bg-gray-100
                      rounded-xl p-6 cursor-pointer 
                      transition-all
                    "
                  >
                    {/* If No Images → Show Placeholder */}
                    {galleryImages.length === 0 ? (
                      <div className="flex flex-col items-center text-gray-500">
                        <div className="w-14 h-14 bg-white border shadow rounded-full flex items-center justify-center mb-3">
                          <span className="text-3xl">🖼️</span>
                        </div>
                        <p className="text-sm font-semibold">Upload Gallery Images</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG (max 10)</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Add more images</p>
                    )}

                    <input
                      type="file"
                      id="galleryUpload"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
                        const maxSize = 5 * 1024 * 1024; // 5 MB
                        const maxImages = 10;

                        let errors = [];

                        // Check count
                        if (files.length + galleryImages.length > maxImages) {
                          errors.push(`You can upload max ${maxImages} photos.`);
                        }

                        // Check file rules
                        files.forEach((file) => {
                          if (!allowedTypes.includes(file.type)) {
                            errors.push(`${file.name} is not a valid image type.`);
                          }
                          if (file.size > maxSize) {
                            errors.push(`${file.name} is larger than 5MB.`);
                          }
                        });

                        if (errors.length > 0) {
                          setGalleryError(errors.join(" | "));
                          return;
                        }

                        setGalleryError("");

                        const previews = files.map((file) => ({
                          url: URL.createObjectURL(file),
                          file: file,
                        }));

                        setGalleryImages((prev) => [...prev, ...previews]);
                      }}
                    />
                  </label>

                  {/* Error Message */}
                  {galleryError && (
                    <p className="text-red-600 text-sm mt-1">{galleryError}</p>
                  )}

                  {/* Preview Grid */}
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {galleryImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.url}
                          className="h-20 w-full object-cover rounded-lg shadow"
                        />

                        {/* Delete Button */}
                        <button
                          onClick={() =>
                            setGalleryImages(galleryImages.filter((_, i) => i !== index))
                          }
                          className="
                            absolute top-1 right-1 
                            bg-black/60 text-white text-xs 
                            rounded-full px-1.5 py-0.5 
                            opacity-0 group-hover:opacity-100 
                            transition
                          "
                        >
                          ✕
                        </button>
                      </div>
                    ))}
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

              {/* Start Date & Time */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* End Date & Time */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
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

              {/* Event Details */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Event Details
                </label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter full event details"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email ID
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg mt-1"
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
                  className="w-full px-3 py-2 border rounded-lg mt-1"
                  placeholder="+91 9876543210"
                />
              </div>

              {/* Website */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border rounded-lg mt-1"
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
                    className="w-full px-3 py-2 border rounded-lg mt-1"
                    placeholder="https://instagram.com/yourpage"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Facebook
                  </label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border rounded-lg mt-1"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Twitter
                  </label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border rounded-lg mt-1"
                    placeholder="https://twitter.com/yourpage"
                  />
                </div>
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
