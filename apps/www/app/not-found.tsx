'use client'

import { GridPattern } from '@echo/ui/components/ui/GridPattern.tsx'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-neutral-50">
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 size-full opacity-70 [mask-image:linear-gradient(to_top_left,white,transparent_70%)]"
        strokeDasharray="4 4"
        squares={[
          [32, 2],
          [34, 3],
          [35, 5],
          [33, 7],
          [35, 9],
          [37, 8],
          [39, 6],
          [38, 4],
        ]}
      />

      <div className="container relative flex w-full items-center justify-between px-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start gap-6 text-left"
        >
          <h1 className="text-6xl font-bold text-neutral-800">404</h1>
          <h2 className="text-2xl font-medium text-neutral-600">
            Page Not Found
          </h2>
          <p className="max-w-md text-neutral-500">
            Looks like our dragon couldn&apos;t find the page you&apos;re
            looking for. It might have been removed, had its name changed, or is
            temporarily unavailable.
          </p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 rounded-lg bg-neutral-800 px-6 py-2 text-white transition-colors hover:bg-neutral-700"
          >
            Return Home
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative"
        >
          <Image
            src="/images/dragon.svg"
            alt="404 icon"
            width={400}
            height={400}
            className="fill-neutral-800"
          />
        </motion.div>
      </div>
    </div>
  )
}
