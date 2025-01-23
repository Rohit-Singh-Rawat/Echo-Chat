'use client'

import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'

import Echo from '../Echo'

const EchoLogo = () => {
  const controls = useAnimation()
  return (
    <Link
      href={'/'}
      className="z-[60] flex items-center gap-2"
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
      aria-label="Echo Home"
    >
      <Echo className="h-5 w-16" aria-hidden="true" />{' '}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          role="presentation"
        >
          <path d="M2 10v3" />
          <motion.path
            variants={{
              normal: { d: 'M6 6v11' },
              animate: {
                d: ['M6 6v11', 'M6 10v3', 'M6 6v11'],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                },
              },
            }}
            d="M6 6v11"
            animate={controls}
          />
          <motion.path
            variants={{
              normal: { d: 'M10 3v18' },
              animate: {
                d: ['M10 3v18', 'M10 9v5', 'M10 3v18'],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                },
              },
            }}
            d="M10 3v18"
            animate={controls}
          />
          <motion.path
            variants={{
              normal: { d: 'M14 8v7' },
              animate: {
                d: ['M14 8v7', 'M14 6v11', 'M14 8v7'],
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                },
              },
            }}
            d="M14 8v7"
            animate={controls}
          />
          <motion.path
            variants={{
              normal: { d: 'M18 5v13' },
              animate: {
                d: ['M18 5v13', 'M18 7v9', 'M18 5v13'],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                },
              },
            }}
            d="M18 5v13"
            animate={controls}
          />
          <path d="M22 10v3" />
        </svg>
      </div>
    </Link>
  )
}
export default EchoLogo
