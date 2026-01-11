"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import "./style.css";
import axiosInstance from "@/app/Helper/Helper";
import { formatImageUrl } from "../../Helper/imageUtils";
import HeroSection from "@/app/components/hero/HeroSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NewsSidebar from "./NewsSidebar";
import ViewCounter from "../../components/ViewCounter";
import LiveViews from "../../components/LiveViews";

async function getNewsDetails(slug) {
  try {
    const response = await axiosInstance(`/news-details/${slug}`);
    return response.data[0] || response.data;
  } catch (error) {
    console.error("Error fetching news details:", error);
    // Fallback to list API
    const listResponse = await axiosInstance("/get-latest-data");
    const news = listResponse.data.latest_news || [];
    const newsItem = news.find(n => n.slug === slug);
    return newsItem || null;
  }
}

async function getLatestNews() {
  try {
    const response = await axiosInstance("/get-latest-data");
    const news = response.data.latest_news || [];
    return news.slice(0, 4);
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return [];
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

const SingleNewsDetail = async ({ params }) => {
  const slug = (await params).slug;
  const newsDetails = await getNewsDetails(slug);
  const latestNews = await getLatestNews();

  if (!newsDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">News not found</p>
      </div>
    );
  }

  const publishDate = new Date(newsDetails.created_at);
  const formattedDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`;

  return (
    <>
    <ViewCounter id={newsDetails.id} type="news" />

      {/* Hero Section with Suspense */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection>
          <h1 className="text-3xl text-white font-bold mb-4 animate-fade-in max-w-3xl mx-auto">
            {newsDetails.title}
          </h1>
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-center gap-2 text-gray-200">
            <Link href="/" className="text-violet-100 hover:text-violet-300 transition">Home</Link>
            <span>/</span>
            <Link href="/news" className="text-violet-100 hover:text-violet-300 transition">News</Link>
            <span>/</span>
            <span className="text-white font-semibold">{newsDetails.title}</span>
          </nav>
        </HeroSection>
      </Suspense>

      {/* Main Content Section with Suspense */}
      <Suspense fallback={<ContentSkeleton />}>
      <div className=" py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - News Content */}
            <div className="lg:col-span-2">

              {/* Title Card */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-8">


                    {/* Hero Image */}
                    <div className="relative">
                        <div className="relative w-full h-96 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                        <Image
                            src={formatImageUrl(newsDetails.image)}
                            alt={newsDetails.title}
                            fill
                            sizes="100vw"
                            style={{ objectFit: "cover" }}
                            priority
                        />
                            {/* Category Badge */}
                            <div className="absolute top-6 left-6 bg-gradient-to-r from-purple-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                {newsDetails.type || "News"}
                            </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {newsDetails.title}
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
                        <LiveViews initialViews={newsDetails.views || 0} />
                    </div>
                    </div>

                </div>
            </div>

              {/* News Content */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="prose prose-lg max-w-none">
                  <div
                    dangerouslySetInnerHTML={{ __html: newsDetails.content || newsDetails.short_description || '' }}
                    className="text-gray-700 leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <NewsSidebar latestNews={latestNews} />
          </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default SingleNewsDetail;