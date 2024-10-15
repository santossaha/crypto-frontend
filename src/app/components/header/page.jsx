"use client";
import Link from "next/link";
import React from "react";

import Logo from "../../assets/images/logo.png";
import Image from "next/image";

import { usePathname } from "next/navigation";
const Page = () => {
  const pathname = usePathname(); // Get current path

  // Function to check if the current route matches the link
  const isActive = (linkPath) => pathname === linkPath;

  return (
    <div className="headerArea">
      <div className="container d-flex align-items-center">
        <nav className="navbar navbar-expand-lg d-flex flex-grow-1 p-0">
          <Link className="navbar-brand p-0" href="/">
            <Image className="img" src={Logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item px-md-2">
                <Link
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                  aria-current="page"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item px-md-2">
                <Link
                  className={`nav-link ${isActive("/about") ? "active" : ""}`}
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item px-md-2">
                <Link
                  className={`nav-link ${isActive("/content") ? "active" : ""}`}
                  href="/content"
                >
                  Content
                </Link>
              </li>
              <li className="nav-item px-md-2">
                <Link
                  className={`nav-link ${isActive("/service") ? "active" : ""}`}
                  href="/service"
                >
                  Airdrop
                </Link>
              </li>
              <li className="nav-item px-md-2">
                <Link
                  className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item px-md-2">
                <Link
                  className={`nav-link ${isActive("/blog") ? "active" : ""}`}
                  href="/blog"
                >
                  Blog
                </Link>
              </li>
              <li className="nav-item px-md-2">
                <Link
                  className={`nav-link ${
                    isActive("/blog/blog-details") ? "active" : ""
                  }`}
                  href="/blog/blog-details"
                >
                  Blog Details
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="linkArea ms-3">
          <button className="btn btn-primary m-0 py-2 px-4 text-small">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
