"use client"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "./theme-provider"

export function InteractiveHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const [currentSpecialty, setCurrentSpecialty] = useState(0)
  const [scrollOpacity, setScrollOpacity] = useState(1)

  const specialties = [
    "Software Engineer",
    "Data Enthusiast"
  ]

  // Calculate if dark mode is active (including system dark mode)
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  useEffect(() => {
    setMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    let width = canvas.clientWidth
    let height = canvas.clientHeight
    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * DPR)
      canvas.height = Math.floor(height * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    const onResize = () => resize()
    window.addEventListener("resize", onResize)

    // Starfield (calm) - Dynamic color based on theme with system support
    const STAR_COLOR = isDark ? "#ffffff" : "#111111"
    const STAR_MIN = 0.8
    const STAR_MAX = 1.8
    const SPEED = 0.25
    const TURN = 0.008

    const count = Math.min(290, Math.floor((width * height) / 3000))
    type Star = { x: number; y: number; r: number; a: number; v: number }
    const rand = (min: number, max: number) => Math.random() * (max - min) + min

    const stars: Star[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: rand(STAR_MIN, STAR_MAX),
      a: Math.random() * Math.PI * 2,
      v: rand(0.5, 3.0) * SPEED,
    }))

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = STAR_COLOR
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        // More random direction changes with occasional sharp turns
        const randomTurn = (Math.random() - 0.5) * TURN
        const sharpTurnChance = Math.random()
        if (sharpTurnChance < 0.02) { // 2% chance for sharp turn
          s.a += (Math.random() - 0.5) * TURN * 8
        } else {
          s.a += randomTurn
        }

        // Add speed variation
        const speedMultiplier = 0.8 + Math.random() * 0.4 // 0.8 to 1.2
        s.x += Math.cos(s.a) * s.v * speedMultiplier
        s.y += Math.sin(s.a) * s.v * speedMultiplier

        if (s.x < -5) s.x = width + 5
        if (s.x > width + 5) s.x = -5
        if (s.y < -5) s.y = height + 5
        if (s.y > height + 5) s.y = -5

        const twinkle = (Math.sin((performance.now() / 1000 + i) * 0.5) + 1) * 0.08
        const r = Math.max(0.6, s.r + twinkle)

        // Smooth pulsing effect using sine wave
        const pulseSpeed = 0.8 // Adjust pulsing speed
        const pulseOffset = i * 0.2 // Stagger pulsing for each dot
        const pulseTime = (performance.now() / 1000) * pulseSpeed + pulseOffset
        const pulseOpacity = (Math.sin(pulseTime) + 1) * 0.5 // Smooth 0-1 oscillation

        ctx.save()
        ctx.globalAlpha = pulseOpacity
        ctx.beginPath()
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [isDark])

  // A smoother cursive path spelling "nikhil"
  const nikhilPath =
    "M6 56 q10 -18 22 0 t22 0 m8 0 q8 -20 18 0 m8 0 q8 -18 18 0 m8 0 q0 -24 20 -24 t20 24 m8 0 q0 -20 18 -20 t18 20"
  void nikhilPath

  // Typing animation state for "Hi, I'm Nikhil"
  const [typed, setTyped] = useState("")
  useEffect(() => {
    const NAME = "Hi,I'm Nikhil"
    let i = 0
    const typeInterval = setInterval(() => {
      setTyped(NAME.slice(0, i + 1))
      i++
      if (i >= NAME.length) clearInterval(typeInterval)
    }, 120) // typing speed
    return () => clearInterval(typeInterval)
  }, [])

  // Specialty rotation animation
  useEffect(() => {
    const specialtyInterval = setInterval(() => {
      setCurrentSpecialty((prev) => (prev + 1) % specialties.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(specialtyInterval)
  }, [specialties.length])

  // Scroll detection for scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      // Gradually fade out over 150px of scroll
      const opacity = Math.max(0, 1 - (scrollTop / 150))
      setScrollOpacity(opacity)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="top" className="relative">
      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="block h-[75vh] sm:h-[85vh] w-full" aria-hidden="true" />
      </div>

      <div className="relative z-10 h-[75vh] sm:h-[85vh] px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-2xl text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium font-mono tracking-tight"
              aria-live="polite"
              aria-label="Hi, I'm Nikhil typing"
            >
              <span className="typewriter-text">{typed}</span>
              <span className="caret" aria-hidden="true">
                |
              </span>
            </h2>
          </div>

          <div className="specialty-container">
            <h1
              key={currentSpecialty}
              className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight specialty-text"
            >
              {specialties[currentSpecialty]}
            </h1>
          </div>
          <p className="mt-4 text-pretty text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground mx-auto max-w-xl px-2">
            I build performant interfaces and systems with a product mindset.
          </p>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 transition-opacity duration-300"
        style={{ opacity: scrollOpacity }}
      >
        <div className="flex flex-col items-center space-y-1 text-muted-foreground">
          <span className="text-xs font-medium">Scroll Down</span>
          <div className="animate-bounce">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground"
            >
              <path
                d="M7 13L12 18L17 13M7 6L12 11L17 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .typewriter-text { white-space: nowrap; }
        .caret { margin-left: 2px; display: inline-block; width: 1ch; animation: blink 1s steps(1, end) infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        .specialty-text {
          animation: fadeInUp 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

      `}</style>

      {!mounted && <span className="sr-only">Interactive hero background</span>}
    </section>
  )
}
