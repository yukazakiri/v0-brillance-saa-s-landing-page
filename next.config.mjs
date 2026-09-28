/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: '/academics',
        destination: '/courses',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
