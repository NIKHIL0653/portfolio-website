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

  return (
    <main className="min-h-dvh flex flex-col bg-[#fafafa] dark:bg-[#0f1419]">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl">
          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <header className="mb-3 sm:mb-4">
              <h1 className="text-2xl sm:text-3xl font-semibold">Blog</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">Writings on frontend, accessibility, and product craft.</p>
            </header>

        <BlogFilters
          onFilterChange={handleFilterChange}
          activeCategory={activeCategory}
        />

        {filteredPosts.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {filteredPosts.map((post, index) => (
              <li
                key={post.slug}
                className={`border-gray-200 dark:border-gray-700 ${
                  index < filteredPosts.length - 1 ? 'border-r border-b' : ''
                } ${index % 3 !== 2 ? 'lg:border-r' : ''} ${
                  Math.floor(index / 3) < Math.floor((filteredPosts.length - 1) / 3) ? 'border-b' : ''
                }`}
                style={{ borderStyle: 'solid' }}
              >
                <article className="flex flex-col h-full">
                  {post.image && (
                    <div className="relative aspect-[16/10] w-full p-2 sm:p-3">
                      <div className="relative w-full h-full rounded-lg overflow-hidden">
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
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex flex-col gap-2 flex-grow">
                    {/* Category and Date Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full font-medium">
                        {post.category}
                      </span>
                      <div className="text-xs text-muted-foreground font-mono">
                        {post.date}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-sm sm:text-base font-semibold leading-tight">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <Link className="mt-2 text-xs sm:text-sm text-primary hover:underline w-fit" href={`/blog/${post.slug}`}>
                      Read more
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
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