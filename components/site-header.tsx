"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL

export function SiteHeader() {
  const pathname = usePathname()
  const hasResume = Boolean(RESUME_URL)

  const nav = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-5xl px-4 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        {/* Left: Name (unchanged) */}
        <Link href="/" className="font-semibold tracking-tight">
          Nikhil Choudhary
        </Link>

        {/* Center: Pill navigation */}
        <nav
          className="hidden sm:flex items-center rounded-full border px-4 py-1 bg-background/80 shadow-sm"
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

        {/* Right: Resume button (unchanged semantics) */}
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
    </header>
  )
}
