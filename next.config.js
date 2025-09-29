/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-api-domain.com', 'signage.lotusdm.com'],
    unoptimized: false,
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig