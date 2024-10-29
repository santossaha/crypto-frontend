"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Ellipse1 from "../../assets/images/Ellipse-1.png";
import axiosInstance from "@/app/Helper/Helper";

const AboutSection = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axiosInstance("get-aboutus");
        if (response.data.status === "success") {
          setAboutData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return <p>Loading...</p>; 
  }

  return (
    <section className="aboutArea">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-7">
            <div className="infoArea">
              <h1>About Us</h1>
              <div className="backshapeIcon">
                <Image className="img" src={Ellipse1} alt="elp" />
              </div>
              <h3>{aboutData.title}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: aboutData.description,
                }}
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-5">
            <div
              className="aboutPic"
              data-aos="fade-up-right"
              data-aos-duration="1000"
            >
              <span className="topBox"></span>
              <Image
                className="img"
                src={aboutData.image}
                alt="About Us"
                width={500}
                height={300}
              />
              <span className="bottomBox"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
