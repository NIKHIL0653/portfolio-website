"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const RESUME_URL =
  (typeof window !== "undefined" && (process.env.NEXT_PUBLIC_RESUME_URL as string)) ||
  process.env.NEXT_PUBLIC_RESUME_URL ||
  ""

export function Header() {
  const hasResume = Boolean(RESUME_URL)

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      {/* Match blog page frame: max-w-6xl + px-6 sm:px-8 */}
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-3 relative flex items-center">
        {/* Left: Name aligned with blog title */}
        <Link href="#top" className="font-semibold tracking-tight text-lg mr-20">
          Nikhil Choudhary
        </Link>

        {/* Center: Navigation pill, centered relative to content frame */}
        <nav className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center gap-20 px-8 py-2 rounded-full bg-muted/40 shadow-sm">
          <Link href="#projects" className="text-sm hover:underline">
            Projects
          </Link>
          <Link href="#blogs" className="text-sm hover:underline">
            Blogs
          </Link>
          <Link href="#about" className="text-sm hover:underline">
            About
          </Link>
        </nav>

        {/* Right: Resume button aligned with blog grid edge */}
        <div className="ml-auto">
          <Button
            asChild
            variant="default"
            disabled={!hasResume}
            title={hasResume ? "View Resume" : "Set NEXT_PUBLIC_RESUME_URL"}
          >
            <a
              href={hasResume ? RESUME_URL : "#"}
              target={hasResume ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
