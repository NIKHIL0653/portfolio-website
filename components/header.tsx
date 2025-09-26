"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const RESUME_URL =
  (typeof window !== "undefined" && (process.env.NEXT_PUBLIC_RESUME_URL as string)) ||
  process.env.NEXT_PUBLIC_RESUME_URL ||
  ""

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const hasResume = Boolean(RESUME_URL)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-40">
      {/* Match blog page frame: max-w-6xl + px-6 sm:px-8 */}
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-3 relative flex items-center">
        {/* Left: Name with blur background */}
        <Link
          href="#top"
          className={`font-semibold tracking-tight text-lg mr-20 transition-opacity duration-300 relative ${
            isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Blur background around name */}
          <span 
            className="absolute -inset-3 bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-2xl shadow-lg"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          ></span>
          <span className="relative z-10">NIKHIL CHOUDHARY</span>
        </Link>

        {/* Center: Navigation pill, centered relative to content frame */}
        <nav className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center gap-20 px-8 py-2 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 shadow-sm">
          <Link
            href="#projects"
            className={`text-sm transition-colors ${
              pathname === '/projects'
                ? 'text-slate-600 dark:text-slate-300 font-medium'
                : 'text-foreground/80 hover:text-black dark:hover:text-white'
            } hover:underline`}
          >
            Projects
          </Link>
          <Link
            href="#blogs"
            className={`text-sm transition-colors ${
              pathname === '/blog'
                ? 'text-slate-600 dark:text-slate-300 font-medium'
                : 'text-foreground/80 hover:text-black dark:hover:text-white'
            } hover:underline`}
          >
            Blogs
          </Link>
          <Link
            href="#about"
            className={`text-sm transition-colors ${
              pathname === '/about'
                ? 'text-slate-600 dark:text-slate-300 font-medium'
                : 'text-foreground/80 hover:text-black dark:hover:text-white'
            } hover:underline`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-sm transition-colors ${
              pathname === '/contact'
                ? 'text-slate-600 dark:text-slate-300 font-medium'
                : 'text-foreground/80 hover:text-black dark:hover:text-white'
            } hover:underline`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden ml-auto p-2 rounded-md hover:bg-accent transition-colors relative"
          aria-label="Toggle mobile menu"
        >
          {/* Blur background around menu button */}
          <span 
            className="sm:hidden absolute -inset-2 bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-xl shadow-lg"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          ></span>
          <span className="relative z-10">
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </span>
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
        <div className="px-6 pb-4 space-y-4 relative">
          {/* Blur background for entire mobile menu */}
          <div 
            className="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-xl shadow-lg"
            style={{
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
            }}
          ></div>
          
          <div className="relative z-10">
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
                className={`text-sm transition-colors py-2 ${
                  pathname === '/'
                    ? 'text-slate-600 dark:text-slate-300 font-medium'
                    : 'text-foreground/80 hover:text-black dark:hover:text-white'
                } hover:underline`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#projects"
                className={`text-sm transition-colors py-2 ${
                  pathname === '/projects'
                    ? 'text-slate-600 dark:text-slate-300 font-medium'
                    : 'text-foreground/80 hover:text-black dark:hover:text-white'
                } hover:underline`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="#blogs"
                className={`text-sm transition-colors py-2 ${
                  pathname === '/blog'
                    ? 'text-slate-600 dark:text-slate-300 font-medium'
                    : 'text-foreground/80 hover:text-black dark:hover:text-white'
                } hover:underline`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="#about"
                className={`text-sm transition-colors py-2 ${
                  pathname === '/about'
                    ? 'text-slate-600 dark:text-slate-300 font-medium'
                    : 'text-foreground/80 hover:text-black dark:hover:text-white'
                } hover:underline`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`text-sm transition-colors py-2 ${
                  pathname === '/contact'
                    ? 'text-slate-600 dark:text-slate-300 font-medium'
                    : 'text-foreground/80 hover:text-black dark:hover:text-white'
                } hover:underline`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}