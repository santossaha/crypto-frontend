"use client";
import Link from "next/link";
import React, { useState } from "react";
import axiosInstance from "../Helper/Helper";
import Banner from "../components/banner/page";
import p1 from "../assets/images/contacticon.svg";
import e1 from "../assets/images/call-calling.svg";
import e2 from "../assets/images/mail-1.svg";
import e3 from "../assets/images/map.svg";

import "./style.css";
import Image from "next/image";

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required.";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required.";
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be 10 digits.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosInstance.post("/save-contact-us", formData);
      if (response.data.status === "success") {
        setStatusMessage(response.data.message);
        setFormData({
          first_name: "",
          last_name: "",
          phone_number: "",
          email: "",
          address: "",
        });
        setErrors({});
      } else {
        setStatusMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatusMessage("Failed to send. Please try again later.");
    }
  };

  return (
    <div>
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2>Contact</h2>
          <ul>
            <li>
              <Link href="/" className="linkarea">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="contact-section">
          <div className="row">
            <div className="col-md-6 col-lg-5">
              <div className="contact-info">
                <h3>Contact Us</h3>
                <div className="imgarea">
                  <Image src={p1} alt="" className="img" />
                </div>
                <ul>
                  <li>
                    <div className="info-group">
                      <p>General Inquiries</p>
                      <h6>
                        <span>
                          <Image src={e1} alt="" className="img" />
                        </span>
                        1800 419 20001
                      </h6>
                    </div>
                  </li>
                  <li>
                    <div className="info-group">
                      <p>Mail Id</p>
                      <h6>
                        <span>
                          <Image src={e2} alt="" className="img" />
                        </span>
                        demo@gmail.in
                      </h6>
                    </div>
                  </li>
                  <li>
                    <div className="info-group">
                      <p>Address</p>
                      <h6>
                        <span>
                          <Image src={e3} alt="" className="img" />
                        </span>
                        Demo street, New town, 24, Kolkata
                      </h6>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-7">
              <form onSubmit={handleSubmit}>
                <h3>Contact info</h3>
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter first name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  {errors.first_name && (
                    <small className="text-danger">{errors.first_name}</small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter last name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                  {errors.last_name && (
                    <small className="text-danger">{errors.last_name}</small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter phone number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    maxlength={10}
                  />
                  {errors.phone_number && (
                    <small className="text-danger">{errors.phone_number}</small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Id</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    className="form-control"
                    placeholder="Write your address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    cols="3"
                  ></textarea>
                  {errors.address && (
                    <small className="text-danger">{errors.address}</small>
                  )}
                </div>
                <div className="btn-area my-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                {statusMessage && (
                  <div className="alert alert-info">{statusMessage}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
