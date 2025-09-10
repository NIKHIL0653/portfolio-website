"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center bg-card border border-border rounded-md p-0.5 shadow-sm max-w-fit">
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center justify-center w-8 h-8 rounded text-sm font-medium transition-all duration-300 ease-in-out ${
          theme === "light"
            ? "bg-primary text-primary-foreground shadow-sm scale-105"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-105"
        }`}
        aria-label="Switch to light mode"
      >
        <Sun className="h-4 w-4" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center justify-center w-8 h-8 rounded text-sm font-medium transition-all duration-300 ease-in-out ${
          theme === "dark"
            ? "bg-primary text-primary-foreground shadow-sm scale-105"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-105"
        }`}
        aria-label="Switch to dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  )
}