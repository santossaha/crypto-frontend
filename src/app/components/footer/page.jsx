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
            <div className="lg:w-1/2">
              <div className="flex items-start gap-4">
                <Image src={p1} alt="logo" width={120} height={40} />
              </div>
              <p className="text-gray-300 mt-6 max-w-xl">
                Cryptocurrency is a type of virtual currency that uses cryptography to secure
                transactions that are digitally recorded on a distributed ledger, such as a
                blockchain.
              </p>

              <div className="flex items-center gap-3 mt-6">
                <Link href="/" className="p-2 bg-white/10 rounded-full">
                  <Image src={m1} alt="facebook" width={22} height={22} />
                </Link>
                <Link href="/" className="p-2 bg-white/10 rounded-full">
                  <Image src={m2} alt="twitter" width={22} height={22} />
                </Link>
                <Link href="/" className="p-2 bg-white/10 rounded-full">
                  <Image src={m3} alt="instagram" width={22} height={22} />
                </Link>
              </div>
            </div>

            <div className="lg:w-1/4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-4">Useful Links</h4>
                <ul className="space-y-3 text-gray-300">
                  <li>
                    <Link href="/" className="hover:text-white">Home</Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-white">Exchange</Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-white">Features</Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-white">Contact Us</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <span>📞</span>
                    <span>(406) 555-012</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span>✉️</span>
                    <span>demos@example.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span>🏠</span>
                    <span>Elgin St. Celina, Delaware 10299</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <p className="text-gray-300 text-sm">@2025 - All Rights Reserved by Crupto News.</p>
            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-r from-[#9850ee] to-[#fdb748] text-white px-4 py-2 rounded-full shadow-lg">Book Now</button>
              <button className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center">▲</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default page;
