"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center bg-muted/40 rounded-full p-0.5 shadow-sm border border-border/50">
      <button
        onClick={() => setTheme("system")}
        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium transition-all duration-200 ease-in-out ${
          theme === "system"
            ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
        }`}
        aria-label="Switch to system mode"
        title="System mode"
      >
        <Monitor className="h-3 w-3" />
      </button>

      <button
        onClick={() => setTheme("light")}
        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium transition-all duration-200 ease-in-out mx-0.5 ${
          theme === "light"
            ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
        }`}
        aria-label="Switch to light mode"
        title="Light mode"
      >
        <Sun className="h-3 w-3" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium transition-all duration-200 ease-in-out ${
          theme === "dark"
            ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
        }`}
        aria-label="Switch to dark mode"
        title="Dark mode"
      >
        <Moon className="h-3 w-3" />
      </button>
    </div>
  )
}