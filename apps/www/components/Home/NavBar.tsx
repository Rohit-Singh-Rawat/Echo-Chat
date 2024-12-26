'use client'

import { motion, useScroll } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import EchoLogo from '../icons/animated/EchoLogo'

import { AuthLinks } from './AuthLinks'
import { NavLinks } from './NavLinks'

export const NavBar = () => {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (value) => {
      setIsScrolled(value > 20)
    })
    return () => unsubscribe()
  }, [scrollY])

  const variants = {
    scrolled: {
      opacity: 1,
      width: '40%',
      transform: 'translateY(20px)',
      backdropFilter: 'blur(10px)',
      boxShadow:
        'rgba(34, 42, 53, 0.06) 0px 0px 24px, rgba(0, 0, 0, 0.05) 0px 1px 1px, rgba(34, 42, 53, 0.04) 0px 0px 0px 1px, rgba(34, 42, 53, 0.08) 0px 0px 4px, rgba(47, 48, 55, 0.05) 0px 16px 68px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset',
    },
    notScrolled: {
      opacity: 1,
      width: '100%',
      transform: undefined,
      backdropFilter: undefined,
      boxShadow: undefined,
    },
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-[999] w-full p-2.5">
      <motion.div
        variants={variants}
        animate={isScrolled ? 'scrolled' : 'notScrolled'}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
        className="z-[60] mx-auto flex min-w-[800px] max-w-7xl items-center justify-between rounded-full p-2.5 px-6 backdrop-blur-md"
      >
        <motion.div className="z-[100] scale-95">
          <Link href="/">
            <EchoLogo />
          </Link>
        </motion.div>

        <NavLinks />

        <AuthLinks isScrolled={isScrolled} />
      </motion.div>
    </nav>
  )
}
