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
      <main className="blog-article-container min-h-screen bg-slate-50 dark:bg-[#121212] py-8 px-4">
        {/* Enhanced Dotted Background Pattern */}
        <div className="dotted-background" />

        <div className="relative mx-auto max-w-4xl">
          <div className="blog-article-card bg-white dark:bg-[#1E1E1E] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-500">
            {/* Back Link - Inside the card at top */}
            <div className="text-center pt-4 sm:pt-6 md:pt-8 lg:pt-12">
              <Link href="/blog" className="inline-flex items-center text-sm text-primary relative z-20">
                ← <span className="mx-1 text-[#8f8f99]">Blog</span> / {post.category}
              </Link>
            </div>

            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <header className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-slate-200 dark:border-slate-700 text-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight text-slate-900 dark:text-white px-2">
                  {post.title}
                </h1>

                {/* Author and Date Info - Mobile Responsive */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-3 text-sm text-slate-600 dark:text-slate-400">
                  {post.author && (
                    <>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <div className="author-avatar">
                          {post.author.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
                      </div>
                      <div className="hidden sm:block text-slate-400"> | </div>
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

              <div className="blog-content text-center">
                <p>
                  Content for this blog post is coming soon... Create a file named{" "}
                  <code>{post.slug}.html</code> in the <code>content/blogs/</code> directory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="blog-article-container min-h-screen bg-[#fafafa] dark:bg-[#121212] py-2 sm:py-8 md:py-16 px-4">
      {/* Enhanced Dotted Background Pattern */}
      <div className="dotted-background" />

      <div className="relative mx-auto max-w-4xl md:max-w-[56rem]">
        {/* Main Article Card */}
        <article className="blog-article-card bg-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-500">
          {/* Back Link - Inside the card at top */}
          <div className="text-center pt-8 sm:pt-6 md:pt-8 lg:pt-12 pb-0">
            <Link href="/blog" className="inline-flex items-center text-sm text-primary relative z-20">
              ← <span className="mx-1 text-[#737373] dark:text-[#d1d5db]">Blog</span> / {post.category}
            </Link>
          </div>

          {/* Article Content */}
          <div className="p-2 sm:p-5 md:p-7 lg:p-11">
            {/* Header Section - Centered */}
            <header className="mb-1 sm:mb-2 pb-4 sm:pb-6 text-center">
              <h1 className="blog-post-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-none text-slate-900 dark:text-white px-2">
                {post.title}
              </h1>

              {/* Author and Date Info - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {post.author && (
                  <>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Image
                        src="/images/blog/avatar_img.png"
                        alt="Author avatar"
                        width={20}
                        height={20}
                        className="author-avatar"
                      />
                      <span className="font-medium text-[#737373] dark:text-[#d1d5db]">{post.author}</span>
                    </div>
                    <div className="hidden sm:block text-slate-400"> | </div>
                  </>
                )}
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4 text-[#737373] dark:text-[#d1d5db]" />
                  <time className="font-medium text-[#737373] dark:text-[#d1d5db]">
                    {formatDateWithOrdinal(post.date)}
                  </time>
                </div>
              </div>
            </header>

            {/* MODIFIED: Hero Image Section */}
            {post.image && (
              <div className="mb-3 sm:mb-8 px-0">
                {/* Frame: Reduced horizontal padding (px-1.5 to px-1) and vertical padding (py-1.5 to py-1)
                    to make the frame slightly thinner around the enlarged image. */}
                <div className="image-wrapper bg-gray-50 dark:bg-[#1F1F1F] rounded-lg sm:rounded-xl px-1 py-1 border border-slate-200 dark:border-slate-600 max-w-md sm:max-w-2xl md:max-w-3xl mx-auto">
                  {/* Inner div (blog-image-frame-large) now has 'rounded-md' for slightly less round corners,
                      but still more rounded than the image itself (which is 'rounded-sm') */}
                  <div className="blog-image-frame-large w-full mx-auto h-48 sm:h-56 md:h-64 lg:h-[22rem] relative rounded-md overflow-hidden border border-slate-100 dark:border-slate-600">
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover rounded-sm" // MODIFIED: Changed to 'rounded-sm' for less roundness
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 50vw, 33vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Horizontal Separator Line - Mobile Only */}
            <div className="py-1 sm:hidden">
              <div className="border-t border-dashed border-[#29292B]"></div>
            </div>

            {/* Article Content - HTML Structure */}
            <div className="blog-content -mt-2 sm:mt-0">
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
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}