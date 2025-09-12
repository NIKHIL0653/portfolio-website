"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useMemo } from "react"
import { posts } from "@/data/blogs"
import { BlogFilters } from "@/components/blog-filters"

type Category = 'All Posts' | 'Development' | 'AI/ML' | 'Data' | 'Blogging'

export default function BlogIndexPageClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('All Posts')

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All Posts') {
      return posts
    }
    return posts.filter(post => post.category === activeCategory)
  }, [activeCategory])

  const handleFilterChange = (category: Category) => {
    setActiveCategory(category)
  }

  // Format date from YYYY-MM-DD to D MMM YY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' })
    const year = date.getFullYear().toString().slice(-2)
    return `${day} ${month} ${year}`
  }

  return (
    <main className="min-h-dvh flex flex-col bg-[#fafafa] dark:bg-[#0f1419]">
      <div className="flex-1 flex items-center justify-center p-2 sm:p-6 lg:p-8" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div className="w-full max-w-6xl">
          <div className="px-3 sm:px-8 py-6 sm:py-8">
            <header className="mb-3 sm:mb-4">
              <h1 className="text-2xl sm:text-3xl font-semibold">Blog</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">Writings on frontend, accessibility, and product craft.</p>
            </header>

        <BlogFilters
          onFilterChange={handleFilterChange}
          activeCategory={activeCategory}
        />

        {filteredPosts.length > 0 ? (
          <div className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
            {/* Fixed vertical dotted lines */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="hidden lg:block absolute left-1/3 top-0 bottom-0 w-px border-r border-dotted border-gray-300 dark:border-gray-600"></div>
              <div className="hidden lg:block absolute left-2/3 top-0 bottom-0 w-px border-r border-dotted border-gray-300 dark:border-gray-600"></div>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 relative z-10">
              {filteredPosts.map((post, index) => (
                <li
                  key={post.slug}
                  className="border-dotted border-gray-200 dark:border-gray-700"
                  style={{ borderStyle: 'dotted' }}
                >
                <Link href={`/blog/${post.slug}`} className="group block h-full hover:opacity-90 transition-opacity">
                  <article className="flex flex-col h-full">
                    {post.image && (
                      <div className="relative aspect-[16/10] w-full p-2 sm:p-3">
                        <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                          <Image
                            src={post.image}
                            alt={post.imageAlt || post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    )}
                    <div className="px-3 sm:px-4 pb-6 sm:pb-8 flex flex-col gap-2 flex-grow">
                      {/* Category and Date Row */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full font-medium">
                          {post.category}
                        </span>
                        <div className="text-xs text-muted-foreground font-sans">
                          {formatDate(post.date)}
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-sm sm:text-base font-semibold leading-tight" style={{ fontSize: '20px' }}>
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground line-clamp-2 transition-colors duration-200">{post.excerpt}</p>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
            </ul>
          </div>
        ) : (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No posts in {activeCategory} category yet
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                We're working on creating amazing content for this category. Check back soon or explore other categories.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => handleFilterChange('All Posts')}
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  View All Posts
                </button>
              </div>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </main>
  )
}