"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  IconChevronDown,
  IconChevronRight,
  IconFolder,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import Logo from "../../assets/images/logo.png";
import { usePathname } from "next/navigation";
import axiosInstance from "@/app/Helper/Helper";

const Header = () => {
  const pathname = usePathname();
  const isActive = (linkPath) => pathname === linkPath;

  const [getCategories, setGetCategories] = useState([]);
  const [openMobile, setOpenMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dropdown state (click to open)
  const [servicesOpen, setServicesOpen] = useState(false);

  // close dropdown when clicking outside
  const servicesRef = useRef(null);

  useEffect(() => {
    const fetchGetCategories = async () => {
      try {
        const response = await axiosInstance("/get-services");
        setGetCategories(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchGetCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // keyboard accessibility: close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setOpenMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-sm
          bg-gradient-to-r from-[#9850ee]/95 to-[#fdb748]/95 text-white
          ${isScrolled ? "shadow-[0_2px_15px_rgba(0,0,0,0.3)]" : "shadow-none"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image src={Logo} alt="logo" width={160} height={40} />
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-2">

              {/* Nav Link Component with active + hover styles */}
              <Link
                href="/"
                className={`text-sm font-semibold px-3 py-2 rounded-md transition 
                  hover:bg-gray-100/20 hover:text-violet-950 
                  ${isActive("/") ? "bg-gray-100/20 text-violet-950" : ""}`}
              >
                Home
              </Link>

              <Link
                href="/event"
                className={`text-sm font-semibold px-3 py-2 rounded-md transition 
                  hover:bg-gray-100/20 hover:text-violet-950 
                  ${isActive("/event") ? "bg-gray-100/20 text-violet-950" : ""}`}
              >
                Event
              </Link>

              <Link
                href="/airdrop"
                className={`text-sm font-semibold px-3 py-2 rounded-md transition 
                  hover:bg-gray-100/20 hover:text-violet-950 
                  ${isActive("/airdrop") ? "bg-gray-100/20 text-violet-950" : ""}`}
              >
                Airdrop
              </Link>

              {/* Services Dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((s) => !s)}
                  className={`flex items-center gap-1 text-sm font-semibold px-3 py-2 rounded-md transition 
                    hover:bg-gray-100/20 hover:text-violet-950
                    ${servicesOpen ? "bg-gray-100/20 text-violet-950" : ""}`}
                >
                  <span>Services</span>
                  <IconChevronDown 
                    stroke={1} 
                    className={`transition-transform ${servicesOpen ? "rotate-180" : "rotate-0"}`} 
                  />
                </button>

                {/* Dropdown Panel (Width Reduced to w-64) */}
                <div
                  className={`absolute left-0 mt-3 transform z-50 w-64 rounded-lg shadow-lg 
                  border border-gray-200 bg-white text-violet-950 p-3 transition-all origin-top
                  ${servicesOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible pointer-events-none"}`}
                >
                  <div className="grid grid-cols-1 gap-4">
                    {getCategories?.map((group) => (
                      <div key={group.id} className="space-y-2">
                        <h5 className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                          <IconFolder size={16} className="text-[#9850ee]" />
                          {group.type}
                        </h5>

                        <ul className="space-y-1">
                          {group.categories?.map((cat) => (
                            <li key={cat.id}>
                              <Link
                                href={`/service-details/${cat.slug}`}
                                className="flex items-center justify-between gap-2 text-sm text-gray-700 
                                  hover:text-violet-950 hover:bg-gray-100 px-2 py-1 rounded-md transition"
                              >
                                <span>{cat.name}</span>
                                <IconChevronRight size={16} className="text-gray-400" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/blog"
                className={`text-sm font-semibold px-3 py-2 rounded-md transition 
                  hover:bg-gray-100/20 hover:text-violet-950 
                  ${isActive("/blog") ? "bg-gray-100/20 text-violet-950" : ""}`}
              >
                Blog
              </Link>

              <Link
                href="/ico"
                className={`text-sm font-semibold px-3 py-2 rounded-md transition 
                  hover:bg-gray-100/20 hover:text-violet-950 
                  ${isActive("/ico") ? "bg-gray-100/20 text-violet-950" : ""}`}
              >
                ICO
              </Link>

              <Link
                href="/contact"
                className={`text-sm font-semibold px-3 py-2 rounded-md transition 
                  hover:bg-gray-100/20 hover:text-violet-950 
                  ${isActive("/contact") ? "bg-gray-100/20 text-violet-950" : ""}`}
              >
                Contact
              </Link>
            </nav>


            {/* Desktop CTA (optional) */}
            {/* <div className="hidden lg:flex items-center gap-3">
              <Link href="/login">
                <button
                  className="rounded-md px-4 py-2 font-bold text-[#0b0b2a]"
                  style={{ background: "linear-gradient(90deg,#9850ee 0%, #fdb748 100%)" }}
                >
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <button className="rounded-md px-4 py-2 font-bold text-white border border-white/20 bg-white/10">
                  Sign Up
                </button>
              </Link>
            </div> */}

            {/* Mobile Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setOpenMobile((s) => !s)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10"
                aria-label="Toggle menu"
              >
                {openMobile ? <IconX /> : <IconMenu2 />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {openMobile && (
          <div className="lg:hidden bg-gradient-to-r from-[#9850ee] to-[#fdb748] border-t border-white/10">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <Link href="/" className={`block text-white font-medium ${isActive("/") ? "underline" : ""}`}>Home</Link>
              <Link href="/event" className={`block text-white font-medium ${isActive("/event") ? "underline" : ""}`}>Event</Link>
              <Link href="/airdrop" className={`block text-white font-medium ${isActive("/airdrop") ? "underline" : ""}`}>Airdrop</Link>

              {/* Mobile Services: expand/collapse each group */}
              <div className="text-white font-medium mb-2">Services</div>
              <div className="pl-2 space-y-2">
                {getCategories?.map((group) => (
                  <details key={group.id} className="text-sm">
                    <summary className="list-none flex items-center justify-between gap-2 cursor-pointer py-1">
                      <div className="flex items-center gap-2">
                        <IconFolder size={16} />
                        <span>{group.type}</span>
                      </div>
                      <IconChevronDown size={16} />
                    </summary>
                    <ul className="mt-2 pl-4 space-y-1">
                      {group.categories?.map((cat) => (
                        <li key={cat.id}>
                          <Link href={`/service-details/${cat.slug}`} className="text-white/90 block py-1">
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>

              <Link href="/blog" className={`block text-white font-medium ${isActive("/blog") ? "underline" : ""}`}>Blog</Link>
              <Link href="/ico" className={`block text-white font-medium ${isActive("/ico") ? "underline" : ""}`}>ICO</Link>
              <Link href="/contact" className={`block text-white font-medium ${isActive("/contact") ? "underline" : ""}`}>Contact</Link>

              <div className="pt-3 border-t border-white/10 mt-2">
                <Link href="/login">
                  <button
                    className="w-full rounded-md px-4 py-2 font-bold text-[#0b0b2a] mb-2"
                    style={{ background: "linear-gradient(90deg,#9850ee 0%, #fdb748 100%)" }}
                  >
                    Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="w-full rounded-md px-4 py-2 font-bold text-white border border-white/20 bg-white/10">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to avoid content jump */}
      <div aria-hidden className="h-16 w-full" />
    </>
  );
};

export default Header;
