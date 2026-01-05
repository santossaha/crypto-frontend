import axiosInstance from "@/app/Helper/Helper";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/app/components/hero/HeroSection";
import banner from "../../assets/images/banner-1.jpg";
import banner2 from "../../assets/images/banner-2.jpg";
import banner3 from "../../assets/images/banner-3.jpg";
import { formatImageUrl } from "@/app/Helper/imageUtils";
import ShareButtons from "@/app/components/ShareButtons";

export const metadata = {
  title: "Event Details - Crypto Frontend",
  description: "Get detailed information about upcoming crypto events, including schedules, locations, and registration details.",
};

async function getEventBySlug(slug) {
  try {
    const res = await axiosInstance(`/event-detail/${slug}`);
    const data = res?.data;
    if (Array.isArray(data) && data.length) return data[0];
    if (data && typeof data === "object")
      return data[0] || data.data || data.event || data;
    return null;
  } catch (err) {
    console.error("Error fetching event by slug:", err);
    return null;
  }
}

export default async function Page({ params }) {
  const { slug } = params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Event not found</p>
      </div>
    );
  }

  const eventTitle = event.title || "My Event";
  const eventStart = (
    event.from_date ||
    event.start_time ||
    "20251210T170000"
  ).replace(/[-:\s]/g, "");
  const eventEnd = (
    event.to_date ||
    event.to_time ||
    "20251210T230000"
  ).replace(/[-:\s]/g, "");
  const eventLocation = event.location || "New Delhi, India";
  const eventDetails =
    event.description || event.details || event.short_description || "";

  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=${eventStart}/${eventEnd}&details=${encodeURIComponent(
    eventDetails
  )}&location=${encodeURIComponent(eventLocation)}`;

  return (
    <div className=" min-h-screen pb-20">
      {/* ---------- TOP HERO ---------- */}
      <HeroSection title={eventTitle} subtitle={event.short_description || ""}>
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
          <li className="font-bold text-white">{eventTitle}</li>
        </ul>
      </HeroSection>

      {/* ---------- TICKET CARD ---------- */}
      <div className="max-w-5xl mx-auto mt-10 bg-white shadow rounded-xl overflow-hidden border">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* MIDDLE CONTENT */}
          <div className="p-8 border-t md:border-t-0 md:border-l   flex flex-col justify-start">
            <h2 className="text-3xl font-bold">{eventTitle}</h2>
            <p>{event.short_description}</p>

            <div className="mt-6 space-y-3 text-gray-700">
              <div className="flex items-center justify-between gap-4 text-xs font-semibold text-gray-700">
                {/* Start Date & Time */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
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
                      <span className="font-bold text-sm">
                        Start Date-Time:
                      </span>
                      <span className="text-md text-gray-600">
                        {event.from_date ||
                          event.start_time ||
                          "Sat Feb 10 2025"}{" "}
                        <bladge className="text-[10px] text-purple-500">
                          {event.start_time || "10:00AM"}
                        </bladge>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-px h-8 bg-gray-300"></div>

                <div className="flex items-center gap-2">
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
                    <span className="font-bold text-sm">End Date-Time:</span>
                    <span className="text-md text-gray-600">
                      {event.to_date || event.to_time || "Sat Feb 10 2025"}{" "}
                      <bladge className="text-[10px] text-orange-500">
                        {event.end_time || "5:00PM"}
                      </bladge>
                    </span>
                  </div>
                </div>
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
                  {event.location || "5323 Gilroy St Gilroy, CA"}
                </span>
              </div>
              <h4 className="text-md font-bold mt-3">Share With Friends :</h4>
              <div className="flex gap-2 items-center">
                <a
                  href={event.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={event.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-pink-600 rounded-xl hover:bg-pink-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={event.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.003V9h3.104v1.561h.044c.432-.818 1.49-1.683 3.065-1.683 3.276 0 3.878 2.155 3.878 4.958v6.616zM5.337 7.433a1.804 1.804 0 110-3.608 1.804 1.804 0 010 3.608zM6.956 20.452H3.716V9h3.24v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SUBSCRIBE BOX */}
          <div className="p-8 border-t md:border-t-0 md:border-l-4 border-dashed flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-3">Subscribe Now</h3>

            <div className="flex items-center justify-between gap-10">
              <h4 className="font-bold">Click to Add your Calendra</h4>
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition">
                  Add to Calendar
                </button>
              </a>
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
                {(() => {
                  const mapUrl =
                    event.locationLink ||
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      event.location || event.address || ""
                    )}`;
                  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                    mapUrl
                  )}`;
                  return (
                    <img src={qrSrc} className="w-32 h-32 rounded" alt="QR" />
                  );
                })()}
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
              {event.image ? (
                <Image
                  src={formatImageUrl(event.image)}
                  fill
                  className="object-cover"
                  alt="photo1"
                />
              ) : (
                <Image
                  src="/images/banner-3.jpg"
                  fill
                  className="object-cover"
                  alt="photo1"
                />
              )}
            </div>
           <p
  className="text-gray-700 leading-relaxed"
  dangerouslySetInnerHTML={{
    __html: event.description || event.details || "No details available."
  }}
/>

          </div>

          {/* PHOTOS + VIDEOS */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-4">Event Photos And Videos</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {event?.gallery_images && event.gallery_images.length > 0 ? (
                event.gallery_images.map((item) => (
                  <div
                    key={item.id}
                    className="relative h-56 rounded overflow-hidden bg-gray-200"
                  >
                    <Image
                      src={item.image}
                      alt={`gallery-${item.id}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-3">
                  No gallery images available
                </p>
              )}
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
                <p className="font-semibold mb-0">
                  {event.organizer || "Organizer Name"}
                </p>
                <p className="text-sm text-gray-500">Event Organizer</p>
              </div>
            </div>

            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              {event.contact_detail || "(415)444-3434"}
            </p>

            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              {event.email || "eino_runolf_sdottir@yahoo.com"}
            </p>

            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
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
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                  />
                </svg>
              </span>
              <a
                href={event.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-600"
              >
                {event.website_url}
              </a>
            </p>

            {/* Social Media Links */}
            {event.instagram && (
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="p-2 bg-violet-100 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </span>
                <a
                  href={event.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600"
                >
                  Instagram
                </a>
              </p>
            )}

            {event.facebook && (
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="p-2 bg-violet-100 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </span>
                <a
                  href={event.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600"
                >
                  Facebook
                </a>
              </p>
            )}

            {event.twitter && (
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="p-2 bg-violet-100 rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </span>
                <a
                  href={event.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600"
                >
                  Twitter
                </a>
              </p>
            )}
          </div>
        </div>
        {/* end */}
      </div>
    </div>
  );
}
