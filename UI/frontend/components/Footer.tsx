import Link from "next/link"
import { Mic2, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-30 flex flex-col items-start gap-6 py-8 container mx-auto px-4 max-w-7xl">
      {/* Logo Div */}
      <div className="flex shrink-0 self-start">
        <Link
          href="/"
          className="focus:bg-brand-primary/20 transition-transform duration-100 active:scale-[0.98] text-foreground group/logo ring-foreground/15 pointer-events-auto flex items-center gap-3 self-start pr-3 whitespace-nowrap shadow-sm ring-2 shadow-black/5 backdrop-blur-xl outline-none ring-inset hover:text-brand-primary hover:ring-brand-primary/20 hover:shadow-xl hover:shadow-black/20 focus:text-brand-primary focus:ring-brand-primary focus:ring-3"
        >
          <div className="relative flex size-10 flex-none items-center justify-center overflow-hidden font-bold">
            <Mic2 className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold whitespace-nowrap font-jetbrains">YarnGPT</span>
        </Link>
      </div>

      {/* Community Div */}
      <div className="shrink-0">
        <p className="mb-4 text-lg font-jetbrains text-foreground">Community</p>
        <ul className="flex flex-row flex-wrap items-start gap-2">
          <li>
            <Link
              className="transition-transform duration-100 active:scale-[0.98] group/button user-select-none pointer-events-auto flex cursor-pointer items-center justify-center gap-3 font-bold whitespace-nowrap ring-2 outline-none ring-inset hover:no-underline hover:shadow-xl hover:shadow-black/20 hover:ring-brand-primary focus:bg-brand-primary/20 focus:text-brand-primary focus:ring-brand-primary focus:hover:bg-brand-primary/20 bg-transparent ring-transparent text-foreground hover:bg-foreground/10 hover:text-foreground px-4 min-h-10"
              href="#" 
            >
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-4 fill-current"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
              Discord
            </Link>
          </li>
          <li>
            <Link
              className="transition-transform duration-100 active:scale-[0.98] group/button user-select-none pointer-events-auto flex cursor-pointer items-center justify-center gap-3 font-bold whitespace-nowrap ring-2 outline-none ring-inset hover:no-underline hover:shadow-xl hover:shadow-black/20 hover:ring-brand-primary focus:bg-brand-primary/20 focus:text-brand-primary focus:ring-brand-primary focus:hover:bg-brand-primary/20 bg-transparent ring-transparent text-foreground hover:bg-foreground/10 hover:text-foreground px-4 min-h-10"
              href="https://github.com/saheedniyi02/yarngpt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
              GitHub
            </Link>
          </li>
          <li>
            <Link
              className="transition-transform duration-100 active:scale-[0.98] group/button user-select-none pointer-events-auto flex cursor-pointer items-center justify-center gap-3 font-bold whitespace-nowrap ring-2 outline-none ring-inset hover:no-underline hover:shadow-xl hover:shadow-black/20 hover:ring-brand-primary focus:bg-brand-primary/20 focus:text-brand-primary focus:ring-brand-primary focus:hover:bg-brand-primary/20 bg-transparent ring-transparent text-foreground hover:bg-foreground/10 hover:text-foreground px-4 min-h-10"
              href="https://x.com/YarnGPT_ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-4 fill-current"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 7.693 6.064-7.693Zm-1.29 19.494h2.038L6.486 3.24H4.298l13.312 17.407Z"/></svg>
              @YarnGPT
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Developer Attribution */}
      <div className="mt-8 pt-4 border-t border-border/50 w-full text-center text-sm text-muted-foreground font-jetbrains">
        <p>
          Website Developed by{" "}
          <a
            href="https://abayomiolagunju.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary hover:underline"
          >
            Jerry
          </a>
        </p>
      </div>
    </footer>
  )
}
