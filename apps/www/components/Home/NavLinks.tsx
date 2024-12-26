'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export const NavLinks = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null)

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '/plans', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <motion.div className="absolute inset-0 flex flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2">
      <ul className="z-50 flex items-center">
        {navLinks.map(({ href, label }) => (
          <li
            key={href}
            onMouseEnter={() => setActiveLink(href)}
            onMouseLeave={() => setActiveLink(null)}
            className="relative p-1 px-3"
          >
            <Link href={href} className="">
              <span className="text-sm font-medium text-black/70">{label}</span>
            </Link>
            {activeLink === href ? (
              <motion.div
                layoutId="highlight"
                className="absolute inset-0 -z-10 rounded-2xl bg-gray-500/5"
              />
            ) : null}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
