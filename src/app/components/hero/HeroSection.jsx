import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#9850ee] to-[#fdb748] text-white min-h-screen flex items-center">
      <div className="container mx-auto px-8 py-5 flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-start md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Buy, Sell & Accept <br className="hidden sm:block" />
            Cryptocurrency <br /> With Ease
          </h1>
          <p className="text-gray-300 text-base text-start sm:text-lg mb-8  md:mx-0">
            A fast, secure, and user-friendly platform to trade Bitcoin,
            Ethereum, and other digital assets. Join millions embracing the
            future of finance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            {/* Outline Button */}
            <button className="flex items-center justify-center gap-2 px-6 py-2.5 border border-indigo-500 rounded-xl text-white hover:bg-indigo-500/20 transition">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Content (Image / Illustration) */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute bg-white/10 rounded-full w-72 h-72 md:w-96 md:h-96 blur-3xl -z-10" />
          {/* Use a remote Unsplash illustration to avoid missing local assets */}
          <Image
  src="/images/about-02.png"
  alt="Crypto Illustration"
  width={420}
  height={420}
  className="w-64 sm:w-80 md:w-[420px]"
/>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
