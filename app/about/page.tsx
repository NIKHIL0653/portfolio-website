import type { Metadata } from "next"
import CompaniesTimeline from "../../components/companies-timeline"

export const metadata: Metadata = {
  title: "About — Nikhil Choudhary",
  description: "About Nikhil Choudhary.",
}

export default function AboutPage() {
  return (
    <main className="min-h-dvh flex flex-col bg-[#fafafa] dark:bg-[#121212]">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-1 sm:pt-0 sm:pb-2">
            {/* 2 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ml-4 lg:ml-8">

              {/* About Section */}
              <div className="w-full max-w-xl lg:border-r-2 lg:border-dashed lg:border-border lg:pr-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-6 sm:mb-8 text-left">About Me</h1>
                <div className="prose prose-neutral dark:prose-invert prose-base leading-relaxed">
                  <p className="text-base text-muted-foreground mb-6 text-left">
                    I’m Nikhil Choudhary, a developer focused on performant, accessible, and design-forward web
                    experiences—bridging interactive front-ends with robust backends.
                  </p>
                  <p className="text-base text-muted-foreground text-left">
                    Areas of interest: AI-assisted tooling, developer experience, visualization, and building interfaces that feel
                    "alive" without sacrificing clarity or speed.
                  </p>
                </div>
              </div>

              {/* Companies Timeline */}
              <div className="w-full">
                <CompaniesTimeline />
              </div>
            </div>
        </div>
      </div>
    </main>
  )
}



