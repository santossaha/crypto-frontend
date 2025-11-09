"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Logo from "../../assets/images/logo.png";
import { usePathname } from "next/navigation";
import axiosInstance from "@/app/Helper/Helper";

const Header = () => {
  const pathname = usePathname();
  const isActive = (linkPath) => pathname === linkPath;

  const [getCategories, SetGetCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchGetCategories = async () => {
      try {
        const response = await axiosInstance("/get-services");
        SetGetCategories(response.data?.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchGetCategories();
  }, []);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
            <nav className="hidden lg:flex space-x-6 items-center">
              <Link href="/" className={`text-sm font-semibold ${isActive("/") ? "underline" : ""}`}>Home</Link>
              <Link href="/event" className={`text-sm font-semibold ${isActive("/event") ? "underline" : ""}`}>Event</Link>
              <Link href="/airdrop" className={`text-sm font-semibold ${isActive("/airdrop") ? "underline" : ""}`}>Airdrop</Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-sm font-semibold gap-1">
                  Services <IconChevronDown stroke={1} />
                </button>
                <div className="absolute left-0 mt-3 hidden group-hover:block bg-white text-black rounded-lg shadow-lg p-4 w-72 z-50">
                  <div className="grid grid-cols-2 gap-4">
                    {getCategories?.map((group) => (
                      <div key={group.id}>
                        <h5 className="font-semibold mb-2">{group.type}</h5>
                        <ul>
                          {group.categories?.map((category) => (
                            <li key={category.id} className="mb-1">
                              <Link
                                href={`/service-details/${category.slug}`}
                                className="text-sm hover:text-[#9850ee]"
                              >
                                {category.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/blog" className={`text-sm font-semibold ${isActive("/blog") ? "underline" : ""}`}>Blog</Link>
              <Link href="/ico" className={`text-sm font-semibold ${isActive("/ico") ? "underline" : ""}`}>ICO</Link>
              <Link href="/contact" className={`text-sm font-semibold ${isActive("/contact") ? "underline" : ""}`}>Contact</Link>
            </nav>

            {/* Right Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/login">
                <button
                  className="rounded-md px-4 py-2 font-bold text-[#0b0b2a]"
                  style={{
                    background: "linear-gradient(90deg,#9850ee 0%, #fdb748 100%)",
                  }}
                >
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <button className="rounded-md px-4 py-2 font-bold text-white border border-white/20 bg-white/10 ">
                  Sign Up
                </button>
              </Link>
            </div>

            {/* Mobile Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden bg-gradient-to-r from-[#9850ee] to-[#fdb748] border-t border-white/10">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <Link href="/" className={`block text-white font-medium ${isActive("/") ? "underline" : ""}`}>Home</Link>
              <Link href="/event" className={`block text-white font-medium ${isActive("/event") ? "underline" : ""}`}>Event</Link>
              <Link href="/airdrop" className={`block text-white font-medium ${isActive("/airdrop") ? "underline" : ""}`}>Airdrop</Link>
              <div>
                <div className="text-white font-medium mb-2">Services</div>
                <div className="pl-2 space-y-1">
                  {getCategories?.map((group) => (
                    <div key={group.id}>
                      <div className="text-sm font-semibold text-white/90">{group.type}</div>
                      <ul className="pl-3">
                        {group.categories?.map((category) => (
                          <li key={category.id}>
                            <Link
                              href={`/service-details/${category.slug}`}
                              className="text-sm text-white/90 block py-1"
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/blog" className={`block text-white font-medium ${isActive("/blog") ? "underline" : ""}`}>Blog</Link>
              <Link href="/ico" className={`block text-white font-medium ${isActive("/ico") ? "underline" : ""}`}>ICO</Link>
              <Link href="/contact" className={`block text-white font-medium ${isActive("/contact") ? "underline" : ""}`}>Contact</Link>

              <div className="pt-3 border-t border-white/10 mt-2">
                <Link href="/login">
                  <button
                    className="w-full rounded-md px-4 py-2 font-bold text-[#0b0b2a] mb-2"
                    style={{
                      background: "linear-gradient(90deg,#9850ee 0%, #fdb748 100%)",
                    }}
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

      {/* Spacer */}
      <div aria-hidden className="h-16 w-full" />
    </>
  );
};

export default Header;
