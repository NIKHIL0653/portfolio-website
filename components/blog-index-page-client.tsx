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
  
  const postsForGrid = activeCategory === 'All Posts' ? filteredPosts.slice(1) : filteredPosts;

  return (
    <main className="min-h-dvh flex flex-col bg-[#fafafa] dark:bg-[#121212]">
      <div className="flex-1 flex items-center justify-center p-2 sm:p-6 lg:p-8" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div className="w-full max-w-6xl">
          <div className="px-3 sm:px-8 py-6 sm:py-8 blog-client-container">
            <header className="mb-3 sm:mb-4 pl-2 pr-2 sm:pl-0 sm:pr-0">
              <h1 className="text-2xl sm:text-3xl font-semibold">Blog</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">Writings on frontend, accessibility, and product craft.</p>
            </header>

            <div className="pl-2 pr-2 sm:pl-0 sm:pr-0">
              <BlogFilters
                onFilterChange={handleFilterChange}
                activeCategory={activeCategory}
              />
            </div>

            {filteredPosts.length > 0 ? (
              <div className="relative rounded-md overflow-hidden bg-card border border-gray-600 shadow-lg p-2 blog-article-card">
                {activeCategory === 'All Posts' && filteredPosts.length > 0 && (
                  <article className="border-b border-dashed border-border mb-4 pb-4">
                    <Link href={`/blog/${filteredPosts[0].slug}`} className="group block overflow-hidden rounded-md border border-border">
                      {/* Image container */}
                      <div className="relative aspect-[16/10] md:aspect-[21/9] w-full">
                        {filteredPosts[0].image && (
                          <Image
                            src={filteredPosts[0].image}
                            alt={filteredPosts[0].imageAlt || filteredPosts[0].title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 70vw"
                          />
                        )}
                        <div className="absolute top-3 right-3 z-10">
                          <span className="text-gray-700 dark:text-[#e4e4e7] text-xs font-semibold px-3 py-1 rounded-full border border-border bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rotate-2">
                            Featured
                          </span>
                        </div>
                      </div>
                      
                      <div
                        className="relative py-4 px-2 bg-card"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full font-medium">
                            {filteredPosts[0].category}
                          </span>
                          <div className="text-xs text-muted-foreground font-sans">
                            {formatDate(filteredPosts[0].date)}
                          </div>
                        </div>
                        <h2 className="text-lg sm:text-xl font-semibold leading-tight text-foreground">
                          {filteredPosts[0].title}
                        </h2>
                        <p className="text-sm line-clamp-2 leading-tight mt-1 text-muted-foreground">
                          {filteredPosts[0].excerpt}
                        </p>
                      </div>
                    </Link>
                  </article>
                )}
                
                {postsForGrid.length > 0 && (
                  // MODIFICATION: Removed the relative container and the absolute positioned div for dotted lines
                  <div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {postsForGrid.map((post) => (
                        <li key={post.slug} className="bg-transparent border-none shadow-none">
                          <Link href={`/blog/${post.slug}`} className="group block h-full hover:opacity-90 transition-all duration-300">
                            <article className="group/article flex flex-col h-full">
                              {post.image && (
                                <div className="relative aspect-[16/9] w-full p-0 group/image mb-3">
                                  <div className="relative w-full h-full rounded-md overflow-hidden border border-border">
                                    <Image
                                      src={post.image}
                                      alt={post.imageAlt || post.title}
                                      fill
                                      className="object-cover"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-100 group-hover/image:opacity-0 transition-opacity duration-300"></div>
                                  </div>
                                </div>
                              )}
                              <div className="pb-4 sm:pb-6 flex flex-col gap-4 flex-grow px-4 sm:px-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full font-medium">
                                    {post.category}
                                  </span>
                                  <div className="text-xs text-muted-foreground font-sans">
                                    {formatDate(post.date)}
                                  </div>
                                </div>
                                <h2 className="text-sm sm:text-base font-semibold leading-tight text-foreground" style={{ fontSize: '16px' }}>
                                  {post.title}
                                </h2>
                                <p className="text-sm text-muted-foreground line-clamp-2 leading-tight group-hover/article:text-foreground transition-colors duration-200" style={{ fontSize: '13px' }}>{post.excerpt}</p>
                              </div>
                            </article>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-border rounded-lg p-8 sm:p-12 text-center mt-4 bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Posts Yet
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  There are currently no posts in the "{activeCategory}" category. Please check back later or explore other topics.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => handleFilterChange('All Posts')}
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    View All Posts
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}