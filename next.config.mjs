/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
      },
      {
        protocol: "http",
        hostname: "13.233.93.31",
      },
    ],
  },

  env: {
    API_URL: process.env.API_URL, 
  },

  reactStrictMode: false,
};

export default nextConfig;
