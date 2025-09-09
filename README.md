# 🚀 Nikhil Choudhary - Portfolio Website

A modern, responsive portfolio website showcasing my skills as a full-stack developer specializing in React, Next.js, and cutting-edge web technologies.

![Portfolio Preview](./public/placeholder.jpg)

## ✨ Features

### 🎨 Modern Design
- **Clean & Minimalist UI** - Professional design with attention to detail
- **Dark/Light Theme Support** - Seamless theme switching
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations** - Engaging hover effects and transitions

### 🛠️ Technical Highlights
- **Next.js 14** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Google Maps Integration** - Interactive location display
- **Dynamic Content** - Blog system with MDX support
- **Performance Optimized** - Fast loading with Next.js optimizations

### 📱 Interactive Components
- **GitHub Activity Heatmap** - Visual coding activity tracker
- **Interactive Map** - Location display with zoom restrictions
- **Tech Stack Marquee** - Animated technology showcase
- **Multilingual Greetings** - International user experience
- **Animated Cursor** - Custom interactive cursor effects

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Maps:** Google Maps API

### Backend & Infrastructure
- **Deployment:** Vercel
- **Content Management:** MDX for blog posts
- **State Management:** React Hooks
- **API Integration:** RESTful APIs

### Development Tools
- **Package Manager:** pnpm
- **Version Control:** Git
- **Code Quality:** ESLint, Prettier
- **Testing:** Jest, React Testing Library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Add your Google Maps API key:
   ```env
   GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

4. **Run development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
portfolio-website/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── projects/          # Projects page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── interactive-hero.tsx
│   ├── interactive-map.tsx
│   └── ...
├── content/               # MDX content
│   └── blogs/            # Blog posts
├── data/                  # Static data
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/               # Global styles
```

## 🎯 Key Sections

### 🏠 Homepage
- **Hero Section** - Professional introduction with animated elements
- **Activity Heatmap** - GitHub contribution visualization
- **Tech Stack** - Animated technology showcase
- **Navigation** - Clean section links with hover animations

### 👨‍💻 About Page
- **Personal Introduction** - Professional background
- **Location Map** - Interactive Google Maps with Kolkata focus
- **Skills Overview** - Technical competencies

### 📝 Blog
- **Technical Articles** - Development insights and tutorials
- **MDX Support** - Rich content with code syntax highlighting
- **SEO Optimized** - Meta tags and structured data

### 💼 Projects
- **Portfolio Showcase** - Featured work and case studies
- **Technology Tags** - Stack identification
- **Live Demos** - Direct links to deployed applications

## 🔧 Customization

### Adding New Blog Posts
1. Create new `.mdx` file in `content/blogs/`
2. Add frontmatter with title, date, excerpt
3. Write content using Markdown + JSX

### Modifying Theme
- Update `tailwind.config.js` for custom colors
- Modify `components/theme-provider.tsx` for theme logic
- Adjust CSS variables in `styles/globals.css`

### Google Maps Setup
1. Get API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Maps JavaScript API
3. Add key to `.env.local`

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, SEO)
- **Core Web Vitals:** All metrics in green
- **Bundle Size:** Optimized with Next.js code splitting
- **Image Optimization:** Automatic WebP conversion

## 🌐 Deployment

### Vercel (Recommended)
```bash
pnpm build
```

Connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms
The app can be deployed to any platform supporting Node.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

While this is a personal portfolio, feel free to:
- Report bugs via GitHub Issues
- Suggest improvements
- Fork for your own use

## 📞 Contact

**Nikhil Choudhary**
- **Location:** Kolkata, West Bengal, India
- **Email:** [your.email@example.com]
- **LinkedIn:** [linkedin.com/in/yourprofile]
- **GitHub:** [github.com/yourusername]
- **Portfolio:** [yourwebsite.com]

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repo** if you found it helpful!
