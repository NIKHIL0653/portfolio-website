"use client"

import { ThemeToggle } from "./theme-toggle"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

// ✅ MODIFIED: SVG pattern components for a denser, darker separator
function SeparatorPatternLight() {
  return (
    <svg width="7" height="7" className="absolute w-full h-full">
      <defs>
        {/* ✅ MODIFIED: width/height="7" for denser lines */}
        <pattern id="pattern-light" patternUnits="userSpaceOnUse" width="7" height="7">
          {/* ✅ MODIFIED: stroke="#71717a" for darker lines */}
          <path d="M-1,1 l2,-2 M0,7 l7,-7 M6,8 l2,-2" stroke="#71717a" strokeWidth="0.25" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern-light)" />
    </svg>
  );
}

function SeparatorPatternDark() {
  return (
    <svg width="7" height="7" className="absolute w-full h-full">
      <defs>
        {/* ✅ MODIFIED: width/height="7" for denser lines */}
        <pattern id="pattern-dark" patternUnits="userSpaceOnUse" width="7" height="7">
          {/* ✅ MODIFIED: stroke="#71717a" for darker lines */}
          <path d="M-1,1 l2,-2 M0,7 l7,-7 M6,8 l2,-2" stroke="#71717a" strokeWidth="0.25" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern-dark)" />
    </svg>
  );
}


// Custom X (Twitter) Logo Component
function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-background">
      {/* ✅ MODIFIED: Removed top border, added background color */}
      <div className="relative h-2.5 w-full border-b border-border bg-zinc-100 dark:bg-zinc-900" aria-hidden="true">
        <div className="block dark:hidden">
          <SeparatorPatternLight />
        </div>
        <div className="hidden dark:block">
          <SeparatorPatternDark />
        </div>
      </div>
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Mobile View */}
        <div className="sm:hidden">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">
                Nikhil Choudhary
              </p>
              <ThemeToggle />
            </div>
            <div className="flex space-x-4 pt-3">
              <a
                href="mailto:nikhilchoudhary0653@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/Nikhil0653"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="X"
              >
                <XLogo className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/NIKHIL0653"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/nikhil-choudhary-0653"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground">Menu</h4>
              <nav className="mt-3 flex flex-col space-y-2">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
                <a
                  href="https://drive.google.com/file/d/1iAWePU4UtApS1Dx-2Vg7hK3bXRO8rUQy/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Resume
                </a>
              </nav>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground">Creative</h4>
              <nav className="mt-3 flex flex-col space-y-2">
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
                <Link href="/work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:grid gap-6 sm:gap-8 md:gap-12 grid-cols-2 md:grid-cols-4 place-items-start">
          {/* Branding & Socials */}
          <div className="space-y-4">
            <p className="font-semibold tracking-tight">Nikhil Choudhary</p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Nikhil Choudhary,<br />
              All rights reserved.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="mailto:nikhilchoudhary0653@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/Nikhil0653"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="X"
              >
                <XLogo className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/NIKHIL0653"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/nikhil-choudhary-0653"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground">Menu</h4>
            <nav className="mt-3 flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <a
                href="https://drive.google.com/file/d/1iAWePU4UtApS1Dx-2Vg7hK3bXRO8rUQy/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Resume
              </a>
            </nav>
          </div>

          {/* Creative */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground">Creative</h4>
            <nav className="mt-3 flex flex-col space-y-2">
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
            </nav>
          </div>

          {/* Preferences */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground">Preferences</h4>
            <div className="mt-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}