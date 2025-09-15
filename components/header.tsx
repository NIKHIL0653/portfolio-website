"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const RESUME_URL =
  (typeof window !== "undefined" && (process.env.NEXT_PUBLIC_RESUME_URL as string)) ||
  process.env.NEXT_PUBLIC_RESUME_URL ||
  ""

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const hasResume = Boolean(RESUME_URL)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      {/* Match blog page frame: max-w-6xl + px-6 sm:px-8 */}
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-3 relative flex items-center">
        {/* Left: Name aligned with blog title */}
        <Link
          href="#top"
          className={`font-semibold tracking-tight text-lg mr-20 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
          }`}
        >
          Nikhil Choudhary
        </Link>

        {/* Center: Navigation pill, centered relative to content frame */}
        <nav className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center gap-20 px-8 py-2 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 shadow-sm">
          <Link href="#projects" className="text-sm text-foreground/80 hover:text-foreground hover:underline transition-colors">
            Projects
          </Link>
          <Link href="#blogs" className="text-sm text-foreground/80 hover:text-foreground hover:underline transition-colors">
            Blogs
          </Link>
          <Link href="#about" className="text-sm text-foreground/80 hover:text-foreground hover:underline transition-colors">
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden ml-auto p-2 rounded-md hover:bg-accent transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Desktop Resume button */}
        <div className="hidden sm:block ml-auto">
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

      {/* Mobile Menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4 space-y-4">
          {/* Mobile Resume Button - Full width, rectangular with rounded corners */}
          {hasResume && (
            <Button
              asChild
              variant="default"
              className="w-full rounded-lg"
              title="View Resume"
            >
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                View Resume
              </a>
            </Button>
          )}

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-3">
            <Link
              href="#top"
              className="text-sm text-foreground/80 hover:text-foreground hover:underline transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#projects"
              className="text-sm text-foreground/80 hover:text-foreground hover:underline transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#blogs"
              className="text-sm text-foreground/80 hover:text-foreground hover:underline transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              href="#about"
              className="text-sm text-foreground/80 hover:text-foreground hover:underline transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}



