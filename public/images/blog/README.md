# Blog Images

This directory contains hero images for blog posts.

## Image Requirements
- **Dimensions**: 600x300px (2:1 aspect ratio) recommended
- **Format**: JPG, PNG, or WebP
- **Size**: Keep under 200KB for optimal loading
- **Quality**: High quality, web-optimized

## Naming Convention
Use the blog slug as the filename:
- `getting-started-with-nextjs.jpg`
- `clarity-over-complexity.jpg`
- `accessibility-is-a-feature.jpg`
- `building-scalable-react-applications.jpg`

## Adding New Blog Images
1. Add your image to this directory
2. Update the blog metadata in `/data/blogs.ts` with the image path
3. Include an appropriate `imageAlt` description for accessibility

Example:
```typescript
{
  slug: "my-new-blog",
  // ... other metadata
  image: "/images/blog/my-new-blog.jpg",
  imageAlt: "Description of the image for screen readers"
}
```