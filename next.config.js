/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'rehype-mermaidjs'
    ],
  },
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }],

    domains: ['cdn.sanity.io'],
    
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    imageSizes: [16, 32, 48, 64, 96, 128, 150, 200, 256, 300, 384],
    
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  }
}

module.exports = nextConfig
