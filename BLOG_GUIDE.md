# 📝 Blog System Guide

This portfolio uses a simplified file-based blog system with **HTML content files**. Here's how to add new blog posts:

## Quick Start

### Method 1: Using the Creation Script (Recommended)

```bash
# Create a new blog post
node scripts/create-blog.js "Your Amazing Blog Title"
```

This will:
- Generate a slug from your title
- Create an HTML file in `content/blogs/`
- Provide instructions for adding metadata

### Method 2: Manual Creation

1. **Create the HTML file**
   ```bash
   # Create file: content/blogs/your-blog-title.html
   touch content/blogs/your-blog-title.html
   ```

2. **Add metadata to `data/blogs.ts`**
   ```typescript
   {
     slug: "your-blog-title",
     title: "Your Blog Title",
     excerpt: "Brief description of your post",
     date: "2025-01-15",
     author: "Your Name",
     tags: ["Tag1", "Tag2"],
     readTime: "5 min read",
     image: "/images/blog/your-blog-title.jpg", // Optional
     imageAlt: "Alt text for the image" // Optional
   }
   ```

3. **Write content in HTML**
   ```html
   <h1>Your Blog Title</h1>
   
   <p>Your content here...</p>
   ```

## File Structure

```
portfolio-website/
├── content/
│   └── blogs/
│       ├── getting-started-with-nextjs.html
│       ├── clarity-over-complexity.html
│       └── your-new-post.html
├── data/
│   └── blogs.ts                    # Metadata only
├── scripts/
│   └── create-blog.js             # Helper script
└── app/
    └── blog/
        └── [slug]/
            └── page.tsx           # Auto-renders HTML
```

## HTML Syntax Support

The system supports standard HTML syntax with enhanced styling:

### Headings
```html
<h1>H1 Heading</h1>
<h2>H2 Heading</h2>  
<h3>H3 Heading</h3>
```

### Text Formatting
```html
<strong>Bold text</strong>
<em>Italic text</em>
<code>inline code</code>
```

### Code Blocks
```html
<pre><code class="language-javascript">
function example() {
  console.log("Hello, world!")
}
</code></pre>
```

### Lists
```html
<ul>
  <li>Unordered list item</li>
  <li>Another item</li>
</ul>

<ol>
  <li>Ordered list item</li>
  <li>Another item</li>
</ol>
```

### Links and Images
```html
<a href="https://example.com">Link text</a>
<img src="image-url.jpg" alt="Alt text">
```

### Blockquotes
```html
<blockquote>
  <p>This is a blockquote</p>
</blockquote>
```

## Metadata Fields

| Field | Required | Description |
|-------|----------|-------------|
| `slug` | ✅ | URL-friendly version of title (must match filename) |
| `title` | ✅ | Blog post title |
| `excerpt` | ✅ | Brief description for previews |
| `date` | ✅ | Publication date (YYYY-MM-DD) |
| `author` | ❌ | Author name |
| `tags` | ❌ | Array of tags for categorization |
| `readTime` | ❌ | Estimated reading time |

## Tips

1. **Slug Convention**: Use lowercase letters, numbers, and hyphens only
2. **Date Format**: Always use YYYY-MM-DD format
3. **Content Structure**: Start with an H1 heading that matches your title
4. **Preview**: The `excerpt` field appears in blog cards and social sharing
5. **SEO**: Tags help with categorization and SEO

## Examples

### Simple Post
```typescript
// data/blogs.ts
{
  slug: "hello-world",
  title: "Hello World",
  excerpt: "My first blog post on this amazing portfolio!",
  date: "2025-01-15"
}
```

```html
<!-- content/blogs/hello-world.html -->
<h1>Hello World</h1>

<p>Welcome to my blog! This is my first post.</p>

<h2>Getting Started</h2>

<p>I'm excited to share my thoughts and experiences...</p>
```

### Advanced Post
```typescript
// data/blogs.ts
{
  slug: "advanced-react-patterns",
  title: "Advanced React Patterns",
  excerpt: "Exploring compound components, render props, and custom hooks.",
  date: "2025-01-20",
  author: "Nikhil Choudhary",
  tags: ["React", "JavaScript", "Advanced", "Patterns"],
  readTime: "12 min read"
}
```

## Troubleshooting

**Blog post not showing?**
- Check that the slug in `data/blogs.ts` matches the filename
- Ensure the markdown file exists in `content/blogs/`
- Restart the development server

**Styling issues?**
- The blog uses Tailwind's prose classes for styling
- Custom styles can be added to the blog page component

**Content not rendering?**
- Check for markdown syntax errors
- Ensure proper heading structure
- Verify file encoding is UTF-8

## Development Commands

```bash
# Start development server
pnpm dev

# Create new blog post
node scripts/create-blog.js "Post Title"

# Build for production
pnpm build
```

Happy blogging! 🚀


