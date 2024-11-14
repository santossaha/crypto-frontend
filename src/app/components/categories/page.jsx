"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import p1 from "../../assets/images/p-1.jpg";
import p2 from "../../assets/images/e-1.jpg";
import p3 from "../../assets/images/e-2.jpg";
import e1 from "../../assets/images/e-1.jpg";
import e2 from "../../assets/images/e-2.jpg";
import e3 from "../../assets/images/e-3.jpg";
import e4 from "../../assets/images/e-4.jpg";
import e5 from "../../assets/images/e-5.jpg";
import axiosInstance from "@/app/Helper/Helper";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance("/latest-news-category");
        if (response.data.status === "success") {
          setCategories(response.data.data); 
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="category-group">
      <div className="category-group-area">
        <div className="group-section">
          <h4>Categories</h4>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Link className="linkbtn" href="/">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="blog-list">
          <ul>
            <li>
              <Link className="postitem" href="/blog-details">
                <div className="picarea">
                  <Image
                    className="img"
                    src={e3}
                    alt="slider1"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="postinfo">
                  <h5>Bitcoin rally: a digital gold rush.</h5>
                  <p>March 12, 2024</p>
                </div>
              </Link>
            </li>

            <li>
              <Link className="postitem" href="/blog-details">
                <div className="picarea">
                  <Image
                    className="img"
                    src={p1}
                    alt="slider1"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="postinfo">
                  <h5>Bitcoin rally: a digital gold rush.</h5>
                  <p>March 12, 2024</p>
                </div>
              </Link>
            </li>

            <li>
              <Link className="postitem" href="/blog-details">
                <div className="picarea">
                  <Image
                    className="img"
                    src={p2}
                    alt="slider1"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="postinfo">
                  <h5>Bitcoin rally: a digital gold rush.</h5>
                  <p>March 12, 2024</p>
                </div>
              </Link>
            </li>

            <li>
              <Link className="postitem" href="/blog-details">
                <div className="picarea">
                  <Image
                    className="img"
                    src={p3}
                    alt="slider1"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="postinfo">
                  <h5>Bitcoin rally: a digital gold rush.</h5>
                  <p>March 12, 2024</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="group-photo">
          <h4>Images</h4>
          <ul>
            <li>
              <Link className="picarea" href="/">
                <Image
                  className="img"
                  src={e1}
                  alt="slider2"
                  width={100}
                  height={100}
                />
              </Link>
            </li>
            <li>
              <Link className="picarea" href="/">
                <Image
                  className="img"
                  src={e2}
                  alt="slider2"
                  width={100}
                  height={100}
                />
              </Link>
            </li>
            <li>
              <Link className="picarea" href="/">
                <Image
                  className="img"
                  src={e3}
                  alt="slider2"
                  width={100}
                  height={100}
                />
              </Link>
            </li>
            <li>
              <Link className="picarea" href="/">
                <Image
                  className="img"
                  src={e4}
                  alt="slider2"
                  width={100}
                  height={100}
                />
              </Link>
            </li>
            <li>
              <Link className="picarea" href="/">
                <Image
                  className="img"
                  src={e5}
                  alt="slider2"
                  width={100}
                  height={100}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;
