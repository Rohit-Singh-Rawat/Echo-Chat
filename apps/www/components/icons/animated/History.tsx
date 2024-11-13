'use client'

import type { Transition, Variants } from 'framer-motion'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

const handTransition: Transition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
}

const handVariants: Variants = {
  normal: {
    rotate: 0,
    originX: '50%',
    originY: '50%',
  },
  animate: {
    rotate: 360,
  },
}

const minuteHandTransition: Transition = {
  duration: 0.5,
  ease: 'easeInOut',
}

const minuteHandVariants: Variants = {
  normal: {
    rotate: 0,
    originX: '50%',
    originY: '50%',
  },
  animate: {
    rotate: 45,
  },
}

interface HistoryProps {
  animate?: boolean
  className?: string
}

const History = ({ animate = false, className = '' }: HistoryProps) => {
  const controls = useAnimation()

  useEffect(() => {
    if (animate) {
      controls.start('animate')
    } else {
      controls.start('normal')
    }
  }, [animate, controls])

  return (
    <div
      className={`hover:bg-accent flex cursor-pointer select-none items-center justify-center rounded-md transition-colors duration-200 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 11a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
        <motion.line
          x1="12"
          y1="12"
          x2="12"
          y2="6"
          variants={handVariants}
          animate={controls}
          initial="normal"
          transition={handTransition}
        />
        <motion.line
          x1="12"
          y1="12"
          x2="16"
          y2="12"
          variants={minuteHandVariants}
          animate={controls}
          initial="normal"
          transition={minuteHandTransition}
        />
      </svg>
    </div>
  )
}

export { History }
