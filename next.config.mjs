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
        source: "/programs",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/programs/bsit",
        destination: "/courses/bs-information-technology",
        permanent: true,
      },
      {
        source: "/programs/bsba",
        destination: "/courses/bs-business-administration-financial-management",
        permanent: true,
      },
      {
        source: "/programs/bshrm",
        destination: "/courses/bs-hotel-and-restaurant-management",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
