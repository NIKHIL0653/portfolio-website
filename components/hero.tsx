"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-4 py-12 sm:py-16 md:py-24">
      <div className="flex flex-col gap-6">
        <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">Software Engineer</h1>
        <p className="text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          I’m Nikhil Choudhary. I design and build reliable, accessible web experiences with a focus on clarity,
          performance, and maintainability.
        </p>
        <div className="flex items-center gap-3">
          <Button asChild>
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild variant="secondary">
            <a href="#blogs">Read the Blog</a>
          </Button>
        </div>
      </div>
    </section>
  )
}



