import React from "react"

export default function HowToPage() {
  return (
    <div className="w-full px-2 sm:px-4 py-8 space-y-8">
      <section className="max-w-3xl w-full mx-auto p-6 bg-card border border-border rounded-lg shadow-md overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Welcome to YarnGPT – Nigerian Text-to-Speech AI</h2>
        <p className="mb-3 text-muted-foreground text-lg">
          YarnGPT is an advanced text-to-speech platform designed for everyone who wants to bring Nigerian languages to life with natural, AI-powered voices. Whether you are a student, educator, content creator, or business, YarnGPT helps you easily convert written text into expressive speech in English, Yoruba, Igbo, and Hausa.
        </p>
        <ul className="list-disc pl-6 mb-3 text-muted-foreground">
          <li>Choose from a variety of authentic Nigerian voices, both male and female.</li>
          <li>Support for multiple languages: English, Yoruba, Igbo, and Hausa.</li>
          <li>Perfect for learning, accessibility, entertainment, and content creation.</li>
          <li>Fast, reliable, and easy to use – no technical skills required.</li>
        </ul>
        <p className="text-muted-foreground">
          Experience the richness of Nigerian languages and accents. Start converting your text to speech today and make your words heard!
        </p>
      </section>

      <section className="max-w-3xl w-full mx-auto p-6 bg-card/50 border border-border rounded-lg shadow-sm overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-foreground">How It Works</h3>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
          <li>Enter your text in the box below (up to 60 words).</li>
          <li>Select your preferred language and voice.</li>
          <li>Adjust the talking speed and filename if needed.</li>
          <li>Click "Convert to Speech" to generate your audio.</li>
          <li>Listen to or download your generated audio instantly.</li>
        </ol>
        <p className="mt-4 text-muted-foreground text-sm">It's that easy! No sign-up required. Enjoy natural Nigerian voices for your projects, learning, or fun.</p>
      </section>

      <section className="max-w-3xl w-full mx-auto p-6 bg-card/50 border border-border rounded-lg shadow-sm overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-foreground">Who Is YarnGPT For?</h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><span className="font-medium text-foreground">Students &amp; Educators:</span> Make learning and teaching Nigerian languages more engaging and accessible.</li>
          <li><span className="font-medium text-foreground">Content Creators:</span> Add authentic Nigerian voices to your videos, podcasts, and creative projects.</li>
          <li><span className="font-medium text-foreground">Businesses:</span> Localize your customer support, marketing, and training materials with natural speech.</li>
          <li><span className="font-medium text-foreground">Accessibility Advocates:</span> Empower visually impaired users and promote digital inclusion.</li>
          <li><span className="font-medium text-foreground">Anyone:</span> Have fun, experiment, and explore the beauty of Nigerian languages and accents!</li>
        </ul>
      </section>

      <section className="max-w-3xl w-full mx-auto p-6 bg-card border border-border rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-foreground">What Our Users Say</h3>
        <div className="space-y-4">
          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
            “YarnGPT made my Yoruba lessons so much more interactive. My students love hearing real voices!”
            <span className="block mt-2 font-medium text-foreground">— Mrs. Adeola, Language Teacher</span>
          </blockquote>
          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
            “I use YarnGPT to add authentic Nigerian accents to my YouTube videos. It's a game changer!”
            <span className="block mt-2 font-medium text-foreground">— Chinedu, Content Creator</span>
          </blockquote>
          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
            “Finally, a tool that helps my visually impaired clients access information in their own language.”
            <span className="block mt-2 font-medium text-foreground">— Tunde, Accessibility Advocate</span>
          </blockquote>
        </div>
      </section>

      <section className="max-w-3xl w-full mx-auto p-6 bg-card border border-border rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-foreground">About YarnGPT</h3>
        <p className="mb-3 text-muted-foreground">
          YarnGPT was created to make Nigerian languages and voices accessible to everyone, everywhere. Our mission is to bridge the gap in digital voice technology for African languages, empowering users to create, learn, and communicate in their native tongues.
        </p>
        <p className="mb-3 text-muted-foreground">
          Built with advanced AI and a passion for linguistic diversity, YarnGPT offers a unique platform for students, educators, businesses, and creators. We are committed to continuous improvement and welcome your feedback to make YarnGPT even better.
        </p>
        <p className="text-muted-foreground">
          Thank you for supporting the growth of African language technology!
        </p>
      </section>
    </div>
  )
}