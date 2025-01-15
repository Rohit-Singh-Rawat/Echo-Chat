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
        'relative flex min-h-[100dvh] w-full flex-col items-center justify-center gap-8 bg-gradient-to-b from-white to-neutral-50 px-4 py-8 sm:gap-12 md:gap-16 lg:gap-20',
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
        className="flex w-full flex-col items-center gap-4 px-4 sm:gap-6 md:gap-8"
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
          className="size-48 sm:size-64 md:size-72 lg:size-80"
        />
        <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="max-w-[280px] text-base text-neutral-600 sm:max-w-sm sm:text-lg md:max-w-md">
            {message}
          </p>
          {details && (
            <p className="mt-1 max-w-[280px] rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-neutral-500 shadow-sm sm:mt-2 sm:max-w-sm sm:px-4 sm:py-3 sm:text-sm md:max-w-md">
              {details}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
