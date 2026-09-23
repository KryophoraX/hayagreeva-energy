import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/about", destination: "/company", permanent: true },
      { source: "/career", destination: "/company/careers", permanent: true },
      {
        source: "/manufacturing",
        destination: "/engineering#manufacturing",
        permanent: true,
      },
      { source: "/products", destination: "/cooling-as-a-service", permanent: true },
      {
        source: "/products/:path*",
        destination: "/cooling-as-a-service",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
