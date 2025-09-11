import Link from "next/link"
import Image from "next/image"
import { posts } from "@/data/blogs"

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:py-16">
        <header className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold">All Posts</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">Writings on frontend, accessibility, and product craft.</p>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {posts.map((post, index) => (
            <li
              key={post.slug}
              className={`border-gray-200 dark:border-gray-700 ${
                index < posts.length - 1 ? 'border-r border-b' : ''
              } ${index % 3 !== 2 ? 'lg:border-r' : ''} ${
                Math.floor(index / 3) < Math.floor((posts.length - 1) / 3) ? 'border-b' : ''
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
                  <h2 className="text-sm sm:text-base font-semibold leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="text-xs text-muted-foreground font-mono mt-auto">{post.date}</div>
                  <Link className="mt-2 text-xs sm:text-sm text-primary hover:underline w-fit" href={`/blog/${post.slug}`}>
                    Read more
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
    </main>
  )
}
