'use client'

import { motion } from 'framer-motion'

interface BlurFadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  blur?: boolean
  y?: number
  className?: string
}

const BlurFadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
  blur = true,
  y = 20,
  className,
}: BlurFadeInProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
        filter: blur ? 'blur(10px)' : 'none',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true }}
      transition={{
        duration,
        delay,
        filter: {
          duration: duration * 0.8,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default BlurFadeIn
