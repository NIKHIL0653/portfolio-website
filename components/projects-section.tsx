"use client"

import { projects } from "@/data/projects"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRef } from "react"

export function ProjectsSection() {
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])

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

    // Smooth transition with CSS transition
    card.style.transition = "transform 0.1s ease-out"
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
  }

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index]
    if (!card) return

    // Smooth return to original position
    card.style.transition = "transform 0.3s ease-out"
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)"
  }

  return (
    <section id="projects">
      <header className="mb-4 sm:mb-6 px-2">
        <h1 className="text-2xl sm:text-3xl font-semibold">Projects</h1>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p, index) => (
          <li
            key={p.title}
            ref={(el) => { cardRefs.current[index] = el }}
            className="group relative border-2 border-border rounded-lg p-4 hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)",
              transition: "transform 0.3s ease-out"
            }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <article className="relative flex flex-col gap-2" style={{ transform: "translateZ(20px)" }}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                {p.year ? <span className="text-xs text-muted-foreground font-mono">{p.year}</span> : null}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              <ul className="flex flex-wrap gap-1.5 mt-1">
                {p.tags.map((t) => (
                  <li key={t} className={cn("text-xs px-2 py-1 rounded border", "bg-background")}>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 mt-2">
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-primary hover:underline font-medium"
                    aria-label={`Visit ${p.title} website`}
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
                  >
                    Source →
                  </a>
                )}
                {p.caseStudy && (
                  <Link href={p.caseStudy} className="text-sm text-primary hover:underline font-medium">
                    Details →
                  </Link>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
