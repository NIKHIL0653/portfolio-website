import type { Metadata } from "next"
import { ProjectsSection } from "@/components/projects-section"

export const metadata: Metadata = {
  title: "Projects — Nikhil Choudhary",
  description: "Selected work and experiments by Nikhil Choudhary.",
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:py-16">
      <header className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold">Projects</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">Selected work and experiments showcasing my skills and creativity.</p>
      </header>
      <ProjectsSection />
    </main>
  )
}
