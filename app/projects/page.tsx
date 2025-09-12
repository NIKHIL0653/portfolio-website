import type { Metadata } from "next"
import { ProjectsSection } from "@/components/projects-section"

export const metadata: Metadata = {
  title: "Projects — Nikhil Choudhary",
  description: "Selected work and experiments by Nikhil Choudhary.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-dvh flex flex-col bg-[#fafafa] dark:bg-[#0f1419]">
      <div className="flex-1 p-2 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="px-3 sm:px-8 py-6 sm:py-8">
            <header className="mb-3 sm:mb-4">
              <h1 className="text-2xl sm:text-3xl font-semibold">Projects</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">Selected work and experiments showcasing my skills and creativity.</p>
            </header>
            <ProjectsSection />
          </div>
        </div>
      </div>
    </main>
  )
}
