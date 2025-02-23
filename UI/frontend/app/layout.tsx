import type React from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { GoogleAnalytics } from '@next/third-parties/google'
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
  description: "Convert text to speech in Nigerian languages with AI-powered voices!",
  metadataBase: new URL('https://yarngpt.co'),
  icons: {
    icon: [
      { url: '/fav.png' },
      { url: '/fav.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/fav.png' },
      { url: '/fav.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  openGraph: {
    title: "YarnGPT - Nigerian Text-to-Speech AI",
    description: "Convert text to speech in Nigerian languages with AI-powered voices!",
    url: 'https://yarngpt.co',
    siteName: 'YarnGPT',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/fav.png" />
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" 
        />
      </head>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <GoogleAnalytics gaId="G-CDCL3DD9DV" />
      </body>
    </html>
  )
}



import './globals.css'