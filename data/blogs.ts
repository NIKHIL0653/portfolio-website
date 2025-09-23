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
  category: 'Development' | 'AI/ML' | 'Blogging'
}

// Blog posts metadata - content loaded from HTML files
export const posts: BlogPostMeta[] = [
  {
    slug: "next-project",
    title: "Why Your Next Project Should Be a Blog",
    excerpt: "Discover how your personal blog can become a creative playground, a learning accelerator, and the ultimate tool for building your unique brand in the tech world.",
    date: "2025-09-15",
    author: "Nikhil Choudhary",
    tags: ["Personal Branding", "Blogging", "Web Development", "Career Growth"],
    readTime: "5 min read",
    image: "/images/blog/digital-playground-hero.jpg",
    imageAlt: "A developer typing on a laptop with vibrant code and creative graphics flowing out of the screen.",
    category: "Blogging"
  },
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js! Is it better than React.js?",
    excerpt: "Learn how to build modern web applications with Next.js and React.",
    date: "2025-07-15",
    author: "Nikhil Choudhary",
    tags: ["Next.js", "React", "Web Development"],
    readTime: "5 min read",
    image: "/images/blog/nextjs-hero.jpg",
    imageAlt: "Next.js logo with modern web development setup",
    category: "Development"
  },
  {
    "slug": "git-dummies-1",
    "title": "Git & GitHub for Dummies: Part 1",
    "excerpt": "A beginner's guide to getting started with Git and GitHub, covering the basic workflow, authentication, and common errors.",
    "date": "2025-08-23",
    "author": "Nikhil Choudhary",
    "tags": ["Git", "GitHub", "Development", "Beginner"],
    "readTime": "6 min read",
    "image": "/images/blog/git-hero.jpg",
    "imageAlt": "A visual representation of Git and GitHub, showing a local machine connected to a cloud repository.",
    "category": "Development"
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
    title: "Fine-Tune, RAG, or Prompt?",
    excerpt: "A practical guide to modern LLM fine-tuning. Learn when to use SFT, LoRA, QLoRA, and DPO to balance quality, cost, and latency for your AI applications.",
    date: "2025-09-12",
    author: "Nikhil Choudhary",
    tags: ["LLM", "Fine-Tuning", "LoRA", "DPO", "AI Strategy"],
    readTime: "12 min read",
    image: "/images/blog/llm-finetuning-hero.jpg",
    imageAlt: "LLM fine-tuning",
    category: "AI/ML"
  },
  {
    slug: "git-dummies-2",
    title: "Git & GitHub for Dummies: Part 2",
    excerpt: "Dive deeper into Git with branches, merging, pull requests, and the essential tools for professional collaboration like rebase, stash, and .gitignore.",
    date: "2025-09-15",
    author: "Nikhil Choudhary",
    tags: ["Git", "GitHub", "Collaboration", "Open Source", "Professional Development"],
    readTime: "8 min read",
    image: "/images/blog/git-hero-2.jpg",
    imageAlt: "A visual representation of multiple developers collaborating on code via a central GitHub repository, using branches and pull requests.",
    category : "Development"
  },
  {
    slug: "cart-pole-agent-blog",
    title: "Training a Self-Learning CartPole AI with Python and Pygame",
    excerpt: "A step-by-step guide to building a Deep Q-Learning agent to master the classic CartPole game. Learn to implement a DQN in Python, integrate with OpenAI Gym, and create a modern, interactive visualization with Pygame.",
    date: "2025-09-19",
    author: "Nikhil Choudhary",
    tags: ["Reinforcement Learning", "Deep Q-Learning", "Python", "Pygame", "AI"],
    readTime: "10 min read",
    image: "/images/blog/cartpole-dqn-1.jpg",
    imageAlt: "Screenshot of the Pygame UI showing the CartPole agent in action with score and performance graph.",
    category: "AI/ML"
  },
  {
    slug: "f1-azerbaijan",
    title: "From Data to Finish Line: Predicting F1 Race Winners with Machine Learning",
    excerpt: "Dive into my machine learning project to predict the 2025 Azerbaijan GP winner. I'll walk you through the entire process, from finding and cleaning historical F1 data to training a Gradient Boosting Regressor model.",
    date: "2025-09-22",
    author: "Nikhil Choudhary",
    tags: ["Machine Learning", "F1", "Formula 1", "Data Science", "Python", "fastf1"],
    readTime: "4 min read",
    image: "/images/blog/azerbaijan-hero.jpg",
    imageAlt: "F1 Image",
    category: "AI/ML"
  }
]



