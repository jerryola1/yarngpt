"use client"

import React from "react"
import Hero from "../components/Hero"
import TextToSpeechConverter from "@/components/TextToSpeechConverter"

export default function Home() {
  return (
    <div className="w-full px-2 sm:px-4">
      <Hero />
      <div className="py-8">
        <TextToSpeechConverter />
      </div>
    </div>
  )
}
