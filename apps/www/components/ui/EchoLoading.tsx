'use client'

import { cn } from '@echo/utils/src'
import { motion } from 'framer-motion'

interface EchoLoadingProps {
  className?: string
  duration?: number
}

const EchoLoading = ({ className, duration = 2 }: EchoLoadingProps) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <path d="M2 10v3" />
        <motion.path
          variants={{
            normal: { d: 'M6 6v11' },
            animate: {
              d: ['M6 6v11', 'M6 10v3', 'M6 6v11'],
              transition: {
                duration: duration * 0.75,
                repeat: Infinity,
              },
            },
          }}
          d="M6 6v11"
          animate="animate"
        />
        <motion.path
          variants={{
            normal: { d: 'M10 3v18' },
            animate: {
              d: ['M10 3v18', 'M10 9v5', 'M10 3v18'],
              transition: {
                duration: duration * 0.5,
                repeat: Infinity,
              },
            },
          }}
          d="M10 3v18"
          animate="animate"
        />
        <motion.path
          variants={{
            normal: { d: 'M14 8v7' },
            animate: {
              d: ['M14 8v7', 'M14 6v11', 'M14 8v7'],
              transition: {
                duration: duration * 0.4,
                repeat: Infinity,
              },
            },
          }}
          d="M14 8v7"
          animate="animate"
        />
        <motion.path
          variants={{
            normal: { d: 'M18 5v13' },
            animate: {
              d: ['M18 5v13', 'M18 7v9', 'M18 5v13'],
              transition: {
                duration: duration * 0.75,
                repeat: Infinity,
              },
            },
          }}
          d="M18 5v13"
          animate="animate"
        />
        <path d="M22 10v3" />
      </motion.svg>
    </div>
  )
}

export { EchoLoading }
