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
      {
        protocol: "http",
        hostname: "crypto-blog.test",
      },
      {
        protocol: "https",
        hostname: "crypto-blog.test",
      }
    ],
  },

  env: {
    API_URL: process.env.API_URL, 
  },

  reactStrictMode: false,
};

export default nextConfig;
