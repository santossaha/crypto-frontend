"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/app/Helper/Helper";
import { motion } from "framer-motion";
import HeroSection from "@/app/components/hero/HeroSection";
import Card, { SkeletonCardLoading } from "@/app/components/card/Card";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const ServiceDetails = () => {
  const { slug } = useParams();
  console.log("ServiceDetails component rendered with slug:", slug);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const increaseView = async (serviceId) => {
    try {
      await axiosInstance.get(`/blog/${serviceId}/view`);
      setServiceDetails((prev) =>
        prev.map((service) =>
          service.id === serviceId
            ? { ...service, view_count: (service.view_count ?? 0) + 1 }
            : service
        )
      );
    } catch (err) {
      console.error("View API failed", err);
    }
  };

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
              <SkeletonCardLoading key={i} index={i} />
            ))}
          </div>
        ) : (
          <>
            {/* ---------- Services Grid ---------- */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {serviceDetails.length > 0 ? (
                serviceDetails.map((service, index) => (
                  <Card
                    key={service.id}
                    item={service}
                    index={index}
                    onView={increaseView}
                  />
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