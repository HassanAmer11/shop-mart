import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        //https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-*/**",
      },
    ],
  },
};

export default nextConfig;
