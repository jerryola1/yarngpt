"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 },
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu}>
        <Menu className="h-6 w-6" />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-primary z-50 flex flex-col items-center justify-center"
          >
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="absolute top-4 right-4">
              <X className="h-6 w-6" />
            </Button>
            <nav className="flex flex-col items-center space-y-6">
              <Link href="/" className="text-2xl font-bold hover:underline" onClick={toggleMenu}>
                Home
              </Link>
              <Link href="/about" className="text-2xl font-bold hover:underline" onClick={toggleMenu}>
                About
              </Link>
              <Link href="/contact" className="text-2xl font-bold hover:underline" onClick={toggleMenu}>
                Contact
              </Link>
            </nav>
            <motion.div
              className="absolute inset-0 z-[-1] opacity-20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse" />
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center mix-blend-overlay" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

