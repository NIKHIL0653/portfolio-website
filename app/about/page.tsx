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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-balance mb-8 sm:mb-12">About</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 relative">
          {/* Vertical dotted separator line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l border-dotted border-muted-foreground/30 transform -translate-x-1/2"></div>

          {/* Left Column - About & Location */}
          <div className="space-y-8 lg:pr-6">
            <div className="prose prose-neutral dark:prose-invert leading-relaxed">
              <p>
                I’m Nikhil Choudhary, a developer focused on performant, accessible, and design-forward web
                experiences—bridging interactive front-ends with robust backends.
              </p>
              <p>
                Areas of interest: AI-assisted tooling, developer experience, visualization, and building interfaces that feel
                "alive" without sacrificing clarity or speed.
              </p>
            </div>

            {/* Location Card */}
            <div className="border border-border rounded-lg overflow-hidden">
              <article className="flex flex-col" style={{ height: '280px' }}>
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

          {/* Right Column - Companies Timeline */}
          <div className="lg:pl-6">
            <CompaniesTimeline />
          </div>
        </div>
    </main>
  )
}
