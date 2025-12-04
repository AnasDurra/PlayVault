import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.gamedistribution.com",
      },
    ],
  },
};

export default nextConfig;
