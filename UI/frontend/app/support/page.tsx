import React from 'react';
import { X } from 'lucide-react'; // Import X icon

export default function Support() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 font-jetbrains text-foreground">Support</h1>
      <div className="prose prose-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 font-jetbrains text-foreground">Need Help?</h2>
          <p className="text-muted-foreground">
            We're here to help you with any questions or issues you may have with YarnGPT. 
            Our support team is available to assist you through various channels.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 font-jetbrains text-foreground">Connect With Us</h2>
          <p className="mb-4 text-muted-foreground">
            For quick questions or to stay updated, reach out to us on X (formerly Twitter).
          </p>
          <a
            href="https://x.com/YarnGPT_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-100 active:scale-[0.98] group/button user-select-none pointer-events-auto flex cursor-pointer items-center justify-center gap-3 font-bold whitespace-nowrap ring-2 outline-none ring-inset hover:no-underline hover:shadow-xl hover:shadow-black/20 hover:ring-brand-primary focus:bg-brand-primary/20 focus:text-brand-primary focus:ring-brand-primary focus:hover:bg-brand-primary/20 bg-transparent ring-transparent text-foreground hover:bg-foreground/10 hover:text-foreground px-4 min-h-10 rounded-none"
          >
            <X className="size-4" />
            Message us on X
          </a>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 font-jetbrains text-foreground">Support Us</h2>
          <p className="mb-4 text-muted-foreground">
            If you find YarnGPT helpful and would like to support our development, 
            you can buy us a coffee:
          </p>
          <a 
            href="https://buymeacoffee.com/yarngpt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors rounded-none font-jetbrains"
          >
            Buy Me a Coffee
          </a>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 font-jetbrains text-foreground">Additional Resources</h2>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>
              <a href="/privacy-policy" className="text-brand-primary hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-brand-primary hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="https://yarngpt.co" className="text-brand-primary hover:underline">
                Visit our Website
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}