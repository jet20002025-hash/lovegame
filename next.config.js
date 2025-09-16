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
  generateStaticParams: false,
  // Add custom headers to prevent index.txt requests
  async headers() {
    return [
      {
        source: '/category/:path*/index.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig
