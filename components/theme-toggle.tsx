"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center bg-card border border-border rounded-md p-0.5 shadow-sm max-w-fit">
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center justify-center w-6 h-6 rounded text-xs font-medium transition-all duration-200 ${
          theme === "light"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
        aria-label="Switch to light mode"
      >
        <Sun className="h-3 w-3" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center justify-center w-6 h-6 rounded text-xs font-medium transition-all duration-200 ${
          theme === "dark"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
        aria-label="Switch to dark mode"
      >
        <Moon className="h-3 w-3" />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`flex items-center justify-center w-6 h-6 rounded text-xs font-medium transition-all duration-200 ${
          theme === "system"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
        aria-label="Switch to system mode"
      >
        <Monitor className="h-3 w-3" />
      </button>
    </div>
  )
}