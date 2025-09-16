import { InteractiveHero } from "@/components/interactive-hero"
import { SiteFooter } from "@/components/site-footer"
import { ActivityHeatmap } from "@/components/activity-heatmap"
import { TechStackMarquee } from "@/components/tech-stack-marquee"
import { LetsConnect } from "@/components/lets-connect"
import { MultilingualGreeting } from "@/components/multilingual-greeting"
import { Github, Wrench, FolderOpen, FileText, User, Eye } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col bg-[#fafafa] dark:bg-[#121212]">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-16 lg:p-8">
        <div className="w-full max-w-7xl bg-card rounded-lg border border-border overflow-hidden shadow-md sm:shadow-lg">
          <InteractiveHero />

          {/* Activity Section */}
          <section id="activity" className="px-6 sm:px-8 py-6 sm:py-8 border-t border-dashed border-border">
            <header className="mb-3 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-center flex items-center justify-center gap-2"><Github className="h-6 w-6" /> Coding Activity</h2>
            </header>
            <div className="flex justify-center">
              <ActivityHeatmap />
            </div>
          </section>

          {/* Tech Stack marquee section */}
          <section id="tech" className="px-6 sm:px-8 py-6 sm:py-8 border-t border-dashed border-border">
            <header className="mb-3 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-center flex items-center justify-center gap-2"><Wrench className="h-6 w-6" /> Tech Stack</h2>
            </header>
            <TechStackMarquee />
          </section>

          {/* Navigation Section */}
          <section id="navigation" className="px-6 sm:px-8 py-6 sm:py-8 border-t border-dashed border-gray-300 dark:border-gray-600">
            <header className="mb-0 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-center flex items-center justify-center gap-3">
                <Eye className="h-7 w-7 text-muted-foreground" />
                Know More
              </h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 relative">
              {/* Projects Column */}
              <Link href="/projects" className="group relative flex flex-col items-center justify-center min-h-[120px] py-2 pt-10">
                <div className="flex flex-col items-center text-center transition-all duration-500 group-hover:-translate-y-5">
                  <div className="mb-2 transition-all duration-500 group-hover:scale-90 group-hover:mb-1">
                    <FolderOpen className="h-14 w-14 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Projects</h3>
                </div>
                <div className="mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:group-hover:translate-y-0 md:translate-y-1">
                  <p className="text-muted-foreground text-center leading-relaxed text-sm max-w-xs">Discover my latest projects and technical implementations</p>
                </div>
                {/* Custom dashed divider for desktop - extended to connect with top/bottom */}
                <div className="hidden md:block absolute -top-6 bottom-2 right-0 custom-dashed-line" style={{width: '0.5px', height: 'auto'}}></div>
                {/* Custom horizontal dashed divider for mobile */}
                <div className="md:hidden absolute -bottom-1 left-4 right-4 custom-dashed-line-horizontal" style={{height: '0.5px', width: 'auto'}}></div>
              </Link>

              {/* Blog Column */}
              <Link href="/blog" className="group relative flex flex-col items-center justify-center min-h-[120px] py-2 pt-10">
                <div className="flex flex-col items-center text-center transition-all duration-500 group-hover:-translate-y-5">
                  <div className="mb-2 transition-all duration-500 group-hover:scale-90 group-hover:mb-1">
                    <FileText className="h-14 w-14 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Blog</h3>
                </div>
                <div className="mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:group-hover:translate-y-0 md:translate-y-1">
                  <p className="text-muted-foreground text-center leading-relaxed text-sm max-w-xs">Read my thoughts on development, design, and technology</p>
                </div>
                {/* Custom dashed divider for desktop - extended to connect with top/bottom */}
                <div className="hidden md:block absolute -top-6 bottom-2 right-0 custom-dashed-line" style={{width: '0.5px', height: 'auto'}}></div>
                {/* Custom horizontal dashed divider for mobile */}
                <div className="md:hidden absolute -bottom-1 left-4 right-4 custom-dashed-line-horizontal" style={{height: '0.5px', width: 'auto'}}></div>
              </Link>

              {/* About Column */}
              <Link href="/about" className="group relative flex flex-col items-center justify-center min-h-[120px] py-2 pt-10">
                <div className="flex flex-col items-center text-center transition-all duration-500 group-hover:-translate-y-5">
                  <div className="mb-2 transition-all duration-500 group-hover:scale-90 group-hover:mb-1">
                    <User className="h-14 w-14 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">About</h3>
                </div>
                <div className="mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:group-hover:translate-y-0 md:translate-y-1">
                  <p className="text-muted-foreground text-center leading-relaxed text-sm max-w-xs">Learn about my journey and professional background</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Let's Connect */}
          <section id="connect" className="px-6 sm:px-8 py-4 sm:py-6 border-t border-dashed border-border">
            <header className="mb-3 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-center">Let's connect</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-center">
                Reach me via email, X, GitHub, or LinkedIn.
              </p>
            </header>
            <LetsConnect />
          </section>

          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <MultilingualGreeting />
          </div>
        </div>
      </div>
    </main>
  )
}



