const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    
    serverComponentsExternalPackages: [
      'rehype-mermaidjs', 
      //'shiki'
    ],
    
    urlImports: ['https://cdn.sanity.io/images/'],
    
  },
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }],

    domains: ['cdn.sanity.io'],
    
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  }
}

module.exports = withBundleAnalyzer(nextConfig)
