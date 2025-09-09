import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content/blogs')

export async function getBlogContent(slug: string) {
  try {
    const filePath = path.join(contentDirectory, `${slug}.html`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    
    // Return HTML content directly (no conversion needed)
    return fileContents
  } catch (error) {
    console.error(`Error reading blog content for slug: ${slug}`, error)
    return null
  }
}

export function getAllBlogSlugs() {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return []
    }
    
    const files = fs.readdirSync(contentDirectory)
    return files
      .filter(file => file.endsWith('.html'))
      .map(file => file.replace(/\.html$/, ''))
  } catch (error) {
    console.error('Error reading blog directory:', error)
    return []
  }
}

// Helper function to format date with ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
export function formatDateWithOrdinal(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-GB', { month: 'long' })
  const year = date.getFullYear()
  
  const getOrdinalSuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return 'th'
    }
    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }
  
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`
}

export async function getBlogPostWithContent(slug: string) {
  try {
    const filePath = path.join(contentDirectory, `${slug}.html`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    
    // Return HTML content directly (no conversion needed)
    return {
      slug,
      content: fileContents
    }
  } catch (error) {
    console.error(`Error reading blog post: ${slug}`, error)
    return null
  }
}