/* eslint-disable import/no-unresolved */
import './globals.css'
import '@echo/ui/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import { ReactQueryProvider } from '@/providers/ReactQueryProvider'

export const metadata: Metadata = {
  title: {
    default: 'Echo - Real-time Chat',
    template: '%s | Echo',
  },
  description:
    'Create instant chat rooms for quick collaboration and easy sharing. No signup needed - just seamless communication on demand.',
  keywords: ['chat', 'real-time', 'communication', 'echo', 'chat rooms'],
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
    description:
      'Create instant chat rooms for quick collaboration and easy sharing. No signup needed - just seamless communication on demand.',
    siteName: 'Echo',
    images: [
      {
        url: '/images/echo.png',
        width: 800,
        height: 600,
        alt: 'Echo Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echo - Real-time Chat',
    description:
      'Create instant chat rooms for quick collaboration and easy sharing. No signup needed - just seamless communication on demand.',
    creator: '@Spacing_Whale',
    images: ['/images/echo.png'],
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
        <link rel="image/png" href="/images/echo.png" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistSans.className} antialiased`}
      >
        <main>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </main>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
