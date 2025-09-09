import Link from "next/link";
import { Mail, Github, Linkedin, X } from "lucide-react";

export function Footer() {
  return (
    <footer id="about" className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">About</h3>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            I’m a frontend-focused engineer who values simplicity, maintainability, and great UX. I work across the
            stack when needed and care deeply about performance and accessibility.
          </p>
          <div className="flex items-center space-x-4 mt-4">
            <Link href="mailto:your-email@example.com" target="_blank" rel="noopener noreferrer">
              <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
            <Link href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
            <Link href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
            <Link href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
              <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Nikhil Choudhary</p>
        </div>
      </div>
    </footer>
  )
}
