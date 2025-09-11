"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL

export function SiteHeader() {
  const pathname = usePathname()
  const hasResume = Boolean(RESUME_URL)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const nav = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-5xl px-4 py-3">
        {/* Desktop Layout */}
        <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-2">
          {/* Left: Name */}
          <Link href="/" className="font-semibold tracking-tight">
            Nikhil Choudhary
          </Link>

          {/* Center: Pill navigation */}
          <nav
            className="flex items-center rounded-full border px-4 py-1 bg-background/80 shadow-sm"
            aria-label="Primary"
          >
            <ul className="flex items-center gap-6">
              {nav.map((item) => {
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={
                        active
                          ? "text-sm font-semibold text-foreground"
                          : "text-sm text-muted-foreground hover:text-foreground transition-colors"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right: Resume button */}
          <div className="flex justify-end">
            <Button
              asChild
              className="ml-4"
              disabled={!hasResume}
              title={hasResume ? "View Resume" : "Set NEXT_PUBLIC_RESUME_URL in Project Settings"}
            >
              <a href={hasResume ? RESUME_URL : "#"} target={hasResume ? "_blank" : "_self"} rel="noopener noreferrer">
                View Resume
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex items-center justify-between sm:hidden">
          {/* Left: Name */}
          <Link href="/" className="font-semibold tracking-tight">
            Nikhil Choudhary
          </Link>

          {/* Right: Mobile menu button */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              disabled={!hasResume}
              title={hasResume ? "View Resume" : "Set NEXT_PUBLIC_RESUME_URL in Project Settings"}
            >
              <a href={hasResume ? RESUME_URL : "#"} target={hasResume ? "_blank" : "_self"} rel="noopener noreferrer">
                Resume
              </a>
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1">
                {nav.map((item, index) => {
                  const active = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={
                          active
                            ? "text-sm font-semibold text-foreground block py-2 px-2"
                            : "text-sm text-muted-foreground hover:text-foreground transition-colors block py-2 px-2"
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {index < nav.length - 1 && (
                        <div className="border-t border-dotted border-gray-300 dark:border-gray-600 mx-2" />
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
