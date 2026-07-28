import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve the original game screenshots directly on Cloudflare Workers.
    // This avoids requiring a Cloudflare Images binding at runtime.
    unoptimized: true,
  },
};

export default nextConfig;
