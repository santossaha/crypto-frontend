import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Banner from "../../components/banner/page";
import "./style.css";
import axiosInstance from "@/app/Helper/Helper";
import { formatImageUrl } from "../../Helper/imageUtils";
import HeroSection from "@/app/components/hero/HeroSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata = {
  title: "Blog Detail - Crypto Frontend",
  description: "Detailed view of a blog post covering topics in cryptocurrency and blockchain.",
};

async function getBlogDetails(slug) {
  try {
    const response = await axiosInstance(`/blog-details/${slug}`);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return null;
  }
}

// Skeleton Loaders
const HeroSkeleton = () => (
  <div className="bg-gradient-to-r from-purple-200 to-orange-200 py-12">
    <div className="container mx-auto px-4 text-center">
      <Skeleton height={40} className="mb-4" />
      <Skeleton height={24} width="60%" className="mb-4 mx-auto" />
      <div className="flex justify-center gap-2">
        <Skeleton width="60px" height={20} />
        <Skeleton width="60px" height={20} />
        <Skeleton width="200px" height={20} />
      </div>
    </div>
  </div>
);

const ContentSkeleton = () => (
  <div className="bg-gray-50 py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <Skeleton height={300} className="mb-4" />
            <Skeleton height={32} className="mb-4 w-3/4" />
            <Skeleton height={20} className="mb-2" />
            <Skeleton height={20} className="mb-6 w-1/2" />
            <div className="space-y-3">
              <Skeleton count={3} height={16} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <Skeleton count={5} height={18} className="mb-3" />
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <Skeleton height={24} className="mb-4 w-1/2" />
            <Skeleton circle width={48} height={48} className="mb-4" />
            <Skeleton height={16} count={3} className="mb-4" />
            <Skeleton height={40} />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <Skeleton height={24} className="mb-4 w-1/2" />
            <Skeleton height={40} width="80%" />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <Skeleton height={24} className="mb-4 w-1/2" />
            <Skeleton height={120} className="mb-4" />
            <Skeleton height={40} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SingleBlogDetail = async ({ params }) => {
  const slug = (await params).singleBlogDetail;
  const blogDetails = await getBlogDetails(slug);
 console.log(blogDetails);

  if (!blogDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Blog not found</p>
      </div>
    );
  }

  const publishDate = new Date(blogDetails.created_at);
  const formattedDate = publishDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Hero Section with Suspense */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection>
          <h1 className="text-3xl text-white font-bold mb-4 animate-fade-in max-w-3xl mx-auto">
            {blogDetails.title}
          </h1>
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-center gap-2 text-gray-200">
            <Link href="/" className="text-violet-100 hover:text-violet-300 transition">Home</Link>
            <span>/</span>
            <Link href="/blog" className="text-violet-100 hover:text-violet-300 transition">Blog</Link>
            <span>/</span>
            <span className="text-white font-semibold">{blogDetails.title}</span>
          </nav>
        </HeroSection>
      </Suspense>

      {/* Main Content Section with Suspense */}
      <Suspense fallback={<ContentSkeleton />}>
      <div className=" py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Blog Content */}
            <div className="lg:col-span-2">
             
              {/* Title Card */}
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                 

              {/* Hero Image */}
              <div className="relative">
                <div className="relative w-full h-96 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                  <Image
                    src={formatImageUrl(blogDetails.image)}
                    alt={blogDetails.title}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-purple-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {blogDetails.type || "Blog"}
                  </div>
                </div>
              </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {blogDetails.title}
                </h2>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✍️</span>
                    <span>By Admin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👁️</span>
                    <span>250 views</span>
                  </div>
                </div>

                {/* Short Description */}
                {blogDetails.short_description && (
                  <p className="text-lg text-gray-700 italic mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-purple-600">
                    {blogDetails.short_description}
                  </p>
                )}
              </div>

              {/* Blog Content */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="prose prose-lg max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ __html: blogDetails.content }}
                    className="text-gray-700 leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Author/Info Card */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Blog Author</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Admin</p>
                    <p className="text-xs text-gray-600">Blog Writer</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Share your insights and knowledge with our community of readers.
                </p>
                <button className="w-full bg-gradient-to-r from-purple-400 to-orange-400 text-white py-2 rounded-lg text-sm font-semibold hover:shadow-md transition">
                  Follow Author
                </button>
              </div>

              {/* Share Section */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Share This Post</h3>
                <div className="flex gap-3 flex-wrap">
                  <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:shadow-md transition text-lg">f</a>
                  <a href="#" className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:shadow-md transition text-lg">📷</a>
                  <a href="#" className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:shadow-md transition text-lg">𝕏</a>
                  <a href="#" className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:shadow-md transition text-lg">▶</a>
                </div>
              </div>

              {/* QR Code / Subscribe */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Subscribe</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Scan with your phone to subscribe to our blog updates.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-32 mb-4">
                  <span className="text-gray-400 text-sm">QR Code Placeholder</span>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-400 to-orange-400 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Suspense>
    </>
  );
};

export default SingleBlogDetail;
