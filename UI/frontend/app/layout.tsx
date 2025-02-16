import type React from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "YarnGPT - Nigerian Text-to-Speech AI",
  description: "Convert text to speech in Nigerian languages with AI-powered voices",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'