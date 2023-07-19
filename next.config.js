/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  secret: 'jarisawesome'
};

module.exports = nextConfig;
