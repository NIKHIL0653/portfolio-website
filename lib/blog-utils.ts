import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'content/blogs')

// Utility function to enhance code blocks with syntax highlighting
function enhanceCodeBlocks(htmlContent: string): string {
  // Language detection patterns
  const languagePatterns = {
    python: /\b(def|class|import|from|if|elif|else|for|while|try|except|with|as|return|print|len|range|str|int|float|bool|list|dict|set|tuple)\b/,
    javascript: /\b(function|const|let|var|if|else|for|while|try|catch|return|console|document|window|async|await|Promise|class|extends|import|export)\b/,
    typescript: /\b(interface|type|enum|namespace|implements|readonly|public|private|protected|abstract|as|is)\b.*\bjavascript\b|\bjavascript\b.*\btypescript\b/,
    bash: /\b(echo|cd|ls|pwd|mkdir|rm|cp|mv|grep|sed|awk|curl|wget|sudo|chmod|chown|ps|kill|top|df|du|tar|gzip|ssh|scp)\b/,
    sql: /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TABLE|INDEX|VIEW|JOIN|INNER|LEFT|RIGHT|FULL|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|UNION|DISTINCT|AS|ON|USING)\b/i,
    css: /\b(color|background|margin|padding|border|width|height|font-size|display|flex|grid|position|absolute|relative|top|left|right|bottom|z-index)\b/,
    html: /<\/?[a-zA-Z][^>]*>/,
    json: /"[^"]*"\s*:\s*("[^"]*"|\d+|true|false|null)/
  };

  // Replace code blocks with enhanced versions
  return htmlContent.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (match, codeContent) => {
    // Detect language
    let detectedLanguage = 'text';
    for (const [lang, pattern] of Object.entries(languagePatterns)) {
      if (pattern.test(codeContent)) {
        detectedLanguage = lang;
        break;
      }
    }

    // Apply basic syntax highlighting based on detected language
    let highlightedCode = codeContent;

    if (detectedLanguage === 'python') {
      highlightedCode = codeContent
        .replace(/\b(def|class|import|from|if|elif|else|for|while|try|except|with|as|return|print|len|range|str|int|float|bool|list|dict|set|tuple)\b/g, '<span class="keyword">$1</span>')
        .replace(/(["'`])(.*?)\1/g, '<span class="string">$1$2$1</span>')
        .replace(/(#.*$)/gm, '<span class="comment">$1</span>');
    } else if (detectedLanguage === 'javascript') {
      highlightedCode = codeContent
        .replace(/\b(function|const|let|var|if|else|for|while|try|catch|return|console|document|window|async|await|Promise|class|extends|import|export)\b/g, '<span class="keyword">$1</span>')
        .replace(/(["'`])(.*?)\1/g, '<span class="string">$1$2$1</span>')
        .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="comment">$1</span>');
    } else if (detectedLanguage === 'bash') {
      highlightedCode = codeContent
        .replace(/\b(echo|cd|ls|pwd|mkdir|rm|cp|mv|grep|sed|awk|curl|wget|sudo|chmod|chown|ps|kill|top|df|du|tar|gzip|ssh|scp)\b/g, '<span class="keyword">$1</span>')
        .replace(/(["'`])(.*?)\1/g, '<span class="string">$1$2$1</span>')
        .replace(/(#.*$)/gm, '<span class="comment">$1</span>');
    }

    return `<pre data-language="${detectedLanguage}"><code>${highlightedCode}</code></pre>`;
  });
}

export async function getBlogContent(slug: string) {
  try {
    const filePath = path.join(contentDirectory, `${slug}.html`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')

    // Apply syntax highlighting enhancement
    const enhancedContent = enhanceCodeBlocks(fileContents)

    return enhancedContent
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