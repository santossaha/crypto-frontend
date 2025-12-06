"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/app/Helper/Helper";
import Eye from "../../assets/images/eye.svg";
import SkeletonCard from "@/app/components/skeleton/SkeletonCard";
import { motion } from "framer-motion";
import { formatImageUrl } from "../../Helper/imageUtils";

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
        setServiceDetails(response.data.data.data); // Nested data
        setTotalPages(response.data.data.last_page);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [slug, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <section className="newsGroup">
        <div className="container">
          <div className="row">
            <div className="service-details-page">
              <div className="col-md-6 col-lg-9">
                <div className="newsCard">
                  <div className="subHeadline">
                    <h3>Service Details dd: {slug}</h3>
                  </div>
                  <div className="row">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="newsGroup">
      <div className="container">
        <div className="row">
          <div className="service-details-page">
            <div className="col-md-6 col-lg-9">
              <div className="newsCard">
                <div className="subHeadline">
                  <h3>Service Details: {slug}</h3>
                </div>
                <div className="row">
                  {serviceDetails.length > 0 ? (
                    serviceDetails.map((service) => (
                      <div key={service.id} className="col-md-12 col-lg-4">
                        <motion.div
                          className="cardBox"
                          whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                            transition: { duration: 0.3 }
                          }}
                          initial={{ scale: 1, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="picArea">
                            <Image
                              className="img"
                              src={formatImageUrl(service.image)}
                              alt={service.title}
                              width={500}
                              height={300}
                              style={{ objectFit: 'cover' }}
                              priority
                            />
                          </div>
                          <div className="cardInfo">
                            <p>
                              {new Date(
                                service.created_at
                              ).toLocaleDateString()}{" "}
                              <span>
                                <Image
                                  className="eye-icon"
                                  src={Eye}
                                  alt="eye"
                                  width={16}
                                  height={16}
                                />{" "}
                                120 Views
                              </span>
                            </p>
                            <h4>{service.title}</h4>
                            <h5
                              dangerouslySetInnerHTML={{
                                __html: service.short_description,
                              }}
                            />
                            <p>
                              <Link
                                className="read-more"
                                href={`/blog/${service.slug}`}
                              >
                                Read More
                              </Link>
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    ))
                  ) : (
                    <p>No services found for this category.</p>
                  )}
                </div>
                <nav
                  aria-label="..."
                  className="d-flex justify-content-end me-3 mb-5"
                >
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageSelect(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
