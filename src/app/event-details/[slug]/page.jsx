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
          <Link href="/" className="text-violet-100 hover:text-violet-300 transition">
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
            {/* LEFT SIDE */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <div className="relative w-full h-96 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                  <Image
                    src={formatImageUrl(event.image)}
                    alt={event.title}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />

                  <div className="absolute top-6 left-6 bg-gradient-to-r from-purple-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {event.category || "Event"}
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {event.title}
                </h2>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{new Date(event.start_date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>✍️</span>
                    <span>By Admin</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{event.location || "Unknown Location"}</span>
                  </div>
                </div>

                <p className="text-lg text-gray-700 italic mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-purple-600">
                  {event.short_description || "No short description available."}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-8">
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: event.description || "No content available.",
                  }}
                ></div>
              </div>
            </div>

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
                  <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">f</span>
                  <span className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center">📷</span>
                  <span className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center">𝕏</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Subscribe</h3>
                <p className="text-sm text-gray-600 mb-4">Static QR section text here.</p>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-32 mb-4">
                  <span className="text-gray-400 text-sm">QR Code Placeholder</span>
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
