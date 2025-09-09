# Blog Images Setup Guide

Your blog system now supports hero images! Here's how to add your own images to the blog cards.

## 📁 Directory Structure

```
public/
├── images/
│   └── blog/
│       ├── nextjs-hero.jpg
│       ├── architecture-hero.jpg
│       ├── accessibility-hero.jpg
│       └── react-scalability-hero.jpg
```

## 🖼️ Current Blog Posts Need These Images

You need to add these 4 images to `public/images/blog/`:

1. **`nextjs-hero.jpg`** - Next.js development theme
2. **`architecture-hero.jpg`** - Software architecture/clean code theme  
3. **`accessibility-hero.jpg`** - Web accessibility theme
4. **`react-scalability-hero.jpg`** - React development/scalability theme

## 📐 Image Requirements

- **Dimensions**: 600x300px (2:1 aspect ratio) 
- **Format**: JPG, PNG, or WebP
- **File Size**: Keep under 200KB for fast loading
- **Quality**: High resolution, web-optimized

## 🎨 Image Suggestions

### 1. Next.js Hero (`nextjs-hero.jpg`)
- Next.js logo on dark background
- Code editor showing Next.js/React code
- Modern development workspace
- Developer coding a React app

### 2. Architecture Hero (`architecture-hero.jpg`) 
- Clean architectural diagrams
- Minimalist building/structure
- Code organization visualization
- Simple vs complex comparison

### 3. Accessibility Hero (`accessibility-hero.jpg`)
- Person using assistive technology
- Inclusive design symbols
- Hands typing on accessible keyboard
- Universal access icons

### 4. React Scalability Hero (`react-scalability-hero.jpg`)
- React component tree diagram
- Scalable architecture visualization
- Team collaboration on code
- Growth/scaling metaphors

## 🔧 How to Add Images

### Method 1: Direct File Addition
1. Save your images to `public/images/blog/`
2. Use exact filenames listed above
3. Images will automatically appear on your blog cards

### Method 2: Custom Filenames
1. Add your image to `public/images/blog/`
2. Update the image path in `data/blogs.ts`:

```typescript
{
  slug: "getting-started-with-nextjs",
  // ... other fields
  image: "/images/blog/your-custom-filename.jpg",
  imageAlt: "Descriptive alt text for accessibility"
}
```

## 🚀 Testing Your Images

1. Add your images to the blog folder
2. Run `npm run dev` 
3. Visit `http://localhost:3000` to see the homepage blog section
4. Visit `http://localhost:3000/blog` to see all blog posts

## 🎯 Image Optimization Tips

- Use online tools like TinyPNG to compress images
- Consider WebP format for better compression
- Ensure good contrast for text overlays (if any)
- Test images on both light and dark themes

## 🔧 Fallback Behavior

If an image is missing or fails to load:
- The blog card will still display without the image
- All text content remains accessible
- Layout automatically adjusts

## 🆕 Adding Images to New Blog Posts

When creating a new blog post:

1. **Add metadata** to `data/blogs.ts`:
```typescript
{
  slug: "my-new-post",
  title: "My New Post",
  excerpt: "Brief description...",
  date: "2025-01-25",
  image: "/images/blog/my-new-post.jpg",
  imageAlt: "Description for screen readers"
}
```

2. **Add the image** to `public/images/blog/my-new-post.jpg`

3. **Create content** at `content/blogs/my-new-post.md`

That's it! Your blog cards will now display beautiful hero images that match your content themes.