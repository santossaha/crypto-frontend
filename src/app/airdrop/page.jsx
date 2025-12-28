"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import p1 from "../assets/images/e-1.jpg";
import l1 from "../assets/images/link.svg";
import { IconThumbUp } from '@tabler/icons-react';
import HeroSection from '../components/hero/HeroSection';

const Airdrop = () => {

  // Dummy data (7 rows)
  const fullData = Array(25).fill({
    name: "NetworkSoileum Network",
    symbol: "$SOIL",
    type: "Token",
    winners: 100,
    qty: "5,000.00",
    ends: "1 week",
    tasks: 2
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Calculate sliced data
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentRows = fullData.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(fullData.length / rowsPerPage);

  React.useEffect(() => {
    document.title = "Airdrops - Crypto Frontend";
  }, []);

  // Pagination handlers
  const goToPage = (num) => setCurrentPage(num);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);


  return (
    <>
      {/* HERO SECTION */}
      <HeroSection
        title="Airdrop"
        subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      >
        <ul className="flex items-center justify-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-violet-200 hover:text-white hover:underline font-semibold">
              Home
            </Link>
          </li>
          <li className="text-violet-200">/</li>
          <li className="text-white font-bold">Airdrop</li>
        </ul>
      </HeroSection>

      {/* MAIN WRAPPER */}
      <div className="py-12">
        <div className="container mx-auto px-4">

          {/* Heading */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-100">Crypto Ongoing Airdrop</h3>
            <p className="text-gray-300 mt-1">
              Participate in coin airdrops right on Coin Gabbar, see our full coin airdrop calendar.
            </p>
          </div>

          {/* FILTER + TABLE */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">

            {/* TABLE */}
            <div className="mt-8 overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left font-semibold">Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Upvote</th>
                    <th className="p-3">Winners</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Ends In</th>
                    <th className="p-3">Tasks</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRows.map((item, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50 transition">
                      <td className="p-3">
                        <Link href="/airdropitem" className="flex items-center gap-3">
                          <Image src={p1} alt="" className="w-12 h-12 rounded-lg" />
                          <div>
                            <p className="text-gray-800 font-medium">{item.name}</p>
                            <h6 className="text-purple-600 font-bold">{item.symbol}</h6>
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded">
                              Featured
                            </span>
                          </div>
                        </Link>
                      </td>

                      <td className="text-center">{item.type}</td>

                      <td>
                        <Link href="/" className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium">
                          <IconThumbUp stroke={2} width={16} />
                          Upvote
                        </Link>
                      </td>

                      <td className="text-center">{item.winners}</td>
                      <td className="text-center">{item.qty}</td>
                      <td className="text-center">{item.ends}</td>
                      <td className="text-center">{item.tasks}</td>

                      <td className="text-center">
                        <div className="inline-block cursor-pointer bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
                          <Image src={l1} alt="view" className="w-5 h-5" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

              {/* PAGINATION */}
              <div className="flex justify-end mt-6">
                <ul className="flex items-center gap-2">

                  {/* Previous */}
                  <li>
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 border rounded-lg  
                        ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"}
                      `}
                    >
                      Previous
                    </button>
                  </li>

                  {/* Dynamic Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <li key={num}>
                      <button
                        onClick={() => goToPage(num)}
                        className={`px-3 py-1 border rounded-lg 
                          ${currentPage === num ? "bg-purple-600 text-white" : "hover:bg-gray-100"}
                        `}
                      >
                        {num}
                      </button>
                    </li>
                  ))}

                  {/* Next */}
                  <li>
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 border rounded-lg 
                        ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"}
                      `}
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

export default Airdrop;
