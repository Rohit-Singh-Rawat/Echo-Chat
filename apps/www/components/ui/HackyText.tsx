'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState } from 'react'

const CYCLES_PER_LETTER = 2
const SHUFFLE_TIME = 50
const CHARS = '!@#$%^&*():{};|,.<>/?'

interface HackyTextProps {
  text: string
  className?: string
  isHovered?: boolean
}

export const HackyText = ({
  text: TARGET_TEXT,
  className,
  isHovered,
}: HackyTextProps) => {
  const controls = useAnimationControls()
  const [displayText, setDisplayText] = useState(TARGET_TEXT)

  const scramble = async () => {
    let pos = 0

    const animate = async () => {
      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble()
        return
      }

      const scrambled = TARGET_TEXT.split('')
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length)
          const randomChar = CHARS[randomCharIndex]

          return randomChar
        })
        .join('')

      setDisplayText(scrambled)
      pos++

      await controls.start({
        opacity: [1, 0.8, 1],
        transition: { duration: SHUFFLE_TIME / 1000 },
      })

      requestAnimationFrame(animate)
    }

    animate()
  }

  const stopScramble = () => {
    setDisplayText(TARGET_TEXT)
  }

  useEffect(() => {
    if (isHovered) {
      scramble()
    } else {
      stopScramble()
    }
  }, [isHovered])

  return (
    <motion.span
      animate={controls}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className={className}
    >
      {displayText}
    </motion.span>
  )
}

export default HackyText
