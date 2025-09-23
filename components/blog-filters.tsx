"use client"

import { useState } from "react"

type Category = 'All Posts' | 'Development' | 'AI/ML' | 'Blogging'

interface BlogFiltersProps {
  onFilterChange: (category: Category) => void
  activeCategory: Category
}

const categories: Category[] = ['All Posts', 'Development', 'AI/ML', 'Blogging']

export function BlogFilters({ onFilterChange, activeCategory }: BlogFiltersProps) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap flex-shrink-0 border border-transparent ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground shadow-md border-primary/20 dark:!bg-slate-200 dark:!text-slate-800 dark:!shadow-md dark:!border-slate-300'
              : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground border-muted dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 dark:hover:text-slate-50 dark:border-slate-500'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}


