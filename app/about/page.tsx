import type { Metadata } from "next"
import { InteractiveMap } from "../../components/interactive-map"
import CompaniesTimeline from "../../components/companies-timeline"

export const metadata: Metadata = {
  title: "About — Nikhil Choudhary",
  description: "About Nikhil Choudhary.",
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 relative">
        {/* Vertical Dotted Separator Line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l border-dotted border-gray-300 dark:border-gray-600 transform -translate-x-1/2"></div>

        {/* Left Column: Name, Text Content, and Maps Card */}
        <div className="flex flex-col space-y-8 sm:space-y-12 ml-6">
          {/* Name and Text Content */}
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-left">About Me</h1>
            <div className="prose prose-neutral dark:prose-invert prose-base leading-relaxed text-left">
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                I’m Nikhil Choudhary, a developer focused on performant, accessible, and design-forward web
                experiences—bridging interactive front-ends with robust backends.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                Areas of interest: AI-assisted tooling, developer experience, visualization, and building interfaces that feel
                "alive" without sacrificing clarity or speed.
              </p>
            </div>
          </div>

          {/* Maps Card */}
          <div className="border border-border rounded-lg overflow-hidden">
            <article className="flex flex-col" style={{ height: '320px' }}>
              <div className="relative w-full h-full p-3">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <InteractiveMap />
                </div>
              </div>
              <div className="px-4 pb-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold leading-tight">
                  Where I'm Located
                </h2>
                <p className="text-sm text-muted-foreground">Kolkata, West Bengal, India</p>
              </div>
            </article>
          </div>
        </div>

        {/* Right Column: Companies Timeline */}
        <div className="flex flex-col justify-start lg:pt-12">
          <CompaniesTimeline />
        </div>
      </div>
    </main>
  )
}
