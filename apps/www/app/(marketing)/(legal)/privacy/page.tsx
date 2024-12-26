const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto my-20 max-w-2xl space-y-5 px-4">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <span className="relative my-5 rounded-full border border-gray-300 bg-blue-100 px-4 py-1 text-sm font-medium text-blue-900 shadow transition-transform hover:translate-y-[-2px] hover:shadow-md">
        Last updated: December 26, 2024
      </span>
      <div className="space-y-12">
        <section>
          <h2 className="mb-4 text-2xl font-medium">1. Introduction</h2>
          <p className="text-gray-600">
            At Echo (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;),
            we take your privacy seriously. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our real-time chat service and associated websites (collectively,
            the &ldquo;Service&rdquo;).
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">
            2. Information We Collect
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-medium">
                2.1 Personal Information
              </h3>
              <p className="mb-2 text-gray-600">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-gray-600">
                <li>Account information (name, email, password)</li>
                <li>Profile information (display picture, bio, preferences)</li>
                <li>Communication data (messages, attachments)</li>
                <li>Usage information (login times, features used)</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">
                2.2 Automatically Collected Information
              </h3>
              <p className="mb-2 text-gray-600">
                When you access our Service, we automatically collect:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-gray-600">
                <li>
                  Device information (IP address, browser type, operating
                  system)
                </li>
                <li>Usage data (interaction with features, time spent)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">
            3. How We Use Your Information
          </h2>
          <p className="mb-2 text-gray-600">
            We use the collected information for the following purposes:
          </p>
          <ul className="ml-4 list-disc space-y-1 text-gray-600">
            <li>Provide, maintain, and improve our Service</li>
            <li>Process and complete transactions</li>
            <li>Send administrative information and updates</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Protect against unauthorized access and abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">4. Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access or
            disclosure. These measures include encryption, secure socket layer
            technology (SSL), and regular security assessments.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">5. Your Rights</h2>
          <p className="mb-2 text-gray-600">You have the right to:</p>
          <ul className="ml-4 list-disc space-y-1 text-gray-600">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your information</li>
            <li>Export your data in a portable format</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">
            6. Updates to This Policy
          </h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &ldquo;Last updated&rdquo; date.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">7. Contact Us</h2>
          <p className="mb-4 text-gray-600">
            If you have any questions about this Privacy Policy or our
            practices, please contact us at:
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

export default PrivacyPolicy
