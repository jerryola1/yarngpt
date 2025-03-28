'use client'

import { useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { MobileMenu } from "./MobileMenu"
import { Mic2, Coffee, Github } from "lucide-react"
import { BuyMeCoffeeModal } from "./BuyMeCoffeeModal"

export function Header() {
  const [isBuyMeCoffeeOpen, setIsBuyMeCoffeeOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-900 relative px-2 md:px-4">
      <div className="container mx-auto max-w-5xl px-2 sm:px-4 py-4 flex justify-between items-center 
        border-4 border-green-600 dark:border-green-600 m-4 rounded-lg 
        shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]
        hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all">
        <Link 
          href="/" 
          className="text-xl md:text-2xl font-bold flex items-center px-3 md:px-4 py-2 
            text-green-700 dark:text-green-500
            border-2 border-green-600 dark:border-green-600 rounded-lg
            shadow-[2px_2px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(22,163,74,0.2)]
            hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          <Mic2 className="mr-2 h-5 w-5 md:h-6 md:w-6" />
          YarnGPT
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4">
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              href="/" 
              className="px-4 py-2 text-green-700 dark:text-green-500
                border-2 border-green-600 dark:border-green-600 rounded-lg
                shadow-[2px_2px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(22,163,74,0.2)]
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              Home
            </Link>
            <Link 
              href="#" 
              className="px-4 py-2 text-green-700 dark:text-green-500
                border-2 border-green-600 dark:border-green-600 rounded-lg
                shadow-[2px_2px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(22,163,74,0.2)]
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              About
            </Link>
            <Link 
              href="#"
              className="px-4 py-2 bg-green-600 text-white dark:bg-green-600
                border-2 border-green-600 dark:border-green-600 rounded-lg
                shadow-[2px_2px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(22,163,74,0.2)]
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              Contact
            </Link>
            <button 
              onClick={() => setIsBuyMeCoffeeOpen(true)}
              className="px-4 py-2 text-green-700 dark:text-green-500
                border-2 border-green-600 dark:border-green-600 rounded-lg
                shadow-[2px_2px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(22,163,74,0.2)]
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none 
                hover:bg-yellow-400 hover:text-black transition-all flex items-center space-x-2"
            >
              <Coffee className="h-5 w-5" />
              <span>Buy me a coffee</span>
            </button>
          </nav>
          <div className="flex items-center space-x-2 md:space-x-3">
            <a
              href="https://github.com/saheedniyi02/yarngpt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-green-700 dark:text-green-500
                border-2 border-green-600 dark:border-green-600 rounded-lg
                shadow-[2px_2px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(22,163,74,0.2)]
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <Github className="h-5 w-5 md:h-6 md:w-6" />
              <span className="sr-only">View source on GitHub</span>
            </a>
            <a
              href="https://www.buymeacoffee.com/yarngpt"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden p-2 text-green-700 dark:text-green-500
                border-2 border-green-600 dark:border-green-600 rounded-lg
                shadow-[2px_2px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(22,163,74,0.2)]
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                hover:bg-yellow-400 hover:text-black transition-all"
            >
              <Coffee className="h-5 w-5 md:h-6 md:w-6" />
              <span className="sr-only">Buy me a coffee</span>
            </a>
            <div className="p-2 border-2 border-green-600 dark:border-green-600 rounded-lg
              shadow-[2px_2px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(22,163,74,0.2)]
              hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <ThemeToggle />
            </div>
            <div className="p-2 border-2 border-green-600 dark:border-green-600 rounded-lg
              shadow-[2px_2px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(22,163,74,0.2)]
              hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>

      <BuyMeCoffeeModal 
        isOpen={isBuyMeCoffeeOpen}
        onClose={() => setIsBuyMeCoffeeOpen(false)}
      />
    </header>
  )
}

