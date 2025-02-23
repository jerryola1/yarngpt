'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { X } from 'lucide-react'

export function BuyMeCoffeeModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isOpen && isMobile) {
      window.location.href = 'https://www.buymeacoffee.com/yarngpt'
      onClose()
    }
  }, [isOpen, isMobile, onClose])

  if (isMobile) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-white dark:bg-gray-900 border-4 border-green-600 dark:border-green-600">
        <DialogTitle className="sr-only">Buy Me a Coffee</DialogTitle>
        <DialogDescription className="sr-only">Support this project by buying me a coffee</DialogDescription>
        
        <div className="relative h-[600px] w-full overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 z-50
              text-green-700 dark:text-green-500
              border-2 border-green-600 dark:border-green-600 rounded-lg
              shadow-[2px_2px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[2px_2px_0px_0px_rgba(22,163,74,0.2)]
              hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all
              bg-white dark:bg-gray-900"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close dialog</span>
          </button>
          
          <div className="w-full h-full overflow-hidden">
            <iframe
              src="https://www.buymeacoffee.com/yarngpt"
              className="w-full h-full border-none"
              title="Buy Me a Coffee"
              loading="lazy"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 