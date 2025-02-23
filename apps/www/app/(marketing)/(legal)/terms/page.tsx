import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read our Terms of Service to understand the rules and regulations governing the use of our service.',
  keywords: ['terms of service', 'user agreement', 'echo', 'chat'],
}

const TermsOfService = () => {
  return (
    <div className="container mx-auto my-16 max-w-2xl space-y-4 px-4 sm:my-20 sm:space-y-5 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-2xl font-bold tracking-tight sm:mb-8 sm:text-3xl lg:text-4xl">
        Terms of Service
      </h1>

      <span className="relative my-3 inline-block rounded-full border border-gray-300 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-900 shadow transition-transform hover:translate-y-[-2px] hover:shadow-md sm:my-5 sm:px-4 sm:text-sm">
        Last updated: December 26, 2024
      </span>

      <div className="space-y-8 sm:space-y-12">
        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            1. Acceptance of Terms
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            By accessing or using Echo (&ldquo;Service&rdquo;), you agree to be
            bound by these Terms of Service. If you do not agree to these terms,
            please do not use our Service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            2. Description of Service
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            Echo provides a real-time chat service and associated features. We
            reserve the right to modify, suspend, or discontinue any part of the
            Service at any time.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            3. User Responsibilities
          </h2>
          <p className="mb-2 text-sm text-gray-600 sm:text-base">
            You agree to:
          </p>
          <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600 sm:text-base">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Not use the Service for any illegal purposes</li>
            <li>Not interfere with the Service&apos;s operation</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            4. Intellectual Property
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            All content and materials available through the Service are
            protected by intellectual property rights. You may not copy, modify,
            distribute, or create derivative works without our express
            permission.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            5. Privacy
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            Your use of the Service is also governed by our Privacy Policy.
            Please review our Privacy Policy to understand our practices.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            6. Limitation of Liability
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            The Service is provided &ldquo;as is&rdquo; without warranties of
            any kind. We shall not be liable for any indirect, incidental,
            special, or consequential damages.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            7. Contact Us
          </h2>
          <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
            If you have any questions about these Terms of Service, please
            contact us at:
          </p>
          <a
            href="mailto:echochat.com@gmail.com"
            className="ml-0 inline-flex items-center rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:ml-5 sm:px-4 sm:py-2 sm:text-sm"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  )
}

export default TermsOfService
