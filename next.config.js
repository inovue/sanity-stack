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
    
    imageSizes: [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 384],
    deviceSizes: [640, 768, 1024, 1280, 1536],
  }
}

module.exports = nextConfig
