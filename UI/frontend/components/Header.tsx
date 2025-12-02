import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { MobileMenu } from "./MobileMenu"
import { Mic2, Coffee, Github } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 right-0 left-0 z-50 mt-6 pt-4 px-4">
      <div className="relative mb-4 flex items-center justify-between container mx-auto max-w-7xl">
        {/* Logo Area */}
        <div className="flex items-center gap-3 self-start">
          <Link
            href="/"
            className="focus:bg-brand-primary/20 transition-transform duration-100 active:scale-[0.98] text-foreground group/logo ring-foreground/15 pointer-events-auto flex items-center gap-3 pr-3 whitespace-nowrap shadow-sm ring-2 shadow-black/5 backdrop-blur-xl outline-none ring-inset hover:text-brand-primary hover:ring-brand-primary/20 hover:shadow-xl hover:shadow-black/20 focus:text-brand-primary focus:ring-brand-primary focus:ring-3"
          >
            <div className="relative flex size-10 flex-none items-center justify-center overflow-hidden font-bold">
              <Mic2 className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold whitespace-nowrap font-jetbrains">YarnGPT</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 items-center justify-center gap-4 lg:flex">
          <nav className="flex flex-row gap-4">
            <ul className="ring-foreground/15 flex justify-center shadow-sm ring-2 shadow-black/5 backdrop-blur-xl ring-inset hover:shadow-xl hover:shadow-black/20 px-2 py-1">
              <li>
                <Link
                  href="/"
                  className="focus:bg-brand-primary/20 transition-transform py-2 duration-100 active:scale-[0.98] text-foreground flex items-center 
                  gap-2 px-4 font-bold whitespace-nowrap ring-2 ring-transparent ring-inset focus:text-brand-primary focus:ring-brand-primary 
                  outline-none hover:text-brand-primary hover:ring-brand-primary font-jetbrains"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/download"
                  className="focus:bg-brand-primary/20 transition-transform duration-100 active:scale-[0.98] text-foreground flex items-center gap-2 py-2 px-4 font-bold whitespace-nowrap ring-2 ring-transparent ring-inset focus:text-brand-primary focus:ring-brand-primary outline-none hover:text-brand-primary hover:ring-brand-primary font-jetbrains"
                >
                  Download
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="focus:bg-brand-primary/20 transition-transform duration-100 active:scale-[0.98] text-foreground flex items-center gap-2 py-2 px-4 font-bold whitespace-nowrap ring-2 ring-transparent ring-inset focus:text-brand-primary focus:ring-brand-primary outline-none hover:text-brand-primary hover:ring-brand-primary font-jetbrains"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to"
                  className="focus:bg-brand-primary/20 transition-transform duration-100 active:scale-[0.98] text-foreground flex items-center gap-2 py-2 px-4 font-bold whitespace-nowrap ring-2 ring-transparent ring-inset focus:text-brand-primary focus:ring-brand-primary outline-none hover:text-brand-primary hover:ring-brand-primary font-jetbrains"
                >
                  How To
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="relative hidden items-center gap-3 lg:flex">
           {/* Github Star */}
           <a
             href="https://github.com/saheedniyi02/yarngpt"
             target="_blank"
             rel="noopener noreferrer"
             className="dark:hover:text-brand-primary inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:animate-pulse hover:border-brand-primary/50 hover:bg-accent dark:bg-card"
           >
             <Github className="h-4 w-4" />
             <span className="font-semibold">Star</span>
           </a>

           <div className="flex flex-row gap-3">
              <a // Changed to <a> tag
                 href="https://www.buymeacoffee.com/yarngpt"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="transition-transform duration-100 active:scale-[0.98] group/button user-select-none pointer-events-auto flex cursor-pointer items-center justify-center gap-2 bg-card font-bold whitespace-nowrap text-foreground ring-2 ring-border outline-none ring-inset hover:bg-card hover:text-foreground hover:no-underline hover:shadow-xl hover:shadow-black/20 hover:ring-brand-primary focus:bg-brand-primary/20 focus:text-brand-primary focus:ring-brand-primary focus:hover:bg-brand-primary/20 px-4 py-2 font-jetbrains"
              >
                 <Coffee className="h-4 w-4" />
                 <span>Buy Coffee</span>
              </a>

              {/* <div className="flex items-center justify-center ring-2 ring-foreground/15 shadow-sm shadow-black/5 backdrop-blur-xl ring-inset hover:shadow-xl hover:shadow-xl px-2">
                 <ThemeToggle />
              </div> */}
           </div>
        </div>

        {/* Mobile Trigger */}
        <div className="z-20 lg:hidden">
          <div className="ring-2 ring-foreground/15 shadow-sm shadow-black/5 backdrop-blur-xl ring-inset hover:shadow-xl hover:shadow-xl p-2">
            <MobileMenu />
          </div>
        </div>
      </div>

    </header>
  )
}