'use client'

import type { Variants } from 'framer-motion'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

const pathVariants: Variants = {
  normal: {
    x: 0,
    translateX: 0,
  },
  animate: {
    x: 2,
    translateX: [0, -3, 0],
    transition: {
      duration: 0.4,
    },
  },
}

interface LogoutIconProps {
  animate?: boolean
  className?: string
}

const LogoutIcon = ({ animate = false, className = '' }: LogoutIconProps) => {
  const controls = useAnimation()

  useEffect(() => {
    if (animate) {
      controls.start('animate')
    } else {
      controls.start('normal')
    }
  }, [animate, controls])

  return (
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
      className={className}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <motion.polyline
        points="16 17 21 12 16 7"
        variants={pathVariants}
        animate={controls}
      />
      <motion.line
        x1="21"
        x2="9"
        y1="12"
        y2="12"
        variants={pathVariants}
        animate={controls}
      />
    </svg>
  )
}

export { LogoutIcon }
