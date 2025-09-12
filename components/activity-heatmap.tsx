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

    // pad to Sunday
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
    for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))

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

  return (
    <div className="w-full">
      {!isLoading && !error && (
        <p className="text-center text-sm text-muted-foreground mb-2">
          Total contributions: {totalContributions}
        </p>
      )}

      {/* Heatmap container */}
      <div className="mt-3 overflow-x-auto sm:overflow-x-visible">
        <div className="flex justify-center">
          <div className="flex gap-1 min-w-max justify-center">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading activity…</p>
            ) : error ? (
              <p className="text-sm text-destructive">Error loading activity.</p>
            ) : (
              weeks?.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((day, di) => (
                    <div
                      key={day.key ?? di}
                      className={cn(
                        "h-3.5 w-3.5 rounded-sm border transition-colors duration-200",
                        typeof day.key === "string" && day.key.startsWith("pad-") && "opacity-0",
                        heat(levelFor(day.val)),
                      )}
                      title={`${day.key}: ${day.val} activities`}
                      aria-label={`${day.key}: ${day.val} activities`}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((lvl) => (
          <div key={lvl} className={cn("h-3.5 w-3.5 rounded-sm border", heat(lvl))} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}

// Heatmap color levels
function heat(level: number) {
  switch (level) {
    case 0:
      return "bg-transparent border-gray-300 dark:border-gray-700"
    case 1:
      return "bg-primary/10 border-transparent"
    case 2:
      return "bg-primary/30 border-transparent"
    case 3:
      return "bg-primary/60 border-transparent"
    case 4:
      return "bg-primary border-transparent"
    default:
      return "bg-transparent"
  }
}
