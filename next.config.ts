import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "xpmdwicyar.ufs.sh",
      },
      {
        hostname: "lh3.googleusercontent.com", 
      },
    ],
  },
};

export default nextConfig;
