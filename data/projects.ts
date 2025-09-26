export type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
  repo?: string
  caseStudy?: string
  year?: string
}

export const projects: Project[] = [
  {
    title: "Search Sense",
    description: "RAG Application that searches the internet beased on input query, reads through articles posted on the internet and provides users with a consice answer saving hours on searching and surfing the web",
    tags: ["Chroma DB", "RAG", "Vector Databases", "API"],
    link: "https://github.com/NIKHIL0653/Search-Sense.git",
    repo: "#",
    year: "2025",
  },
  {
    title: "Turbo Cash",
    description: "A sleek looking finance tracking and expense habit building application",
    tags: ["React", "TypeScript", "Supabase", "Tailwind"],
    link: "#",
    repo: "#",
    year: "2025",
  },
  {
    title: "NINA-Personal Health Assistant",
    description: "Instant symptom analysis. Track records. Get personalized health insights.",
    tags: ["AI", "OpenRouter API", "Auth", "Tailwind", "PostgreSQL"],
    link: "https://github.com/NIKHIL0653/NINA.git",
    repo: "#",
    year: "2025",
  },
  {
    title: "Cart Pole AI Agent ",
    description: "einforcement learning implementation of a Deep Q-Network (DQN) agent to solve the classic CartPole balancing problem from OpenAI Gym. ",
    tags: ["OpenAI Gym", "PyTorch", "PyGame", "Reinforcement Learning","Deep Q-Learning"],
    link: "#",
    repo: "#",
    year: "2025",
  },
  {
    title: "F1 Winner Prediction Model",
    description: "Leveraging Machine Learning to predict the winner of F1 races by using past race data like Lap time, weather, Humidity, Wind Speed etc.",
    tags: ["XGBoost", "Supervised Learning", "Feature Engineering", "Python", "fastf1 API"],
    link: "https://github.com/NIKHIL0653/Singapore_GP-Prediction.git",
    repo: "#",
    year: "2025",
  },
  {
    title: "Personal BLOG",
    description: "My personal blog where I share my thoughts, ideas and knowledge I've gained over the years.",
    tags: ["React", "Next.js", "Tailwind", "Techinical Writing"],
    link: "https://nikhilchoudhary.vercel.app/blog",
    repo: "#",
    year: "2025",
  },
  {
    title: "More Projects Coming Soon...",
    description: "Coming Soon...",
    tags: [],
    link: "",
    repo: "",
    year: "2025",
  },
  // {
  //   title: "IoT Device Manager",
  //   description: "Cloud platform for managing and monitoring IoT devices with real-time data visualization.",
  //   tags: ["AWS", "MQTT", "D3.js"],
  //   link: "#",
  //   repo: "#",
  //   year: "2023",
  // },
  // {
  //   title: "Collaborative Whiteboard",
  //   description: "Real-time collaborative drawing and brainstorming tool with shape recognition.",
  //   tags: ["WebRTC", "Canvas API", "Socket.io"],
  //   link: "#",
  //   repo: "#",
  //   year: "2024",
  // },
]



