"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import p1 from "../assets/images/e-1.jpg";
import HeroSection from "../components/hero/HeroSection";

const Page = () => {
  const [eventType, setEventType] = useState("Upcoming");

  const fullData = Array(20).fill({
    name: "RaysX",
    stage: "ICO",
    launchpad: "On Website",
    upvotes: 13002,
    endIn: "2 Days",
    tokens: "500.00 M",
    rate: "500.00 M",
    goal: "TBA",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentRows = fullData.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(fullData.length / rowsPerPage);

  const goToPage = (n) => setCurrentPage(n);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-white outline-none"
                placeholder="Search"
              />

              {/* Event Type */}
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-white"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Previous">Previous</option>
                <option value="Trending">Trending</option>
              </select>

              {/* ICO / IDO Filter */}
              <select className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-white">
                <option value="">ICO / IDO</option>
                <option value="1">ICO / IDO 1</option>
                <option value="2">ICO / IDO 2</option>
              </select>

              <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition">Search</button>
            </div>

            {/* TABLE SECTION */}
            <div className="mt-8 overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left font-semibold">Name</th>
                    <th className="p-3 text-center font-semibold">Stage</th>
                    <th className="p-3 text-center font-semibold">Launchpad</th>
                    <th className="p-3 text-center font-semibold">Upvotes</th>
                    <th className="p-3 text-center font-semibold">End In</th>
                    <th className="p-3 text-center font-semibold">Tokens for Sale</th>
                    <th className="p-3 text-center font-semibold">Rate</th>
                    <th className="p-3 text-center font-semibold">Fundraising Goal</th>
                    <th className="p-3 text-center font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRows.map((row, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50 transition">
                      {/* Name */}
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Image src={p1} alt="event" width={40} height={40} className="rounded-lg" />
                          <p className="text-gray-800 font-medium">{row.name}</p>
                        </div>
                      </td>

                      <td className="text-center">{row.stage}</td>
                      <td className="text-center">{row.launchpad}</td>
                      <td className="text-center">{row.upvotes}</td>
                      <td className="text-center">{row.endIn}</td>
                      <td className="text-center">{row.tokens}</td>
                      <td className="text-center">{row.rate}</td>
                      <td className="text-center">{row.goal}</td>

                      <td className="text-center">
                        <div className="inline-block cursor-pointer bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
                        
                          <svg xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5 text-purple-400"
  fill="none" viewBox="0 0 24 24"
  stroke="currentColor" strokeWidth="1.8">
  <path strokeLinecap="round" strokeLinejoin="round"
    d="M4 21v-4.586a1 1 0 01.293-.707L16.5 3.5a2 2 0 112.828 2.828L7.12 19.707a1 1 0 01-.707.293H4z" />
</svg>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* PAGINATION */}
              <div className="flex justify-end mt-6">
                <ul className="flex items-center gap-2">

                  <li>
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 border rounded-lg ${
                        currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"
                      }`}
                    >
                      Previous
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <li key={num}>
                      <button
                        onClick={() => goToPage(num)}
                        className={`px-3 py-1 border rounded-lg ${
                          currentPage === num ? "bg-purple-600 text-white" : "hover:bg-gray-100"
                        }`}
                      >
                        {num}
                      </button>
                    </li>
                  ))}

                  <li>
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 border rounded-lg ${
                        currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"
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
      </div>
    </>
  );
};

export default Page;
