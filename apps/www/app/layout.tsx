import './globals.css'
import '@echo/ui/globals.css'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: {
    default: 'Echo - Real-time Chat',
    template: '%s | Echo',
  },
  description: 'Real-time chat powered by Echo',
  keywords: ['chat', 'real-time', 'communication', 'echo'],
  authors: [
    {
      name: 'Rohit Singh Rawat',
    },
  ],
  creator: 'Echo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://echo-chat.com',
    title: 'Echo - Real-time Chat',
    description: 'Real-time chat powered by Echo',
    siteName: 'Echo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echo - Real-time Chat',
    description: 'Real-time chat powered by Echo',
    creator: '@echo',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistSans.className} antialiased`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
