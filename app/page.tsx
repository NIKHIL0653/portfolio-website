"use client"

import { InteractiveHero } from "@/components/interactive-hero"
import { ActivityHeatmap } from "@/components/activity-heatmap"
import { TechStackMarquee } from "@/components/tech-stack-marquee"
import { LetsConnect } from "@/components/lets-connect"
import { MultilingualGreeting } from "@/components/multilingual-greeting"
import { Github, Wrench, FolderOpen, FileText, User, Star, GitFork } from "lucide-react"
import Link from "next/link"

// Enhanced Blog Card Component
function BlogCard() {
  const blogPosts = [
    { title: "Empathy in Open Source", excerpt: "Empathy and kindness is a choice." },
    { title: "Web Development for Beginners: 7 Essential Steps To Get Started Today!", excerpt: "Discover how to unleash the power of words and advance your career." },
    { title: "Why Every Developer Should Build Their Own Blog", excerpt: "Discover the importance of building a blog as a developer, along with tips on how to set up, design, create, and share your content." }
  ];

  return (
    <Link href="/blog" className="group relative bg-card rounded-lg border border-border overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 min-h-[380px] block">
      <div
        className="absolute inset-0 p-8"
        style={{
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
        }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 blur-[1px] group-hover:blur-sm transition-all duration-300 h-full">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-card border border-border/50 p-4 rounded-lg transition-all duration-300 hover:!blur-none hover:scale-105 cursor-pointer flex flex-col"
            >
              <h4 className="font-semibold text-sm mb-2 text-muted-foreground/80 line-clamp-3">{post.title}</h4>
              <p className="text-muted-foreground/50 text-xs line-clamp-4">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-10 left-8 flex flex-col-reverse items-start">
        <div className="overflow-hidden max-h-0 group-hover:max-h-40 group-hover:mt-4 transition-all duration-300 ease-in-out">
          <span className="text-foreground font-medium flex items-center gap-1">
            Visit the Blog →
          </span>
        </div>
        <div className="transition-all duration-300">
          <FileText className="h-12 w-12 text-foreground mb-3 group-hover:h-10 group-hover:w-10 transition-all duration-300" />
          <h3 className="text-2xl font-bold text-foreground group-hover:text-3xl transition-all duration-300">Read the Blog</h3>
          <p className="text-muted-foreground text-base mt-1.5">Discover the most outstanding articles.</p>
        </div>
      </div>
    </Link>
  );
}

// Enhanced Projects Card Component (MODIFIED)
function ProjectsCard() {
  const projects = [
    { title: "E-commerce Platform", description: "Full-stack solution with React & Node.js", tech: ["React", "Node.js"], stars: 42, forks: 12, status: "Active" },
    { title: "Real-time Chat App", description: "WebSocket-based chat application", tech: ["Socket.io", "Express"], stars: 28, forks: 8, status: "Complete" },
    // Removed AI assistant and Portfolio for this layout
  ];

  return (
    <Link href="/projects" className="group relative bg-card rounded-lg border border-border overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 min-h-[380px] block">
      <div
        className="absolute inset-0 p-8"
        style={{
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full blur-[1px] group-hover:blur-sm transition-all duration-300">
          {/* Small Card - Left Column */}
          <div className="bg-card border border-border/50 p-3 rounded-lg transition-all duration-300 hover:!blur-none hover:scale-105 cursor-pointer flex flex-col justify-between">
            <div>
              <div className="h-12 mb-2 rounded bg-muted/50"></div>
              <h4 className="font-semibold text-xs mb-1 text-muted-foreground line-clamp-1">{projects[1].title}</h4>
            </div>
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground/70">
              <span className="flex items-center gap-1"><Star className="h-2 w-2" /> {projects[1].stars}</span>
              <span className="px-1.5 py-0.5 bg-muted/50 text-muted-foreground text-[10px] rounded">{projects[1].status}</span>
            </div>
          </div>
          
          {/* Large Card - Right Column */}
          <div className="bg-card border border-border/50 row-span-2 p-4 rounded-lg transition-all duration-300 hover:!blur-none hover:scale-105 cursor-pointer flex flex-col justify-between">
            <div>
              <div className="h-20 mb-3 rounded bg-muted/50"></div>
              <h4 className="font-semibold text-sm mb-2 text-muted-foreground">{projects[0].title}</h4>
              <p className="text-muted-foreground/70 text-xs mb-3">{projects[0].description}</p>
            </div>
            <div>
              <div className="flex flex-wrap gap-1 mb-3">
                {projects[0].tech.map((tech, techIndex) => (
                  <span key={techIndex} className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded">{tech}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
                <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {projects[0].stars}</span>
                <span className="flex items-center gap-1"><GitFork className="h-3 w-3" /> {projects[0].forks}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-8 flex flex-col-reverse items-start">
        <div className="overflow-hidden max-h-0 group-hover:max-h-40 group-hover:mt-4 transition-all duration-300 ease-in-out">
          <span className="text-foreground font-medium flex items-center gap-1">
            View all projects →
          </span>
        </div>
        <div className="transition-all duration-300">
          <FolderOpen className="h-12 w-12 text-foreground mb-3 group-hover:h-10 group-hover:w-10 transition-all duration-300" />
          <h3 className="text-2xl font-bold text-foreground group-hover:text-3xl transition-all duration-300">Featured Projects</h3>
          <p className="text-muted-foreground text-base mt-1.5">My latest technical work.</p>
        </div>
      </div>
    </Link>
  );
}

// Enhanced About Card Component
function AboutCard() {
  return (
    <Link href="/about" className="group relative bg-card rounded-lg border border-border overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 min-h-[380px] block">
      
      <div className="absolute bottom-10 left-8 flex flex-col-reverse items-start">
        <div className="overflow-hidden max-h-0 group-hover:max-h-40 group-hover:mt-4 transition-all duration-300 ease-in-out">
          <span className="text-foreground font-medium flex items-center gap-1">
            Learn more about me →
          </span>
        </div>
        <div className="transition-all duration-300">
          <User className="h-12 w-12 text-foreground mb-3 group-hover:h-10 group-hover:w-10 transition-all duration-300" />
          <h3 className="text-2xl font-bold text-foreground group-hover:text-3xl transition-all duration-300">About Me</h3>
          <p className="text-muted-foreground text-base mt-1.5">My story & my skills.</p>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col bg-[#fafafa] dark:bg-[#121212]">
      <div className="flex-1 px-4 py-6 sm:p-8 md:p-12 lg:p-12">
        <div className="w-full max-w-7xl mx-auto space-y-4">

          {/* Hero Card */}
          <div className="bg-card rounded-lg border border-border overflow-hidden shadow-md">
            <InteractiveHero />
          </div>

          {/* Merged Tech Stack & Activity Card */}
          <div className="bg-card rounded-lg border border-border overflow-hidden shadow-md p-6 sm:p-8">
            {/* --- Tech Stack Section --- */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3">
                    <Wrench className="h-6 w-6 text-muted-foreground" />
                    <h2 className="text-2xl sm:text-3xl font-semibold">Tech Stack</h2>
                </div>
            </div>
            <TechStackMarquee />

            {/* --- Activity Section --- */}
            <div className="mt-10 pt-8 border-t border-border">
                <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-3">
                        <Github className="h-6 w-6 text-muted-foreground" />
                        <h2 className="text-2xl sm:text-3xl font-semibold">Coding Activity</h2>
                    </div>
                </div>
                <ActivityHeatmap />
            </div>
          </div>

          {/* Three Interactive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <BlogCard />
            <ProjectsCard />
            <AboutCard />
          </div>

          {/* Let's Connect Card */}
          <div className="bg-card rounded-lg border border-border overflow-hidden shadow-md p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-[28px] md:text-[50px] font-semibold">Let's connect</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Reach me via email, X, GitHub, or LinkedIn.
              </p>
            </div>
            <LetsConnect />
            <div className="mt-8 pt-6">
                <MultilingualGreeting />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}