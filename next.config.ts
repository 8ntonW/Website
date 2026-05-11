import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
