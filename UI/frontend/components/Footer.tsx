import Link from "next/link"
import { Mic2, Code2, ExternalLink, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 sm:py-8 w-full">
      <div className="container mx-auto px-2 sm:px-4 w-full">
        <div className="max-w-4xl w-full mx-auto border-4 border-green-600 dark:border-green-600 rounded-lg p-4 sm:p-8
          shadow-[8px_8px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[8px_8px_0px_0px_rgba(22,163,74,0.2)]">
          <div className="text-center space-y-4 sm:space-y-6 w-full">
            <p className="text-green-700 dark:text-green-500 mb-2 sm:mb-4 text-sm sm:text-base">
              © {new Date().getFullYear()} YarnGPT. All rights reserved.
            </p>
            <p className="text-green-600 dark:text-green-400 text-xs sm:text-base">
              Convert text to speech in Nigerian languages with AI-powered voices!
            </p>
            
            <div className="pt-4 sm:pt-6 border-t-2 border-green-600 dark:border-green-600 flex flex-col items-center gap-3 sm:gap-4 w-full">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full">
                <a 
                  href="https://abayomiolagunju.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 sm:px-4 py-2 
                    text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400
                    border-2 border-green-600 dark:border-green-600 rounded-lg
                    shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]
                    hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all text-xs sm:text-base"
                >
                  <Code2 className="h-5 w-5" />
                  <span className="font-medium">Website Developed by Jerry</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a 
                  href="https://github.com/saheedniyi02/yarngpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 sm:px-4 py-2 
                    text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400
                    border-2 border-green-600 dark:border-green-600 rounded-lg
                    shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]
                    hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all text-xs sm:text-base"
                >
                  <Github className="h-5 w-5" />
                  <span className="font-medium">View on GitHub</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-2 sm:mt-4 w-full">
                <Link href="/privacy-policy" className="text-green-700 dark:text-green-400 hover:underline font-medium text-xs sm:text-base">Privacy Policy</Link>
                <Link href="/terms" className="text-green-700 dark:text-green-400 hover:underline font-medium text-xs sm:text-base">Terms of Service</Link>
                <Link href="/support" className="text-green-700 dark:text-green-400 hover:underline font-medium text-xs sm:text-base">Support</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

