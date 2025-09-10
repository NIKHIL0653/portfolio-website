"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "./theme-provider"

import {
  siJavascript,
  siTypescript,
  siReact,
  siTensorflow,
  siSupabase,
  siOpencv,
  siPrisma,
  siNpm,
  siVercel,
  siCloudflareworkers,
  siNodedotjs,
  siPython,
  siDocker,
  siKubernetes,
  siPostgresql,
  siTailwindcss,
  siGit,
  siLinux,
  siScikitlearn,
  siPytorch
} from "simple-icons"

type IconDef = { title: string; path: string }

const ICONS: IconDef[] = [
  { title: siJavascript.title, path: siJavascript.path },
  { title: siTypescript.title, path: siTypescript.path },
  { title: siReact.title, path: siReact.path },
  { title: siTensorflow.title, path: siTensorflow.path },
  { title: siPytorch.title, path: siPytorch.path },
  { title: siScikitlearn.title, path: siScikitlearn.path },
  { title: siSupabase.title, path: siSupabase.path },
  { title: siOpencv.title, path: siOpencv.path },
  { title: siPrisma.title, path: siPrisma.path },
  { title: siNpm.title, path: siNpm.path },
  { title: siVercel.title, path: siVercel.path },
  { title: siCloudflareworkers.title, path: siCloudflareworkers.path },
  { title: siNodedotjs.title, path: siNodedotjs.path },
  { title: siPython.title, path: siPython.path },
  { title: siDocker.title, path: siDocker.path },
  { title: siKubernetes.title, path: siKubernetes.path },
  { title: siPostgresql.title, path: siPostgresql.path },
  { title: siTailwindcss.title, path: siTailwindcss.path },
  { title: siGit.title, path: siGit.path },
  { title: siLinux.title, path: siLinux.path },
]

function Tile({ icon }: { icon: IconDef }) {
  return (
    <div
      className="group relative h-12 w-12 md:h-14 md:w-14 rounded-lg border bg-muted/40 flex items-center justify-center
                 text-foreground/75 transition-all duration-300"
      aria-label={icon.title}
      title={icon.title}
    >
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        className="h-7 w-7 md:h-8 md:w-8 transition-colors duration-300"
      >
        <path d={icon.path} fill="currentColor" />
      </svg>
      <span className="sr-only">{icon.title}</span>
    </div>
  )
}

export function TechStackMarquee({ className }: { className?: string }) {
  const { theme } = useTheme()
  const base = React.useMemo(() => ICONS, [])
  const [gradientStyle, setGradientStyle] = React.useState({
    left: '',
    right: ''
  })

  // Dynamic gradient color based on theme - enhanced blur intensity
  const gradientColor = theme === "dark" ? "#161A1D" : "white"
  const gradientOpacity = theme === "dark" ? "0.95" : "0.98"

  React.useEffect(() => {
    const rgbaColor = theme === "dark" ? `rgba(22, 26, 29, ${gradientOpacity})` : `rgba(255, 255, 255, ${gradientOpacity})`
    const midColor = theme === "dark" ? `rgba(22, 26, 29, 0.4)` : `rgba(255, 255, 255, 0.5)`

    setGradientStyle({
      left: `radial-gradient(ellipse 140% 110% at 100% 50%, transparent 0%, ${midColor} 50%, ${rgbaColor} 80%, ${rgbaColor} 100%)`,
      right: `radial-gradient(ellipse 140% 110% at 0% 50%, transparent 0%, ${midColor} 50%, ${rgbaColor} 80%, ${rgbaColor} 100%)`
    })
  }, [theme, gradientOpacity])

  return (
    <div className={cn("w-full overflow-hidden py-2", className)}>
      <div className="relative" style={{ "--speed": "24s" } as React.CSSProperties}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-32 sm:w-40 z-10"
          style={{
            background: gradientStyle.left,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-32 sm:w-40 z-10"
          style={{
            background: gradientStyle.right,
          }}
        />

        {/* track: duplicate row for seamless loop */}
        <div className="flex w-max items-center gap-3 sm:gap-4 whitespace-nowrap animate-[marquee_var(--speed)_linear_infinite] will-change-transform">
          {base.map((icon, i) => (
            <Tile key={`${icon.title}-${i}`} icon={icon} />
          ))}
          {base.map((icon, i) => (
            <Tile key={`${icon.title}-dup-${i}`} icon={icon} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}