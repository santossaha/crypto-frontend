"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Logo from "../../assets/images/logo.png";
import { usePathname } from "next/navigation";
import axiosInstance from "@/app/Helper/Helper";

const Page = () => {
  const pathname = usePathname();

  const isActive = (linkPath) => pathname === linkPath;

  const [getCategories, SetGetCategories] = useState([]);

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
  return (
    <div className="headerArea">
      <div className="container d-flex align-items-center">
        <nav className="navbar navbar-expand-lg d-flex flex-grow-1 p-0">
          {/* Logo */}
          <Link className="navbar-brand p-0" href="/">
            <Image className="img" src={Logo} alt="logo" />
          </Link>

          {/* Toggle Button */}
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

          {/* Navbar Links */}
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item px-md-2">
                <Link
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item px-md-2">
                <Link
                  className={`nav-link ${isActive("/event") ? "active" : ""}`}
                  href="/event"
                >
                  Event
                </Link>
              </li>
              <li className="nav-item px-md-2">
                <Link
                  className={`nav-link ${isActive("/airdrop") ? "active" : ""}`}
                  href="/airdrop"
                >
                  Airdrop
                </Link>
              </li>
              <li className="nav-item px-md-2">
                <div className="nav-link mega">
                  <span>
                    Services <IconChevronDown stroke={1} />
                    <div className="megamenu-area">
                      <div className="menu-group">
                        {getCategories.map((group) => (
                          <div className="menu-item" key={group.id}>
                            <h5>{group.type}</h5>
                            <ul>
                              {group.categories.map((category) => (
                                <li key={category.id}>
                                  <Link
                                    className="nav-link"
                                    href={`/${category.type}/${category.slug}`}
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
                  </span>
                </div>
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
                  className={`nav-link ${isActive("/ico") ? "active" : ""}`}
                  href="/ico"
                >
                  ICO
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
            </ul>
          </div>

          {/* Login Button */}
          {/* <div className="linkArea ms-3">
            <Link href="/login">
              <button className="btn btn-primary m-0 py-2 px-4 text-small">Login</button>
            </Link>
          </div> */}
        </nav>
      </div>
    </div>
  );
};

export default Page;
