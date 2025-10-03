import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "images.ctfassets.net" }
    ],
  },
  eslint: {
    // Warning: This will remove ESLint checks during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
