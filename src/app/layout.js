import Script from "next/script";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Head from "next/head";
//import CandlestickBackground from "./components/CandlestickBackground";

import "./components/header/style.css";
;
import "./globals.css";
import "./home.css";
import "./components/footer/style.css";
import "bootstrap/dist/css/bootstrap.css";


export const metadata = {
  title: "Crypto Frontend - Your Ultimate Crypto Resource",
  description: "Stay updated with the latest cryptocurrency news, airdrops, ICOs, events, and blockchain insights. Explore our comprehensive crypto platform.",
  keywords: "cryptocurrency, blockchain, crypto news, airdrops, ICO, bitcoin, ethereum, crypto events",
  authors: [{ name: "Crypto Frontend Team" }],
  creator: "Crypto Frontend",
  publisher: "Crypto Frontend",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: "Crypto Frontend - Your Ultimate Crypto Resource",
    description: "Stay updated with the latest cryptocurrency news, airdrops, ICOs, events, and blockchain insights.",
    url: "https://yourwebsite.com", // Replace with your actual URL
    siteName: "Crypto Frontend",
    images: [
      {
        url: "/images/banner.jpg", // Use an image from public/images
        width: 1200,
        height: 630,
        alt: "Crypto Frontend Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Frontend - Your Ultimate Crypto Resource",
    description: "Stay updated with the latest cryptocurrency news, airdrops, ICOs, events, and blockchain insights.",
    images: ["/images/banner.jpg"], // Same image
    creator: "@cryptofrontend", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code", // Add your Google verification code
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"/>
      </Head>
      <body>
        {/* <CandlestickBackground /> */}
        <div className="box">
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
        </div>
        
        {/* Include Bootstrap JS and AOS script */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://unpkg.com/aos@next/dist/aos.js"
          strategy="afterInteractive"
        ></Script>
        

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
