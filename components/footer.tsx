import Link from "next/link";
import { Mail, Github, Linkedin, X, ChevronDown } from "lucide-react";
import * as Collapsible from '@radix-ui/react-collapsible';
import { useState } from 'react';

export function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [creativeOpen, setCreativeOpen] = useState(false);

  const menuItems = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const creativeItems = [
    { href: "#photography", label: "Photography" },
    { href: "#writing", label: "Writing" },
    { href: "#music", label: "Music" },
    { href: "#art", label: "Digital Art" },
  ];

  return (
    <footer id="about" className="border-t bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-4">
          <h3 className="text-xl font-semibold">About</h3>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            I'm a frontend-focused engineer who values simplicity, maintainability, and great UX. I work across the
            stack when needed and care deeply about performance and accessibility.
          </p>

          {/* Mobile Collapsible Sections */}
          <div className="md:hidden mt-6 space-y-2">
            {/* Menu Collapsible */}
            <Collapsible.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Collapsible.Trigger className="flex items-center justify-between w-full text-left font-medium py-2 hover:text-foreground transition-colors">
                <span>Menu</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </Collapsible.Trigger>
              <Collapsible.Content className="bg-background">
                <div className="space-y-2 py-2 pl-4 border-l-2 border-muted">
                  {menuItems.map((item) => (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      className="block text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
            
            {/* Creative Collapsible */}
            <Collapsible.Root open={creativeOpen} onOpenChange={setCreativeOpen}>
              <Collapsible.Trigger className="flex items-center justify-between w-full text-left font-medium py-2 hover:text-foreground transition-colors">
                <span>Creative</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${creativeOpen ? 'rotate-180' : ''}`} />
              </Collapsible.Trigger>
              <Collapsible.Content className="bg-background">
                <div className="space-y-2 py-2 pl-4 border-l-2 border-muted">
                  {creativeItems.map((item) => (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      className="block text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          </div>

          {/* Desktop Links (visible on md and up) */}
          <div className="hidden md:flex md:justify-between md:items-start mt-6">
            <div>
              <h4 className="font-medium mb-3">Menu</h4>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Creative</h4>
              <div className="space-y-2">
                {creativeItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

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