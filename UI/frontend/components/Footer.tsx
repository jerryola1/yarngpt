import Link from "next/link"
import { Mic2, Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Mic2 className="mr-2" />
              YarnGPT
            </h2>
            <p>Bringing Nigerian languages to life through AI-powered text-to-speech technology.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline flex items-center">
                  <Github className="mr-2" /> GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline flex items-center">
                  <Twitter className="mr-2" /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline flex items-center">
                  <Mail className="mr-2" /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p>&copy; 2025 YarnGPT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

