import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative py-10 sm:py-20 w-full">
      <div className="container mx-auto px-2 sm:px-4 text-center relative z-10 w-full">
        <div className="max-w-3xl w-full mx-auto bg-white dark:bg-green-900 p-4 sm:p-8 m-2
          border-4 border-green-600 dark:border-white rounded-lg
          shadow-[8px_8px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]
          transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all overflow-x-auto">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 px-2 sm:px-4 py-2
            text-green-700 dark:text-white
            border-b-4 border-green-600 dark:border-white">
            YarnGPT
          </h1>
          <p className="text-base sm:text-xl md:text-2xl mb-4 sm:mb-8 px-2 sm:px-4 py-2
            text-green-700 dark:text-white
            border-2 border-green-600 dark:border-white rounded-lg
            shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
            Convert text to speech in Nigerian languages with AI-powered voices!
          </p>
          <Link 
            href="#" 
            className="inline-block px-4 sm:px-8 py-2 sm:py-4 text-base sm:text-lg font-bold
              bg-green-600 text-white dark:bg-white dark:text-green-900
              border-4 border-green-600 dark:border-white rounded-lg
              shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]
              hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none 
              transform transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

