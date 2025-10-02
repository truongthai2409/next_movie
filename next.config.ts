import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["img.ophim.live", "lh3.googleusercontent.com", "unsplash.com"],
    formats: ["image/avif", "image/webp"],
  },
  productionBrowserSourceMaps: false,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
