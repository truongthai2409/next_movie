import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['img.ophim.live','lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp']
  }
};

export default nextConfig;