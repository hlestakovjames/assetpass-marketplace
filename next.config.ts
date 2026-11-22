import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep Turbopack scoped to this app instead of detecting a parent lockfile.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
