export type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
  repo?: string
  caseStudy?: string
  year?: string
}

export const projects: Project[] = [
  {
    title: "Interface System Revamp",
    description: "Component system rebuilt with accessibility-first patterns and strict performance budgets.",
    tags: ["React", "TypeScript", "shadcn/ui"],
    link: "#",
    repo: "#",
    year: "2024",
  },
  {
    title: "Marketing Site Engine",
    description: "Static-first, CMS-backed engine with image optimization and instant previews.",
    tags: ["Next.js", "SEO", "Edge"],
    link: "#",
    repo: "#",
    year: "2025",
  },
  {
    title: "Design Tokens Pipeline",
    description: "Automated theming pipeline with CI validation and multi-brand outputs.",
    tags: ["Design Tokens", "CI", "Theming"],
    link: "#",
    repo: "#",
    year: "2023",
  },
  {
    title: "Realtime Dashboard",
    description: "Realtime metrics dashboard with clear visual hierarchy and defaults.",
    tags: ["SWR", "Recharts", "Tailwind"],
    link: "#",
    repo: "#",
    year: "2024",
  },
]



