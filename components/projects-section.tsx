"use client"

import { projects } from "@/data/projects"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function ProjectsSection() {
  return (
    <section id="projects">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-3xl font-semibold">Projects</h1>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <li key={p.title} className="group border rounded-lg p-5 hover:border-primary transition-colors">
            <article className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                {p.year ? <span className="text-xs text-muted-foreground font-mono">{p.year}</span> : null}
              </div>
              <p className="text-sm text-muted-foreground">{p.description}</p>
              <ul className="flex flex-wrap gap-2 mt-1">
                {p.tags.map((t) => (
                  <li key={t} className={cn("text-xs px-2 py-1 rounded border", "bg-background")}>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 mt-2">
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-primary hover:underline"
                    aria-label={`Visit ${p.title} website`}
                  >
                    Visit
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-primary hover:underline"
                    aria-label={`${p.title} source code`}
                  >
                    Source
                  </a>
                )}
                {p.caseStudy && (
                  <Link href={p.caseStudy} className="text-sm text-primary hover:underline">
                    Case study
                  </Link>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
