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
    title: "Turbo-Cash",
    description: "A sleek looking finance tracking and expense habit building application",
    tags: ["React", "TypeScript", "Supabase", "Tailwind"],
    link: "#",
    repo: "#",
    year: "2025",
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
  {
    title: "AI-Powered Code Review",
    description: "Machine learning system that analyzes code quality and suggests improvements.",
    tags: ["Python", "TensorFlow", "FastAPI"],
    link: "#",
    repo: "#",
    year: "2024",
  },
  {
    title: "Mobile Banking App",
    description: "Secure banking application with biometric authentication and offline capabilities.",
    tags: ["React Native", "Node.js", "MongoDB"],
    link: "#",
    repo: "#",
    year: "2023",
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack marketplace with advanced filtering, payments, and analytics.",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    link: "#",
    repo: "#",
    year: "2024",
  },
  {
    title: "IoT Device Manager",
    description: "Cloud platform for managing and monitoring IoT devices with real-time data visualization.",
    tags: ["AWS", "MQTT", "D3.js"],
    link: "#",
    repo: "#",
    year: "2023",
  },
  {
    title: "Collaborative Whiteboard",
    description: "Real-time collaborative drawing and brainstorming tool with shape recognition.",
    tags: ["WebRTC", "Canvas API", "Socket.io"],
    link: "#",
    repo: "#",
    year: "2024",
  },
]



