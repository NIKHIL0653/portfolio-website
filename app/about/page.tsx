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
        {/* Centered Frame for Name and Description */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="w-full max-w-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-6 text-left">Nikhil Choudhary</h1>
            <div className="prose prose-neutral dark:prose-invert prose-base leading-relaxed text-left">
              <p className="text-base sm:text-lg text-muted-foreground mb-4">
                I’m Nikhil Choudhary, a developer focused on performant, accessible, and design-forward web
                experiences—bridging interactive front-ends with robust backends.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground">
                Areas of interest: AI-assisted tooling, developer experience, visualization, and building interfaces that feel
                "alive" without sacrificing clarity or speed.
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Dotted Separator */}
        <div className="border-t border-dotted border-gray-300 dark:border-gray-600 mb-12 sm:mb-16"></div>

        {/* Maps and Companies Section - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 relative">
          {/* Vertical Dotted Separator Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l border-dotted border-gray-300 dark:border-gray-600 transform -translate-x-1/2"></div>

          {/* Location Card */}
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

          {/* Dotted Separator Line (Mobile) */}
          <div className="lg:hidden border-t border-dotted border-gray-300 dark:border-gray-600 my-4"></div>

          {/* Companies Timeline */}
          <div className="flex flex-col justify-center">
            <CompaniesTimeline />
          </div>
        </div>
    </main>
  )
}
