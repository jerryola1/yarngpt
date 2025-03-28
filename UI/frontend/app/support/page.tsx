import React from 'react';

export default function Support() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Support</h1>
      <div className="prose prose-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p>
            We're here to help you with any questions or issues you may have with YarnGPT. 
            Our support team is available to assist you through various channels.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="mb-4">
              For any inquiries or support requests, please reach out to us at:
            </p>
            <p className="font-medium">
              Email: support@yarngpt.co
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Support Us</h2>
          <p className="mb-4">
            If you find YarnGPT helpful and would like to support our development, 
            you can buy us a coffee:
          </p>
          <a 
            href="https://buymeacoffee.com/yarngpt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Buy Me a Coffee
          </a>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
          <ul className="list-disc pl-6">
            <li>
              <a href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="https://yarngpt.co" className="text-blue-600 hover:underline">
                Visit our Website
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
} 