"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/app/Helper/Helper";
import { motion } from "framer-motion";
import SkeletonCard from "@/app/components/skeleton/SkeletonCard";
import { formatImageUrl } from "../../Helper/imageUtils";
import HeroSection from "@/app/components/hero/HeroSection";
import formatDate from "@/app/Helper/helperUtils";

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

const ServiceDetails = () => {
  const { slug } = useParams();
  console.log("ServiceDetails component rendered with slug:", slug);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Service Details - Crypto Frontend";
  }, []);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        console.log("Fetching service details for slug:", slug);
        const response = await axiosInstance(`/category-wise-details/${slug}`);
        console.log("API Response:", response);
        console.log("Response data:", response.data);
        
        // Try different response structures
        let services = [];
        if (response.data) {
          if (Array.isArray(response.data)) {
            services = response.data;
          } else if (response.data.data) {
            if (Array.isArray(response.data.data)) {
              services = response.data.data;
            } else if (response.data.data.data) {
              services = response.data.data.data;
            }
          } else if (response.data[0]) {
            services = response.data[0];
          }
        }
        
        console.log("Parsed services:", services);
        setServiceDetails(Array.isArray(services) ? services : []);
        
        // If no data, set some dummy data for testing
        if (!services || services.length === 0) {
          console.log("No data received, setting dummy data");
          setServiceDetails([
            {
              id: 1,
              title: "Test Service 1",
              image: "test-image.jpg",
              short_description: "This is a test service description",
              created_at: new Date().toISOString(),
              slug: "test-service-1"
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
        console.error("Error details:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [slug]);

  return (
      
    <section>
      <motion.header
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HeroSection
          title="Welcome to our Services"
          subtitle="Discover the best premium services curated specially for you."
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
            <li className="font-bold text-white capitalize">{slug}</li>
          </ul>
        </HeroSection>
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
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.15,
                  },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {serviceDetails.length > 0 ? (
                serviceDetails.map((service, index) => (
                  <motion.div
                    key={service.id}
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                    transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer h-full hover:shadow-lg"
                  >
                    {/* Image */}
                    <div className="relative h-56 w-full">
                      <Image
                        src={formatImageUrl(service.image)}
                        alt={service.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.target.src = "/p-1.jpg";
                        }}
                      />
                    </div>
                   
                    

                    {/* Content */}
                    <div className="p-3.5">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                         <span>
                          {formatDate(service.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                         
                          
                          <span>0 views</span>
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
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default ServiceDetails;