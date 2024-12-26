'use client'

import GridPattern from '@echo/ui/components/ui/GridPattern.tsx'
import { cn } from '@echo/utils/src'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo } from 'react'

import EchoLogo from '../icons/animated/EchoLogo'

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
        'relative flex flex-col items-center justify-center gap-20 bg-gradient-to-b from-white to-neutral-50',
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
      <EchoLogo />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-col items-center gap-2 p-12"
      >
        <Image
          src={
            details === 'Server connection closed. Please try again later.'
              ? '/images/server_down.svg'
              : '/images/error.svg'
          }
          alt="Error illustration"
          width={192}
          height={192}
          className="size-80"
        />
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
            {title}
          </h2>
          <p className="max-w-md text-lg text-neutral-600">{message}</p>
          {details && (
            <p className="mt-2 max-w-md rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-neutral-500 shadow-sm">
              {details}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
