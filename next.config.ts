import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prefer optimized images via next/image + MediaImage conventions.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 390, 430, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Pin Turbopack root to this app (avoids parent-directory lockfile confusion).
  turbopack: {
    root: path.join(__dirname),
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
