/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize development performance
  reactStrictMode: true,
  poweredByHeader: false,
  // Enable static export
  output: 'export',
  // Optimize module compilation
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Experimental features for better performance
  experimental: {
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: ['@heroicons/react', '@react-three/drei', '@react-three/fiber', 'three'],
  },
};

export default nextConfig;
