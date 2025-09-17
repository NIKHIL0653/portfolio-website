"use client"

import { projects } from "@/data/projects"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRef, useMemo, useState } from "react"

export function ProjectsSection() {
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)

  // Generate random grid patterns for more varied layout
  const gridPatterns = useMemo(() => {
    const patterns = [
      '', // Regular 1x1
      'md:col-span-2 lg:col-span-2', // Large 2x2
      'md:col-span-2 lg:col-span-1', // Wide 2x1
      'md:row-span-2 lg:row-span-1', // Tall 1x2 (medium screens)
      'lg:col-span-2 lg:row-span-1', // Wide on large screens
      'md:col-span-1 lg:col-span-2', // Wide only on large screens
      '', // Regular 1x1
      'md:col-span-2 lg:col-span-1', // Wide 2x1
      '', // Regular 1x1
      'lg:col-span-2', // Wide on large only
      'md:row-span-2', // Tall on medium+
      '', // Regular 1x1
    ]
    
    // Create a more random distribution
    return projects.map((_, index) => {
      const seed = index * 7 + 13 // Simple pseudo-random seed
      const patternIndex = seed % patterns.length
      
      // Add some additional randomness based on index position
      if (index % 8 === 0) return patterns[1] // Every 8th is large
      if (index % 6 === 2) return patterns[2] // Every 6th starting at 2 is wide
      if (index % 9 === 4) return patterns[4] // Every 9th starting at 4 is lg wide
      if (index % 11 === 1) return patterns[3] // Every 11th starting at 1 is tall
      if (index % 7 === 3) return patterns[5] // Every 7th starting at 3 is lg-only wide
      if (index % 13 === 6) return patterns[9] // Every 13th starting at 6 is lg wide
      if (index % 10 === 7) return patterns[10] // Every 10th starting at 7 is tall
      
      return patterns[0] // Default regular
    })
  }, [])

  // Generate random heights for more visual variety
  const cardHeights = useMemo(() => {
    const heights = ['min-h-[200px]', 'min-h-[240px]', 'min-h-[180px]', 'min-h-[220px]', 'min-h-[260px]']
    return projects.map((_, index) => {
      const seed = (index * 3 + 7) % heights.length
      return heights[seed]
    })
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
    const card = cardRefs.current[index]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // More responsive tilt calculation
    const rotateX = (mouseY / (rect.height / 2)) * -12 // Max 12 degrees for more noticeable effect
    const rotateY = (mouseX / (rect.width / 2)) * 12 // Max 12 degrees

    // Calculate cursor position for glow effect (0-100%)
    const cursorX = ((e.clientX - rect.left) / rect.width) * 100
    const cursorY = ((e.clientY - rect.top) / rect.height) * 100

    // Smooth transition with CSS transition
    card.style.transition = "transform 0.1s ease-out"
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`

    // Set CSS custom properties for glow position
    card.style.setProperty('--cursor-x', `${cursorX}%`)
    card.style.setProperty('--cursor-y', `${cursorY}%`)
  }

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index]
    if (!card) return

    // Smooth return to original position
    card.style.transition = "transform 0.3s ease-out"
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)"

    // Reset glow position
    card.style.setProperty('--cursor-x', '50%')
    card.style.setProperty('--cursor-y', '50%')
  }

  const handleCardClick = (index: number) => {
    // Only change active state when clicking on a different card
    // Clicking on the same card keeps it active
    if (activeCardIndex !== index) {
      setActiveCardIndex(index)
    }
  }

  return (
    <section id="projects">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
        {projects.map((p, index) => {
          const gridClasses = gridPatterns[index]
          const heightClass = cardHeights[index]

          return (
            <li
              key={p.title}
              ref={(el) => { cardRefs.current[index] = el }}
              className={`group relative border-2 rounded-lg p-4 bg-card hover:border-primary transition-all duration-300 overflow-hidden shadow-lg ${gridClasses} ${heightClass} flex flex-col ${
                activeCardIndex === index ? 'border-black md:border-primary' : 'border-border'
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)",
                transition: "transform 0.3s ease-out"
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => handleCardClick(index)}
            >
              <article className="relative flex flex-col gap-2 h-full justify-between" style={{ transform: "translateZ(20px)" }}>
                <div className="flex flex-col gap-2 flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold leading-tight">{p.title}</h3>
                    {p.year ? <span className="text-xs text-muted-foreground font-mono shrink-0">{p.year}</span> : null}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{p.description}</p>
                </div>
                
                <div className="flex flex-col gap-3 mt-auto">
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li key={t} className={cn("text-xs px-2 py-1 rounded border", "bg-background")}>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-3">
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-primary hover:underline font-medium"
                        aria-label={`Visit ${p.title} website`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit →
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-primary hover:underline font-medium"
                        aria-label={`${p.title} source code`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Source →
                      </a>
                    )}
                    {p.caseStudy && (
                      <Link
                        href={p.caseStudy}
                        className="text-sm text-primary hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Details →
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}