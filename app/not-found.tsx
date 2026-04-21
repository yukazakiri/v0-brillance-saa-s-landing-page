import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl sm:text-8xl font-bold text-[#1a3a52] mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
        Page Not Found
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 bg-[#1a3a52] text-white rounded-full font-medium hover:bg-[#1a3a52]/90 transition-colors duration-200"
      >
        Go back home
      </Link>
    </div>
  )
}
