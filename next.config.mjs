/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/logos/cocoon-logo.ico"
      }
    ];
  }
};

export default nextConfig;
