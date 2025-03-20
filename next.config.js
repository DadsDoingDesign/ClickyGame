/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Add this line to generate static output
  distDir: 'public', // Specify the output directory as 'public' for Vercel
};

module.exports = nextConfig;
