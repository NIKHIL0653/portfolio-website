"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Menu,
  X,
  Mail,
  Github,
  Linkedin,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useTheme } from "./theme-provider"
import { ThemeToggle } from "./theme-toggle"

// New Twitter (X) Logo Component
function XLogo({ size = 16, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1227"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d="M714.163 519.284L1160.89 0H1056.02L668.109 450.887L357.829 0H0L468.368 681.821L0 1226.37H104.874L515.69 748.318L842.171 1226.37H1200L714.137 519.284H714.163ZM569.153 685.222L521.398 616.716L142.831 79.6944H306.615L611.412 515.156L659.167 583.662L1057.59 1151.67H893.808L569.127 685.222H569.153Z" />
    </svg>
  )
}

const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL

export function SiteHeader() {
  const pathname = usePathname()
  const hasResume = Boolean(RESUME_URL)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSocialDropdownOpen, setIsSocialDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { theme } = useTheme()

  // Check system theme preference
  const isSystemDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDarkMode = theme === 'dark' || (theme === 'system' && isSystemDark)

  const headerBackgroundStyle = isScrolled
    ? (isMobileMenuOpen ? { backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' } : {})
    : { backgroundColor: isDarkMode ? '#121212' : '#FAFAFA' }

  const pageLinksBackgroundStyle = isScrolled
    ? (isMobileMenuOpen ? { backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' } : {})
    : { backgroundColor: isDarkMode ? '#121212' : '#FAFAFA' }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const nav = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ]

  const socialLinks = [
    { href: "mailto:nikhil0653@example.com", icon: Mail, label: "Email" },
    { href: "https://x.com/Nikhil0653", icon: XLogo, label: "Twitter" },
    { href: "https://github.com/Nikhil0653", icon: Github, label: "GitHub" },
    {
      href: "https://linkedin.com/in/nikhil-choudhary-0653",
      icon: Linkedin,
      label: "LinkedIn",
    },
  ]

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsSocialDropdownOpen(false)
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${isScrolled ? "bg-white/50 dark:bg-black/50 border-border" : "border-transparent"}`}
        style={headerBackgroundStyle}
      >
        <div className="mx-auto max-w-5xl px-4 py-3">
          {/* Desktop Layout */}
          <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-2">
            <Link
              href="/"
              className="font-medium tracking-tight site-header-name"
            >
              Nikhil Choudhary
            </Link>

            <nav
              className={`flex items-center rounded-full border px-4 py-1 shadow-sm ${isScrolled ? "bg-white/50 dark:bg-black/50" : ""}`}
              style={pageLinksBackgroundStyle}
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
                            ? "text-sm font-semibold text-muted-foreground"
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

            <div className="flex justify-end">
              <Button
                asChild
                className="ml-4 rounded-full font-medium"
                disabled={!hasResume}
              >
                <a
                  href={hasResume ? RESUME_URL : "#"}
                  target={hasResume ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex items-center justify-between sm:hidden">
            <Link href="/" className="font-semibold tracking-tight">
              Nikhil Choudhary
            </Link>

            <div className="flex items-center gap-2">
              <Button
                asChild
                size="sm"
                className="rounded-full font-medium"
                disabled={!hasResume}
              >
                <a
                  href={hasResume ? RESUME_URL : "#"}
                  target={hasResume ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </Button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md transition-all duration-300 relative z-[70]"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
<div className={`fixed inset-0 z-40 sm:hidden ${isMobileMenuOpen ? "" : "pointer-events-none"}`}>
  {/* Gradient Backdrop Blur */}
  <div
    className={`absolute inset-0 transition-opacity duration-500 ease-out ${
      isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
    onClick={closeMobileMenu}
    style={{
      backgroundColor: isDarkMode ? '#000000' : '#FFFFFF'
    }}
  />

  {/* Menu Content */}
  <div
    className={`relative z-50 flex flex-col h-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
      isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"
    }`}
  >
    <div className="flex-1 overflow-y-auto">
      <div className="mt-16 pb-4 px-4">
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={
                      active
                        ? "text-sm font-semibold text-foreground block py-2 px-2"
                        : "text-sm text-muted-foreground hover:text-foreground transition-colors block py-2 px-2"
                    }
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                  <div className="border-t border-border mx-2" />
                </li>
              )
            })}

            {/* Theme Toggle */}
            <li>
              <div className="flex items-center justify-between w-full py-2 px-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <div className="border-t border-border mx-2" />
            </li>

            {/* Social Links */}
            <li>
              <button
                onClick={() => setIsSocialDropdownOpen(!isSocialDropdownOpen)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between w-full py-2 px-2"
              >
                <span>Social Links</span>
                {isSocialDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <div className="border-t border-border mx-2" />
            </li>

            {isSocialDropdownOpen && (
              <li>
                <div className="grid grid-cols-2 gap-2 mt-2 mb-2 px-2">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full h-10 rounded-md backdrop-blur-sm border border-border hover:bg-background/90 dark:hover:bg-background/10 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <IconComponent size={16} />
                        <span className="text-sm">{social.label}</span>
                      </a>
                    )
                  })}
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  </div>
</div>
    </>
  )
}