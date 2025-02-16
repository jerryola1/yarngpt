import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { MobileMenu } from "./MobileMenu"
import { Mic2 } from "lucide-react"

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <Mic2 className="mr-2" />
          YarnGPT
        </Link>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Button variant="secondary" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
          </nav>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

