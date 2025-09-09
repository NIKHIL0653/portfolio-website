import type { Metadata } from "next"
import { ProjectsSection } from "@/components/projects-section"

export const metadata: Metadata = {
  title: "Projects — Nikhil Choudhary",
  description: "Selected work and experiments by Nikhil Choudhary.",
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <ProjectsSection />
    </main>
  )
}
