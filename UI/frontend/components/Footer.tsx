import Link from "next/link"
import { Mic2, Code2, ExternalLink, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto border-4 border-green-600 dark:border-green-600 rounded-lg p-8
          shadow-[8px_8px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[8px_8px_0px_0px_rgba(22,163,74,0.2)]">
          <div className="text-center space-y-6">
            <p className="text-green-700 dark:text-green-500 mb-4">
              © {new Date().getFullYear()} YarnGPT. All rights reserved.
            </p>
            <p className="text-green-600 dark:text-green-400">
              Convert text to speech in Nigerian languages with AI-powered voices!
            </p>
            
            <div className="pt-6 border-t-2 border-green-600 dark:border-green-600 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <a 
                  href="https://abayomiolagunju.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 
                    text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400
                    border-2 border-green-600 dark:border-green-600 rounded-lg
                    shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]
                    hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <Code2 className="h-5 w-5" />
                  <span className="font-medium">Website Developed by Jerry</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a 
                  href="https://github.com/jerryola1/yarngpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 
                    text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400
                    border-2 border-green-600 dark:border-green-600 rounded-lg
                    shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]
                    hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <Github className="h-5 w-5" />
                  <span className="font-medium">View on GitHub</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

