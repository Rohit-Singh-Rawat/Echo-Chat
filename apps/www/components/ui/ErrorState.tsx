'use client'

import { GridPattern } from '@echo/ui/components/ui/GridPattern.tsx'
import { cn } from '@echo/utils/src'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface ErrorStateProps {
  title?: string
  message?: string
  details?: string
  fullScreen?: boolean
}

export const ErrorState = ({
  title = 'Connection Error',
  message = 'Unable to connect to the chat room. Please try again later.',
  details,
  fullScreen = false,
}: ErrorStateProps) => {
  const randomSquares = useMemo(
    () =>
      Array.from(
        { length: Math.floor(Math.random() * 11) + 10 },
        () =>
          [
            Math.floor(Math.random() * 11) + 30,
            Math.floor(Math.random() * 20) + 0,
          ] as [number, number]
      ),
    []
  )

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center bg-gradient-to-b from-white to-neutral-50',
        fullScreen && 'h-screen'
      )}
    >
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 size-full opacity-70 [mask-image:linear-gradient(to_top_left,white,transparent_70%)]"
        strokeDasharray="4 4"
        squares={randomSquares}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6 rounded-2xl border border-neutral-200/50 bg-white/90 p-12 shadow-xl backdrop-blur-md"
      >
        <div className="rounded-full bg-red-100/80 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-8 text-red-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl font-semibold text-neutral-800">{title}</h2>
          <p className="max-w-md text-neutral-600">{message}</p>
          {details && (
            <p className="mt-1 max-w-md text-sm text-neutral-500">{details}</p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
