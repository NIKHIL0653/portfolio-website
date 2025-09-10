"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-8 h-8 rounded-md bg-card border border-border shadow-sm hover:bg-muted/50 transition-all duration-300 ease-in-out hover:scale-105"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Sun
        className={`h-4 w-4 transition-all duration-500 ease-in-out ${
          theme === "light"
            ? "rotate-0 scale-100 text-yellow-500"
            : "rotate-180 scale-0 text-gray-400"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-500 ease-in-out ${
          theme === "dark"
            ? "rotate-0 scale-100 text-blue-400"
            : "rotate-180 scale-0 text-gray-400"
        }`}
      />
    </button>
  )
}