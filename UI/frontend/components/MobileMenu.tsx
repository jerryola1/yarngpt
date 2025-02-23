"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, Coffee } from "lucide-react"

export function MobileMenu() {
  // const [isOpen, setIsOpen] = useState(false)

  // const toggleMenu = () => setIsOpen(!isOpen)

  // const menuVariants = {
  //   closed: { opacity: 0, x: "100%" },
  //   open: { opacity: 1, x: 0 }
  // }

  return (
    <div className="md:hidden">
      <button 
        // onClick={toggleMenu}
        className="p-0 hover:bg-transparent focus:outline-none"
      >
        <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
      </button>

      {/* Commenting out all menu functionality
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-sm 
                bg-white dark:bg-slate-800 z-50 
                border-l-4 border-black dark:border-white
                shadow-[-4px_0px_0px_0px_rgba(0,0,0)] dark:shadow-[-4px_0px_0px_0px_rgba(255,255,255)]"
            >
              <button 
                onClick={toggleMenu}
                className="absolute top-4 right-4 p-2
                  border-2 border-black dark:border-white rounded-lg
                  shadow-[2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255)]
                  hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <X className="h-6 w-6 text-gray-900 dark:text-white" />
              </button>

              <nav className="flex flex-col items-start p-8 mt-16 space-y-6">
                <Link 
                  href="/" 
                  className="text-xl font-bold px-4 py-2 w-full
                    text-gray-900 dark:text-white
                    border-2 border-black dark:border-white rounded-lg
                    shadow-[2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255)]
                    hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="text-xl font-bold px-4 py-2 w-full
                    text-gray-900 dark:text-white
                    border-2 border-black dark:border-white rounded-lg
                    shadow-[2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255)]
                    hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link 
                  href="/contact"
                  className="text-xl font-bold px-4 py-2 w-full
                    text-gray-900 dark:text-white
                    border-2 border-black dark:border-white rounded-lg
                    shadow-[2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255)]
                    hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
                <a 
                  href="https://buymeacoffee.com/yarngpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold px-4 py-2 w-full
                    text-gray-900 dark:text-white
                    border-2 border-black dark:border-white rounded-lg
                    shadow-[2px_2px_0px_0px_rgba(0,0,0)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255)]
                    hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                    hover:bg-yellow-400 hover:text-black transition-all
                    flex items-center space-x-2"
                  onClick={toggleMenu}
                >
                  <Coffee className="h-6 w-6" />
                  <span>Buy me a coffee</span>
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      */}
    </div>
  )
}

