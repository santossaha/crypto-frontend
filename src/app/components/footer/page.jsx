import React from "react";
import Link from "next/link";
import Image from "next/image";
import p1 from "../../assets/images/logo.png";
import m1 from "../../assets/images/facebook.svg";
import m2 from "../../assets/images/twitter.svg";
import m3 from "../../assets/images/instagram.svg";
const page = () => {
  return (
    <footer className="mt-12">
     
      <div className="bg-gradient-to-r from-[#1b1740] via-[#221a57] to-[#071129] text-white">
       
        <div className="container mx-auto px-6 py-16">
         
          <div className="flex flex-col lg:flex-row gap-8">
           
            <div className="lg:basis-[40%]">
             
              <div className="flex items-start gap-4">
               
                <Image src={p1} alt="logo" width={120} height={40} />
              </div>
              <p className="text-gray-300 mt-6 max-w-xl">
               
                Cryptocurrency is a type of virtual currency that uses
                cryptography to secure transactions that are digitally recorded
                on a distributed ledger, such as a blockchain.
              </p>
              <div className="flex justify-start gap-2 items-center my-3">
                {/* Facebook */}
                <Link
                  href="/"
                  className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
                  </svg>
                </Link>

                {/* Twitter / X */}
                <Link
                  href="/"
                  className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.3 3H20l-6.6 7.5L21 21h-6.3l-5-6.4L4 21H1.3l7.2-8.1L2 3h6.5l4.5 5.8L17.3 3z" />
                  </svg>
                </Link>

                {/* Instagram */}
                <Link
                  href="/"
                  className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.3A2.8 2.8 0 1 1 14.8 12 2.8 2.8 0 0 1 12 14.8zm4.8-9.8a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
             
              <div>
               
                <h4 className="text-white font-semibold mb-4">
                  Useful Links
                </h4>
                <ul className="space-y-3 text-gray-300">
                 
                  <li>
                   
                    <Link href="/" className="hover:text-white">
                     
                      Home
                    </Link>
                  </li>
                  <li>
                   
                    <Link href="/" className="hover:text-white">
                     
                      Exchange
                    </Link>
                  </li>
                  <li>
                   
                    <Link href="/" className="hover:text-white">
                     
                      Features
                    </Link>
                  </li>
                  <li>
                   
                    <Link href="/" className="hover:text-white">
                     
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
               
                <h4 className="text-white font-semibold mb-4">
                  Contact Us
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <span  className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2a7 7 0 00-7 7v4a3 3 0 003 3h1v-6H7V9a5 5 0 0110 0v1h-2v6h1a3 3 0 003-3V9a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <span>(406) 555-012</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span  className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5h18v14H3V5zm0 0l9 7 9-7"
                        />
                      </svg>
                    </span>
                    <span>demos@example.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span  className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 11.5a3 3 0 100-6 3 3 0 000 6zm0 9.5s7-5 7-11a7 7 0 10-14 0c0 6 7 11 7 11z"
                        />
                      </svg>
                    </span>
                    <span>Elgin St. Celina, Delaware 10299</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
         
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <p className="text-gray-300 text-sm">
              @2025 - All Rights Reserved by Crypto News.
            </p>
            <div className="flex items-center gap-4">
              <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition">
                Book Now
              </button>
              <button className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center">
                ▲
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default page;
