"use client"

import React from "react"
import Hero from "../components/Hero"
import TextToSpeechConverter from "@/components/TextToSpeechConverter"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Hero />
      <div className="py-8">
        <TextToSpeechConverter />
      </div>
    </div>
  )
}
