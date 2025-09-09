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
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="#top" className="font-semibold tracking-tight">
          Nikhil Choudhary
        </Link>
        <nav className="hidden sm:flex items-center gap-6">
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
        <Button
          asChild
          variant="default"
          className="ml-4"
          disabled={!hasResume}
          title={hasResume ? "View Resume" : "Set NEXT_PUBLIC_RESUME_URL"}
        >
          <a href={hasResume ? RESUME_URL : "#"} target={hasResume ? "_blank" : "_self"} rel="noopener noreferrer">
            View Resume
          </a>
        </Button>
      </div>
    </header>
  )
}
