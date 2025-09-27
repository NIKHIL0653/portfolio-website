import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css"
import "../styles/blog-article.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: "Nikhil Choudhary - Portfolio",
  description: "Full-stack developer portfolio showcasing skills in React, Next.js, and cutting-edge web technologies",
  icons: {
    icon: "/favicon.ico",
  },
}

const geistSans = GeistSans

const geistMono = GeistMono

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <SiteHeader />
          <main>{children}</main>
          <Analytics />
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}


