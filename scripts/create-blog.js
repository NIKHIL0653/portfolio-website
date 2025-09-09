#!/usr/bin/env node

/**
 * Blog Post Creation Helper
 * 
 * Usage: node scripts/create-blog.js "Your Blog Title"
 * 
 * This script will:
 * 1. Generate a slug from the title
 * 2. Create a new HTML file in content/blogs/
 * 3. Provide instructions for adding metadata
 */

const fs = require('fs')
const path = require('path')

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function createBlogPost(title) {
  const slug = createSlug(title)
  const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.html`)
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`❌ Blog post "${slug}.html" already exists!`)
    return
  }
  
  // Create the HTML template
  const template = `<h1>${title}</h1>

<p>Write your blog post content here using standard HTML syntax.</p>

<h2>Subheading Example</h2>

<p>You can use:</p>

<ul>
  <li><strong>Bold text</strong></li>
  <li><em>Italic text</em></li>
  <li><code>inline code</code></li>
  <li><a href="https://example.com">Links</a></li>
  <li>Lists and bullet points</li>
</ul>

<h3>Code Blocks</h3>

<pre><code class="language-javascript">function example() {
  console.log("Hello, world!")
}</code></pre>

<h3>Blockquotes</h3>

<blockquote>
  <p>This is a blockquote. Use it for emphasis or citations.</p>
</blockquote>

<h2>Conclusion</h2>

<p>Wrap up your thoughts here.</p>
`

  // Create content/blogs directory if it doesn't exist
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  // Write the file
  fs.writeFileSync(filePath, template)
  
  console.log(`✅ Created new blog post: ${slug}.html`)
  console.log(`📁 File location: content/blogs/${slug}.html`)
  console.log('')
  console.log('📝 Next steps:')
  console.log('1. Edit the HTML file with your content')
  console.log('2. Add metadata to data/blogs.ts:')
  console.log('')
  console.log('```typescript')
  console.log('{')
  console.log(`  slug: "${slug}",`)
  console.log(`  title: "${title}",`)
  console.log(`  excerpt: "Brief description of your post",`)
  console.log(`  date: "${new Date().toISOString().split('T')[0]}",`)
  console.log(`  author: "Your Name",`)
  console.log(`  tags: ["Tag1", "Tag2"],`)
  console.log(`  readTime: "X min read",`)
  console.log(`  image: "/images/blog/${slug}.jpg", // Optional`)
  console.log(`  imageAlt: "Alt text for the image" // Optional`)
  console.log('}')
  console.log('```')
}

// Get title from command line arguments
const title = process.argv[2]

if (!title) {
  console.log('❌ Please provide a blog post title')
  console.log('Usage: node scripts/create-blog.js "Your Blog Title"')
  process.exit(1)
}

createBlogPost(title)