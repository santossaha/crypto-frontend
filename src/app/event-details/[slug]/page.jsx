"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeroSection from "../../components/hero/HeroSection";
import axiosInstance from "../../Helper/Helper";
import { formatImageUrl } from "../../Helper/imageUtils";

import "../style.css";

const Page = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchEvent = async () => {
      try {
        // ✅ Correct API format
        const response = await axiosInstance.get(`/get-events?slug=${slug}`);

        console.log("Event details → ", response.data);

        // API returns { data: {...event} }
        setEvent(response.data?.data || null);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  if (loading) {
    return <p className="text-center text-white py-20">Loading event...</p>;
  }

  if (!event) {
    return <p className="text-center text-red-500 py-20">Event Not Found</p>;
  }

  return (
    <>
      <HeroSection title="Event Details">
        <nav className="flex items-center justify-center gap-2 text-gray-200">
          <Link
            href="/"
            className="text-violet-100 hover:text-violet-300 transition"
          >
            Home
          </Link>
          <span>/</span>
          <Link href="/Event" className="text-violet-100 font-bold">
            {event.title}
          </Link>
        </nav>
      </HeroSection>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT SIDE (STATIC DESIGNED SECTION) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-0 mb-8 overflow-hidden flex flex-col lg:flex-row">
                {/* LEFT IMAGE */}
                <div className="relative w-full lg:w-1/3 h-72 lg:h-auto bg-gray-200">
                  <Image
                    src={formatImageUrl(event.image)}
                    alt={event.title}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />

                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                    Music Event
                  </div>

                  {/* Ticket Strip */}
                  <div className="hidden lg:flex absolute left-0 top-0 h-full w-8 bg-gradient-to-b from-purple-600 to-orange-500 opacity-90" />
                </div>

                {/* RIGHT INFO SECTION */}
                <div className="w-full lg:w-2/3 p-8">
                  {/* TITLE */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Live Concert Night
                  </h2>

                  {/* META DETAILS */}
                  <div className="flex flex-wrap gap-6 text-sm text-gray-700 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>24 Feb 2025</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span>⏰</span>
                      <span>07:30 PM</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>Mumbai, India</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span>🏛️</span>
                      <span>Jio World Convention Centre</span>
                    </div>
                  </div>

                  {/* SHORT DESCRIPTION */}
                  <p className="text-lg text-gray-700 italic mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-purple-600">
                    Join us for an unforgettable night of music, lights, and
                    energy. Experience electrifying performances by top artists!
                  </p>
                </div>
              </div>
            </div>

            {/* LEFT SIDE */}

            {/* RIGHT SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Event Author</h3>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                    {event.author_name?.charAt(0) || "A"}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      {event.author_name || "Admin"}
                    </p>
                    <p className="text-xs text-gray-600">Event Manager</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {event.author_bio || "No author bio available."}
                </p>

                <button className="w-full bg-gradient-to-r from-purple-400 to-orange-400 text-white py-2 rounded-lg text-sm font-semibold hover:shadow-md transition">
                  Follow Author
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Share This Event</h3>
                <div className="flex gap-3 flex-wrap">
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    f
                  </span>
                  <span className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center">
                    📷
                  </span>
                  <span className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center">
                    𝕏
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Subscribe</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Static QR section text here.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-32 mb-4">
                  <span className="text-gray-400 text-sm">
                    QR Code Placeholder
                  </span>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-400 to-orange-400 text-white py-2 rounded-lg text-sm font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
