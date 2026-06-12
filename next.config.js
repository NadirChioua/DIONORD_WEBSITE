/** @type {import('next').NextConfig} */
const nextConfig = {
  // Limit build-time parallelism to avoid OOM on low-memory machines.
  // Only affects the build/static-generation phase, not runtime performance.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  images: {
    remotePatterns: [],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig
