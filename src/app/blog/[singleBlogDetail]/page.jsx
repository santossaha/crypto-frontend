import React from "react";
import Image from "next/image";
import Link from "next/link";
import p1 from "../../assets/images/e-9.jpg";
import e1 from "../../assets/images/e-1.jpg";
import e2 from "../../assets/images/e-2.jpg";
import e3 from "../../assets/images/e-3.jpg";
import e4 from "../../assets/images/e-4.jpg";
import Eye from "../../assets/images/eye.svg";
import Banner from "../../components/banner/page";
import "./style.css";
import NewsGroup from "@/app/components/newsGroup/page";
import axiosInstance from "@/app/Helper/Helper";
import LatestNews from "@/app/components/latestNews/page";
import { formatImageUrl } from "../../Helper/imageUtils";

async function getBlogDetails(slug) {
  try {
    const response = await axiosInstance(`/blog-details/${slug}`);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return null;
  }
}
const SingleBlogDetail = async ({ params }) => {
  const slug = (await params).singleBlogDetail;
  const blogDetails = await getBlogDetails(slug);

  return (
    <>
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2>Welcome to our Blog</h2>
          <p>{blogDetails.short_description}</p>
          <ul>
            <li>
              <Link href="/" className="linkarea">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="linkarea">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li>{blogDetails.title}</li>
          </ul>
        </div>
      </div>
      <div className="blog_detail_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="section-1">
                <div className="details-area">
                  <div className="pic-area">
                    <Image
                      className="img"
                      src={formatImageUrl(blogDetails.image)}
                      alt="Blog detail picture"
                      width={800}
                      height={400}
                      priority
                    />
                  </div>
                <div className="info-area">
                    <h6>
                      <span>{blogDetails.type}</span>{' '}
                      {new Date(blogDetails.created_at).toLocaleDateString()}
                    </h6>
                    <h4>{blogDetails.title}</h4>
                    <div 
                      dangerouslySetInnerHTML={{ __html: blogDetails.content }}
                      className="text-black"
                    />
                  </div>
                </div>
              </div>
            </div>
            <LatestNews/>
          </div>
          <NewsGroup />
        </div>
      </div>
    </>
  );
};

export default SingleBlogDetail;
