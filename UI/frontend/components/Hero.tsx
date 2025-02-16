import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-700 dark:to-blue-700 text-white py-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to YarnGPT</h1>
        <p className="text-xl md:text-2xl mb-8">Convert text to speech in Nigerian languages with AI-powered voices!</p>
        <Button asChild size="lg">
          <Link href="#convert">Get Started</Link>
        </Button>
      </div>
      <div className="absolute inset-0 z-0">
        <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="rgba(255,255,255,0.3)"
            fillOpacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg
          className="absolute bottom-0 opacity-50 animate-wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="rgba(255,255,255,0.3)"
            fillOpacity="1"
            d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,197.3C672,171,768,149,864,165.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}

