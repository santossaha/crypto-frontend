"use client";

import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/app/components/hero/HeroSection";
import banner from "../../assets/images/banner-1.jpg";
import banner2 from "../../assets/images/banner-2.jpg";
import banner3 from "../../assets/images/banner-3.jpg";

export default function Page() {
  return (
    <div className=" min-h-screen pb-20">
      {/* ---------- TOP HERO ---------- */}
      <HeroSection
        title="Welcome to our Events"
        subtitle="Lorem Ipsum is simply dummy text"
      >
        <ul className="flex justify-center gap-2 text-gray-600 mt-3">
          <li>
            <Link
              href="/"
              className="text-violet-200 font-semibold hover:text-violet-300"
            >
              Home
            </Link>
          </li>
          <li className="text-violet-200">/</li>
          <li className="font-bold text-white">Event</li>
        </ul>
      </HeroSection>

      {/* ---------- TICKET CARD ---------- */}
      <div className="max-w-5xl mx-auto mt-10 bg-white shadow rounded-xl overflow-hidden border">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* MIDDLE CONTENT */}
          <div className="p-8 border-t md:border-t-0 md:border-l   flex flex-col justify-start">
            <h2 className="text-3xl font-bold">Dinner Party</h2>
            <p>
              We are hosting a dinner party just for our best clients. We are
              excited to see you there.
            </p>

            <div className="mt-6 space-y-3 text-gray-700">
              <div className="flex gap-2 items-center">
                <span className="p-2 bg-violet-100 rounded-xl">
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
                <span className="text-sm font-semibold text-gray-700">
                  Saturday, Feb 23 2019
                </span>
                <span> 5:00 PM – 11:00 PM</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="p-2 bg-violet-100 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 11a3 3 0 100-6 3 3 0 000 6zm0 9s7-5 7-11a7 7 0 10-14 0c0 6 7 11 7 11z"
                    />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  {" "}
                  5323 Gilroy St Gilroy, CA
                </span>
              </div>
              <h4 className="text-md font-bold mt-3">Share With Friends :</h4>
              <div className="flex gap-2 items-center">
                <span className="p-2 bg-violet-500 rounded-xl hover:bg-violet-700">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3 3-3h2v3h-1.5c-1 0-1.5.5-1.5 1.5v1.5h3l-.5 3h-2.5v7A10 10 0 0022 12z" />
                  </svg>
                </span>
                <span className="p-2 bg-violet-500 rounded-xl hover:bg-violet-700">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17" cy="7" r="1" />
                  </svg>
                </span>
                <span className="p-2 bg-violet-500 rounded-xl hover:bg-violet-700">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4 3a2 2 0 110 4 2 2 0 010-4zm1 6H3v12h2V9zm4 0H7v12h2v-7c0-1.7 3-1.8 3 0v7h2v-8c0-4-5-4-6 0V9z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SUBSCRIBE BOX */}
          <div className="p-8 border-t md:border-t-0 md:border-l-4 border-dashed flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-3">Subscribe Now</h3>

            <div className="flex items-center justify-between gap-10">
              <h4 className="font-bold">Click to Add your Calendra</h4>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition">
                Add to Calendar
              </button>
            </div>
            <div className="text-center py-3 or-boredr">
              <span>OR</span>
            </div>
            <div className="flex items-center justify-between gap-7">
              <p className="text-gray-600 text-sm mb-3">
                Scan QR with your phone <br /> and you will be subscribed <br />{" "}
                automatically.
              </p>

              <div className="flex justify-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=example"
                  className="w-32 h-32 rounded"
                  alt="QR"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT SIDE CONTENT */}
        <div className="md:col-span-2 space-y-10">
          {/* EVENT DETAILS */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-3">Events Details</h3>
            <div className="relative h-56 rounded overflow-hidden bg-gray-200 my-3">
              <Image src={banner2} fill className="object-cover" alt="photo1" />
            </div>
            <p className="text-gray-700 leading-relaxed">
              We are hosting a dinner party just for our best clients. We are
              excited to see you there.
              <br />
              <br />
              The event will be held on Saturday under a beautiful starry night
              in Gilroy on Mt. Hamilton.
            </p>
          </div>

          {/* PHOTOS + VIDEOS */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-4">Event Photos And Videos</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Photo 1 */}
              <div className="relative h-56 rounded overflow-hidden bg-gray-200">
                <Image
                  src={banner}
                  fill
                  className="object-cover"
                  alt="photo1"
                />
              </div>

              {/* Photo 2 */}
              <div className="relative h-56 rounded overflow-hidden bg-gray-200">
                <Image
                  src={banner3}
                  fill
                  className="object-cover"
                  alt="photo2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT SIDEBAR ---------- */}
        <div className="space-y-10">
          {/* Organizer Card */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">Event Organizer</h3>

            <div className="flex items-center gap-3 mb-4">
              <Image
                src={banner2}
                alt="organizer"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">American Bar</p>
                <p className="text-sm text-gray-500">Event Organizer</p>
              </div>
            </div>

            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="p-2 bg-violet-100 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a7 7 0 00-7 7v4a3 3 0 003 3h1v-6H7V9a5 5 0 0110 0v1h-2v6h1a3 3 0 003-3V9a7 7 0 00-7-7z" />
                </svg>
              </span>{" "}
              (415)444-3434
            </p>

            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="p-2 bg-violet-100 rounded-xl">
               <svg xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5 text-purple-400"
  fill="none" viewBox="0 0 24 24"
  stroke="currentColor" strokeWidth="1.8">
  <path strokeLinecap="round" strokeLinejoin="round"
    d="M3 5h18v14H3V5zm0 0l9 7 9-7"/>
</svg>

              </span>{" "}
              eino_runolf_sdottir@yahoo.com
            </p>

            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="p-2 bg-violet-100 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 12h20M12 2c3 5 3 15 0 20M12 2c-3 5-3 15 0 20"
                  />
                </svg>
              </span>
              www.hilltopgilroy.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
