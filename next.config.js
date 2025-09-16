/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Explicitly disable experimental features that might cause warnings
  experimental: {
    // Remove any experimental.appDir if it exists
  }
}

module.exports = nextConfig
