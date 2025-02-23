import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Learn about how Echo uses cookies to improve your experience and provide essential functionality.',
  keywords: ['cookie policy', 'cookies', 'privacy', 'data', 'echo'],
}

const CookiePolicy = () => {
  return (
    <div className="container mx-auto my-16 max-w-2xl space-y-4 px-4 sm:my-20 sm:space-y-5 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-2xl font-bold tracking-tight sm:mb-8 sm:text-3xl lg:text-4xl">
        Cookie Policy
      </h1>
      <span className="relative my-3 inline-block rounded-full border border-gray-300 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-900 shadow transition-transform hover:translate-y-[-2px] hover:shadow-md sm:my-5 sm:px-4 sm:text-sm">
        Last updated: December 26, 2024
      </span>

      <div className="space-y-8 sm:space-y-12">
        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            1. What Are Cookies
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            Cookies are small text files that are placed on your device when you
            visit our website. They help us provide you with a better experience
            by remembering your preferences and understanding how you use our
            Service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            2. How We Use Cookies
          </h2>
          <p className="mb-2 text-sm text-gray-600 sm:text-base">
            We use cookies for the following purposes:
          </p>
          <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600 sm:text-base">
            <li>Essential cookies for site functionality</li>
            <li>Analytics cookies to understand usage patterns</li>
            <li>Preference cookies to remember your settings</li>
            <li>Authentication cookies to keep you signed in</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            3. Managing Cookies
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            Most web browsers allow you to control cookies through their
            settings. You can choose to block or delete cookies, though this may
            impact your experience using our Service. Please refer to your
            browser&apos;s help documentation for more information on managing
            cookies.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-medium sm:mb-4 sm:text-2xl">
            4. Contact Us
          </h2>
          <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
            If you have any questions about our Cookie Policy, please contact us
            at:
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

export default CookiePolicy
