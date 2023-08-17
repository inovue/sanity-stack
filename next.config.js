/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'rehype-mermaidjs'
    ],
  },
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }],
  }
}

module.exports = nextConfig
