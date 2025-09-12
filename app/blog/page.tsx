import dynamic from "next/dynamic"

// Dynamically import the client component to avoid hydration issues
const BlogIndexPageClient = dynamic(() => import("../../components/blog-index-page-client"), {
  ssr: false,
  loading: () => (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:py-16">
      <header className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold">Blog</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">Writings on frontend, accessibility, and product craft.</p>
      </header>
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 p-4">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
})

export default function BlogIndexPage() {
  return <BlogIndexPageClient />
}
