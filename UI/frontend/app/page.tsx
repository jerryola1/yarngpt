"use client"

import React from "react"
import Hero from "../components/Hero"
import TextToSpeechConverter from "@/components/TextToSpeechConverter"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-950 dark:to-gray-900 w-full px-2 sm:px-4">
      <Hero />
      <section className="max-w-3xl w-full mx-auto my-4 sm:my-8 p-4 sm:p-6 bg-white dark:bg-green-900 border-2 border-green-600 dark:border-white rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-green-700 dark:text-white">Welcome to YarnGPT – Nigerian Text-to-Speech AI</h2>
        <p className="mb-2 sm:mb-3 text-green-800 dark:text-green-100 text-base sm:text-lg">
          YarnGPT is an advanced text-to-speech platform designed for everyone who wants to bring Nigerian languages to life with natural, AI-powered voices. Whether you are a student, educator, content creator, or business, YarnGPT helps you easily convert written text into expressive speech in English, Yoruba, Igbo, and Hausa.
        </p>
        <ul className="list-disc pl-5 sm:pl-6 mb-2 sm:mb-3 text-green-800 dark:text-green-100 text-sm sm:text-base">
          <li>Choose from a variety of authentic Nigerian voices, both male and female.</li>
          <li>Support for multiple languages: English, Yoruba, Igbo, and Hausa.</li>
          <li>Perfect for learning, accessibility, entertainment, and content creation.</li>
          <li>Fast, reliable, and easy to use – no technical skills required.</li>
        </ul>
        <p className="text-green-800 dark:text-green-100 text-sm sm:text-base">
          Experience the richness of Nigerian languages and accents. Start converting your text to speech today and make your words heard!
        </p>
      </section>
      <section className="max-w-3xl w-full mx-auto my-4 sm:my-8 p-4 sm:p-6 bg-green-50 dark:bg-gray-900 border-2 border-green-600 dark:border-white rounded-lg shadow-sm overflow-x-auto">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-green-700 dark:text-white">How It Works</h3>
        <ol className="list-decimal pl-5 sm:pl-6 space-y-1 sm:space-y-2 text-green-800 dark:text-green-100 text-sm sm:text-base">
          <li>Enter your text in the box below (up to 60 words).</li>
          <li>Select your preferred language and voice.</li>
          <li>Adjust the talking speed and filename if needed.</li>
          <li>Click "Convert to Speech" to generate your audio.</li>
          <li>Listen to or download your generated audio instantly.</li>
        </ol>
        <p className="mt-3 sm:mt-4 text-green-700 dark:text-green-200 text-xs sm:text-sm">It's that easy! No sign-up required. Enjoy natural Nigerian voices for your projects, learning, or fun.</p>
      </section>
      <div className="py-6 sm:py-8">
        <TextToSpeechConverter />
      </div>
      <section className="max-w-3xl w-full mx-auto my-4 sm:my-8 p-4 sm:p-6 bg-green-50 dark:bg-gray-900 border-2 border-green-600 dark:border-white rounded-lg shadow-sm overflow-x-auto">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-green-700 dark:text-white">Who Is YarnGPT For?</h3>
        <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2 text-green-800 dark:text-green-100 text-sm sm:text-base">
          <li><span className="font-medium">Students &amp; Educators:</span> Make learning and teaching Nigerian languages more engaging and accessible.</li>
          <li><span className="font-medium">Content Creators:</span> Add authentic Nigerian voices to your videos, podcasts, and creative projects.</li>
          <li><span className="font-medium">Businesses:</span> Localize your customer support, marketing, and training materials with natural speech.</li>
          <li><span className="font-medium">Accessibility Advocates:</span> Empower visually impaired users and promote digital inclusion.</li>
          <li><span className="font-medium">Anyone:</span> Have fun, experiment, and explore the beauty of Nigerian languages and accents!</li>
        </ul>
      </section>
      <section className="max-w-3xl w-full mx-auto my-4 sm:my-8 p-4 sm:p-6 bg-white dark:bg-green-900 border-2 border-green-600 dark:border-white rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-green-700 dark:text-white">What Our Users Say</h3>
        <div className="space-y-3 sm:space-y-4">
          <blockquote className="border-l-4 border-green-600 pl-3 sm:pl-4 italic text-green-900 dark:text-green-100 text-sm sm:text-base">
            “YarnGPT made my Yoruba lessons so much more interactive. My students love hearing real voices!”
            <span className="block mt-2 font-medium text-green-700 dark:text-green-300">— Mrs. Adeola, Language Teacher</span>
          </blockquote>
          <blockquote className="border-l-4 border-green-600 pl-3 sm:pl-4 italic text-green-900 dark:text-green-100 text-sm sm:text-base">
            “I use YarnGPT to add authentic Nigerian accents to my YouTube videos. It's a game changer!”
            <span className="block mt-2 font-medium text-green-700 dark:text-green-300">— Chinedu, Content Creator</span>
          </blockquote>
          <blockquote className="border-l-4 border-green-600 pl-3 sm:pl-4 italic text-green-900 dark:text-green-100 text-sm sm:text-base">
            “Finally, a tool that helps my visually impaired clients access information in their own language.”
            <span className="block mt-2 font-medium text-green-700 dark:text-green-300">— Tunde, Accessibility Advocate</span>
          </blockquote>
        </div>
      </section>
      <section className="max-w-3xl w-full mx-auto my-4 sm:my-8 p-4 sm:p-6 bg-white dark:bg-green-900 border-2 border-green-600 dark:border-white rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-green-700 dark:text-white">About YarnGPT</h3>
        <p className="mb-2 sm:mb-3 text-green-800 dark:text-green-100 text-sm sm:text-base">
          YarnGPT was created to make Nigerian languages and voices accessible to everyone, everywhere. Our mission is to bridge the gap in digital voice technology for African languages, empowering users to create, learn, and communicate in their native tongues.
        </p>
        <p className="mb-2 sm:mb-3 text-green-800 dark:text-green-100 text-sm sm:text-base">
          Built with advanced AI and a passion for linguistic diversity, YarnGPT offers a unique platform for students, educators, businesses, and creators. We are committed to continuous improvement and welcome your feedback to make YarnGPT even better.
        </p>
        <p className="text-green-800 dark:text-green-100 text-sm sm:text-base">
          Thank you for supporting the growth of African language technology!
        </p>
      </section>
    </div>
  )
}
