"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "./theme-provider"

export function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [isHovering, setIsHovering] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let animationId: number

    const updateCursor = () => {
      const cursorX = mouseRef.current.x
      const cursorY = mouseRef.current.y

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`

      animationId = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if hovering over links
      if (target.tagName === 'A' || target.closest('a')) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if leaving links
      if (target.tagName === 'A' || target.closest('a')) {
        setIsHovering(false)
      }
    }

    // Add hover effects for links
    const linkElements = document.querySelectorAll('a')

    linkElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    document.addEventListener('mousemove', handleMouseMove)
    updateCursor()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      linkElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      {/* MacBook-style arrow cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 transition-all duration-200 ease-out"
        style={{
          width: isHovering ? '20px' : '16px',
          height: isHovering ? '20px' : '16px',
          transform: 'translate(-2px, -2px)',
        }}
      >
        {isHovering ? (
          // Hand cursor for links
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className={theme === 'dark' ? 'text-white' : 'text-gray-900'}
          >
            <path
              d="M12 2C11.4477 2 11 2.44772 11 3V8.53513L8.05025 5.58538C7.65973 5.19485 7.02656 5.19485 6.63604 5.58538C6.24551 5.9759 6.24551 6.60907 6.63604 6.99959L10.2929 10.6564C10.6834 11.047 11.3166 11.047 11.7071 10.6564L15.3639 6.99959C15.7545 6.60907 15.7545 5.9759 15.3639 5.58538C14.9734 5.19485 14.3403 5.19485 13.9497 5.58538L11 8.53513V3C11 2.44772 10.5523 2 10 2H12Z"
              fill="currentColor"
            />
            <path
              d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V12Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          // Arrow cursor for default
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className={theme === 'dark' ? 'text-white' : 'text-gray-900'}
          >
            <path
              d="M12 2L22 12H16V22H8V12H2L12 2Z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    </>
  )
}