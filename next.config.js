/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://t-ai.app",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
