"use client"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "./theme-provider"

export function InteractiveHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const [currentSpecialty, setCurrentSpecialty] = useState(0)
  const [scrollOpacity, setScrollOpacity] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isImageActive, setIsImageActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

const specialties = [
  "Software Engineer",
  "AI / ML Engineer"
]

useEffect(() => {
setMounted(true)
setIsMobile(window.innerWidth < 768)

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
setIsMobile(window.innerWidth < 768)
}

const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
const isMobileLocal = window.innerWidth < 768

// Twinkling Dots Animation (replacing the warp speed)
const STAR_COLOR = isDark ? "#ffffff" : "#111111"
const STAR_MIN = 1.0
const STAR_MAX = 1.8
const SPEED = 0.25
const TURN = 0.005

// More dots than original
const count = Math.min(400, Math.floor((width * height) / 3200))

type Star = { 
  x: number
  y: number
  r: number
  a: number
  v: number
  twinkleOffset: number
  twinkleSpeed: number
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min

const stars: Star[] = Array.from({ length: count }, (_, i) => ({
  x: Math.random() * width,
  y: Math.random() * height,
  r: rand(STAR_MIN, STAR_MAX),
  a: Math.random() * Math.PI * 2,
  v: rand(0.7, 1.5) * SPEED,
  twinkleOffset: Math.random() * Math.PI * 4, // Random phase offset for each star
  twinkleSpeed: rand(0.8, 1.2) // Slight variation in twinkle speed
}))

resize()
window.addEventListener("resize", resize)

let raf = 0
const startTime = performance.now()

const tick = () => {
  const currentTime = performance.now()
  const elapsedTime = (currentTime - startTime) / 1000
  
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = STAR_COLOR
  
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i]
    
    // Original movement logic
    s.a += (Math.random() - 0.5) * TURN
    s.x += Math.cos(s.a) * s.v
    s.y += Math.sin(s.a) * s.v

    if (s.x < -5) s.x = width + 5
    if (s.x > width + 5) s.x = -5
    if (s.y < -5) s.y = height + 5
    if (s.y > height + 5) s.y = -5

    // Enhanced 2.5-second gradual twinkling cycle
    const twinkleTime = elapsedTime * s.twinkleSpeed + s.twinkleOffset
    const twinkleCycle = (twinkleTime * 2 * Math.PI) / 2.5 // 2.5-second full cycle
    
    // Create smooth sine wave for gradual fade (0 to 1 and back to 0)
    const sineWave = Math.sin(twinkleCycle)
    const opacity = Math.max(0, Math.min(1, (sineWave + 1) / 2)) // Map sine wave to 0-1
    
    // Use original dot size without modification
    const r = s.r

    // Only draw if opacity is meaningful (avoid drawing invisible dots)
    if (opacity > 0.05) {
      ctx.globalAlpha = opacity
      ctx.beginPath()
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  
  ctx.globalAlpha = 1
  raf = requestAnimationFrame(tick)
}

raf = requestAnimationFrame(tick)

return () => {
cancelAnimationFrame(raf)
window.removeEventListener("resize", resize)
}
}, [theme])

const [typed, setTyped] = useState("")
useEffect(() => {
const NAME = "Hi, I'm Nikhil"
let i = 0
const typeInterval = setInterval(() => {
setTyped(NAME.slice(0, i + 1))
i++
if (i >= NAME.length) clearInterval(typeInterval)
}, 120)
return () => clearInterval(typeInterval)
}, [])

useEffect(() => {
  const specialtyInterval = setInterval(() => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSpecialty((prev) => (prev + 1) % specialties.length)
      setIsAnimating(false)
    }, 300) // Half of transition duration
  }, 4000)
  return () => clearInterval(specialtyInterval)
}, [specialties.length])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const opacity = Math.max(0, 1 - (scrollTop / 150))
      setScrollOpacity(opacity)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

return (
  <section id="top" className="relative h-[85vh] sm:h-[85vh] overflow-hidden">
    {/* Background Animation - Ensure it's visible */}
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        aria-hidden="true"
        style={{ willChange: 'transform' }}
      />
    </div>

    {/* Centered Content Layout - Moved down slightly */}
    <div className="relative z-10 h-full flex items-center justify-center p-4 sm:p-8 pt-16 sm:pt-20">
      <div className="text-center max-w-4xl mx-auto">
        {/* Profile Image */}
        <img
          src="/images/blog/profile.jpg"
          alt="Nikhil's profile"
          className={`w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full object-cover border-2 border-white/20 shadow-xl mb-6 transition-all duration-300 ${
            isMobile
              ? (isImageActive ? 'grayscale-0 scale-110' : 'grayscale-[0.5]')
              : 'grayscale-[0.5] hover:grayscale-0 hover:scale-120'
          }`}
          onClick={isMobile ? () => setIsImageActive(!isImageActive) : undefined}
        />

        {/* Text Content */}
        <div className="space-y-0 sm:space-y-2">
          {/* Name */}
          <h2 className="font-mono text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
            <span className="typewriter-text">{typed}</span>
            <span className="caret" aria-hidden="true">|</span>
          </h2>

          {/* Specialty with fixed height container to prevent layout shift */}
          <div className="min-h-[80px] sm:min-h-[100px] flex items-center justify-center">
            <h1 className={`text-balance text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground transition-all duration-600 ease-in-out ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`} style={{ willChange: 'transform, opacity' }}>
              {specialties[currentSpecialty]}
            </h1>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-md mx-auto">
            I build performant interfaces and systems with a product mindset.
          </p>

          {/* Scroll Down Indicator */}
          <div className="flex flex-col items-center space-y-2 text-muted-foreground transition-opacity duration-300 mt-8" style={{ opacity: scrollOpacity }}>
            <span className="text-xs font-medium">Scroll Down</span>
            <div className="animate-bounce">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground">
                <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

<style>{`
  .typewriter-text { white-space: nowrap; }
  .caret { margin-left: 2px; display: inline-block; width: 2px; animation: blink 1s steps(1, end) infinite; }
  @keyframes blink { 50% { opacity: 0; } }
`}</style>

      {!mounted && <span className="sr-only">Interactive hero background</span>}
    </section>
  )
}