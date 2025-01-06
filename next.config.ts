import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // permanent redirect (HTTP status 301)
      },
    ];
  },
};

export default nextConfig;
