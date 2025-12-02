"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Coffee, Home, Download, LifeBuoy, HelpCircle } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={toggleMenu}
        className="p-1 hover:bg-transparent focus:outline-none flex items-center justify-center"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
           <X className="h-6 w-6 text-foreground" />
        ) : (
           <Menu className="h-6 w-6 text-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 w-64 bg-background border-2 border-border shadow-xl z-50 divide-y divide-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:text-brand-primary hover:bg-brand-primary/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/download"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:text-brand-primary hover:bg-brand-primary/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Download className="h-4 w-4" />
              Download
            </Link>
            <Link
              href="/support"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:text-brand-primary hover:bg-brand-primary/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <LifeBuoy className="h-4 w-4" />
              Support
            </Link>
            <Link
              href="/how-to"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:text-brand-primary hover:bg-brand-primary/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="h-4 w-4" />
              How To
            </Link>
            
            <div className="p-4 space-y-3">
                <a 
                  href="https://www.buymeacoffee.com/yarngpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 bg-card border-2 border-border px-4 py-2 text-sm font-bold text-foreground hover:bg-accent hover:text-accent-foreground hover:border-brand-primary/50 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <Coffee className="h-4 w-4" />
                  Buy Coffee
                </a>
                {/* <div className="flex justify-center">
                    <ThemeToggle />
                </div> */}
            </div>
        </div>
      )}
    </div>
  )
}