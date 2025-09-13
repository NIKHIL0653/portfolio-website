"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

type Theme = "light" | "dark" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  enableSystem?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  systemTheme: "light" | "dark"
  actualTheme: "light" | "dark"
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  systemTheme: "light",
  actualTheme: "light",
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "portfolio-theme",
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light")
  const [isMounted, setIsMounted] = useState(false)

  // Get system theme preference
  const getSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window === "undefined") return "light"
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }, [])

  // Calculate the actual theme being applied
  const actualTheme: "light" | "dark" = theme === "system" ? systemTheme : theme

  // Listen to system theme changes
  useEffect(() => {
    if (!enableSystem) return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }

    // Set initial system theme
    setSystemTheme(getSystemTheme())
    
    // Listen for changes
    mediaQuery.addEventListener("change", handleChange)
    
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [enableSystem, getSystemTheme])

  // Load theme from storage on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme
      
      if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
        // Only set system theme if system is enabled
        if (storedTheme === "system" && !enableSystem) {
          setTheme("light")
          localStorage.setItem(storageKey, "light")
        } else {
          setTheme(storedTheme)
        }
      } else {
        // Set default theme and save it
        setTheme(defaultTheme)
        localStorage.setItem(storageKey, defaultTheme)
      }
    } catch (error) {
      console.warn("Theme storage not available, using default theme:", error)
      setTheme(defaultTheme)
    }
    
    setIsMounted(true)
  }, [storageKey, defaultTheme, enableSystem])

  // Apply theme to document
  useEffect(() => {
    if (!isMounted) return

    const root = document.documentElement
    const body = document.body
    
    // Remove all theme classes
    root.classList.remove("light", "dark")
    body.classList.remove("light", "dark")
    
    // Add current theme class
    root.classList.add(actualTheme)
    body.classList.add(actualTheme)
    
    // Set theme-color meta tag for better mobile experience
    const themeColorMeta = document.querySelector('meta[name="theme-color"]')
    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        "content", 
        actualTheme === "dark" ? "#0f0f0f" : "#ffffff"
      )
    } else {
      const meta = document.createElement("meta")
      meta.name = "theme-color"
      meta.content = actualTheme === "dark" ? "#0f0f0f" : "#ffffff"
      document.head.appendChild(meta)
    }
    
    // Set CSS custom properties for smooth transitions
    root.style.setProperty(
      "--theme-transition", 
      "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease"
    )
  }, [actualTheme, isMounted])

  const handleSetTheme = useCallback((newTheme: Theme) => {
    // Validate theme
    const validThemes: Theme[] = enableSystem 
      ? ["light", "dark", "system"] 
      : ["light", "dark"]
      
    if (!validThemes.includes(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}. Valid themes are:`, validThemes)
      return
    }

    try {
      localStorage.setItem(storageKey, newTheme)
    } catch (error) {
      console.warn("Could not save theme preference:", error)
    }
    
    setTheme(newTheme)
  }, [storageKey, enableSystem])

  const value: ThemeProviderState = {
    theme,
    setTheme: handleSetTheme,
    systemTheme,
    actualTheme,
  }

  // Prevent flash of wrong theme
  if (!isMounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}

// Helper hook for theme-aware components
export const useThemeStyles = () => {
  const { actualTheme } = useTheme()
  
  return {
    isDark: actualTheme === "dark",
    isLight: actualTheme === "light",
    theme: actualTheme,
  }
}


