import type React from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css"
import type { Metadata } from "next"
import { Poppins, JetBrains_Mono } from "next/font/google"

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
        <html lang="en" suppressHydrationWarning className="dark" style={{ colorScheme: 'dark' }}>
          <head>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7495909984574657"
     crossorigin="anonymous"></script>
            <link rel="icon" href="/fav.png" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
            />
          </head>
          <body className={`${poppins.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            <GoogleAnalytics gaId="G-CDCL3DD9DV" />
          </body>
        </html>  )
}
