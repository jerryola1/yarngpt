import React from 'react';

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-lg">
        <p className="mb-4">Last updated: March 28, 2024</p>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using YarnGPT, you agree to be bound by these Terms of Service. If you do not 
            agree with any part of these terms, please do not use our service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the application for personal, 
            non-commercial transitory viewing only. This license shall automatically terminate if you violate 
            any of these restrictions and may be terminated by YarnGPT at any time.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p>
            As a user of YarnGPT, you agree to:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Use the service in compliance with applicable laws</li>
            <li>Not engage in any harmful or malicious activities</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Service Modifications</h2>
          <p>
            We reserve the right to modify or discontinue, temporarily or permanently, the service with or 
            without notice. We shall not be liable to you or any third party for any modification, 
            suspension, or discontinuance of the service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Contact Information</h2>
          <p>
            For any questions regarding these Terms of Service, please contact us at:
          </p>
          <p className="mt-2">
            Email: support@yarngpt.co
          </p>
        </section>
      </div>
    </div>
  );
} 