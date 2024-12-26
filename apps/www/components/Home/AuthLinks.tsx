'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

import { Button } from '../shared/Button'

export const AuthLinks = ({ isScrolled }: { isScrolled: boolean }) => {
  return (
    <motion.div className="z-[60] flex items-center gap-2">
      <AnimatePresence initial={false}>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
          >
            <Link href="/login">
              <Button className="rounded-lg border border-neutral-200 bg-white p-1.5 px-4 text-black/80 shadow-none transition-all duration-300 ease-in-out hover:bg-neutral-50">
                Log in
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <Link href="/signup">
        <Button
          className={`${isScrolled ? 'rousnded-full translate-x-2' : 'round'} duration-600 ease transition-all`}
        >
          Sign up
        </Button>
      </Link>
    </motion.div>
  )
}
