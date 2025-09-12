"use client"

import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from "react"

// Enhanced theme types with better TypeScript support
type Theme = "light" | "dark" | "system"
type ActualTheme = "light" | "dark"
type ThemeMode = "light" | "dark" | "system"

// Enhanced props with more configuration options
interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
  enableSystem?: boolean
  enableTransitions?: boolean
  enableAnimations?: boolean
  nonce?: string
}

// Enhanced state with more detailed information
interface ThemeProviderState {
  theme: Theme
  actualTheme: ActualTheme
  systemTheme: ActualTheme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isSystemTheme: boolean
  isLoading: boolean
  hasError: boolean
}

// Initial state with better defaults
const initialState: ThemeProviderState = {
  theme: "system",
  actualTheme: "light",
  systemTheme: "light",
  setTheme: () => null,
  toggleTheme: () => null,
  isSystemTheme: true,
  isLoading: true,
  hasError: false,
}

// Create context with display name for better debugging
const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
ThemeProviderContext.displayName = "ThemeProvider"

// Enhanced theme provider with performance optimizations
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "portfolio-theme",
  enableSystem = true,
  enableTransitions = true,
  enableAnimations = true,
  ...props
}: ThemeProviderProps) {
  // State management with better initialization
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = useState<ActualTheme>("light")
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Memoized values for performance
  const isSystemTheme = useMemo(() => theme === "system", [theme])
  const actualTheme = useMemo((): ActualTheme => {
    return isSystemTheme ? systemTheme : theme as ActualTheme
  }, [theme, systemTheme, isSystemTheme])

  // Enhanced system theme detection with error handling
  const getSystemTheme = useCallback((): ActualTheme => {
    try {
      if (typeof window === "undefined") return "light"
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    } catch (error) {
      console.warn("Failed to detect system theme:", error)
      return "light"
    }
  }, [])

  // Optimized system theme listener
  useEffect(() => {
    if (!enableSystem || typeof window === "undefined") return

    let mounted = true

    const updateSystemTheme = () => {
      if (!mounted) return
      try {
        const newSystemTheme = getSystemTheme()
        setSystemTheme(newSystemTheme)
      } catch (error) {
        console.warn("Failed to update system theme:", error)
        setHasError(true)
      }
    }

    // Set initial system theme
    updateSystemTheme()

    // Use more efficient event listener
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => updateSystemTheme()

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
    }

    return () => {
      mounted = false
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange)
      } else {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [enableSystem, getSystemTheme])

  // Enhanced storage with debouncing and error handling
  const saveThemeToStorage = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme)
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error)
      setHasError(true)
    }
  }, [storageKey])

  // Load theme from storage with better error handling
  useEffect(() => {
    if (typeof window === "undefined") return

    let mounted = true

    const loadTheme = async () => {
      try {
        const storedTheme = localStorage.getItem(storageKey) as Theme

        if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
          // Handle system theme when disabled
          if (storedTheme === "system" && !enableSystem) {
            const fallbackTheme: Theme = "light"
            if (mounted) {
              setThemeState(fallbackTheme)
              saveThemeToStorage(fallbackTheme)
            }
          } else if (mounted) {
            setThemeState(storedTheme)
          }
        } else if (mounted) {
          // Set default theme
          setThemeState(defaultTheme)
          saveThemeToStorage(defaultTheme)
        }
      } catch (error) {
        console.warn("Failed to load theme from localStorage:", error)
        if (mounted) {
          setHasError(true)
          setThemeState(defaultTheme)
        }
      } finally {
        if (mounted) {
          setIsMounted(true)
          setIsLoading(false)
        }
      }
    }

    loadTheme()

    return () => {
      mounted = false
    }
  }, [storageKey, defaultTheme, enableSystem, saveThemeToStorage])

  // Enhanced theme application with better performance
  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return

    const root = document.documentElement
    const body = document.body

    // Batch DOM operations for better performance
    const applyTheme = () => {
      try {
        // Remove previous theme classes
        root.classList.remove("light", "dark")
        body.classList.remove("light", "dark")

        // Add current theme class
        root.classList.add(actualTheme)
        body.classList.add(actualTheme)

        // Enhanced meta tag management
        const existingMeta = document.querySelector('meta[name="theme-color"]')
        const themeColor = actualTheme === "dark" ? "#0f0f0f" : "#ffffff"

        if (existingMeta) {
          existingMeta.setAttribute("content", themeColor)
        } else {
          const meta = document.createElement("meta")
          meta.name = "theme-color"
          meta.content = themeColor
          document.head.appendChild(meta)
        }

        // Set CSS custom properties for smooth transitions
        if (enableTransitions) {
          const transitionValue = enableAnimations
            ? "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
            : "none"

          root.style.setProperty("--theme-transition", transitionValue)
        }

        // Announce theme change for screen readers
        const announcement = document.createElement("div")
        announcement.setAttribute("aria-live", "polite")
        announcement.setAttribute("aria-atomic", "true")
        announcement.style.position = "absolute"
        announcement.style.left = "-10000px"
        announcement.style.width = "1px"
        announcement.style.height = "1px"
        announcement.style.overflow = "hidden"
        announcement.textContent = `Theme changed to ${actualTheme} mode`

        document.body.appendChild(announcement)

        setTimeout(() => {
          document.body.removeChild(announcement)
        }, 1000)

      } catch (error) {
        console.warn("Failed to apply theme:", error)
        setHasError(true)
      }
    }

    // Use requestAnimationFrame for better performance
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(applyTheme)
    } else {
      applyTheme()
    }

  }, [actualTheme, isMounted, enableTransitions, enableAnimations])

  // Enhanced theme setter with validation
  const setTheme = useCallback((newTheme: Theme) => {
    const validThemes: Theme[] = enableSystem
      ? ["light", "dark", "system"]
      : ["light", "dark"]

    if (!validThemes.includes(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}. Valid themes are:`, validThemes)
      setHasError(true)
      return
    }

    setThemeState(newTheme)
    saveThemeToStorage(newTheme)
    setHasError(false)
  }, [enableSystem, saveThemeToStorage])

  // Toggle between light and dark (ignoring system)
  const toggleTheme = useCallback(() => {
    const newTheme: ActualTheme = actualTheme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }, [actualTheme, setTheme])

  // Memoized context value for performance
  const value = useMemo((): ThemeProviderState => ({
    theme,
    actualTheme,
    systemTheme,
    setTheme,
    toggleTheme,
    isSystemTheme,
    isLoading,
    hasError,
  }), [
    theme,
    actualTheme,
    systemTheme,
    setTheme,
    toggleTheme,
    isSystemTheme,
    isLoading,
    hasError,
  ])

  // Prevent flash of wrong theme with better loading state
  if (!isMounted) {
    return (
      <div
        style={{
          visibility: "hidden",
          opacity: 0,
          pointerEvents: "none"
        }}
        aria-hidden="true"
      >
        {children}
      </div>
    )
  }

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// Enhanced useTheme hook with better error handling
export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error(
      "useTheme must be used within a ThemeProvider. " +
      "Make sure your component is wrapped with <ThemeProvider>."
    )
  }

  return context
}

// Helper hook for theme-aware components with additional utilities
export const useThemeStyles = () => {
  const { actualTheme, isSystemTheme, systemTheme } = useTheme()

  return useMemo(() => ({
    isDark: actualTheme === "dark",
    isLight: actualTheme === "light",
    theme: actualTheme,
    isSystemTheme,
    systemTheme,
    // Utility classes for conditional styling
    themeClass: actualTheme,
    oppositeTheme: actualTheme === "dark" ? "light" : "dark",
  }), [actualTheme, isSystemTheme, systemTheme])
}

// Hook for theme transitions
export const useThemeTransition = () => {
  const { actualTheme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const transitionToTheme = useCallback((callback?: () => void) => {
    setIsTransitioning(true)

    // Allow time for transition to complete
    setTimeout(() => {
      setIsTransitioning(false)
      callback?.()
    }, 300)
  }, [])

  return {
    isTransitioning,
    transitionToTheme,
    currentTheme: actualTheme,
  }
}