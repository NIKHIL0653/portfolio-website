export type BlogPostMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
  author?: string
  tags?: string[]
  readTime?: string
  image?: string
  imageAlt?: string
  category: 'Development' | 'AI/ML' | 'Data' | 'Blogging'
}

// Blog posts metadata - content loaded from HTML files
export const posts: BlogPostMeta[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js and React.",
    date: "2025-01-15",
    author: "Nikhil Choudhary",
    tags: ["Next.js", "React", "Web Development"],
    readTime: "5 min read",
    image: "/images/blog/nextjs-hero.jpg",
    imageAlt: "Next.js logo with modern web development setup",
    category: "Development"
  },
  {
    slug: "clarity-over-complexity",
    title: "Clarity Over Complexity",
    excerpt: "Why straightforward architectures tend to outlast clever ones in fast-moving teams.",
    date: "2025-01-10",
    author: "Nikhil Choudhary",
    tags: ["Architecture", "Best Practices", "Development"],
    readTime: "8 min read",
    image: "/images/blog/architecture-hero.jpg",
    imageAlt: "Clean architecture diagram with simple, clear components",
    category: "Development"
  },
  {
    slug: "accessibility-is-a-feature",
    title: "Accessibility Is a Feature",
    excerpt: "Moving accessibility from a checklist to a core product requirement.",
    date: "2025-01-05",
    author: "Nikhil Choudhary",
    tags: ["Accessibility", "UX", "Web Development"],
    readTime: "6 min read",
    image: "/images/blog/accessibility-hero.jpg",
    imageAlt: "Hands using assistive technology devices",
    category: "Development"
  },
  {
    slug: "demystifying-rag-ai-secret-sauce",
    title: "Demystifying RAG: The Secret Sauce of Modern AI Chatbots",
    excerpt: "Learn how Retrieval-Augmented Generation (RAG) connects LLMs to external data, making them more accurate, timely, and trustworthy while reducing hallucinations.",
    date: "2025-09-09",
    author: "Nikhil Choudhary",
    tags: ["RAG", "AI", "LLM", "Generative AI", "NLP"],
    readTime: "4 min read",
    image: "/images/blog/demystifying-rag-hero.png",
    imageAlt: "Diagram showing the RAG workflow from data indexing to augmented generation",
    category: "AI/ML"
  },
  {
    slug: "llm-finetuning-playbook-2025",
    title: "Fine-Tune, RAG, or Prompt? The 2025 Decision Matrix for LLMs.",
    excerpt: "A practical guide to modern LLM fine-tuning. Learn when to use SFT, LoRA, QLoRA, and DPO to balance quality, cost, and latency for your AI applications.",
    date: "2025-09-08",
    author: "Nikhil Choudhary",
    tags: ["LLM", "Fine-Tuning", "LoRA", "DPO", "AI Strategy"],
    readTime: "12 min read",
    image: "/images/blog/llm-finetuning-hero.jpg",
    imageAlt: "LLM fine-tuning",
    category: "AI/ML"
  },
  {
    slug: "cart-pole-agent-blog",
    title: "From Zero to Hero: Training a Self-Learning CartPole AI with Python and Pygame",
    excerpt: "A step-by-step guide to building a Deep Q-Learning agent to master the classic CartPole game. Learn to implement a DQN in Python, integrate with OpenAI Gym, and create a modern, interactive visualization with Pygame.",
    date: "2025-09-08",
    author: "Nikhil Choudhary",
    tags: ["Reinforcement Learning", "Deep Q-Learning", "Python", "Pygame", "AI"],
    readTime: "10 min read",
    image: "/images/blog/cartpole-dqn-1.jpg",
    imageAlt: "Screenshot of the Pygame UI showing the CartPole agent in action with score and performance graph.",
    category: "AI/ML"
  },
  // {
  //   slug: "design-systems-that-scale",
  //   title: "Design Systems That Scale: From Component Library to Product Ecosystem",
  //   excerpt: "Building design systems that grow with your product. Learn how to create maintainable, scalable design systems that support multiple teams and products while maintaining consistency and developer experience.",
  //   date: "2025-09-09",
  //   author: "Nikhil Choudhary",
  //   tags: ["Design Systems", "UI/UX", "Component Libraries", "Scalability", "Frontend"],
  //   readTime: "7 min read",
  //   image: "/images/blog/design-systems-hero.jpg",
  //   imageAlt: "Modular design system components arranged in a scalable architecture"
  // }
]
