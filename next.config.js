/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Generate static output
  distDir: 'out',    // Use 'out' instead of 'public'
};

module.exports = nextConfig;
