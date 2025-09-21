"use client"
import Link from "next/link"
import { useState } from "react"
import { Mail } from "lucide-react"

export function LetsConnect() {
  return (
    <div className="flex justify-center">
      <Link href="/contact" className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg">
        Get in Touch
      </Link>
    </div>
  )
}




