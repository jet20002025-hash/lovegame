/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    appDir: true
  },
  // Disable static optimization for dynamic routes
  generateStaticParams: false
}

module.exports = nextConfig
