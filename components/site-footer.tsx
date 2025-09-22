"use client"

import { ThemeToggle } from "./theme-toggle"
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// ✅ MODIFIED: SVG pattern set to 4x4 with 0.35 stroke width
function SeparatorPatternLight() {
  return (
    <svg width="4" height="4" className="absolute w-full h-full">
      <defs>
        <pattern id="pattern-light-left" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,3 l2,2 M0,0 l4,4 M3,-1 l2,2" stroke="#a1a1aa" strokeWidth="0.45" />
        </pattern>
        <pattern id="pattern-light-right" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="#52525b" strokeWidth="0.45" />
        </pattern>
      </defs>
      <rect width="50%" height="100%" fill="url(#pattern-light-left)" />
      <rect x="50%" width="50%" height="100%" fill="url(#pattern-light-right)" />
    </svg>
  );
}

function SeparatorPatternDark() {
  return (
    <svg width="4" height="4" className="absolute w-full h-full">
      <defs>
        <pattern id="pattern-dark-left" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,3 l2,2 M0,0 l4,4 M3,-1 l2,2" stroke="#52525b" strokeWidth="0.45" />
        </pattern>
        <pattern id="pattern-dark-right" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="#a1a1aa" strokeWidth="0.45" />
        </pattern>
      </defs>
      <rect width="50%" height="100%" fill="url(#pattern-dark-left)" />
      <rect x="50%" width="50%" height="100%" fill="url(#pattern-dark-right)" />
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
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

// Geist-style Collapse Component
function Collapse({
  title,
  children,
  isOpen,
  onToggle
}: {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ease-out ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer id="contact" className="bg-background">
      <div className="relative h-2.5 w-full border-b border-border" aria-hidden="true">
        <div className="block dark:hidden">
          <SeparatorPatternLight />
        </div>
        <div className="hidden dark:block">
          <SeparatorPatternDark />
        </div>
      </div>
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-2 pb-12 sm:pt-4 sm:pb-16">
        
        {/* Mobile View with Collapse */}
        <div className="sm:hidden">
          {/* Header Section */}
          <div className="py-4 border-b border-border">
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
          
          {/* Collapsible Sections */}
          <Collapse
            title="Menu"
            isOpen={openSection === 'menu'}
            onToggle={() => toggleSection('menu')}
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
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
            </div>
          </Collapse>

          <Collapse
            title="Creative"
            isOpen={openSection === 'creative'}
            onToggle={() => toggleSection('creative')}
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
            </div>
          </Collapse>
        </div>

        {/* Desktop View - Unchanged */}
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
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
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
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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