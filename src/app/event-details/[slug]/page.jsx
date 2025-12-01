"use client";

import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/app/components/hero/HeroSection";
import banner from "../../assets/images/banner-1.jpg";
import banner2 from "../../assets/images/banner-2.jpg";
import banner3 from "../../assets/images/banner-3.jpg";
import { MdShareLocation, MdUpdate, MdAttachEmail    } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaGlobeEurope } from "react-icons/fa";




export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen pb-20">

      {/* ---------- TOP HERO ---------- */}
      <HeroSection title="Welcome to our Blog" subtitle="Lorem Ipsum is simply dummy text">

        <ul className="flex justify-center gap-2 text-gray-600 mt-3">
          <li><Link href="/" className="text-violet-200 font-semibold hover:text-violet-300">Home</Link></li>
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

            <div className="mt-6 space-y-3 text-gray-700">
              <div className="flex gap-2 items-center">
                <span><MdUpdate className="text-orange-500 text-xl"/></span> <span className="text-sm font-bold text-black">Date and Time</span>
              </div>
              <div className="flex gap-10 items-center text-sm text-gray-500">
                <span className="">Saturday, Feb 23 2019</span><span> 5:00 PM – 11:00 PM</span>
              </div>
              <div className="flex gap-2 items-center">
                <span><MdShareLocation  className="text-orange-500 text-xl"/></span> <span className="text-sm font-bold text-black"> Location</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-500"> 5323 Gilroy St Gilroy, CA</span>
              </div>
            </div>

            
          </div>

          {/* RIGHT SUBSCRIBE BOX */}
          <div className="p-8 border-t md:border-t-0 md:border-l-4 border-dashed flex flex-col justify-center">

            <h3 className="text-xl font-bold mb-3">Subscribe Now</h3>

            <button className="px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg mb-4">
              Add to Calendar
            </button>

            <p className="text-gray-600 text-sm mb-3">
              Scan QR with your phone and you will be subscribed automatically.
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

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEFT SIDE CONTENT */}
        <div className="md:col-span-2 space-y-10">

          {/* EVENT DETAILS */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-3">Events Details</h3>
            <div className="relative h-56 rounded overflow-hidden bg-gray-200 my-3">
                <Image
                  src={banner2}
                  fill
                  className="object-cover"
                  alt="photo1"
                />
              </div>
            <p className="text-gray-700 leading-relaxed">
              We are hosting a dinner party just for our best clients. We are excited to see you there.
              <br /><br />
              The event will be held on Saturday under a beautiful starry night in Gilroy on Mt. Hamilton.
            </p>
          </div>

          {/* PHOTOS + VIDEOS */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-4">Event Photos And Videos</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Photo 1 */}
              <div className="relative h-56 rounded overflow-hidden bg-gray-200">
                <Image
                  src={banner2}
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

            <p className="text-sm font-bold text-black mb-1 flex items-center gap-2"> <span><FaPhoneVolume  className="text-orange-500 text-xl"/></span> Phone Number</p>
            <p className="text-gray-500 mb-3">(415)444-3434</p>

            <p className="text-sm font-bold text-black mb-1 flex items-center gap-2"><span><MdAttachEmail  className="text-orange-500 text-xl"/></span> Email</p>
            <p className="text-gray-500 mb-3">eino_runolf_sdottir@yahoo.com</p>

            <p className="text-sm font-bold text-black mb-1 flex items-center gap-2"><span><FaGlobeEurope className="text-orange-500 text-xl"/></span> Website</p>
            <p className="text-gray-500">www.hilltopgilroy.com</p>
          </div>

        </div>
      </div>
    </div>
  );
}
