"use client"

import type { Metadata } from "next"
import CompaniesTimeline from "../../components/companies-timeline"
import dynamic from 'next/dynamic'
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Globe as GlobeIcon } from "lucide-react"

// Dynamically import the World component
const World = dynamic(
  () => import('@/components/ui/globe').then((mod) => {
    if (!mod.World) {
      throw new Error('World component not found in globe module');
    }
    return { default: mod.World };
  }),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 flex items-center justify-center bg-transparent">
      <div className="w-6 h-6 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
    </div>
  }
);

export default function AboutPage() {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const checkDarkMode = () => {
      const isDark = theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => checkDarkMode();
    mediaQuery.addListener(handleChange);

    return () => mediaQuery.removeListener(handleChange);
  }, [theme, isMounted]);


  const globeConfig = {
    pointSize: 4,
    atmosphereColor: "#00000000",
    showAtmosphere: false,
    atmosphereAltitude: 0,
    polygonColor: isDarkMode ? "#333333" : "#222222",
    globeColor: isDarkMode ? "#666666" : "#FFFFFF",
    emissive: isDarkMode ? "#444444" : "#F5F5F5",
    emissiveIntensity: 0,
    shininess: isDarkMode ? 5 : 15,
    autoRotate: true,
    autoRotateSpeed: 0.003
  };

  const locationData = [{
    order: 1,
    startLat: 22.5726,
    startLng: 88.3639,
    endLat: 22.5726,
    endLng: 88.3639,
    arcAlt: 0.005,
    color: '#FF4444'
  }];
  
  return (
    <main className="min-h-dvh flex flex-col bg-[#fafafa] dark:bg-[#121212]">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1 sm:pt-0 sm:pb-2">
            {/* 2 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 lg:ml-8">

              {/* About Section - Increased width */}
              <div className="w-full max-w-5xl lg:border-r-2 lg:border-dashed lg:border-border lg:pr-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-6 sm:mb-8 text-left">About Me</h1>
                <div className="prose prose-neutral dark:prose-invert prose-base leading-relaxed">
                  <p className="text-base text-muted-foreground mb-6 text-left">
                    I'm Nikhil Choudhary, a Software Engineer and AI Engineer dedicated to crafting scalable systems
                    and intelligent solutions that solve complex real-world problems.
                  </p>
                  <p className="text-base text-muted-foreground text-left">
                    Areas of interest: Machine learning applications, AI-driven architectures, system optimization,
                    and developing technologies that push the boundaries of what's possible.
                  </p>
                </div>

                {/* Globe Card - Made wider and adjusted gradient */}
                <div className="mt-8 w-full max-w-4xl bg-card rounded-lg border border-border md:border-l-0 overflow-hidden shadow-md min-h-[300px] relative">
                  <div className="absolute top-0 right-[10%] h-[100%] w-[80%] md:top-[-15%] md:left-[29%] md:right-auto md:h-[140%] md:w-[90%]">
                    {isMounted && (
                      <World
                        data={locationData}
                        globeConfig={globeConfig}
                        darkMode={isDarkMode}
                      />
                    )}
                  </div>

                  {/* Background overlay - Natural gradient fade */}
                  <div className="absolute inset-0 pointer-events-none z-5">
                    <div
                      className="absolute bottom-0 right-0 w-[80%] h-[100%] md:left-0 md:right-0 md:w-full bg-card"
                      style={{
                        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 80%, transparent 100%)'
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-6 left-8 flex flex-col-reverse items-start z-10">
                    <div className="transition-all duration-300">
                      <GlobeIcon className="h-12 w-12 text-foreground mb-3" />
                      <h3 className="text-2xl font-bold text-foreground">My Location</h3>
                      <p className="text-muted-foreground text-base mt-1.5">Kolkata, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Companies Timeline */}
              <div className="w-full">
                <CompaniesTimeline />
              </div>
            </div>
        </div>
      </div>
    </main>
  )
}