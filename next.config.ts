import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.6"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.syahrworks.com" }],
        destination: "https://syahrworks.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
