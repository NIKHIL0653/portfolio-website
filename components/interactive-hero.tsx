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

const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

const isMobile = window.innerWidth < 768; // Mobile breakpoint

// Galaxy/Warp Speed Animation Logic (Kept from previous version)
const STAR_COLOR = isDark ? "#ffffff" : "#111111";
const STAR_COUNT = isMobile ? 300 : 1000; // Optimized count for better performance
const MAX_DEPTH = 50;

type Star = { x: number; y: number; z: number; px?: number; py?: number };
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({ x: 0, y: 0, z: 0 }));

const resetStar = (s: Star) => {
s.x = rand(-width / 2, width / 2);
s.y = rand(-height / 2, height / 2);
// Bias towards closer depths for immediate visibility
s.z = Math.pow(Math.random(), 0.7) * MAX_DEPTH + 1;
s.px = undefined;
s.py = undefined;
};

stars.forEach(resetStar);
resize();
window.addEventListener("resize", resize);

let raf = 0;
const tick = () => {
ctx.clearRect(0, 0, width, height);
const centerX = width / 2;
const centerY = height / 2;
const focalLength = width * 0.5;
for (let i = 0; i < stars.length; i++) {
const s = stars[i];
s.z -= 0.15; // Slower, more elegant star movement
if (s.z <= 0) {
resetStar(s);
continue;
}
const k = focalLength / s.z;
const px = s.x * k + centerX;
const py = s.y * k + centerY;
if (px < 0 || px > width || py < 0 || py > height) {
resetStar(s);
continue;
}
const size = (1 - s.z / MAX_DEPTH) * 3.5;
const opacity = 1 - Math.pow(s.z / MAX_DEPTH, 2);
if (s.px !== undefined && s.py !== undefined) {
ctx.beginPath();
ctx.moveTo(s.px, s.py);
ctx.lineTo(px, py);
ctx.lineWidth = size;
ctx.strokeStyle = STAR_COLOR;
ctx.globalAlpha = opacity;
ctx.stroke();
}
s.px = px;
s.py = py;
}
raf = requestAnimationFrame(tick);
};
raf = requestAnimationFrame(tick);

return () => {
cancelAnimationFrame(raf);
window.removeEventListener("resize", resize);
};
}, [theme]);

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
      setCurrentSpecialty((prev) => (prev + 1) % specialties.length)
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
  <section id="top" className="relative h-[85vh] sm:h-[95vh] overflow-hidden">
    {/* Background Animation - Ensure it's visible */}
    <div className="absolute inset-0 z-0">
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
    </div>

    {/* Centered Content Layout */}
    <div className="relative z-10 h-full flex items-center justify-center p-4 sm:p-8">
      <div className="text-center max-w-4xl mx-auto">
        {/* Profile Image */}
        <img
          src="/images/blog/avatar_img.png"
          alt="Nikhil's profile"
          className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full object-cover border-2 border-white/20 shadow-xl mb-6"
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
            <h1 key={currentSpecialty} className="text-balance text-3xl sm:text-5xl md:text-6xl font-bold leading-tight specialty-text text-foreground">
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
      
      /* Seamless Fade Up Animation */
        .specialty-text {
          animation: seamlessFadeUp 1.0s ease-out;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        @keyframes seamlessFadeUp {
          0% { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {!mounted && <span className="sr-only">Interactive hero background</span>}
    </section>
  )
}