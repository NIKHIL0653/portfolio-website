import type { NextRequest } from "next/server"

type Map = Record<string, number>
const DAYS = 365

export async function GET(_req: NextRequest) {
  const [gh, lc] = await Promise.allSettled([getGitHubActivity(), getLeetCodeActivity()])

  const sources = {
    github: isFulfilled(gh) ? gh.value : undefined,
    leetcode: isFulfilled(lc) ? lc.value : undefined,
  }
  const byDate: Map = {}

  for (const m of [sources.github, sources.leetcode]) {
    if (!m) continue
    for (const [k, v] of Object.entries(m)) byDate[k] = (byDate[k] || 0) + v
  }

  // Fallback sample activity if nothing configured
  if (Object.keys(byDate).length === 0) {
    const today = new Date()
    for (let i = 0; i < 90; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      byDate[key] = Math.random() < 0.7 ? Math.floor(Math.random() * 6) : 0
    }
  }

  const end = new Date().toISOString().slice(0, 10)
  const start = new Date(Date.now() - DAYS * 86400000).toISOString().slice(0, 10)

  return Response.json({ byDate, sources, range: { start, end } }, { status: 200 })
}

function isFulfilled<T>(r: PromiseSettledResult<T>): r is PromiseFulfilledResult<T> {
  return r.status === "fulfilled"
}

// GitHub GraphQL contributions calendar
async function getGitHubActivity(): Promise<Map> {
  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME

  console.log("[v0] GitHub token exists:", !!token)
  console.log("[v0] GitHub username:", username)

  if (!token || !username) {
    console.log("[v0] Missing GitHub credentials")
    return {}
  }

  const query = `
    query($login:String!) {
      user(login:$login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays { date contributionCount }
            }
          }
        }
      }
    }
  `
  
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "nikhil-portfolio",
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      cache: "no-store",
    })

    console.log("[v0] GitHub API response status:", res.status)

    if (!res.ok) {
      const errorText = await res.text()
      console.log("[v0] GitHub API error:", res.statusText, errorText)
      return {}
    }

    const json = await res.json()
    console.log("[v0] GitHub API response:", JSON.stringify(json, null, 2))

    if (json.errors) {
      console.log("[v0] GitHub GraphQL errors:", json.errors)
      return {}
    }

    const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || []
    const map: Map = {}
    for (const w of weeks) {
      for (const d of w.contributionDays) {
        const dateKey = d.date.slice(0, 10)
        map[dateKey] = (map[dateKey] || 0) + (d.contributionCount || 0)
      }
    }
    
    console.log("[v0] GitHub activity data points:", Object.keys(map).length)
    return map
  } catch (error) {
    console.error("[v0] GitHub API fetch error:", error)
    return {}
  }
}

// LeetCode submissions calendar (public GraphQL)
async function getLeetCodeActivity(): Promise<Map> {
  const username = process.env.LEETCODE_USERNAME

  console.log("[v0] LeetCode username:", username)

  if (!username) {
    console.log("[v0] Missing LeetCode username")
    return {}
  }

  const q = `
    query recentAcSubmissions($username: String!, $year: Int) {
      userProfileCalendar(username: $username, year: $year) { submissionCalendar }
    }
  `
  const year = new Date().getFullYear()
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/${username}/`,
      },
      body: JSON.stringify({ query: q, variables: { username, year } }),
      cache: "no-store",
    })

    console.log("[v0] LeetCode API response status:", res.status)

    if (!res.ok) {
      const errorText = await res.text()
      console.log("[v0] LeetCode API error:", res.statusText, errorText)
      return {}
    }

    const json = await res.json()

    console.log("[v0] LeetCode API response:", json)

    const cal = json?.data?.userProfileCalendar?.submissionCalendar
    if (!cal) return {}
    const raw = JSON.parse(cal) as Record<string, number> // { epochSec: count }
    const map: Map = {}
    for (const [epoch, count] of Object.entries(raw)) {
      const d = new Date(Number.parseInt(epoch, 10) * 1000).toISOString().slice(0, 10)
      map[d] = (map[d] || 0) + count
    }
    console.log("[v0] LeetCode activity data points:", Object.keys(map).length)
    return map
  } catch (error) {
    console.error("[v0] LeetCode API fetch error:", error)
    return {}
  }
}
