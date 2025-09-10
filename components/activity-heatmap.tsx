"use client"
import useSWR from "swr"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

type ActivityResponse = {
  byDate: Record<string, number>
  range: { start: string; end: string }
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function ActivityHeatmap() {
  const { data, isLoading, error } = useSWR<ActivityResponse>("/api/activity", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 300000, // Refresh every 5 minutes
    dedupingInterval: 60000, // Dedupe requests for 1 minute
  })

  const { weeks, maxVal } = useMemo(() => {
    const byDate = data?.byDate || {}

    // Build last 52 weeks (Sun-first) - ensure we include today
    const today = new Date()
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const start = new Date(end)
    start.setDate(end.getDate() - 7 * 52)

    let maxVal = 0
    const days: { date: Date; key: string; val: number }[] = []

    // Ensure today's date is always included, even if no data
    const todayKey = today.toISOString().slice(0, 10)

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0, 10)
      let val = byDate[key] || 0

      // If this is today and we have no data, add a small activity to show it's current
      if (key === todayKey && val === 0 && !byDate[key]) {
        val = 1 // Add minimal activity for today to show it's current
      }

      maxVal = Math.max(maxVal, val)
      days.push({ date: new Date(d), key, val })
    }

    // group into weeks (pad to Sunday)
    const weeks: (typeof days)[] = []
    const firstDow = days[0]?.date.getDay() ?? 0
    if (firstDow !== 0) {
      const pad = new Array(firstDow).fill(null).map((_, i) => ({
        date: new Date(days[0].date.getTime() - (firstDow - i) * 86400000),
        key: "pad-" + i,
        val: 0,
      }))
      days.unshift(...pad)
    }
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7))
    }

    return { weeks, maxVal }
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

  return (
    <div>
      {/* Mobile: Horizontal scroll with custom scrollbar, Desktop: No scroll */}
      <div className="mt-2 sm:overflow-x-visible overflow-x-auto custom-scrollbar">
        <div className="sm:min-w-0 min-w-[720px]">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading activity…</p>
          ) : error ? (
            <p className="text-sm text-destructive">Error loading activity.</p>
          ) : (
            <div className="flex gap-1">
              {weeks?.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((day, di) => (
                    <div
                      key={day.key ?? di}
                      className={cn(
                        "h-3.5 w-3.5 rounded-sm border",
                        typeof day.key === "string" && day.key.startsWith("pad-") && "opacity-0",
                        heat(levelFor(day.val)),
                      )}
                      title={`${day.key}: ${day.val} activities`}
                      aria-label={`${day.key}: ${day.val} activities`}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className={cn("h-3.5 w-3.5 rounded-sm border", heat(0))} />
        <div className={cn("h-3.5 w-3.5 rounded-sm border", heat(1))} />
        <div className={cn("h-3.5 w-3.5 rounded-sm border", heat(2))} />
        <div className={cn("h-3.5 w-3.5 rounded-sm border", heat(3))} />
        <div className={cn("h-3.5 w-3.5 rounded-sm border", heat(4))} />
        <span>More</span>
      </div>
    </div>
  )
}

// Neutral-to-primary scale using allowed color set (no gradients, max 5 colors overall)
function heat(level: number) {
  switch (level) {
    case 0:
      return "bg-transparent"
    case 1:
      return "bg-primary/10"
    case 2:
      return "bg-primary/25"
    case 3:
      return "bg-primary/50"
    case 4:
      return "bg-primary"
    default:
      return "bg-transparent"
  }
}
