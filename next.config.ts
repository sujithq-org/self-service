import type { NextConfig } from 'next'

// Use GitHub Pages-friendly settings in production so all assets and RSC
// requests are correctly resolved under the repository path (e.g., /self-service).
// Additionally, allow opting-in to the same behavior during local dev by setting
// NEXT_PUBLIC_USE_BASEPATH=true in .env.local.
const isProd = process.env.NODE_ENV === 'production'
const repoSegment = process.env.NEXT_PUBLIC_GH_REPO || 'self-service'
const repoBase = `/${repoSegment}`
const useBasePathInDev = process.env.NEXT_PUBLIC_USE_BASEPATH === 'true'
const applyBase = isProd || useBasePathInDev

const nextConfig: NextConfig = {
  output: 'export',
  basePath: applyBase ? repoBase : undefined,
  assetPrefix: applyBase ? `${repoBase}/` : undefined,
  images: {
    unoptimized: true
  },
  // Ensures export writes index.html files in folders, which is friendlier for
  // GitHub Pages static hosting.
  trailingSlash: true,
  typescript: {
    tsconfigPath: './tsconfig.next.json'
  }
}

export default nextConfig
