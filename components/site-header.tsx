"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X as CloseIcon, Mail, Twitter, Github, Linkedin, ChevronDown, ChevronUp } from "lucide-react"

const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL

export function SiteHeader() {
  const pathname = usePathname()
  const hasResume = Boolean(RESUME_URL)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSocialDropdownOpen, setIsSocialDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const nav = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ]

  const socialLinks = [
    { href: "mailto:nikhil0653@example.com", icon: Mail, label: "Email" },
    { href: "https://x.com/Nikhil0653", icon: Twitter, label: "Twitter" },
    { href: "https://github.com/Nikhil0653", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/nikhil-choudhary-0653", icon: Linkedin, label: "LinkedIn" },
  ]

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 dark:bg-[#121212]/80'
          : 'bg-[#fafafa] dark:bg-[#121212]'
      } ${
        isScrolled
          ? 'border-border'
          : 'border-transparent'
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 py-3">
        {/* Desktop Layout */}
        <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-2">
          {/* Left: Name */}
          <Link href="/" className="font-medium tracking-tight site-header-name">
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

          {/* Right: Resume button */}
          <div className="flex justify-end">
            <Button
              asChild
              className="ml-4 rounded-full font-medium"
              disabled={!hasResume}
              title={hasResume ? "View Resume" : "Set NEXT_PUBLIC_RESUME_URL in Project Settings"}
            >
              <a href={hasResume ? RESUME_URL : "#"} target={hasResume ? "_blank" : "_self"} rel="noopener noreferrer" style={{ fontFamily: '__geistSans_3dfc64', fontWeight: 500 }}>
                Resume
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex items-center justify-between sm:hidden">
          {/* Left: Name */}
          <Link href="/" className="font-semibold tracking-tight" style={{ fontFamily: '__geistSans_3dfc64', fontWeight: 600 }}>
            Nikhil Choudhary
          </Link>

          {/* Right: Mobile menu button */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="rounded-full font-medium"
              disabled={!hasResume}
              title={hasResume ? "View Resume" : "Set NEXT_PUBLIC_RESUME_URL in Project Settings"}
            >
              <a href={hasResume ? RESUME_URL : "#"} target={hasResume ? "_blank" : "_self"} rel="noopener noreferrer" style={{ fontFamily: '__geistSans_3dfc64', fontWeight: 500 }}>
                Resume
              </a>
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-muted transition-colors mobile-menu-button"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1">
                {nav.map((item) => {
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
                      <div className="border-t border-border mx-2" />
                    </li>
                  )
                })}

                {/* Social Links Dropdown */}
                <li>
                  <button
                    onClick={() => setIsSocialDropdownOpen(!isSocialDropdownOpen)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between w-full py-2 px-2"
                    aria-expanded={isSocialDropdownOpen}
                    aria-controls="social-links-dropdown"
                  >
                    <span>Social Links</span>
                    {isSocialDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <div className="border-t border-border mx-2" />
                </li>

                {/* Social Links */}
                {isSocialDropdownOpen && (
                  <li id="social-links-dropdown">
                    <div className="grid grid-cols-2 gap-2 mt-2 mb-2 px-2">
                      {socialLinks.map((social) => {
                        const IconComponent = social.icon
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full h-10 rounded-md bg-[#121212]/40 backdrop-blur-sm border border-border/50 hover:bg-[#121212]/60 transition-colors"
                            aria-label={social.label}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <IconComponent
                              size={18}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            />
                            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                              {social.label}
                            </span>
                          </a>
                        )
                      })}
                    </div>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}



