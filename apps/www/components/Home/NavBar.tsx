'use client'

import { motion, useScroll } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import EchoLogo from '../icons/animated/EchoLogo'

import { AuthLinks } from './AuthLinks'
import HamburgerMenu from './HamburgerMenu'
import { NavLinks } from './NavLinks'

const DesktopNav = ({ isScrolled }: { isScrolled: boolean }) => {
  return (
    <motion.div
      className="z-[60] mx-auto hidden w-full max-w-7xl items-center justify-between rounded-full p-2.5 px-7 backdrop-blur-md lg:flex lg:min-w-[800px]"
      initial={{ width: '100%' }}
      animate={{
        width: isScrolled ? '40%' : '100%',
        y: isScrolled ? 20 : 0,
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled
          ? 'rgba(34, 42, 53, 0.06) 0px 0px 24px, rgba(0, 0, 0, 0.05) 0px 1px 1px, rgba(34, 42, 53, 0.04) 0px 0px 0px 1px, rgba(34, 42, 53, 0.08) 0px 0px 4px, rgba(47, 48, 55, 0.05) 0px 16px 68px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset'
          : 'none',
      }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut',
      }}
      style={{ minWidth: '800px' }}
    >
      <EchoLogo />

      <NavLinks />

      <AuthLinks isScrolled={isScrolled} />
    </motion.div>
  )
}
const MobileNav = ({ isScrolled }: { isScrolled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/#features', label: 'Features' },
    { href: '/plans', label: 'Pricing' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <motion.div
      className="relative z-50 mx-auto space-y-2"
      initial={{ y: 0 }}
      animate={{
        y: isScrolled ? 20 : 0,
        width: isScrolled ? '93%' : '100%',
      }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className="relative flex w-full flex-col justify-between rounded-full p-4 lg:hidden"
        animate={{
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled
            ? 'rgba(34, 42, 53, 0.06) 0px 0px 24px, rgba(0, 0, 0, 0.05) 0px 1px 1px, rgba(34, 42, 53, 0.04) 0px 0px 0px 1px, rgba(34, 42, 53, 0.08) 0px 0px 4px, rgba(47, 48, 55, 0.05) 0px 16px 68px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset'
            : 'none',
        }}
      >
        <div className="flex items-center justify-between">
          <EchoLogo />

          <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="flex lg:hidden"
      >
        <div className="z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-neutral-600 dark:text-neutral-300"
              onClick={() => setIsOpen(false)}
            >
              <span className="block">{label} </span>
            </Link>
          ))}
          <div className="grid w-full flex-col gap-2">
            <Link
              href="/login"
              className="button relative block w-full cursor-pointer rounded-md bg-white px-4 py-2 text-center text-sm font-bold text-black shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] transition duration-200 hover:-translate-y-0.5 lg:hidden"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="button relative block w-full cursor-pointer rounded-md bg-black px-4 py-2 text-center text-sm font-bold text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] transition duration-200 hover:-translate-y-0.5 lg:hidden"
            >
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export const NavBar = () => {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (value) => {
      setIsScrolled(value > 20)
    })
    return () => unsubscribe()
  }, [scrollY])

  return (
    <div className="fixed inset-x-0 top-0 z-[100] w-full p-2">
      <DesktopNav isScrolled={isScrolled} />
      <MobileNav isScrolled={isScrolled} />
    </div>
  )
}
