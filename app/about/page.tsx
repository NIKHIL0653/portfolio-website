import type { Metadata } from "next"
import { InteractiveMap } from "@/components/interactive-map"

export const metadata: Metadata = {
  title: "About — Nikhil Choudhary",
  description: "About Nikhil Choudhary.",
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance">About</h1>
      <div className="prose prose-neutral dark:prose-invert mt-6 leading-relaxed">
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
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mt-12">
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
    </main>
  )
}
