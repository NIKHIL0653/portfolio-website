import type { Metadata } from "next"
import { ProjectsSection } from "@/components/projects-section"

export const metadata: Metadata = {
  title: "Projects — Nikhil Choudhary",
  description: "Selected work and experiments by Nikhil Choudhary.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-dvh flex flex-col bg-[#fafafa] dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-28 pb-6 sm:pb-8">
        <ProjectsSection />
      </div>
    </main>
  )
}



