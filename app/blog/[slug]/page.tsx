import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { posts } from "@/data/blogs"
import { getBlogContent, formatDateWithOrdinal } from "@/lib/blog-utils"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return notFound()
  
  const content = await getBlogContent(params.slug)
  if (!content) {
    return (
      <main className="blog-article-container min-h-screen bg-slate-50 dark:bg-black py-12 px-4">
        {/* Enhanced Dotted Background Pattern */}
        <div className="dotted-background" />

        <div className="relative mx-auto max-w-4xl">
          {/* Back Link - Centered outside the card */}
          <div className="text-center mb-8">
            <Link href="/blog" className="inline-flex items-center text-sm text-primary hover:underline">
              ← Back to all posts
            </Link>
          </div>

          <div className="blog-article-card bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl shadow-white/10 dark:shadow-white/5 overflow-hidden border border-slate-200 dark:border-slate-500">
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <header className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-slate-200 dark:border-slate-700 text-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight text-slate-900 dark:text-white px-2">{post.title}</h1>
                
                {/* Author and Date Info - Mobile Responsive */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-3 text-sm text-slate-600 dark:text-slate-400">
                  {post.author && (
                    <>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <div className="author-avatar">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
                      </div>
                      <div className="hidden sm:block text-slate-400">•</div>
                    </>
                  )}
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <time className="font-medium text-slate-700 dark:text-slate-300">
                      {formatDateWithOrdinal(post.date)}
                    </time>
                  </div>
                </div>
              </header>
              
              <div className="blog-content max-w-none text-center">
                <p>Content for this blog post is coming soon... Create a file named <code>{post.slug}.html</code> in the <code>content/blogs/</code> directory.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="blog-article-container min-h-screen bg-slate-50 dark:bg-black py-8 sm:py-12 px-4">
      {/* Enhanced Dotted Background Pattern */}
      <div className="dotted-background" />

      <div className="relative mx-auto max-w-4xl">
        {/* Back Link - Centered outside the card */}
        <div className="text-center mb-8">
          <Link href="/blog" className="inline-flex items-center text-sm text-primary hover:underline relative z-20">
            ← Back to all posts
          </Link>
        </div>

        {/* Main Article Card */}
        <article className="blog-article-card bg-white dark:bg-[#121212] rounded-2xl shadow-xl shadow-white/10 dark:shadow-white/5 overflow-hidden border border-slate-200 dark:border-slate-500">
          {/* Article Content */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Header Section - Centered */}
            <header className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-slate-200 dark:border-slate-700 text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight text-slate-900 dark:text-white px-2">{post.title}</h1>
              
              {/* Author and Date Info - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-3 text-sm text-slate-600 dark:text-slate-400">
                {post.author && (
                  <>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <div className="author-avatar">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
                    </div>
                    <div className="hidden sm:block text-slate-400">•</div>
                  </>
                )}
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <time className="font-medium text-slate-700 dark:text-slate-300">
                    {formatDateWithOrdinal(post.date)}
                  </time>
                </div>
              </div>
            </header>
            
            {/* Hero Image - Mobile Responsive */}
            {post.image && (
              <div className="mb-8 sm:mb-10 px-2 sm:px-0">
                <div className="blog-image-frame-large w-full max-w-4xl mx-auto h-40 sm:h-56 md:h-72 lg:h-96 relative rounded-lg sm:rounded-xl overflow-hidden border border-slate-100 dark:border-slate-600">
                  <Image
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                </div>
              </div>
            )}
            
            {/* Article Content - HTML Structure */}
            <div className="blog-content max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}
