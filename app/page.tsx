// app/page.tsx

"use client"

import { InteractiveHero } from "@/components/interactive-hero"
import { ActivityHeatmap } from "@/components/activity-heatmap"
import { TechStackMarquee } from "@/components/tech-stack-marquee"
import { LetsConnect } from "@/components/lets-connect"
import { MultilingualGreeting } from "@/components/multilingual-greeting"
import { Github, Wrench, FolderOpen, FileText, User, Globe as GlobeIcon } from "lucide-react"
import Link from "next/link"
import { useRef, useEffect, useState } from 'react'
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"
import dynamic from 'next/dynamic'

// Dynamically import the World component with proper error handling
const World = dynamic(
  () => import('@/components/ui/globe').then((mod) => {
    // Make sure we're getting the World export specifically
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

// LetterGlitch Component (Unchanged)
const LetterGlitch = ({
  glitchColors = ['#888888'],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'
}: {
  glitchColors: string[];
  glitchSpeed: number;
  centerVignette: boolean;
  outerVignette: boolean;
  smooth: boolean;
  characters: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<
    {
      char: string;
      color: string;
      targetColor: string;
      colorProgress: number;
    }[]
  >([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());

  const lettersAndSymbols = Array.from(characters);

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const getRandomChar = () => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  };

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };

  const hexToRgb = (hex: string) => {
    if (!hex) return { r: 128, g: 128, b: 128 };
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
      : null;
  };

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor)
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width: number, height: number) => ({
    columns: Math.ceil(width / charWidth),
    rows: Math.ceil(height / charHeight),
  });

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows };
    letters.current = Array.from({ length: columns * rows }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    context.current?.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };

  const drawLetters = () => {
    if (!canvasRef.current || !context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    if (letters.current.length === 0) return;
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.03)); // Reduced from 0.05 to 0.03
    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;
      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();
      letters.current[index].colorProgress = smooth ? 0 : 1;
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach(letter => {
      if (letter.colorProgress < 1) {
        letter.colorProgress = Math.min(1, letter.colorProgress + 0.03); // Reduced from 0.05 to 0.03
        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });
    if (needsRedraw) drawLetters();
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }
    if (smooth) handleSmoothTransitions();
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!glitchColors || glitchColors.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    context.current = canvas.getContext('2d');
    resizeCanvas();
    animate();
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        resizeCanvas();
        animate();
      }, 100);
    };
    // Only add resize listener on desktop to prevent mobile scroll issues
    if (window.innerWidth >= 768) {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (window.innerWidth >= 768) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [glitchColors, glitchSpeed, smooth, characters]);

  return (
    <div className="relative w-full h-full bg-transparent overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" style={{ willChange: 'transform' }} />
      {outerVignette && <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]" />}
      {centerVignette && <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]" />}
    </div>
  );
};

// Enhanced Blog Card Component (Unchanged)
function BlogCard() {
  const isMobile = useIsMobile();
  const blogPosts = [
    { title: "Empathy in Open Source", excerpt: "Empathy and kindness is a choice." },
    { title: "Web Development for Beginners: 7 Essential Steps To Get Started Today!", excerpt: "Discover how to unleash the power of words and advance your career." },
    { title: "Why Every Developer Should Build Their Own Blog", excerpt: "Discover the importance of building a blog as a developer, along with tips on how to set up, design, create, and share your content." }
  ];
  const displayedPosts = isMobile ? blogPosts.slice(0, 2) : blogPosts;

  return (
    <Link href="/blog" className="group relative bg-card rounded-lg border border-border overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 min-h-[380px] block">
      <div
        className="absolute inset-0 p-4 pt-12"
        style={{
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full blur-[1px] transition-all duration-300 overflow-hidden pr-0">
          {displayedPosts.map((post, index) => (
            <div
              key={index}
              className={`bg-card border border-border/50 p-4 rounded-lg transition-all duration-300 cursor-pointer flex flex-col ${index === 2 ? 'overflow-hidden mr-0' : ''}`}
              style={{ filter: 'blur(0.5px)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'blur(0px)';
                const parent = e.currentTarget.parentElement;
                if (!parent) return;
                Array.from(parent.children).forEach((sibling, siblingIndex) => {
                  if (siblingIndex !== index) {
                    (sibling as HTMLElement).style.filter = 'blur(3px)';
                  }
                });
              }}
              onMouseLeave={(e) => {
                const parent = e.currentTarget.parentElement;
                if (!parent) return;
                Array.from(parent.children).forEach((sibling) => {
                  (sibling as HTMLElement).style.filter = 'blur(0.5px)';
                });
              }}
            >
              <h4 className="font-semibold text-sm mb-2 text-muted-foreground/80 line-clamp-2">{post.title}</h4>
              <p className="text-muted-foreground/50 text-xs line-clamp-3">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-10 left-8 flex flex-col-reverse items-start">
        <div className="overflow-hidden max-h-0 group-hover:max-h-40 group-hover:mt-4 transition-all duration-300 ease-in-out">
          <span className="text-foreground font-medium flex items-center gap-1">
            Visit the Blog →
          </span>
        </div>
        <div className="transition-all duration-300">
          <FileText className="h-12 w-12 text-foreground mb-3 group-hover:h-10 group-hover:w-10 transition-all duration-300" />
          <h3 className="text-2xl font-bold text-foreground group-hover:text-3xl transition-all duration-300">Read the Blog</h3>
          <p className="text-muted-foreground text-base mt-1.5">Discover the most outstanding articles.</p>
        </div>
      </div>
    </Link>
  );
}

// Enhanced Projects Card Component (Unchanged)
function ProjectsCard() {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [glitchColors, setGlitchColors] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const isDark =
        theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

      setGlitchColors(
        isDark
          ? ['#FFFFFF', '#DDDDDD', '#AAAAAA', '#777777', '#444444']
          : ['#000000', '#333333', '#555555', '#888888', '#BBBBBB']
      );
    }
  }, [theme, mounted]);

  return (
    <Link
      href="/projects"
      className="group relative bg-card rounded-lg border border-border shadow-md hover:shadow-lg transition-all duration-300 min-h-[380px] block"
    >
      <div
        className="absolute inset-0 p-4 pt-6 z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 5%, black 25%, transparent 60%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 5%, black 25%, transparent 60%)',
        }}
      >
        <div className="w-full h-full blur-[0.5px]">
          {mounted && glitchColors.length > 0 && (
            <LetterGlitch
              glitchColors={glitchColors}
              glitchSpeed={200}
              centerVignette={false}
              outerVignette={false}
              smooth={true}
              characters="01"
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-10 left-8 flex flex-col-reverse items-start z-10">
        <div className="overflow-hidden max-h-0 group-hover:max-h-40 group-hover:mt-4 transition-all duration-300 ease-in-out">
          <span className="text-foreground font-medium flex items-center gap-1">
            View all projects →
          </span>
        </div>
        <div className="transition-all duration-300">
          <FolderOpen className="h-12 w-12 text-foreground mb-3 group-hover:h-10 group-hover:w-10 transition-all duration-300" />
          <h3 className="text-2xl font-bold text-foreground group-hover:text-3xl transition-all duration-300">
            Featured Projects
          </h3>
          <p className="text-muted-foreground text-base mt-1.5">
            My latest technical work.
          </p>
        </div>
      </div>
    </Link>
  );
}

// FIXED: About Card with proper mobile handling and correct styling
function AboutCard() {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
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
    atmosphereColor: "#ffffff",
    showAtmosphere: false,
    atmosphereAltitude: 0,
    polygonColor: isDarkMode ? "#333333" : "#222222", // Darker dots in dark mode
    globeColor: isDarkMode ? "#666666" : "#FFFFFF", // Darker globe in dark mode
    emissive: isDarkMode ? "#444444" : "#F5F5F5", // Much darker emissive in dark mode
    emissiveIntensity: isDarkMode ? 0.1 : 0.25, // Reduced intensity in dark mode
    shininess: isDarkMode ? 5 : 15, // Less shininess in dark mode
    autoRotate: true, // Enable auto-rotation on all devices
    autoRotateSpeed: 0.003 // Consistent rotation speed
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
    <Link
      href="/about"
      className="group relative bg-card rounded-lg border border-border overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 min-h-[380px] block"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Globe Container - Non-interactive on mobile */}
      <div className="absolute bottom-[-5%] right-[-15%] md:right-[-30%] h-[100%] w-[100%] z-0 pointer-events-none touch-pan-y">
        <div className="w-full h-full md:group-hover:scale-104 transition-transform duration-300 origin-center">
          {isMounted && (
            <World
              data={locationData}
              globeConfig={globeConfig}
              darkMode={isDarkMode}
            />
          )}
        </div>
      </div>

      {/* Background overlay - restored original complex masking for proper fade */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div 
          className="absolute bottom-0 left-0 right-0 h-[80%] bg-card"
          style={{
            maskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, transparent 100%)'
          }}
        />
      </div>

      {/* Content - Exact same structure as original with proper animations */}
      <div className="absolute bottom-10 left-8 flex flex-col-reverse items-start z-10">
        <div className="overflow-hidden max-h-0 group-hover:max-h-40 group-hover:mt-4 transition-all duration-300 ease-in-out">
          <span className="text-foreground font-medium flex items-center gap-1">
            More about me →
          </span>
        </div>
        <div className="transition-all duration-300">
          <GlobeIcon className="h-12 w-12 text-foreground mb-3 group-hover:h-10 group-hover:w-10 transition-all duration-300" />
          <h3 className="text-2xl font-bold text-foreground group-hover:text-3xl transition-all duration-300">
            About Me
          </h3>
          <p className="text-muted-foreground text-base mt-1.5">
            My story & my skills.
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col bg-[#fafafa] dark:bg-[#121212] pb-8 sm:pb-16 md:pb-20 lg:pb-6">
      <div className="flex-1 px-4 py-6 sm:p-8 md:p-12 lg:p-12">
        <div className="w-full max-w-7xl mx-auto space-y-4">

          <div className="bg-card rounded-lg border border-border overflow-hidden shadow-md">
            <InteractiveHero />
          </div>

          <div className="bg-card rounded-lg border border-border overflow-hidden shadow-md p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3">
                <Github className="h-6 w-6 text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-semibold">Coding Activity</h2>
              </div>
            </div>
            <ActivityHeatmap />
            <div className="mt-10 pt-8 border-t border-border">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-3">
                  <Wrench className="h-6 w-6 text-muted-foreground" />
                  <h2 className="text-2xl sm:text-3xl font-semibold">Tech Stack</h2>
                </div>
              </div>
              <TechStackMarquee />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <BlogCard />
            <ProjectsCard />
            <AboutCard />
          </div>

          <div className="bg-card rounded-lg border border-border overflow-hidden shadow-md p-4 sm:p-6 min-h-[280px] flex flex-col">
            <div className="text-center mb-6 pt-6 flex-1 flex flex-col justify-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold">Let's connect</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Let's build something amazing together!
              </p>
              <div className="mt-6">
                <LetsConnect />
              </div>
            </div>
            <div className="mt-auto pt-4">
              <MultilingualGreeting />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}