"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/app/Helper/Helper";
import Eye from "../../assets/images/eye.svg";
import { motion } from "framer-motion";
import SkeletonCard from "@/app/components/skeleton/SkeletonCard";
import { formatImageUrl } from "../../Helper/imageUtils";
import HeroSection from "@/app/components/hero/HeroSection";

const ServiceDetails = () => {
  const { slug } = useParams();
  const [serviceDetails, setServiceDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axiosInstance(
          `/service-details/${slug}?page=${currentPage}`
        );
        setServiceDetails(response.data.data.data);
        setTotalPages(response.data.data.last_page);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [slug, currentPage]);

  const handlePageSelect = (page) => setCurrentPage(page);

  return (
      
    <section>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HeroSection
          title="Welcome to our Blog"
          subtitle="Discover the best premium listings curated specially for you."
        >
          <ul className="flex justify-center gap-2 text-gray-600 mt-3">
            <li>
              <Link
                href="/"
                className="text-violet-200 font-semibold hover:text-violet-300"
              >
                Home
              </Link>
            </li>
            <li className="text-violet-200">/</li>
            <li className="font-bold text-white">
            <span className="text-white capitalize">{slug}</span>
            </li>
          </ul>
        </HeroSection>
        {/* <BannerSection /> */}
      </motion.header>
      <div className="container mx-auto px-6 py-12">
        {/* ---------- Page Heading ---------- */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-800"
          >
         </motion.h2>
         <h2 className="text-2xl font-bold text-white mb-0 capitalize">{slug}</h2>
        </div>

        {/* ---------- Loading Skeleton ---------- */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* ---------- Services Grid ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {serviceDetails.length > 0 ? (
                serviceDetails.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-56 w-full">
                      <Image
                        src={formatImageUrl(service.image)}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {new Date(service.created_at).toLocaleDateString()}
                        </span>

                        <span className="flex items-center gap-1">
                          <Image src={Eye} alt="views" width={16} height={16} />{" "}
                          120
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-semibold text-gray-800 line-clamp-1">
                        {service.title}
                      </h3>

                      <p
                        className="text-gray-600 mt-2 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: service.short_description,
                        }}
                      />

                      <Link
                        href={`/blog/${service.slug}`}
                        className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-100">No service found.</p>
              )}
            </div>

            {/* ---------- Pagination ---------- */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <div className="flex gap-3">

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageSelect(i + 1)}
                      className={`px-4 py-2 rounded-lg border text-sm transition-all
                      ${
                        currentPage === i + 1
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ServiceDetails;
