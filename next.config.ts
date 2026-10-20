import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Lets the dev server be opened from other devices on the local network.
  allowedDevOrigins: ["192.168.2.181"],
  cacheComponents: true,
  images: { formats: ["image/avif", "image/webp"] },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
