"use client"

import React, { useEffect, useState } from 'react'

type Category = 'All Posts' | 'Development' | 'AI/ML' | 'Blogging'

interface BlogFiltersProps {
  onFilterChange: (category: Category) => void
  activeCategory: Category
}

const categories: Category[] = ['All Posts', 'Development', 'AI/ML', 'Blogging']

export function BlogFilters({ onFilterChange, activeCategory }: BlogFiltersProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })
    
    return () => observer.disconnect()
  }, [])

  const handleClick = (category: Category) => {
    onFilterChange(category)
  }

  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', overflowX: 'auto' }}>
      {categories.map((category) => {
        const isActive = activeCategory === category
        
        return (
          <div
            key={category}
            onClick={() => handleClick(category)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleClick(category)
              }
            }}
            style={{
              padding: '4px 12px',
              fontSize: '14px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'color 0.15s ease',
              ...(isActive ? {
                backgroundColor: isDark ? '#ffffff' : '#000000',
                color: isDark ? '#000000' : '#ffffff',
                borderRadius: '20px',
                boxShadow: isDark 
                  ? '0 1px 3px rgba(0, 0, 0, 0.1)' 
                  : '0 1px 3px rgba(255, 255, 255, 0.1)',
                border: isDark ? '1px solid #d1d5db' : '1px solid #374151'
              } : {
                backgroundColor: 'transparent',
                color: 'var(--muted-foreground)',
                border: 'none',
                borderRadius: '0'
              })
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--foreground)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--muted-foreground)'
              }
            }}
          >
            {category}
          </div>
        )
      })}
    </div>
  )
}