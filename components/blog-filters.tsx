"use client"

import { useState } from "react"

type Category = 'All' | 'Development' | 'AI/ML' | 'Data' | 'Blogging'

interface BlogFiltersProps {
  onFilterChange: (category: Category) => void
  activeCategory: Category
}

const categories: Category[] = ['All', 'Development', 'AI/ML', 'Data', 'Blogging']

export function BlogFilters({ onFilterChange, activeCategory }: BlogFiltersProps) {
  return (
    <div className="flex gap-1 mb-6 overflow-x-auto scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}