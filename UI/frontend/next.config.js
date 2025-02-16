/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // This is important for static hosting
  trailingSlash: true,
}

module.exports = nextConfig 