"use client";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/app/Helper/Helper";
import { useEffect, useState } from "react";
import Head from "next/head";

const RecentView = () => {
  const [recentViews, setRecentViews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentViews = async () => {
      try {
        const response = await axiosInstance("/recent-view");
        if (response.data.status === "success") {
          setRecentViews(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching recent views:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentViews();
  }, []);

  const metadata = recentViews.length
    ? {
        title: recentViews[0].meta_title || "Recent View",
        description: recentViews[0].meta_description,
        keywords: recentViews[0].meta_keyword,
        canonical: recentViews[0].canonical,
      }
    : {};

  if (loading) {
    return <div>Loading recent views...</div>;
  }

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={metadata.canonical} />
      </Head>
      <div className="newpostarea">
        <div className="container">
          <div className="subHeadline">
            <h3>Recent View</h3>
          </div>
          <div className="post-area">
            <div className="row">
              {recentViews?.map((view) => (
                <div className="col-md-6" key={view.id}>
                  <Link
                    href={`/blog-details/${view.slug}`}
                    className="postcard"
                  >
                    <div className="info-area">
                      <h6>
                        <span>{view.meta_keyword.toUpperCase()}</span>
                        {new Date().toLocaleDateString()}
                      </h6>
                      <h4>{view.title}</h4>
                      <p>{view.short_description}</p>
                    </div>
                    <div className="pic-area">
                      <Image
                        className="img"
                        src={view.image}
                        alt={view.title}
                        width={500}
                        height={300}
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentView;
