const CookiePolicy = () => {
  return (
    <div className="container mx-auto my-20 max-w-2xl space-y-5 px-4">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Cookie Policy</h1>
      <span className="relative my-5 rounded-full border border-gray-300 bg-blue-100 px-4 py-1 text-sm font-medium text-blue-900 shadow transition-transform hover:translate-y-[-2px] hover:shadow-md">
        Last updated: December 26, 2024
      </span>

      <div className="space-y-12">
        <section>
          <h2 className="mb-4 text-2xl font-medium">1. What Are Cookies</h2>
          <p className="text-gray-600">
            Cookies are small text files that are placed on your device when you
            visit our website. They help us provide you with a better experience
            by remembering your preferences and understanding how you use our
            Service.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">2. How We Use Cookies</h2>
          <p className="mb-2 text-gray-600">
            We use cookies for the following purposes:
          </p>
          <ul className="ml-4 list-disc space-y-1 text-gray-600">
            <li>Essential cookies for site functionality</li>
            <li>Analytics cookies to understand usage patterns</li>
            <li>Preference cookies to remember your settings</li>
            <li>Authentication cookies to keep you signed in</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">3. Managing Cookies</h2>
          <p className="text-gray-600">
            Most web browsers allow you to control cookies through their
            settings. You can choose to block or delete cookies, though this may
            impact your experience using our Service. Please refer to your
            browser&apos;s help documentation for more information on managing
            cookies.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium">4. Contact Us</h2>
          <p className="mb-4 text-gray-600">
            If you have any questions about our Cookie Policy, please contact us
            at:
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

export default CookiePolicy
