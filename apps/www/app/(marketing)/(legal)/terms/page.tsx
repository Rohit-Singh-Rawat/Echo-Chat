const TermsOfService = () => {
  return (
    <div className="container mx-auto my-20 max-w-2xl space-y-5 px-4">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">
        Terms of Service
      </h1>

      <span className="relative my-5 rounded-full border border-gray-300 bg-blue-100 px-4 py-1 text-sm font-medium text-blue-900 shadow transition-transform hover:translate-y-[-2px] hover:shadow-md">
        Last updated: December 26, 2024
      </span>

      <div className="space-y-12">
        <section>
          <h2 className="mb-4 text-2xl font-medium">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing or using Echo (&ldquo;Service&rdquo;), you agree to be
            bound by these Terms of Service. If you do not agree to these terms,
            please do not use our Service.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">
            2. Description of Service
          </h2>
          <p className="text-gray-600">
            Echo provides a real-time chat service and associated features. We
            reserve the right to modify, suspend, or discontinue any part of the
            Service at any time.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">
            3. User Responsibilities
          </h2>
          <p className="mb-2 text-gray-600">You agree to:</p>
          <ul className="ml-4 list-disc space-y-1 text-gray-600">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Not use the Service for any illegal purposes</li>
            <li>Not interfere with the Service&apos;s operation</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">
            4. Intellectual Property
          </h2>
          <p className="text-gray-600">
            All content and materials available through the Service are
            protected by intellectual property rights. You may not copy, modify,
            distribute, or create derivative works without our express
            permission.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">5. Privacy</h2>
          <p className="text-gray-600">
            Your use of the Service is also governed by our Privacy Policy.
            Please review our Privacy Policy to understand our practices.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-600">
            The Service is provided &ldquo;as is&rdquo; without warranties of
            any kind. We shall not be liable for any indirect, incidental,
            special, or consequential damages.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">7. Contact Us</h2>
          <p className="mb-4 text-gray-600">
            If you have any questions about these Terms of Service, please
            contact us at:
          </p>
          <a
            href="mailto:echochat.com@gmail.com"
            className="ml-5 inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  )
}

export default TermsOfService
