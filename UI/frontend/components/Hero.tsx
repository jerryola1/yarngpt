'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Mic2, Play, GitFork, UserPlus } from "lucide-react" 

export default function Hero() {
  return (
    <section id="hero" aria-label="Hero section" className="flex flex-col bg-background rounded-3xl p-8 pt-16 md:pt-20 dark:bg-transparent dark:px-0 dark:pb-0">
      <div className="flex flex-col gap-18 md:items-center">
        <div className="flex flex-col gap-10 md:justify-center py-10">
          <h1 className="text-brand-primary text-4xl md:text-7xl text-center font-extrabold font-jetbrains">
            <span className="mx-auto block max-w-4xl">YarnGPT is the fastest growing Nigerian Text-to-Speech AI Model.</span>
          </h1>
          <p className="text-foreground mx-auto max-w-4xl text-center text-2xl leading-8 font-medium font-jetbrains md:text-3xl md:leading-10">
            <span>#1 for Nigerian Languages. 19k+ YarnGPT users. 1.2 billion tokens converted per month.</span>
          </p>
        </div>
        <div className="flex flex-col gap-10 md:items-center">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-10">
            {/* Play Store Image Link */}
            <div className="relative flex" tabIndex={-1}>
              <a
                href="https://play.google.com/store/apps/details?id=com.yarngpt.yarngpt"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto flex cursor-pointer items-center justify-center transition-transform duration-100 active:scale-[0.98] hover:scale-[1.05]" // Adjusted for image-only link
              >
                <img src="/play.png" alt="Google Play" className="h-12 w-auto" /> 
              </a>
            </div>

            {/* "Start Trial" Button - adapted */}
            <div className="flex" tabIndex={0}>
              <Link
                href="https://yarngpt.ai/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group/button user-select-none pointer-events-auto flex cursor-pointer items-center justify-center gap-3 bg-card font-bold whitespace-nowrap text-foreground ring-2 ring-border outline-none ring-inset hover:bg-card hover:text-foreground hover:no-underline hover:shadow-xl hover:shadow-black/20 hover:ring-brand-primary focus:bg-brand-primary/20 focus:text-brand-primary focus:ring-brand-primary focus:hover:bg-brand-primary/20 px-5 min-h-12 text-base font-jetbrains"
              >
                <UserPlus className="h-5 w-5" /> 
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}