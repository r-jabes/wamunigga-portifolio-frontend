import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prefer optimized images via next/image + MediaImage conventions.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 256, 384],
  },
  // Pin Turbopack root to this app (avoids parent-directory lockfile confusion).
  turbopack: {
    root: path.join(__dirname),
  },
  // Enable typedRoutes after planned IA routes (story/work/services/…) ship.
};

export default nextConfig;
