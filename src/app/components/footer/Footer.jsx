"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import p1 from "../../assets/images/logo.png";
import useAppData from "@/app/Hooks/useAppDetail";

const page = () => {
  const { appData, loading, error } = useAppData();

  if (loading) return null;
  if (error) return null;

  const data = appData?.data || appData;

  return (
    <footer className="mt-12">
      <div className="bg-gradient-to-r from-[#1b1740] via-[#221a57] to-[#071129] text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* LEFT */}
            <div className="lg:basis-[40%]">
              <Image src={p1} alt="logo" width={120} height={40} />

              {/* STATIC DESCRIPTION */}
              <p className="text-gray-300 mt-6 max-w-xl">
                Cryptocurrency is a type of virtual currency that uses
                cryptography to secure transactions that are digitally recorded
                on a distributed ledger, such as a blockchain.
              </p>
              <div className="flex justify-start gap-2 items-center my-3">

                {/* Facebook */}
                {data?.facebook && (
                  <Link
                    href={data.facebook}
                    target="_blank"
                    className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
                    </svg>
                  </Link>
                )}
                
                {/* Instagram */}
                {data?.instagram && (
                  <Link
                    href={data.instagram}
                    target="_blank"
                    className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.3A2.8 2.8 0 1 1 14.8 12 2.8 2.8 0 0 1 12 14.8zm4.8-9.8a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z" />
                    </svg>
                  </Link>
                )}
                
                {/* LinkedIn */}
                {data?.linkedin && (
                    <Link
                      href={data.linkedin}
                      target="_blank"
                      className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.366-1.85 3.6 0 4.27 2.368 4.27 5.451v6.29zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.813 20.452H3.861V9h2.952v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0z" />
                      </svg>
                    </Link>
                )}
                {/* Twitter / X */}
                {data?.x && (
                  <Link
                    href={data.x}
                    target="_blank"
                    className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.3 3H20l-6.6 7.5L21 21h-6.3l-5-6.4L4 21H1.3l7.2-8.1L2 3h6.5l4.5 5.8L17.3 3z" />
                    </svg>
                  </Link>
                )}

                {data?.youtube && (
                    <Link
                      href={data.youtube}
                      target="_blank"
                      className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.122C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.376.564A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.122C4.495 20.5 12 20.5 12 20.5s7.505 0 9.376-.564a3.016 3.016 0 0 0 2.122-2.122C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
                      </svg>
                    </Link>
                )}

              </div>

              
            </div>

            {/* RIGHT */}
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* STATIC LINKS */}
              <div>
                <h4 className="font-semibold mb-4">Useful Links</h4>
                <ul className="space-y-3 text-gray-300 footer-links">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/">Exchange</Link></li>
                  <li><Link href="/">Features</Link></li>
                  <li><Link href="/">Contact Us</Link></li>
                </ul>
              </div>

              {/* CONTACT (DYNAMIC) */}
              <div>
                <h4 className="font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3"> <span  className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2a7 7 0 00-7 7v4a3 3 0 003 3h1v-6H7V9a5 5 0 0110 0v1h-2v6h1a3 3 0 003-3V9a7 7 0 00-7-7z" />
                      </svg>
                    </span>{data?.phone || "(406) 555-012"}</li>
                  <li className="flex items-center gap-3">
                    <span  className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5h18v14H3V5zm0 0l9 7 9-7"
                        />
                      </svg>
                    </span>{data?.email || "demos@example.com"}</li>
                  <li className="flex items-center gap-3">
                    <span  className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
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
                    {data?.address},
                    {data?.city}, {data?.state}, {data?.country}
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-4 flex justify-between">
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} {data?.company_name || "Company Name"}
            </p>
            <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-orange-500 rounded-lg">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default page;
