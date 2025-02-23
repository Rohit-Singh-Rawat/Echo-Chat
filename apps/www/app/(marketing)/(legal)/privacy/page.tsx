import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read our Privacy Policy to understand how we collect, use, and protect your information.',
  keywords: ['privacy policy', 'data protection', 'user privacy', 'echo'],
}

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto my-16 max-w-2xl space-y-4 px-4 sm:my-20 sm:space-y-5 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-2xl font-bold tracking-tight sm:mb-8 sm:text-3xl lg:text-4xl">
        Privacy Policy
      </h1>
      <span className="relative my-3 inline-block rounded-full border border-gray-300 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-900 shadow transition-transform hover:translate-y-[-2px] hover:shadow-md sm:my-5 sm:px-4 sm:text-sm">
        Last updated: December 26, 2024
      </span>
      <div className="space-y-8 sm:space-y-12">
        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            1. Introduction
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            At Echo (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;),
            we take your privacy seriously. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our real-time chat service and associated websites (collectively,
            the &ldquo;Service&rdquo;).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            2. Information We Collect
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="mb-2 text-base font-medium sm:mb-3 sm:text-lg">
                2.1 Personal Information
              </h3>
              <p className="mb-2 text-sm text-gray-600 sm:text-base">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600 sm:text-base">
                <li>Account information (name, email, password)</li>
                <li>Profile information (display picture, bio, preferences)</li>
                <li>Communication data (messages, attachments)</li>
                <li>Usage information (login times, features used)</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-base font-medium sm:mb-3 sm:text-lg">
                2.2 Automatically Collected Information
              </h3>
              <p className="mb-2 text-sm text-gray-600 sm:text-base">
                When you access our Service, we automatically collect:
              </p>
              <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600 sm:text-base">
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
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            3. How We Use Your Information
          </h2>
          <p className="mb-2 text-sm text-gray-600 sm:text-base">
            We use the collected information for the following purposes:
          </p>
          <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600 sm:text-base">
            <li>Provide, maintain, and improve our Service</li>
            <li>Process and complete transactions</li>
            <li>Send administrative information and updates</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Protect against unauthorized access and abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            4. Data Security
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access or
            disclosure. These measures include encryption, secure socket layer
            technology (SSL), and regular security assessments.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            5. Your Rights
          </h2>
          <p className="mb-2 text-sm text-gray-600 sm:text-base">
            You have the right to:
          </p>
          <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600 sm:text-base">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your information</li>
            <li>Export your data in a portable format</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            6. Updates to This Policy
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &ldquo;Last updated&rdquo; date.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            7. Contact Us
          </h2>
          <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
            If you have any questions about this Privacy Policy or our
            practices, please contact us at:
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

export default PrivacyPolicy
