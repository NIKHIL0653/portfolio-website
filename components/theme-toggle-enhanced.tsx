"use client"

import { Moon, Sun, Monitor, Loader2 } from "lucide-react"
import { useTheme, useThemeTransition } from "./theme-provider-enhanced"
import { useEffect, useState } from "react"

interface ThemeToggleProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "minimal" | "pill"
  showLabels?: boolean
  className?: string
}

export function ThemeToggle({
  size = "md",
  variant = "default",
  showLabels = false,
  className = "",
}: ThemeToggleProps) {
  const { theme, setTheme, isLoading, hasError } = useTheme()
  const { isTransitioning, transitionToTheme } = useThemeTransition()
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Size configurations
  const sizeConfig = {
    sm: {
      container: "p-0.5",
      button: "w-6 h-6",
      icon: "h-3 w-3",
      text: "text-xs",
    },
    md: {
      container: "p-1",
      button: "w-7 h-7",
      icon: "h-3.5 w-3.5",
      text: "text-xs",
    },
    lg: {
      container: "p-1.5",
      button: "w-8 h-8",
      icon: "h-4 w-4",
      text: "text-sm",
    },
  }

  const config = sizeConfig[size]

  // Handle theme change with transition
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    if (isTransitioning) return

    transitionToTheme(() => {
      setTheme(newTheme)
    })
  }

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, themeValue: "light" | "dark" | "system") => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleThemeChange(themeValue)
    }
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`${config.container} bg-muted/40 rounded-full shadow-sm border border-border/50 ${className}`}>
        <div className="flex items-center space-x-0.5">
          <div className={`${config.button} rounded-full bg-muted animate-pulse`} />
          <div className={`${config.button} rounded-full bg-muted animate-pulse`} />
          <div className={`${config.button} rounded-full bg-muted animate-pulse`} />
        </div>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={`${config.container} bg-muted/40 rounded-full shadow-sm border border-border/50 ${className}`}>
        <div className="flex items-center justify-center w-20 h-8">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  // Error state
  if (hasError) {
    return (
      <div className={`${config.container} bg-destructive/10 rounded-full shadow-sm border border-destructive/20 ${className}`}>
        <div className="flex items-center justify-center w-20 h-8">
          <span className="text-xs text-destructive">!</span>
        </div>
      </div>
    )
  }

  // Different variants
  if (variant === "minimal") {
    return (
      <button
        onClick={() => handleThemeChange(theme === "dark" ? "light" : "dark")}
        onKeyDown={(e) => handleKeyDown(e, theme === "dark" ? "light" : "dark")}
        className={`
          ${config.button} ${config.container}
          bg-muted/40 rounded-full shadow-sm border border-border/50
          flex items-center justify-center
          transition-all duration-200 ease-in-out
          hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary/20
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isTransitioning ? "animate-pulse" : ""}
          ${className}
        `}
        disabled={isTransitioning}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <Sun className={`${config.icon} text-yellow-500`} />
        ) : (
          <Moon className={`${config.icon} text-slate-600`} />
        )}
      </button>
    )
  }

  if (variant === "pill") {
    return (
      <div className={`${config.container} bg-muted/40 rounded-full shadow-sm border border-border/50 ${className}`}>
        <div className="flex items-center bg-transparent rounded-full">
          <button
            onClick={() => handleThemeChange("system")}
            onKeyDown={(e) => handleKeyDown(e, "system")}
            className={`
              ${config.button} rounded-full ${config.text} font-medium
              transition-all duration-200 ease-in-out
              flex items-center justify-center
              ${theme === "system"
                ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }
              ${isTransitioning ? "animate-pulse" : ""}
            `}
            disabled={isTransitioning}
            aria-label="Switch to system mode"
            title="System mode"
          >
            <Monitor className={config.icon} />
            {showLabels && <span className="ml-1 hidden sm:inline">System</span>}
          </button>

          <button
            onClick={() => handleThemeChange("light")}
            onKeyDown={(e) => handleKeyDown(e, "light")}
            className={`
              ${config.button} rounded-full ${config.text} font-medium
              transition-all duration-200 ease-in-out mx-0.5
              flex items-center justify-center
              ${theme === "light"
                ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }
              ${isTransitioning ? "animate-pulse" : ""}
            `}
            disabled={isTransitioning}
            aria-label="Switch to light mode"
            title="Light mode"
          >
            <Sun className={config.icon} />
            {showLabels && <span className="ml-1 hidden sm:inline">Light</span>}
          </button>

          <button
            onClick={() => handleThemeChange("dark")}
            onKeyDown={(e) => handleKeyDown(e, "dark")}
            className={`
              ${config.button} rounded-full ${config.text} font-medium
              transition-all duration-200 ease-in-out
              flex items-center justify-center
              ${theme === "dark"
                ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }
              ${isTransitioning ? "animate-pulse" : ""}
            `}
            disabled={isTransitioning}
            aria-label="Switch to dark mode"
            title="Dark mode"
          >
            <Moon className={config.icon} />
            {showLabels && <span className="ml-1 hidden sm:inline">Dark</span>}
          </button>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className={`${config.container} bg-muted/40 rounded-full shadow-sm border border-border/50 ${className}`}>
      <div className="flex items-center space-x-0.5">
        <button
          onClick={() => handleThemeChange("system")}
          onKeyDown={(e) => handleKeyDown(e, "system")}
          className={`
            ${config.button} rounded-full ${config.text} font-medium
            transition-all duration-200 ease-in-out
            flex items-center justify-center
            ${theme === "system"
              ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }
            ${isTransitioning ? "animate-pulse" : ""}
            focus:outline-none focus:ring-2 focus:ring-primary/20
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          disabled={isTransitioning}
          aria-label="Switch to system mode"
          title="System mode"
        >
          <Monitor className={config.icon} />
        </button>

        <button
          onClick={() => handleThemeChange("light")}
          onKeyDown={(e) => handleKeyDown(e, "light")}
          className={`
            ${config.button} rounded-full ${config.text} font-medium
            transition-all duration-200 ease-in-out
            flex items-center justify-center
            ${theme === "light"
              ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }
            ${isTransitioning ? "animate-pulse" : ""}
            focus:outline-none focus:ring-2 focus:ring-primary/20
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          disabled={isTransitioning}
          aria-label="Switch to light mode"
          title="Light mode"
        >
          <Sun className={config.icon} />
        </button>

        <button
          onClick={() => handleThemeChange("dark")}
          onKeyDown={(e) => handleKeyDown(e, "dark")}
          className={`
            ${config.button} rounded-full ${config.text} font-medium
            transition-all duration-200 ease-in-out
            flex items-center justify-center
            ${theme === "dark"
              ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }
            ${isTransitioning ? "animate-pulse" : ""}
            focus:outline-none focus:ring-2 focus:ring-primary/20
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          disabled={isTransitioning}
          aria-label="Switch to dark mode"
          title="Dark mode"
        >
          <Moon className={config.icon} />
        </button>
      </div>
    </div>
  )
}

// Export additional theme utilities
export { useTheme, useThemeStyles, useThemeTransition } from "./theme-provider-enhanced"


