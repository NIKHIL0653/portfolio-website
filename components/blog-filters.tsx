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
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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