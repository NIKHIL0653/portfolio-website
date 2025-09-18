"use client"

import useSWR from "swr"
import { useMemo, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type ActivityResponse = {
  byDate: Record<string, number>
  range: { start: string; end: string }
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const WEEK_COL_WIDTH_MOBILE = 18;

export function ActivityHeatmap() {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; contributions: number } | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => setIsMobile(window.innerWidth < 640)
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const { data, isLoading, error } = useSWR<ActivityResponse>("/api/activity", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 300000,
    dedupingInterval: 60000,
  })

  const { weeks, maxVal, totalContributions } = useMemo(() => {
    const byDate = data?.byDate || {}
    const today = new Date()
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const start = new Date(end)
    start.setDate(end.getDate() - 7 * 52)
    let maxVal = 0
    let total = 0
    const days: { date: Date; key: string; val: number }[] = []
    const todayKey = today.toISOString().slice(0, 10)
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0, 10)
      let val = byDate[key] || 0
      if (key === todayKey && val === 0 && !byDate[key]) val = 1
      maxVal = Math.max(maxVal, val)
      total += val
      days.push({ date: new Date(d), key, val })
    }
    const weeks: (typeof days)[] = []
    const firstDow = days[0]?.date.getDay() ?? 0
    if (firstDow !== 0) {
      const pad = new Array(firstDow).fill(null).map((_, i) => ({
        date: new Date(days[0].date.getTime() - (firstDow - i) * 86400000),
        key: "pad-start-" + i,
        val: 0,
      }))
      days.unshift(...pad)
    }
    for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))
    const lastWeek = weeks[weeks.length - 1]
    if (lastWeek && lastWeek.length < 7) {
      const missingDays = 7 - lastWeek.length
      const lastDate = lastWeek[lastWeek.length - 1].date
      for (let i = 1; i <= missingDays; i++) {
        lastWeek.push({
          date: new Date(lastDate.getTime() + i * 86400000),
          key: "pad-end-" + i,
          val: 0,
        })
      }
    }
    return { weeks, maxVal, totalContributions: total }
  }, [data])

  const levelFor = (val: number) => {
    if (maxVal <= 0) return 0
    const ratio = val / maxVal
    if (ratio === 0) return 0
    if (ratio < 0.25) return 1
    if (ratio < 0.5) return 2
    if (ratio < 0.75) return 3
    return 4
  }
  
  const { monthLabels } = useMemo(() => {
    if (!weeks.length) return { monthLabels: [] };
    
    const monthsMap = new Map();
    weeks.forEach((week, weekIndex) => {
      const firstDayOfWeek = week.find(day => day && !day.key.startsWith('pad-'))
      if (firstDayOfWeek) {
        const month = firstDayOfWeek.date.getMonth()
        const year = firstDayOfWeek.date.getFullYear()
        const monthKey = `${year}-${month}`
        if (!monthsMap.has(monthKey)) {
          monthsMap.set(monthKey, {
            name: firstDayOfWeek.date.toLocaleDateString('en-US', { month: 'short' }),
            weekIndex: weekIndex,
          })
        }
      }
    })
    
    const sortedMonths = Array.from(monthsMap.entries())
      .map(([key, value]) => ({ key, ...value }))
      .sort((a, b) => a.weekIndex - b.weekIndex);

    const allMonthLabels = sortedMonths.map(month => ({
      ...month,
      leftPosition: isMobile
        ? `${month.weekIndex * WEEK_COL_WIDTH_MOBILE}px`
        : `${(month.weekIndex / weeks.length) * 100}%`
    }))
    
    return { monthLabels: allMonthLabels };
  }, [weeks, isMobile]);

  const getDayLabels = () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const squareSize = "h-3.5 w-3.5 sm:h-4 sm:w-4"
  const gapSize = "gap-1"

  return (
    <div className="w-full py-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Header Stats */}
        {!isLoading && !error && (
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 px-4 gap-4 sm:gap-0">
            <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              {hoveredDay
                ? `${hoveredDay.contributions} contribution${hoveredDay.contributions !== 1 ? 's' : ''} on ${new Date(hoveredDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                : `Last 365 days`
              }
            </div>
            <div className="text-center sm:text-right">
              {/* MODIFIED: Increased font size for the contribution count even more */}
              <div className="text-2xl sm:text-4xl font-bold text-foreground">{totalContributions.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">total contributions</div>
            </div>
          </div>
        )}

        <div className="w-full px-4 pb-4">
          <div className="overflow-x-auto sm:overflow-visible overflow-y-visible">
            <div className="relative min-w-[600px] sm:min-w-full px-2 py-2">
              <div className="flex mb-2 ml-6 sm:ml-10">
                <div className="flex-1 relative h-4">
                  {monthLabels.map((month) => (
                    <span 
                      key={month.key}
                      className="absolute text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap"
                      style={{ left: month.leftPosition }}
                    >
                      {month.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* MODIFIED: Reduced horizontal gap for tighter mobile view */}
              <div className={cn("flex gap-x-0.5 sm:gap-x-1")}>
                <div className={cn("flex flex-col justify-between flex-shrink-0", gapSize, "w-6 sm:w-10")}>
                  {getDayLabels().map((day, i) => (
                    <div key={day} className={cn(
                      squareSize,
                      "flex items-center text-[10px] sm:text-xs text-muted-foreground",
                      (i === 1 || i === 3 || i === 5) ? "opacity-100" : "opacity-0"
                    )}>
                      <span className="hidden sm:inline">{day}</span>
                      <span className="sm:hidden">{day.slice(0, 1)}</span>
                    </div>
                  ))}
                </div>
                
                <div className={cn("flex flex-1", gapSize)}>
                  {isLoading ? (
                    <div className="flex items-center justify-center w-full h-full"><p>Loading...</p></div>
                  ) : error ? (
                    <div className="flex items-center justify-center w-full h-full"><p>Error.</p></div>
                  ) : (
                    weeks?.map((week, wi) => (
                      <div 
                        key={wi} 
                        className={cn("flex flex-col sm:flex-1", gapSize)}
                      >
                        {week.map((day, di) => (
                          <div
                            key={day?.key ?? di}
                            className={cn(
                              squareSize,
                              "rounded sm:rounded-[3px]",
                              "border transition-all duration-300 cursor-pointer",
                              "hover:scale-110 sm:hover:scale-125 hover:shadow-lg hover:z-20 relative",
                              day && typeof day.key === "string" && day.key.startsWith("pad-") ? "opacity-0 cursor-default pointer-events-none" : "",
                              heat(day ? levelFor(day.val) : 0),
                              hoveredDay?.date === (day?.key) && "ring-1 sm:ring-2 ring-primary ring-offset-1 ring-offset-background scale-110 sm:scale-125 shadow-lg z-20"
                            )}
                            onMouseEnter={() => {
                              if (day && typeof day.key === "string" && !day.key.startsWith("pad-")) {
                                setHoveredDay({ date: day.key, contributions: day.val })
                              }
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                          />
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 sm:mt-6 flex items-center justify-center sm:justify-between px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[10px] sm:text-xs text-muted-foreground">Less</span>
            <div className={cn("flex", gapSize)}>
              {[0, 1, 2, 3, 4].map((lvl) => (
                <div 
                  key={lvl} 
                  className={cn(
                    squareSize, 
                    "rounded sm:rounded-[3px]",
                    "border transition-colors", 
                    heat(lvl)
                  )}
                  title={`Level ${lvl}`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground">More</span>
          </div>
          
          <div className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
            Hover over squares for details
          </div>
        </div>
      </div>
    </div>
  )
}

function heat(level: number) {
  switch (level) {
    case 0:
      return "bg-muted/30 border-muted-foreground/20 hover:bg-muted/50"
    case 1:
      return "bg-primary/20 border-primary/30 hover:bg-primary/30"
    case 2:
      return "bg-primary/40 border-primary/50 hover:bg-primary/50"
    case 3:
      return "bg-primary/70 border-primary/80 hover:bg-primary/80"
    case 4:
      return "bg-primary border-primary hover:bg-primary/90 shadow-sm"
    default:
      return "bg-muted/30 border-muted-foreground/20"
  }
}