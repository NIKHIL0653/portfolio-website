import type { NextRequest } from "next/server"

type Map = Record<string, number>
const DAYS = 365

export async function GET(_req: NextRequest) {
  // Quick check for debugging
  console.log("Activity endpoint hit")

  console.log("GitHub token available:", !!process.env.GITHUB_TOKEN)
  console.log("GitHub username:", process.env.GITHUB_USERNAME)

  const gh = await Promise.resolve(getGitHubActivity())

  const sources = {
    github: gh || undefined,
  }
  const byDate: Map = {}

  // Merge activity data by date
  if (sources.github) {
    for (const [k, v] of Object.entries(sources.github)) byDate[k] = (byDate[k] || 0) + v
  }

  console.log("Total activity entries:", Object.keys(byDate).length)

  if (Object.keys(byDate).length === 0) {
    console.log("No activity found - check credentials")
  }

  const end = new Date().toISOString().slice(0, 10)
  const start = new Date(Date.now() - DAYS * 86400000).toISOString().slice(0, 10)

  return Response.json({ byDate, sources, range: { start, end } }, { status: 200 })
}

// Helper to check if promise resolved
function isFulfilled<T>(r: PromiseSettledResult<T>): r is PromiseFulfilledResult<T> {
  return r.status === "fulfilled"
}

// Fetch GitHub contribution data
async function getGitHubActivity(): Promise<Map> {
  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME

  console.log("GitHub token found:", !!token)
  console.log("Username:", username)

  if (!token || !username) {
    console.log("Missing GitHub setup")
    return {}
  }

  // GraphQL query for contributions
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
        "User-Agent": "portfolio-site",
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      cache: "no-store",
    })

    console.log("GitHub API status:", res.status)

    if (!res.ok) {
      const errorText = await res.text()
      console.log("GitHub API failed:", res.statusText, errorText)
      return {}
    }

    const json = await res.json()

    if (json.errors) {
      console.log("GraphQL errors:", json.errors)
      return {}
    }

    // Parse the contribution data
    const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || []
    const map: Map = {}
    for (const w of weeks) {
      for (const d of w.contributionDays) {
        const dateKey = d.date.slice(0, 10)
        map[dateKey] = (map[dateKey] || 0) + (d.contributionCount || 0)
      }
    }

    console.log("GitHub entries found:", Object.keys(map).length)
    return map
  } catch (error) {
    console.error("GitHub fetch failed:", error)
    return {}
  }
}

