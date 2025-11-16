"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "../Helper/Helper";
import { formatImageUrl } from "../Helper/imageUtils";
import HeroSection from "../components/hero/HeroSection";

const Page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventType, setEventType] = useState("Upcoming");
  const [location, setLocation] = useState("India");
  const [openModal, setOpenModal] = useState(false);

  // 🚀 Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance("/get-events");
        setEvents(response.data[0]);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // 📌 Pagination Logic
  const totalPages = Math.ceil((events?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = events?.slice(startIndex, startIndex + itemsPerPage) || [];

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>

      {/* Hero Section */}
      <HeroSection
        title="Our Upcoming Events"
        subtitle="Lorem ipsum dolor sit amet illo nobis consequuntur."
      />

      {/* Event Main Section */}
      <div className="eventMain py-10">
        <div className="container mx-auto px-4">

          {/* Heading */}
          <div className="subHeadline mb-6">
            <h3 className="text-2xl font-bold text-gray-100">Events List</h3>
          </div>

          {/* Search Area */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">

            <form>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* Search Input */}
                <input
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-white outline-none"
                  placeholder="Search"
                />

                {/* Event Type */}
                <select
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Previous">Previous</option>
                  <option value="Trending">Trending</option>
                </select>

                {/* Location */}
                <select
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>

                {/* Button */}
                <button type="button" className="w-full common-btn">
                  Search
                </button>

              </div>
            </form>

            {/* Event Table */}
            <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left font-semibold">Date</th>
                    <th className="p-3 text-left font-semibold">Name</th>
                    <th className="p-3 text-left font-semibold">Location</th>
                    <th className="p-3 text-left font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    paginatedEvents.map((event) => (
                      <tr
                        key={event.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        {/* Date */}
                        <td className="p-3 text-blue-600 font-medium">
                          {new Date(event.start_date).toLocaleDateString()} <br />
                          {new Date(event.end_date).toLocaleDateString()}
                        </td>

                        {/* Name */}
                        <td className="p-3 flex items-center gap-3">
                          <Image
                            className="rounded-lg"
                            src={formatImageUrl(event.image)}
                            alt={event.title}
                            width={50}
                            height={50}
                          />
                          <p className="font-medium">{event.title}</p>
                        </td>

                        {/* Location */}
                        <td className="p-3 text-gray-700">{event.location}</td>

                        {/* View */}
                        <td className="p-3">
                          <button
                            className="text-blue-600 underline font-medium"
                            onClick={() => setOpenModal(true)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-5">
              <ul className="flex items-center gap-2">

                {/* Prev */}
                <li>
                  <button
                    onClick={goToPrev}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border rounded-lg ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-200"
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
                      className={`px-3 py-1 border rounded-lg ${
                        currentPage === index + 1
                          ? "bg-purple-600 text-white"
                          : "hover:bg-gray-200"
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
                    className={`px-3 py-1 border rounded-lg ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    Next
                  </button>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-5 rounded-xl shadow-xl">

            <h3 className="text-xl font-bold mb-4">Event Details</h3>
            <p className="text-gray-700 mb-4">...</p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Save changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Page;
