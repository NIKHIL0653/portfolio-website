"use client"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { Mail, Github, Linkedin } from "lucide-react"
import { siX } from "simple-icons"

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" role="img" {...props}>
      <path d={siX.path} fill="currentColor" />
    </svg>
  )
}

type Card = {
  href: string
  title: string
  desc: string
  icon: React.ReactNode
}

const cards: Card[] = [
  {
    href: "mailto:nikhil0653@gmail.com",
    title: "Email me",
    desc: "Let’s build something together.",
    icon: <Mail className="h-6 w-6" />,
  },
  {
    href: "https://x.com/Nikhil0653",
    title: "Follow on X",
    desc: "Occasional thoughts and updates.",
    icon: <XIcon className="h-6 w-6" />,
  },
  {
    href: "https://github.com/NIKHIL0653",
    title: "GitHub",
    desc: "Projects and open source.",
    icon: <Github className="h-6 w-6" />,
  },
  {
    href: "https://linkedin.com/in/nikhil-choudhary-0653",
    title: "LinkedIn",
    desc: "Professional profile and networking.",
    icon: <Linkedin className="h-6 w-6" />,
  },
]

export function LetsConnect() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
      {cards.map((c) => (
        <CardTile key={c.title} {...c} />
      ))}
    </div>
  )
}

function CardTile({ href, title, desc, icon }: Card) {
  const [hover, setHover] = useState(false)
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-sm dark:group-hover:bg-primary dark:group-hover:text-primary-foreground">
          <span>{icon}</span>
        </div>
        <div className="transition-colors duration-300">
          <h3 className="text-base font-medium group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{desc}</p>
        </div>
      </div>
    </Link>
  )
}
