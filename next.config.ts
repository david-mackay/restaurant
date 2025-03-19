import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    scrollRestoration: true,
    // If needed for other features:
    // turbo: { ... }
  },
  // Note: Webpack configuration is removed as it's not used with Turbopack
};

export default nextConfig;