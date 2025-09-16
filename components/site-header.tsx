"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Mail,
  Github,
  Linkedin,
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

// FINAL VERSION: Guarantees a perfectly centered cross animation
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative h-6 w-6">
      <span
        className={`absolute left-1/2 top-1/2 block h-[1.5px] w-5 -translate-x-1/2 bg-current transition-all duration-300 ease-in-out ${
          isOpen
            ? "-translate-y-1/2 rotate-45"
            : "-translate-y-[4px]"
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 block h-[1.5px] w-5 -translate-x-1/2 bg-current transition-all duration-300 ease-in-out ${
          isOpen
            ? "-translate-y-1/2 -rotate-45"
            : "translate-y-[4px]"
        }`}
      />
    </div>
  )
}


const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL

export function SiteHeader() {
  const pathname = usePathname()
  const hasResume = Boolean(RESUME_URL)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
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
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full overflow-x-hidden overflow-y-hidden ${
          isScrolled && !isMobileMenuOpen
            ? "border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300 ease-out delay-75"
            : "border-transparent dark:bg-[#121212] bg-transparent transition-all duration-100 ease-out"
        }`}
      >
        <div className="mx-auto max-w-screen-xl px-2 pt-1 pb-2 sm:py-1 h-14 sm:h-14">
          <div className="hidden sm:flex h-[46px] items-center">
            
            <div className="flex items-center">
              <Link
                href="/"
                className="font-medium tracking-tight site-header-name"
              >
                Nikhil Choudhary
              </Link>
            </div>

            <div className="flex-1 flex justify-center mx-8 relative">
              <nav
                className="flex items-center relative"
                aria-label="Primary"
              >
                {/* Expandable pill background */}
                <div 
                  className={`absolute inset-0 -z-10 transition-all duration-250 ease-out ${
                    isScrolled
                      ? 'scale-x-[8] scale-y-[2] rounded-none border-transparent shadow-none bg-transparent backdrop-blur-none'
                      : 'scale-x-100 scale-y-100 rounded-full border border-border dark:bg-[#171717] bg-[#FFFFFF] backdrop-blur-sm'
                  }`}
                />
                
                <ul className="flex items-center gap-8 px-4 py-0.5 relative z-10">
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
                              : "text-sm text-foreground/80 hover:text-foreground transition-colors"
                          }
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            <div className="flex items-center">
              <Button asChild className="rounded-full font-medium" disabled={!hasResume}>
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
          <div className="flex items-center justify-between sm:hidden h-14">
            {/* ✅ MODIFIED 1: Added ml-2 to move text to the right */}
            <Link
              href="/"
              className={`font-semibold tracking-tight transition-opacity duration-300 ml-2 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            >
              Nikhil Choudhary
            </Link>

            {/* ✅ MODIFIED 2: Changed -mr-2 to mr-2 to move icon to the left */}
            <div className="flex items-center gap-2 mr-0.1">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center w-10 h-10 text-foreground relative z-[60] p-0 m-0 !border-none !outline-none !bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent"
                style={{ 
                  background: 'none !important', 
                  backgroundColor: 'transparent !important', 
                  border: 'none !important',
                  outline: 'none !important',
                  boxShadow: 'none !important'
                }}
                aria-label="Toggle mobile menu"
              >
                <HamburgerIcon isOpen={isMobileMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 sm:hidden ${!isMobileMenuOpen && "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-[#FAFAFA]/80 dark:bg-[#121212]/80 backdrop-blur-md transition-opacity duration-500 ease-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />

        <div
          className={`relative z-50 flex flex-col h-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-5 opacity-0"
          }`}
        >
          <div className="flex-1 overflow-y-auto">
            <div className="mt-16 pb-4 px-2">
              {/* Mobile Resume Button */}
              {hasResume && (
                <div className="px-2 mt-4">
                  <Button
                    asChild
                    variant="default"
                    // ✅ MODIFIED 3: Changed rounded-md to rounded
                    className="w-full rounded mb-4 py-3 h-10 backdrop-blur-sm border border-border"
                    title="View Resume"
                  >
                    <a
                      href={RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileMenu}
                    >
                      Resume
                    </a>
                  </Button>
                </div>
              )}

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

                  <li>
                    <div className="flex items-center justify-between w-full py-2 px-2">
                      <span className="text-sm text-muted-foreground">
                        Theme
                      </span>
                      <ThemeToggle />
                    </div>
                    <div className="border-t border-border mx-2" />
                  </li>

                  <li>
                    <div className="py-2 px-2">
                      <div className="grid grid-cols-2 gap-2">
                        {socialLinks.map((social) => {
                          const IconComponent = social.icon
                          return (
                            <a
                              key={social.label}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full h-10 rounded-md backdrop-blur-sm border border-border hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 shadow-sm hover-md"
                              onClick={closeMobileMenu}
                            >
                              <IconComponent size={16} />
                              <span className="text-sm">{social.label}</span>
                            </a>
                          )
                        })}
                      </div>
                    </div>
                    <div className="border-t border-border mx-2" />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}