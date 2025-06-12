import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : "img.clerk.com"
      },
      {
        protocol : "https",
        hostname : "images.clerk.dev"
      },
      {
        protocol : "https",
        hostname : "9j5tn8viar.ufs.sh"
      }
    ]
  }
};

export default nextConfig;
