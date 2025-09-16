"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useMemo } from "react"
import { posts } from "@/data/blogs"
import { BlogFilters } from "@/components/blog-filters"

type Category = 'All Posts' | 'Development' | 'AI/ML' | 'Data' | 'Blogging'

export default function BlogIndexPageClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('All Posts')
  const [showMobileCategoryModal, setShowMobileCategoryModal] = useState(false)

  const categories: Category[] = ['All Posts', 'Development', 'AI/ML', 'Data', 'Blogging']

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All Posts') return posts
    return posts.filter(post => post.category === activeCategory)
  }, [activeCategory])

  const handleFilterChange = (category: Category) => {
    setActiveCategory(category)
    setShowMobileCategoryModal(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' })
    const year = date.getFullYear().toString().slice(-2)
    return `${day} ${month} ${year}`
  }

  const displayPosts = activeCategory === 'All Posts' ? filteredPosts.slice(1) : filteredPosts

  return (
    <main className="blog-index-page min-h-screen bg-[#fafafa] dark:bg-[#121212] overflow-x-hidden mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 py-6 sm:py-8">

        {/* Filters */}
        <div className="mt-4 mb-4">
          {/* Desktop Filters */}
          <div className="hidden md:block">
            <BlogFilters
              onFilterChange={handleFilterChange}
              activeCategory={activeCategory}
            />
          </div>
          
          {/* Mobile Category Button */}
          <div className="md:hidden">
            <div className="bg-card border border-[#E2E8F0] rounded-xl shadow-xl p-2">
              <div
                onClick={() => setShowMobileCategoryModal(true)}
                className="flex items-center space-x-3 text-foreground w-full px-2 py-1 cursor-pointer"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="font-medium text-sm">Categories</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Category Modal */}
        {showMobileCategoryModal && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Backdrop with blur */}
            <div 
              className="absolute inset-0 bg-black/30 backdrop-blur-md transition-all duration-300 ease-out"
              onClick={() => setShowMobileCategoryModal(false)}
              style={{
                animation: 'fadeIn 0.3s ease-out'
              }}
            ></div>
            
            {/* Modal Content - Full Screen Bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 bg-card border-t border-border overflow-hidden"
              style={{
                animation: 'slideUpSmooth 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {/* Gray line at top center */}
              <div className="flex justify-center pt-3 pb-3">
                <div className="w-10 h-1 bg-muted-foreground rounded-full"></div>
              </div>
              
              <div className="px-6 pb-4">
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => handleFilterChange(category)}
                    className="flex items-center justify-between w-full py-2 text-left cursor-pointer"
                  >
                    <span className="font-medium text-foreground text-sm">
                      {category}
                    </span>
                    {activeCategory === category && (
                      <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes slideUpSmooth {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
        `}</style>

        {filteredPosts.length > 0 ? (
          <div className="bg-card border border-[#E2E8F0] rounded-xl shadow-xl p-3 relative">

            {/* Featured Post */}
            {activeCategory === 'All Posts' && filteredPosts.length > 0 && (
              <>
                <div className="mb-4 pb-4">
                  <Link href={`/blog/${filteredPosts[0].slug}`} className="block group">
                    <article className="space-y-4">
                      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-xl overflow-hidden">
                        {filteredPosts[0].image && (
                          <>
                            <Image
                              src={filteredPosts[0].image}
                              alt={filteredPosts[0].imageAlt || filteredPosts[0].title}
                              fill
                              className="object-cover transition-opacity duration-500"
                              sizes="(max-width: 768px) 100vw, 100vw"
                              priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-500 group-hover:opacity-0"></div>
                          </>
                        )}
                      </div>
                      <div className="space-y-2 px-4 transition-colors duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-medium transition-colors duration-300 group-hover:text-foreground">
                            {filteredPosts[0].category}
                          </span>
                          <time className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                            {formatDate(filteredPosts[0].date)}
                          </time>
                        </div>
                        {/* FONT SIZE MODIFIED */}
                        <h2 className="blog-post-title text-xl font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                          {filteredPosts[0].title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 transition-colors duration-300 group-hover:text-foreground">
                          {filteredPosts[0].excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                </div>
                <div className="border-b border-dashed border-border mb-4"></div>
              </>
            )}

            {/* Grid Posts */}
            <div className="relative -mt-4">
              {/* Vertical Lines positioned to start from horizontal line and extend to card bottom */}
              <div className="absolute left-0 right-0 pointer-events-none" style={{ top: '-0.001rem', bottom: '-0.75rem' }}>
                {/* Desktop Column separators */}
                <div className="hidden lg:block h-full">
                  <div className="grid grid-cols-3 h-full">
                    <div className="border-r border-dashed border-border h-full" style={{ transform: 'translateX(-0.2rem)' }}></div>
                    <div className="border-r border-dashed border-border h-full" style={{ transform: 'translateX(0.3rem)' }}></div>
                    <div></div>
                  </div>
                </div>

                {/* Mobile center line */}
                {activeCategory === 'All Posts' && filteredPosts.length > 0 && (
                  <div className="block md:hidden lg:hidden absolute left-1/2 transform -translate-x-1/2 top-0 h-full">
                    <div className="border-r border-dashed border-border h-full"></div>
                  </div>
                )}
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 pt-4 pb-4 ${
                activeCategory === 'All Posts' ? 'gap-y-6' : 'gap-y-4'
              }`}>
                {displayPosts.map((post) => (
                  <div key={post.slug} className="relative z-10">
                    <Link href={`/blog/${post.slug}`} className="block group">
                      <article className="space-y-3 pb-6">
                        {post.image && (
                          <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.imageAlt || post.title}
                              fill
                              className="object-cover transition-opacity duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-500 group-hover:opacity-0"></div>
                          </div>
                        )}
                        <div className="space-y-2 px-4 transition-colors duration-300">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground font-medium transition-colors duration-300 group-hover:text-foreground">
                              {post.category}
                            </span>
                            <time className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                              {formatDate(post.date)}
                            </time>
                          </div>
                          {/* FONT SIZE MODIFIED */}
                          <h3 className="blog-post-title text-xl font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 transition-colors duration-300 group-hover:text-foreground">
                            {post.excerpt}
                          </p>
                        </div>
                      </article>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                No posts in {activeCategory}
              </h3>
              <p className="text-sm text-muted-foreground">
                There are no posts available in this category yet. Check out all posts to see what's available.
              </p>
              <button
                onClick={() => handleFilterChange('All Posts')}
                className="inline-flex items-center px-4 py-2 bg-foreground text-background text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors"
              >
                View All Posts
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}