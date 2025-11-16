import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#9850ee] to-[#fdb748] text-white flex items-center">
      <div className="container mx-auto px-8 py-5 items-center justify-between gap-12 relative z-10">
        {/* Left Content */}
        <div className="w-full md:w-100 text-center md:text-left">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold leading-tight mb-6">
            Buy, Sell & <br />  Accept 
            Cryptocurrency With Ease
          </h1>
          <p className="text-gray-300 text-base text-center sm:text-lg mb-8  md:mx-0">
            A fast, secure, and user-friendly platform to trade Bitcoin,<br />
            Ethereum, and other digital assets. Join millions embracing the
            future of finance.
          </p>

          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
