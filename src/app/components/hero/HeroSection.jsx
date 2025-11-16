import React from "react";
import Image from "next/image";

const HeroSection = ({title, subtitle, children }) => {
  return (
    <section className="relative bg-gradient-to-r from-[#9850ee] to-[#fdb748] text-white flex items-center">
      <div className="container mx-auto px-8 py-5 items-center justify-between gap-12 relative z-10">
        {/* Left Content */}
        <div className="w-full md:w-100 text-center md:text-left">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold leading-tight mb-2 capitalize">{title}</h1>
        <p className="text-gray-300 text-base text-center sm:text-lg mb-3  md:mx-0">{subtitle}</p>
         {/* Breadcrumb (children) */}
        <div className="mb-4 text-gray-600 text-sm">
          {children}
        </div>
          

          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
