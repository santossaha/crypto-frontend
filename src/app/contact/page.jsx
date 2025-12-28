"use client";
import Link from "next/link";
import React, { useState } from "react";
import axiosInstance from "../Helper/Helper";
import HeroSection from "../components/hero/HeroSection";
import Image from "next/image";
import { IconPhoneCall, IconMail, IconMapPin } from "@tabler/icons-react";

import p1 from "../assets/images/contacticon.svg";
import e1 from "../assets/images/call-calling.svg";
import e2 from "../assets/images/mail-1.svg";
import e3 from "../assets/images/map.svg";

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

  React.useEffect(() => {
    document.title = "Contact Us - Crypto Frontend";
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required.";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required.";
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone must be 10 digits.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email.";
    }
    if (!formData.address.trim()) newErrors.address = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post("/save-contact-us", formData);
      if (response.data.status === "success") {
        setStatusMessage("Thank you! We received your message.");
        setFormData({
          first_name: "",
          last_name: "",
          phone_number: "",
          email: "",
          address: "",
        });
      } else {
        setStatusMessage("Error occurred, try again.");
      }
    } catch (error) {
      setStatusMessage("Failed to send message.");
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <HeroSection
        title="Get In Touch"
        subtitle="We’re here to help you with any questions or support needs."
      >
        <ul className="flex items-center justify-center gap-2 text-white/80 text-sm">
          <li>
            <Link href="/" className="text-violet-200 font-semibold hover:text-violet-300">Home</Link>
          </li>
          <li className="text-violet-200">/</li>
          <li className="text-white font-bold">Contact</li>
        </ul>
      </HeroSection>

      {/* CONTACT SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">

         {/* LEFT INFO BOX */}
<div>
  <h3 className="text-2xl font-semibold mb-3">Contact Information</h3>
  <p className="text-gray-500 text-sm mb-6">
    Got a question? We’d love to hear from you!
  </p>

  <ul className="space-y-6">

    {/* Phone */}
    <li className="flex items-start gap-4">
      <div className="p-3 bg-violet-100 rounded-xl">
        <IconPhoneCall size={26} className="text-[#9850ee]" />
      </div>
      <div>
        <p className="text-gray-800 text-sm font-semibold">Call Us</p>
        <h6 className="text-gray-600 text-lg">1800 419 20001</h6>
      </div>
    </li>

    {/* Email */}
    <li className="flex items-start gap-4">
      <div className="p-3 bg-violet-100 rounded-xl">
        <IconMail size={26} className="text-[#9850ee]" />
      </div>
      <div>
        <p className="text-gray-800 text-sm font-semibold">Email Us</p>
        <h6 className="text-gray-600 text-lg">demo@gmail.in</h6>
      </div>
    </li>

    {/* Address */}
    <li className="flex items-start gap-4">
      <div className="p-3 bg-violet-100 rounded-xl">
        <IconMapPin size={26} className="text-[#9850ee]" />
      </div>
      <div>
        <p className="text-gray-800 text-sm font-semibold">Address</p>
        <h6 className="text-gray-600 text-lg">
          Demo Street, New Town, Kolkata
        </h6>
      </div>
    </li>

  </ul>
</div>


          {/* RIGHT FORM BOX */}
          <div className="bg-white p-10 rounded-2xl  border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-5">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 block mb-1">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg focus:border-teal-400 outline-none"
                  />
                </div>
                <div>
                  <label className="text-gray-600 block mb-1">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg focus:border-teal-400 outline-none"
                  />
                </div>
              </div>

              {/* Phone + Email Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 block mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="9876543210"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg focus:border-teal-400 outline-none"
                  />
                </div>
                <div>
                  <label className="text-gray-600 block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg focus:border-teal-400 outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-gray-600 block mb-1">Message</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Write here..."
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg focus:border-teal-400 outline-none"
                ></textarea>
              </div>

              {/* Button */}
              <button className="w-full px-5 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition">
                Send Message
              </button>

              {statusMessage && (
                <p className="text-center text-teal-500 font-medium mt-2">
                  {statusMessage}
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
